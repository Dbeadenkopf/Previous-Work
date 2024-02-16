import React from 'react';

import combineClasses from '@t1cg/combine-classes';
import filterSlots from '@util/filterSlots';
import formatMs from '@util/formatMs';
import {getTotalWeekHours} from '@util/getTotalHours';

import Row from './Row';

import styles from './StaticTimesheet.module.scss';

interface IProps {
  timesheet: Schemas.Timesheet;
}

const StaticTimesheet = ({timesheet}: IProps) => {
  const ts = filterSlots(timesheet, ['Break']);

  return (
    <div className={styles.staticTimesheetContainer}>
      <div
        className={combineClasses(
          styles.staticTimesheetTableHeader,
          styles.staticTimesheetEntry,
          styles.staticTimesheetDay
        )}>
        <div>{/* Intentionally Blank */}</div>
        <div className={styles.staticTimesheetHeading}>Start</div>
        <div className={styles.staticTimesheetHeading}>End</div>
        <div className={styles.staticTimesheetHeading}>Hours</div>
        <div className={styles.staticTimesheetHeading}>Project</div>
        <div className={styles.staticTimesheetHeading}>Sub-Project</div>
        <div className={styles.staticTimesheetHeading}>Ticket</div>
      </div>
      {Row(ts.time.mon, 'Mon')}
      {Row(ts.time.tue, 'Tue')}
      {Row(ts.time.wed, 'Wed')}
      {Row(ts.time.thu, 'Thu')}
      {Row(ts.time.fri, 'Fri')}
      {Row(ts.time.sat, 'Sat')}
      {Row(ts.time.sun, 'Sun')}

      {getWeeklyProjectIDs(ts.time).map((pid) => (
        <div key={pid}>
          {pid}: {formatMs(getTotalWeekHours(ts.time, pid))}
        </div>
      ))}
      <p>TOTAL: {formatMs(getTotalWeekHours(ts.time))}</p>

      <p>Tickets: {getWeeklyTickets(ts.time).join(', ')}</p>
    </div>
  );
};

const days: (keyof Schemas.Time)[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

function getWeeklyProjectIDs(week: Schemas.Time) {
  const projectLabels: string[] = [];

  days.forEach((d) => {
    week[d].hours.forEach((h) => {
      if (!projectLabels.includes(h.project.label)) {
        projectLabels.push(h.project.label);
      }
    });
  });

  return projectLabels;
}

function getWeeklyTickets(week: Schemas.Time) {
  const tickets: string[] = [];

  days.forEach((d) => {
    week[d].hours.forEach((h) => {
      if (!tickets.includes(h.ticket)) {
        tickets.push(h.ticket);
      }
    });
  });

  return tickets;
}

export default StaticTimesheet;
