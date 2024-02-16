import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {getUnapprovedTimesheets} from '@actions/approvals';
import Button from '@components/Button';
import Spinner from '@components/Spinner';
import Table, {Column} from '@components/Table';
import Tooltip from '@components/Tooltip';
import {useAppDispatch, useAppSelector} from '@hooks';
import {selectGetUnapprovedTimesheetsStatus, selectTimesheets} from '@selectors/approvals';
import {selectUser} from '@selectors/auth';
import formatDate from '@util/formatDate';
import formatMs from '@util/formatMs';
import formatTime from '@util/formatTime';
import getTimeDiff from '@util/getTimeDiff';
import {getTotalWeekHours} from '@util/getTotalHours';

import styles from './Unapproved.module.scss';

const Unapproved = () => {
  const dispatch = useAppDispatch();
  const unapprovedTimesheets = useAppSelector(selectTimesheets);
  const getUnapprovedTimesheetsStatus = useAppSelector(selectGetUnapprovedTimesheetsStatus);

  const currentUserId = useAppSelector(selectUser)._id as string;

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
      key: 'actions',
      header: 'Actions',
      hideHeader: true,
      bold: true,
      align: 'center',
      width: 100,
    },
    {
      key: 'flag',
      header: 'Flag',
      hideHeader: true,
      width: 1,
    },
  ];

  const [smallerWindowWidth, setSmallerWindowWidth] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setSmallerWindowWidth(true);
      } else {
        setSmallerWindowWidth(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const rows = unapprovedTimesheets.map((ts) => {
    const submittedDate = ts.submitted?.date as string;
    const timeSinceSubmit = getTimeDiff(submittedDate, new Date()) / (1000 * 60 * 60 * 24);
    const employee = ts.created.user.firstName + ' ' + ts.created.user.lastName;
    const hours = formatMs(getTotalWeekHours(ts.time));
    const dateSubmitted = formatDate(submittedDate);
    const timeSubmitted = formatTime(submittedDate);
    const timeUpdated = ts.updated?.date && formatTime(new Date(ts.updated.date));
    const timesheetApproverId = ts.created.user.approver._id;
    const approverName = ts.created.user.approver.firstName + ' ' + ts.created.user.approver.lastName;

    const row = {
      employee,
      hours,
      dateSubmitted,
      timeSubmitted,
      timeUpdated,
      actions: (
        <Link className={styles.reviewLink} to={`/approvals/${ts._id}`}>
          <Button className={styles.reviewButton} color="warning">
            Review
          </Button>
        </Link>
      ),
    };
    return timeSinceSubmit > 2
      ? {
          ...row,
          flag: (
            <Tooltip
              content={
                currentUserId === timesheetApproverId
                  ? 'You have not reviewed this timesheet for more than 48hrs.'
                  : approverName + ' has not reviewed this timesheet for more than 48hrs.'
              }
              position={!smallerWindowWidth ? 'left' : 'right'}>
              <span>🚩</span>
            </Tooltip>
          ),
        }
      : row;
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(getUnapprovedTimesheets(currentUserId));
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, currentUserId]);

  return (
    <div>
      <div className={styles.approvalTableContainer}>
        {unapprovedTimesheets.length &&
        !getUnapprovedTimesheetsStatus.fetching &&
        !getUnapprovedTimesheetsStatus.error ? (
          <>
            <p className={styles.tableHeader}>Timesheets Pending Approval</p>
            <Table columns={columns} data={rows} wrapContent={true} />
          </>
        ) : (
          <p className={styles.tableHeader}>No pending approvals</p>
        )}

        {getUnapprovedTimesheetsStatus.fetching && <Spinner />}
        {getUnapprovedTimesheetsStatus.error && (
          <div className={styles.unapprovedTimesheetError}>{getUnapprovedTimesheetsStatus.error}</div>
        )}
      </div>
    </div>
  );
};

export default Unapproved;
