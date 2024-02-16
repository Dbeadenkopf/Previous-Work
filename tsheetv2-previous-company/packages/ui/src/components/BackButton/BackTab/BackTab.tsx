import React from 'react';
import {NavLink, useMatch, useResolvedPath} from 'react-router-dom';

import combineClasses from '@t1cg/combine-classes';

import styles from './BackTab.module.scss';

export interface IProps {
  to: string;
  label?: string;
}

const Tab = ({to, label = '⬅'}: IProps) => {
  const {pathname: path} = useResolvedPath(to);
  const match = useMatch({path});

  return (
    <NavLink to={to} className={styles.navLink}>
      <button
        className={combineClasses(styles.navButton, {
          [styles.active]: !!match,
        })}>
        {label}
      </button>
    </NavLink>
  );
};

export default Tab;
