import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {clearTimesheet, getTimesheetById} from '@actions/timesheet';
import StaticTimesheet from '@components/StaticTimesheet';
import Status from '@components/Status';
import {useAppDispatch, useAppSelector} from '@hooks';
import {selectSelected} from '@selectors/timesheet';
import formatDate, {offsetDate} from '@util/formatDate';

import styles from './ReportDetails.module.scss';

const ReportDetails = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const timesheetId = params._id as string;
  const timesheet = useAppSelector(selectSelected);
  const weekOf = timesheet.weekOf;

  useEffect(() => {
    dispatch(getTimesheetById(timesheetId));
  }, [dispatch, timesheetId]);

  // clean up
  useEffect(
    () => () => {
      dispatch(clearTimesheet());
    },
    [dispatch]
  );

  return (
    <div>
      <h2 className={styles.weekOfHeader}>
        Week of {formatDate(weekOf)} - {offsetDate(weekOf, 6)}
      </h2>
      <Status timesheet={timesheet} />
      <StaticTimesheet timesheet={timesheet} />
    </div>
  );
};

export default ReportDetails;
