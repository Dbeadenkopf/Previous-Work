import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {getApprovedTimesheets} from '@actions/approvals';
import Button from '@components/Button';
import CalendarSelect from '@components/CalendarSelect';
import Table, {Column} from '@components/Table';
import {useAppDispatch, useAppSelector} from '@hooks';
import {selectTimesheets} from '@selectors/approvals';
import {selectUser} from '@selectors/auth';
import formatDate, {offsetDate} from '@util/formatDate';
import formatMs from '@util/formatMs';
import formatTime from '@util/formatTime';
import getPrevMonday from '@util/getPrevMonday';
import getTimeDiff from '@util/getTimeDiff';
import {getTotalWeekHours} from '@util/getTotalHours';

import styles from './Approved.module.scss';

const Approved = () => {
  const dispatch = useAppDispatch();
  const approvedTimesheets = useAppSelector(selectTimesheets);
  const approverId = useAppSelector(selectUser)._id as string;

  const [selectedWeek, setSelectedWeek] = useState(getPrevMonday());

  useEffect(() => {
    dispatch(
      getApprovedTimesheets({
        approvedBy: approverId,
        weekOf: new Date(selectedWeek).setUTCHours(0, 0, 0, 0).toString(),
      })
    );
  }, [approverId, dispatch, selectedWeek]);

  const columns: Column[] = [
    {
      key: 'employee',
      header: 'Employee',
      bold: true,
      align: 'center',
    },
    {
      key: 'hours',
      header: 'Hours',
      bold: true,
      align: 'center',
    },
    {
      key: 'dateSubmitted',
      header: 'Date Submitted',
      bold: true,
      align: 'center',
    },
    {
      key: 'timeSubmitted',
      header: 'Time Submitted',
      bold: true,
      align: 'center',
    },
    {
      key: 'timeUpdated',
      header: 'Time Updated',
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
      key: 'actions',
      header: 'Actions',
      bold: true,
      width: 75,
      align: 'center',
    },
    {
      key: 'flag',
      header: 'flag',
      hideHeader: true,
      width: 10,
    },
  ];

  const rows = approvedTimesheets.map((ts) => {
    const submittedDate = ts.submitted?.date as string;
    const approvedDate = ts.approved?.date as string;
    const timeSinceSubmit = getTimeDiff(submittedDate, approvedDate) / (1000 * 60 * 60 * 24);
    const employee = ts.created.user.firstName + ' ' + ts.created.user.lastName;
    const hours = formatMs(getTotalWeekHours(ts.time));
    const dateSubmitted = formatDate(submittedDate);
    const timeSubmitted = formatTime(submittedDate);
    const timeUpdated = ts.updated?.date && formatTime(ts.updated.date);

    const row = {
      employee,
      hours,
      dateSubmitted,
      timeSubmitted,
      timeUpdated,
      status: <span style={{color: 'green'}}>Approved</span>,
      actions: (
        <Link to={`/approvals/${ts._id}`} style={{textDecoration: 'none'}}>
          <Button>View</Button>
        </Link>
      ),
    };
    return timeSinceSubmit > 2 ? {...row, flag: '🚩'} : row;
  });

  const loadData = (week: Date, weekString: string) => {
    setSelectedWeek(weekString);
  };

  return (
    <>
      <CalendarSelect className={styles.calendar} onClick={loadData} highlightWeek={selectedWeek} />
      <h2 className={styles.weekOfHeader}>
        Week Of {formatDate(selectedWeek)} - {offsetDate(selectedWeek, 6)}
      </h2>
      <section className={styles.approvedTimesheets}>
        {approvedTimesheets.length ? (
          <Table columns={columns} data={rows} wrapContent={true} divider={true} />
        ) : (
          'Timesheet(s) not found'
        )}
      </section>
    </>
  );
};

export default Approved;
