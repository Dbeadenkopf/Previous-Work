import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {resetUpdateStatus, updateComment, updateStatus} from '@actions/approvals';
import {clearTimesheet, getTimesheetById} from '@actions/timesheet';
import Button from '@components/Button';
import InputField from '@components/InputField';
import StaticTimesheet from '@components/StaticTimesheet';
import Status from '@components/Status';
import {useAppDispatch, useAppSelector} from '@hooks';
import {selectUpdateCommentStatus, selectUpdateStatus} from '@selectors/approvals';
import {selectSelected} from '@selectors/timesheet';
import formatDate, {offsetDate} from '@util/formatDate';

import styles from './ApprovalDetails.module.scss';

const ApprovalDetails = () => {
  const dispatch = useAppDispatch();
  const commentStatus = useAppSelector(selectUpdateCommentStatus);
  const approvalStatus = useAppSelector(selectUpdateStatus);

  const [comment, setComment] = useState('');

  const navigate = useNavigate();
  const params = useParams();
  const timesheetId = params._id as string;

  const handleCommentSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(updateComment({timesheetId, comment}));
  };

  useEffect(() => {
    dispatch(getTimesheetById(timesheetId));
  }, [dispatch, timesheetId]);

  useEffect(() => {
    if (commentStatus.success) {
      setComment('');
    }
  }, [commentStatus.success]);

  useEffect(() => {
    if (approvalStatus.success) {
      navigate('/approvals/unapproved');
    }
    return () => {
      dispatch(resetUpdateStatus());
    };
  }, [approvalStatus.success, dispatch, navigate]);

  // clean up
  useEffect(
    () => () => {
      dispatch(clearTimesheet());
    },
    [dispatch]
  );

  const timesheet = useAppSelector(selectSelected);
  const weekOf = timesheet.weekOf;
  const approved = timesheet.approved;

  return (
    <>
      <h2 className={styles.weekOfHeader}>
        Week of {formatDate(weekOf)} - {offsetDate(weekOf, 6)}
      </h2>
      <Status timesheet={timesheet} />
      <StaticTimesheet timesheet={timesheet} />
      {!approved && (
        <>
          <div className={styles.commentContainer}>
            <InputField
              maxLength={280}
              label="Leave A Comment"
              multi={true}
              rows={3}
              labelPos={'top'}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
              value={comment}
            />
            <div className={styles.commentButtonContainer}>
              <Button disabled={!comment.trim()} onClick={(e) => handleCommentSubmit(e)}>
                Add
              </Button>
            </div>
          </div>
          <div className={styles.approvalButtonsContainer}>
            <Button
              name="reject"
              color="danger"
              onClick={() => dispatch(updateStatus({timesheetId, status: 'rejected'}))}>
              Reject
            </Button>
            <Button
              name="approve"
              color="success"
              onClick={() => dispatch(updateStatus({timesheetId, status: 'approved'}))}>
              Approve
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default ApprovalDetails;
