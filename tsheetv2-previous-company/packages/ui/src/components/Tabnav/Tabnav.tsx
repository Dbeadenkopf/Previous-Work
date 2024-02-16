import React from 'react';

import Tab, {IProps as ITab} from './Tab';

import styles from './Tabnav.module.scss';

const Tabnav = (tabs: ITab[], element: React.ReactElement) => (
  <>
    <div className={styles.tabNavContainer}>
      {tabs.length >= 2 && tabs.map(({to, label}, i) => <Tab key={i} to={to} label={label} />)}
    </div>
    <br />
    <div className={styles.content}>{element}</div>
  </>
);

export default Tabnav;
