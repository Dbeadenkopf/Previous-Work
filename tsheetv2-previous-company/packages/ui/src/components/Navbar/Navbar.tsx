import React from 'react';
import {Link} from 'react-router-dom';

import {ReactComponent as T1CgLogoBlue} from '@assets/svg/t1cg_logo_blue.svg';
import {ReactComponent as T1CgLogoWhite} from '@assets/svg/t1cg_logo_white.svg';
import combineClasses from '@t1cg/combine-classes';

import NavItem from './NavItem';

import styles from './Navbar.module.scss';

interface IProps {
  showTimesheet: boolean;
  showApprovals: boolean;
  showFramework: boolean;
  showReports: boolean;
}

const Navbar: React.FC<IProps> = ({showTimesheet, showApprovals, showFramework, showReports, children}) => {
  const [hamburgerActive, setHamburgerActive] = React.useState(false);

  const showNavbar =
    [showTimesheet, showApprovals, showFramework, showReports].filter((tab) => tab).length >= 2;

  return (
    <div className={styles.navContainer}>
      <div
        className={combineClasses(styles.topNav, {
          [styles.topNavActive]: hamburgerActive,
        })}>
        {!hamburgerActive && (
          <div className={styles.mobileLogoContainer}>
            <Link to="/timesheet">
              <T1CgLogoBlue className={styles.mobileLogo} />
            </Link>
          </div>
        )}
        {!hamburgerActive && showNavbar && (
          <i
            className={combineClasses('fas fa-bars', styles.hamburger)}
            onClick={() => {
              setHamburgerActive(!hamburgerActive);
            }}
          />
        )}
      </div>

      {showNavbar && (
        <div
          className={combineClasses(styles.navbar, {
            [combineClasses(styles.collapseMenu)]: !hamburgerActive,
            [combineClasses(styles.openMenu)]: hamburgerActive,
          })}>
          <i
            className={combineClasses('fas fa-times', styles.closeNav, {
              [styles.collapseNav]: !hamburgerActive,
            })}
            style={{visibility: hamburgerActive ? 'visible' : 'hidden'}}
            onClick={() => {
              setHamburgerActive(!hamburgerActive);
            }}
          />
          <div className={styles.logoContainer}>
            <Link to="/timesheet">
              <T1CgLogoWhite className={styles.logo} />
            </Link>
          </div>
          <div className={styles.navItems}>
            {showTimesheet && (
              <NavItem
                to="timesheet"
                label="Timesheet"
                fa="fa fa-list-alt fa-lg fa-fw"
                onClick={() => {
                  setHamburgerActive(false);
                }}
              />
            )}
            {showApprovals && (
              <NavItem
                to="approvals"
                label="Approvals"
                fa="fas fa-file-circle-check fa-lg fa-fw"
                onClick={() => {
                  setHamburgerActive(false);
                }}
              />
            )}
            {showFramework && (
              <NavItem
                to="framework"
                label="Framework"
                fa="fa fa-sitemap fa-lg fa-fw"
                onClick={() => {
                  setHamburgerActive(false);
                }}
              />
            )}
            {showReports && (
              <NavItem
                to="reports"
                label="Reports"
                fa="fas fa-chart-bar fa-lg fa-fw"
                onClick={() => {
                  setHamburgerActive(false);
                }}
              />
            )}
          </div>
        </div>
      )}

      <div className={styles.navContent}>
        {!showNavbar && (
          <div className={styles.employeeMobileLogoContainer}>
            <Link to="/timesheet">
              <T1CgLogoBlue className={styles.mobileLogo} />
            </Link>
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Navbar;
