import React, {useEffect, useState} from 'react';

import {getProjects} from '@actions/framework';
import {clearTimesheet, getTimesheet} from '@actions/timesheet';
import DynamicTimesheet from '@components/Timesheet';
import {useAppDispatch, useAppSelector} from '@hooks';
import {selectUser} from '@selectors/auth';
import {selectTime} from '@selectors/timesheet';
import formatMs from '@util/formatMs';
import getCurrentMonday from '@util/getCurrentMonday';
import {getTotalWeekHours} from '@util/getTotalHours';

import styles from './Timesheet.module.scss';

const Timesheet = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUser)._id as string;

  useEffect(() => {
    const weekOf = new Date(getCurrentMonday()).setUTCHours(0, 0, 0, 0).toString();
    dispatch(getTimesheet({createdBy: userId, weekOf}));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const hours = useAppSelector(selectTime);

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthNamesAbb = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const now = new Date();
  const dayOfWeek = now.getDay();
  const dayOfMonth = now.getDate();

  let weekStart = dayOfWeek !== 0 ? dayOfMonth + 1 - dayOfWeek : dayOfMonth - dayOfWeek - 6;

  const lastWeek = new Date(new Date(now).setDate(dayOfMonth - (!dayOfWeek ? 6 : dayOfWeek - 1)));
  const lastWeekDayOfMonth = lastWeek.getMonth();

  if (weekStart < 1) {
    weekStart = lastWeek.getDate();
  }

  const month = weekStart < 0 ? monthNamesAbb[lastWeekDayOfMonth - 1] : monthNamesAbb[lastWeekDayOfMonth];
  const year = lastWeek.getFullYear();

  const lastDate = new Date(new Date(year, lastWeekDayOfMonth, weekStart + 6));
  const lastDateMonth = monthNamesAbb[lastDate.getMonth()];
  const lastDateYear = lastDate.getFullYear();

  const [showMonth, setShowMonth] = useState(false);

  useEffect(() => {
    if (month === lastDateMonth) {
      setShowMonth(true);
    }
  }, [month, lastDateMonth]);

  const [showYear, setShowYear] = useState(false);

  useEffect(() => {
    if (year === lastDateYear) {
      setShowYear(true);
    }
  }, [year, lastDateYear]);

  // clean up
  React.useEffect(
    () => () => {
      dispatch(clearTimesheet());
    },
    [dispatch]
  );

  return (
    <div className={styles.container}>
      <div className={styles.totalHoursContainer}>
        <div className={styles.calendar}>
          <div className={styles.calendarSquareLeft}></div>
          <div className={styles.calendarSquareRight}></div>
          <section className={styles.calendarHeader}></section>
          <section className={styles.calendarDate}>{dayOfMonth}</section>
        </div>

        <div className={styles.currentDayContainer}>
          <p>{dayNames[dayOfWeek]}</p>
          <p>
            {monthNames[now.getMonth()]} {dayOfMonth}, {now.getFullYear()}
          </p>

          <div className={styles.weekHoursContainer}>
            <p className={styles.weekLabel}>
              Week of {month} {weekStart}
              {`${showYear ? '' : ', ' + year}`} to {`${showMonth ? '' : lastDateMonth}`} {lastDate.getDate()}
              , {lastDateYear}
            </p>
            <p>Total Hours: {formatMs(getTotalWeekHours(hours))}</p>
          </div>
        </div>
      </div>

      <DynamicTimesheet selectedWeek={getCurrentMonday()} />
    </div>
  );
};

export default Timesheet;
