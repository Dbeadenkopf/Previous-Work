import * as React from 'react';

import combineClasses from '@t1cg/combine-classes';
import formatMs from '@util/formatMs';
import formatTime from '@util/formatTime';
import getTimeDiff from '@util/getTimeDiff';

import styles from '../StaticTimesheet.module.scss';

import rowStyles from './Row.module.scss';

const Row = (day: Schemas.Day, label: string) => {
  if (day.hours.length === 0) {
    return (
      <div className={styles.staticTimesheetDay}>
        <RowData label={label} />
      </div>
    );
  }

  return (
    <div className={styles.staticTimesheetDay}>
      {day.hours
        .slice() // TODO: sort in API
        .sort((a, b) => (a.start < b.start ? -1 : 1))
        .map((h, i) => (
          <RowData
            key={h.start.toString()}
            label={i === 0 ? label : undefined}
            start={h.start.toString()}
            end={h.end.toString()}
            project={h.project.label}
            subProject={h.project.subProject?.label}
            ticket={h.ticket}
          />
        ))}
      {day.note && <div className={rowStyles.staticTimesheetNote}>Note: {day.note}</div>}
    </div>
  );
};

interface Props {
  label?: string;
  start?: string;
  end?: string;
  project?: string;
  subProject?: string;
  ticket?: string;
}

const RowData = ({label, start, end, project, subProject, ticket}: Props) => (
  <div className={styles.staticTimesheetEntry}>
    <div className={combineClasses(styles.staticTimesheetHeading, rowStyles.staticTimesheetBlockHeading)}>
      {label ? label + ':' : ''}
    </div>
    <div className={rowStyles.labeledBlock} data-label="Start:">
      {start ? formatTime(start) : '-------'}
    </div>
    <div className={rowStyles.labeledBlock} data-label="End:">
      {end ? formatTime(end) : '-------'}
    </div>
    <div className={rowStyles.labeledBlock} data-label="Hours:">
      {start && end ? formatMs(getTimeDiff(start, end)) : '0.00'}
    </div>
    <div className={rowStyles.labeledBlock} data-label="Project:">
      {project || 'N/A'}
    </div>
    <div className={rowStyles.labeledBlock} data-label="Sub-Project:">
      {subProject || 'N/A'}
    </div>
    <div className={rowStyles.labeledBlock} data-label="Sub-Project:">
      {ticket || 'N/A'}
    </div>
  </div>
);

export default Row;
