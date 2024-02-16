import React from 'react';

import styles from './PageNotFound.module.scss';

const PageNotFound = () => (
  <div className={styles.errContainer}>
    <div className={styles.frown}>&#9785;</div>
    <h1 className={styles.statusCode}>404</h1>
    <br />
    <h2>Page not found.</h2>
    <p>The page you are looking for does not exist.</p>
  </div>
);
export default PageNotFound;
