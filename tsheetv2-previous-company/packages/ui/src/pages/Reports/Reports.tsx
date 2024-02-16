import {jsPDF as pdfConverter} from 'jspdf';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';

import {getTimesheets} from '@actions/reports';
import {ReactComponent as PdfIcon} from '@assets/svg/pdf_icon.svg';
import {ReactComponent as PrinterIcon} from '@assets/svg/printer_icon.svg';
import Button from '@components/Button';
import Dropdown from '@components/Dropdown';
import InputField from '@components/InputField';
import Pagination from '@components/Pagination';
import Table, {Column} from '@components/Table';
import Toggle from '@components/Toggle';
import {useAppDispatch, useAppSelector} from '@hooks';
import {selectTimesheets} from '@selectors/reports';
import formatDate from '@util/formatDate';
import formatMs from '@util/formatMs';
import formatTime from '@util/formatTime';
import getCurrentMonday from '@util/getCurrentMonday';
import getPrevMonday from '@util/getPrevMonday';
import getTimesheetStatus from '@util/getTimesheetStatus';
import {getTotalDayHours} from '@util/getTotalHours';

import styles from './Reports.module.scss';

const Reports = () => {
  const columns: Column[] = [
    {
      key: 'week',
      header: 'Week',
      bold: true,
      align: 'center',
    },
    {
      key: 'employee',
      header: 'Employee',
      bold: true,
      align: 'center',
    },
    {
      key: 'submittedDatetime',
      header: 'Submission Date/Time',
      bold: true,
      align: 'center',
    },
    {
      key: 'status',
      header: 'Status',
      bold: true,
      align: 'center',
    },
    {
      key: 'reviewedBy',
      header: 'Reviewed By',
      bold: true,
      align: 'center',
    },
    {
      key: 'approvalDateTime',
      header: 'Approval Date/Time',
      bold: true,
      align: 'center',
    },
    {
      key: 'totalHours',
      header: 'Total Hours',
      bold: true,
      align: 'center',
    },
    {
      key: 'actions',
      header: '',
      bold: true,
      width: 75,
      align: 'center',
    },
  ];

  const dispatch = useAppDispatch();
  let allTimesheets = useAppSelector(selectTimesheets);

  const [incompleteReportToggle, setIncompleteReportToggle] = useState(false);
  const [verticalView, setVerticalView] = useState(false);
  const defaultReportLabel = 'Timesheet Report';

  const [reportLabel, setReportLabel] = useState(defaultReportLabel);
  const [unsubmittedDayToggle, setUnsubmittedDayToggle] = useState(false);

  const timeNow = useCallback(() => new Date(new Date().setUTCHours(0, 0, 0, 0)), []);

  const prevWeekStart = new Date(
    new Date(timeNow()).setUTCDate(
      timeNow().getUTCDate() - (timeNow().getUTCDay() + (!timeNow().getUTCDay() ? 13 : 6))
    )
  ).toISOString();

  const prevDate = new Date();
  prevDate.setUTCDate(prevDate.getUTCDate() - 1);

  const getPreviousDateByDayName = (dayName: string) => {
    const dayArray = ['Sunday', 'Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday'];

    // Copy date so don't modify original
    const d = new Date();

    // Adjust to previous Saturday
    d.setDate(d.getDate() - (d.getDay() + dayArray.indexOf(dayName)));

    d.setUTCHours(0, 0, 0, 0);

    return d.toISOString();
  };

  const prevDayAbbreviation = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][
    prevDate.getUTCDay()
  ] as keyof Schemas.Time;

  const unsubmittedDayFilters = useCallback(() => {
    const adjustedPrevWeekStart = new Date(prevWeekStart);
    adjustedPrevWeekStart.setDate(adjustedPrevWeekStart.getDate() + 7);
    return {
      weekOf:
        prevDayAbbreviation === 'sun'
          ? prevWeekStart
          : prevDayAbbreviation === 'sat'
          ? new Date(adjustedPrevWeekStart.setUTCHours(0, 0, 0, 0)).toISOString()
          : new Date(getCurrentMonday()).setUTCHours(0, 0, 0, 0).toString(),
      date:
        prevDayAbbreviation === 'sun' || prevDayAbbreviation === 'sat'
          ? getPreviousDateByDayName('Saturday')
          : timeNow().toISOString(),
      dayName: prevDayAbbreviation === 'sun' || prevDayAbbreviation === 'sat' ? 'fri' : prevDayAbbreviation,
    };
  }, [prevDayAbbreviation, prevWeekStart, timeNow]);

  const [unapprovedToggle, setUnapprovedToggle] = useState(false);
  const reportTemplateRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let filters: {weekOf: string; status?: string; date?: string; dayName?: string} = {
      weekOf: prevWeekStart,
    };

    if (!incompleteReportToggle && !unsubmittedDayToggle && !unapprovedToggle) {
      setReportLabel(defaultReportLabel);
    }

    if (unsubmittedDayToggle) {
      filters = unsubmittedDayFilters();
    }

    if (unapprovedToggle) {
      filters = {
        weekOf: prevWeekStart,
        status: unapprovedToggle ? 'unapproved' : '',
      };
    }

    dispatch(getTimesheets(filters));
  }, [
    dispatch,
    prevWeekStart,
    unsubmittedDayToggle,
    prevDayAbbreviation,
    timeNow,
    unsubmittedDayFilters,
    incompleteReportToggle,
    unapprovedToggle,
  ]);

  if (incompleteReportToggle) {
    allTimesheets = allTimesheets.filter((ts) => ts.submittedHours && ts.submittedHours < 40);
  }

  const tableData = allTimesheets.map((i) => {
    const {created, submitted, approved, submittedHours} = i;
    const week = <span style={{wordBreak: 'break-word'}}>{formatDate(getPrevMonday())}</span>;
    const employee = (
      <span style={{wordBreak: 'break-word'}}>{created.user.firstName + ' ' + created.user.lastName}</span>
    );

    const submittedDatetime = submitted ? (
      <p>
        {formatDate(submitted.date)}&nbsp;&nbsp; {formatTime(submitted.date)}
      </p>
    ) : (
      'N/A'
    );

    const status = getTimesheetStatus(i);
    const reviewedBy = unapprovedToggle
      ? created.user.approver.firstName + ' ' + created.user.approver.lastName
      : approved
      ? approved.user.firstName + ' ' + approved.user.lastName
      : 'N/A';
    const approvalDateTime = approved ? (
      <p>
        {formatDate(approved.date)}&nbsp;&nbsp; {formatTime(approved.date)}
      </p>
    ) : (
      'N/A'
    );
    const totalHours = submittedHours;

    return {
      week,
      employee,
      submittedDatetime,
      status,
      reviewedBy,
      approvalDateTime,
      totalHours,
      actions: (
        <Link to={`/reports/${i._id}`} style={{textDecoration: 'none'}}>
          <Button>View</Button>
        </Link>
      ),
    };
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);
  const nRecords = currentPage * recordsPerPage;
  const firstRecordIdx = nRecords - recordsPerPage;
  // Records to be displayed on the current page - USE AS DATA FOR TABLE COMPONENT
  const currentRecords = tableData.slice(firstRecordIdx, nRecords);
  const pages = Math.ceil(tableData.length / recordsPerPage);
  const totalRecords = tableData.length;

  // Vertical view for table
  useEffect(() => {
    if (window.innerWidth < 1600) {
      setVerticalView(true);
    } else {
      setVerticalView(false);
    }
  }, []);
  window.addEventListener('resize', () => {
    if (window.innerWidth < 1600) {
      setVerticalView(true);
    } else {
      setVerticalView(false);
    }
  });
  const handleGeneratePdf = async () => {
    const doc = new pdfConverter({format: 'a4', unit: 'px', orientation: 'landscape'});

    await doc.html(reportTemplateRef.current as HTMLElement, {
      x: 0,
      y: 0,
      margin: [4, 4, 4, 4],
      width: 1200,
      windowWidth: 1200,

      html2canvas: {
        scale: 0.5,
        logging: false,
        windowWidth: 1200,
      },
      callback(report) {
        report.save(`Employee_report_${formatDate(new Date())}`);
      },
    });
  };

  const dayTableData = allTimesheets.map((i) => {
    const dayTimesheet =
      prevDayAbbreviation === 'sun' || prevDayAbbreviation === 'sat'
        ? i.time['fri']
        : i.time[prevDayAbbreviation];

    const created = i.created;

    const submittedDatetime = dayTimesheet.submitted ? (
      <p>
        {formatDate(dayTimesheet.submitted.date)}&nbsp;&nbsp; {formatTime(dayTimesheet.submitted.date)}
      </p>
    ) : (
      'N/A'
    );

    const employee = created.user.firstName + ' ' + created.user.lastName;

    const status = dayTimesheet.submitted ? 'Submitted Late' : 'Unsubmitted';

    return {
      day:
        dayTimesheet.hours.length > 0
          ? formatDate(dayTimesheet.hours[0].start)
          : (prevDayAbbreviation === 'sun' ||
              prevDayAbbreviation === 'sat' ||
              prevDayAbbreviation === 'fri') &&
            dayTimesheet.hours.length === 0
          ? formatDate(getPreviousDateByDayName('Friday'))
          : formatDate(prevDate.toISOString()),

      employee,
      submittedDatetime,
      status,
      totalHours: formatMs(getTotalDayHours(dayTimesheet)),
      actions: <Button>View</Button>,
    };
  });

  const filteredColumns = columns.map((column) => {
    if (unsubmittedDayToggle) {
      const hideColumn = column.key === 'reviewedBy' || column.key === 'approvalDateTime';
      const key = column.key === 'week' ? 'day' : column.key;
      const header = column.header === 'Week' ? 'Day' : column.header;

      return {...column, hideColumn, key, header};
    } else if (unapprovedToggle && column.header === 'Reviewed By') {
      return {...column, header: 'Approver'};
    } else {
      return column;
    }
  });

  const handleUnsubmittedDayToggle = () => {
    setUnsubmittedDayToggle(!unsubmittedDayToggle);
    setIncompleteReportToggle(false);
    setUnapprovedToggle(false);
    setReportLabel('Unsubmitted Daily Timesheet Report');
  };

  const handleIncompleteReportToggle = () => {
    setIncompleteReportToggle(!incompleteReportToggle);
    setUnsubmittedDayToggle(false);
    setUnapprovedToggle(false);
    setReportLabel('Incomplete Weekly Timesheet Report');
  };

  const handleUnapprovedToggle = () => {
    setUnapprovedToggle(!unapprovedToggle);
    setIncompleteReportToggle(false);
    setUnsubmittedDayToggle(false);
    setReportLabel('Unapproved Timesheets Report');
  };

  const getData = unapprovedToggle ? currentRecords : unsubmittedDayToggle ? dayTableData : tableData;

  return (
    <div className={styles.reportContainer}>
      <div className={styles.filterContainer}>
        <h1 className={styles.title}>Report Filters</h1>
        <section className={styles.filter}>
          <div className={styles.dropdowns}>
            <Dropdown
              options={[{id: 'weekly', name: 'Weekly'}]}
              value={'Weekly'}
              onChange={() => {}}
              height="large"
              font="large"
              align="center"
              bold={true}
            />
          </div>

          <div className={styles.specificDate}>
            <div className={styles.toggle}>
              <Toggle isToggled={true} onToggle={() => {}}></Toggle>{' '}
            </div>
            <span className={styles.label}>Specific Date</span>
            <InputField height="large" type="date" align="center" value={'2022-10-10'} onChange={() => {}} />
          </div>
          <div className={styles.specificDateRange}>
            <div className={styles.dateRange}>
              <div className={styles.toggle}>
                <Toggle isToggled={false} onToggle={() => {}}></Toggle>{' '}
              </div>
              <span className={styles.label}>Specific Date Range</span>
            </div>
            <div className={styles.fromToWeekContainer}>
              <div className={styles.weekDate}>
                <span className={styles.label}>From Week:</span>
                <InputField
                  height="large"
                  align="center"
                  value={''}
                  type="date"
                  disabled={true}
                  onChange={() => {}}
                />
              </div>

              <div className={styles.weekDate}>
                <span className={styles.label}>To Week:</span>
                <InputField
                  height="large"
                  align="center"
                  value={''}
                  type="date"
                  disabled={true}
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
          <div className={styles.dropdowns}>
            <Dropdown
              options={[{id: 'timesheetStatus', name: 'Timesheet Status'}]}
              value={'Timesheet Status'}
              onChange={() => {}}
              height="large"
              font="large"
              align="center"
              bold={true}
            />

            <Dropdown
              options={[{id: 'approver', name: 'Approver'}]}
              value={'Approver'}
              onChange={() => {}}
              height="large"
              font="large"
              align="center"
              bold={true}
            />

            <Dropdown
              options={[{id: 'employee', name: 'Employee'}]}
              value={'Employee'}
              onChange={() => {}}
              height="large"
              font="large"
              align="center"
              bold={true}
            />

            <Dropdown
              options={[{id: 'project', name: 'Project'}]}
              value={'Project'}
              onChange={() => {}}
              height="large"
              font="large"
              align="center"
              bold={true}
            />
          </div>

          <div className={styles.resetFilter}>
            <Button color={'warning'}>Reset Filters</Button>
          </div>

          <hr className={styles.divider}></hr>
          <h1 className={styles.title}>Accountability Reports</h1>
          <div className={styles.reportTypes}>
            <div className={styles.toggle}>
              <Toggle isToggled={unsubmittedDayToggle} onToggle={() => handleUnsubmittedDayToggle()}></Toggle>
            </div>
            <p className={styles.label}>Unsubmitted Daily Timesheet Report</p>
          </div>
          <div className={styles.reportTypes}>
            <div className={styles.toggle}>
              <Toggle
                isToggled={incompleteReportToggle}
                onToggle={() => handleIncompleteReportToggle()}></Toggle>
            </div>
            <p className={styles.label}>Incomplete Weekly Timesheet Report</p>
          </div>
          <div className={styles.reportTypes}>
            <div className={styles.toggle}>
              <Toggle isToggled={unapprovedToggle} onToggle={() => handleUnapprovedToggle()}></Toggle>
            </div>
            <p className={styles.label}>Unapproved Timesheets Report</p>
          </div>
        </section>
      </div>

      <div className={styles.timesheetsContainer}>
        <h1 className={styles.title}>{reportLabel}</h1>
        <div style={{margin: '20px'}}>
          <div className={styles.printerAndExportContainer}>
            <PdfIcon className={styles.pdfIcon} onClick={handleGeneratePdf} />
            <PrinterIcon className={styles.printerIcon} />
          </div>
          <section className={styles.timesheets}>
            <Table
              columns={filteredColumns}
              data={getData}
              wrapContent={true}
              divider={true}
              asReport={false}
              verticalView={verticalView}
            />
          </section>
          <Pagination
            pages={pages}
            currentPage={currentPage}
            totalRecords={totalRecords}
            nRecords={nRecords}
            firstRecordIdx={firstRecordIdx}
            setCurrentPage={setCurrentPage}
          />
          {/* report for download below */}
          <div style={{display: 'none'}}>
            <section ref={reportTemplateRef} className={styles.timesheets}>
              <Table columns={columns} data={tableData} wrapContent={true} divider={true} asReport={true} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
