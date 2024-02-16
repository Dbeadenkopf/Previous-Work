import React from 'react';

import combineClasses from '@t1cg/combine-classes';
import formatDate from '@util/formatDate';
import formatMs from '@util/formatMs';
import formatTime from '@util/formatTime';
import getTimeSheetStatus from '@util/getTimesheetStatus';
import {getTotalWeekHours} from '@util/getTotalHours';

import styles from './Status.module.scss';

interface IProps {
  timesheet: Schemas.Timesheet;
}

const Status = ({timesheet}: IProps) => {
  const approvalStatus = getTimeSheetStatus(timesheet);
  const {updated, submitted, rejected, approved, comments, time, created} = timesheet;
  const totalHours = formatMs(getTotalWeekHours(time));
  const {approver} = created.user;

  return (
    <div className={styles.container}>
      <p className={styles.status}>
        <span className={styles.titles}>Status: </span>
        <span
          className={combineClasses(styles.titles, {
            [styles.approved]: approvalStatus === 'Approved',
            [styles.rejected]: approvalStatus === 'Rejected',
            [styles.other]: approvalStatus === 'Submitted' || approvalStatus === 'Unsubmitted',
          })}>
          {approvalStatus}
        </span>
        <span className={styles.titles}>
          <br />
          Total Hours: {totalHours}
        </span>
        {approvalStatus === 'Submitted' && (
          <span className={styles.approver}>
            <br />
            Approver: {approver.firstName} {approver.lastName}
          </span>
        )}
      </p>

      {approvalStatus === 'Submitted' && submitted && updated && (
        <div className={styles.info}>
          <div className={styles.leftSide}>
            <p>
              <span className={styles.titles}>Submitted By: </span>
              {submitted.user.firstName + ' ' + submitted.user.lastName}
            </p>
            <p>
              <span className={styles.titles}>Submission Date: </span>
              {formatDate(new Date(submitted.date))}
            </p>
            <p>
              <span className={styles.titles}>Submission Time: </span>
              {formatTime(new Date(submitted.date))}
            </p>
            <p>
              <span className={styles.titles}>Submission IP: </span>
              {submitted.ip}
            </p>
          </div>
          <div className={styles.rightSide}>
            <p>
              <span className={styles.titles}>Updated Date: </span>
              {formatDate(new Date(updated.date))}
            </p>
            <p>
              <span className={styles.titles}>Updated Time: </span>
              {formatTime(new Date(updated.date))}
            </p>
            <p>
              <span className={styles.titles}>Updated IP: </span>
              {updated.ip}
            </p>
          </div>
        </div>
      )}

      {approvalStatus === 'Approved' && approved && submitted && (
        <div className={styles.info}>
          <div className={styles.leftSide}>
            <p>
              <span className={styles.titles}>Approved By: </span>
              {approved.user.firstName + ' ' + approved.user.lastName}
            </p>
            <p>
              <span className={styles.titles}>Approval Date: </span>
              {formatDate(new Date(approved.date))}
            </p>
            <p>
              <span className={styles.titles}>Approval Time: </span>
              {formatTime(new Date(approved.date))}
            </p>
            <p>
              <span className={styles.titles}>Approval IP: </span>
              {approved.ip}
            </p>
          </div>
          <div className={styles.rightSide}>
            <p>
              <span className={styles.titles}>Submitted By: </span>
              {submitted.user.firstName + ' ' + submitted.user.lastName}
            </p>
            <p>
              <span className={styles.titles}>Submission Date: </span>
              {formatDate(new Date(submitted.date))}
            </p>
            <p>
              <span className={styles.titles}>Submission Time: </span>
              {formatTime(new Date(submitted.date))}
            </p>
            <p>
              <span className={styles.titles}>Submission IP: </span>
              {submitted.ip}
            </p>
          </div>
        </div>
      )}

      {approvalStatus === 'Rejected' && rejected && submitted && (
        <div className={styles.info}>
          <div className={styles.leftSide}>
            <p>
              <span className={styles.titles}>Rejected By: </span>
              {rejected.user.firstName + ' ' + rejected.user.lastName}
            </p>
            <p>
              <span className={styles.titles}>Rejection Date: </span>
              {formatDate(new Date(rejected.date))}
            </p>
            <p>
              <span className={styles.titles}>Rejection Time: </span>
              {formatTime(new Date(rejected.date))}
            </p>
            <p>
              <span className={styles.titles}>Rejection IP: </span>
              {rejected.ip}
            </p>
          </div>
          <div className={styles.rightSide}>
            <p>
              <span className={styles.titles}>Submitted By: </span>
              {submitted.user.firstName + ' ' + submitted.user.lastName}
            </p>
            <p>
              <span className={styles.titles}>Submission Date: </span>
              {formatDate(new Date(submitted.date))}
            </p>
            <p>
              <span className={styles.titles}>Submission Time: </span>
              {formatTime(new Date(submitted.date))}
            </p>
            <p>
              <span className={styles.titles}>Submission IP: </span>
              {submitted.ip}
            </p>
          </div>
        </div>
      )}

      {!!comments.length && (
        <div className={styles.comments}>
          <h4>
            <strong>Comments:</strong>
          </h4>
          <ul>
            {comments.map((x, i) => (
              <li key={i}>{x.content}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Status;
