import React from 'react';
import {NavLink, useMatch, useResolvedPath} from 'react-router-dom';

import Tooltip from '@components/Tooltip';
import {useAppSelector} from '@hooks';
import {selectTimesheets} from '@selectors/timesheet';
import combineClasses from '@t1cg/combine-classes';
import formatDate from '@util/formatDate';

import styles from './Tab.module.scss';

export interface IProps {
  to: string;
  label: string;
}

const Tab = ({to, label}: IProps) => {
  const rejectedTimesheets = useAppSelector(selectTimesheets);

  const {pathname: path} = useResolvedPath(to);
  const match = useMatch({path});

  const rejectedDates = rejectedTimesheets.map((i) => formatDate(i.weekOf));

  return (
    <NavLink to={to} className={styles.navLink}>
      <Tooltip
        content={
          <>
            Timesheet for <b> {rejectedDates?.join(', ')} </b> has been rejected
          </>
        }
        position={'bottom'}
        disabled={label !== 'Select Week' || rejectedTimesheets.length === 0}
        gap={5}>
        <button
          className={combineClasses(styles.navButton, {
            [styles.active]: !!match,
          })}>
          {label}
          {label === 'Select Week' && rejectedTimesheets.length > 0 && (
            <>
              <i className={combineClasses('fas fa-exclamation-circle fa-sm', styles.warningSign)}></i>
            </>
          )}
        </button>
      </Tooltip>
    </NavLink>
  );
};
export default Tab;
