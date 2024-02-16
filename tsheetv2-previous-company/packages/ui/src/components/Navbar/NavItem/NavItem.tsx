import React from 'react';
import {NavLink, useMatch, useResolvedPath} from 'react-router-dom';

import combineClasses from '@t1cg/combine-classes';

import styles from './NavItem.module.scss';

interface IProps {
  to: string;
  fa: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const NavItem = ({to, fa, label, onClick}: IProps) => {
  const {pathname: path} = useResolvedPath(to.split('/')[0]);
  const match = useMatch({path, end: false});

  return (
    <NavLink to={to} className={styles.navLink} onClick={onClick}>
      <div className={styles.navLinkContainer}>
        <i className={fa} />
        <p className={combineClasses({[styles.active]: !!match})}>{label}</p>
        <i
          className={combineClasses('fa fa-minus', styles.indicator)}
          style={{visibility: match ? 'visible' : 'hidden'}}
        />
      </div>
    </NavLink>
  );
};

export default NavItem;
