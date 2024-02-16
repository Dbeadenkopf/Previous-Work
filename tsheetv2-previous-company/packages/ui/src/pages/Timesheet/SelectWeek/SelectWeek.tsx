import React from 'react';

import {getProjects} from '@actions/framework';
import {clearTimesheet, getTimesheet} from '@actions/timesheet';
import CalendarSelect from '@components/CalendarSelect';
import Spinner from '@components/Spinner';
import StaticTimesheet from '@components/StaticTimesheet';
import Status from '@components/Status';
import Timesheet from '@components/Timesheet';
import {useAppDispatch, useAppSelector} from '@hooks';
import {selectUser} from '@selectors/auth';
import {selectGetTimesheetRequest, selectSelected} from '@selectors/timesheet';
import formatDate, {offsetDate} from '@util/formatDate';
import getCurrentMonday from '@util/getCurrentMonday';
import getPrevMonday from '@util/getPrevMonday';

import styles from './SelectWeek.module.scss';

const SelectWeek = () => {
  const dispatch = useAppDispatch();

  const requestStatus = useAppSelector(selectGetTimesheetRequest);
  const timesheet = useAppSelector(selectSelected);

  const [selectedWeek, setSelectedWeek] = React.useState(getPrevMonday());

  const createdBy = useAppSelector(selectUser)._id as string;

  const loadData = (week: Date, weekString: string) => {
    setSelectedWeek(weekString);
  };

  React.useEffect(() => {
    dispatch(clearTimesheet());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getTimesheet({createdBy, weekOf: new Date(selectedWeek).setUTCHours(0, 0, 0, 0).toString()}));
  }, [createdBy, dispatch, selectedWeek]);

  const futureTimesheet = new Date(selectedWeek) > new Date(getCurrentMonday());
  const rejectedTimesheet =
    timesheet.rejected && timesheet.submitted && timesheet.rejected.date > timesheet.submitted.date;

  return (
    <div>
      <CalendarSelect className={styles.calendar} onClick={loadData} highlightWeek={selectedWeek} />

      <h2 className={styles.weekOfHeader}>
        Week Of {formatDate(selectedWeek)} - {offsetDate(selectedWeek, 6)}
      </h2>

      {(requestStatus.success || futureTimesheet) && <Status timesheet={timesheet} />}
      {requestStatus.fetching ? (
        <Spinner />
      ) : requestStatus.error && !futureTimesheet ? (
        requestStatus.error
      ) : !timesheet ? (
        'An error has occurred'
      ) : futureTimesheet || rejectedTimesheet ? (
        <div className={styles.timesheetContainer}>
          <Timesheet
            selectedWeek={selectedWeek}
            futureTimesheet={futureTimesheet}
            rejectedTimesheet={rejectedTimesheet}
          />
        </div>
      ) : (
        // current, submitted, and approved timesheets
        <StaticTimesheet timesheet={timesheet} />
      )}
    </div>
  );
};

export default SelectWeek;
