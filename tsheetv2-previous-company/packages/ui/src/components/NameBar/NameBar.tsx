import React, {useRef, useState} from 'react';

import {logout} from '@actions/auth';
import Initials from '@components/Initials';
import NotificationSettings from '@components/NotificationSettings';
import {useAppDispatch, useAppSelector} from '@hooks';
import {selectUser} from '@selectors/auth';

import styles from './NameBar.module.scss';

const NameBar = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectUser);

  const {firstName, lastName, email, title, supervisor} = currentUser;

  const [showNameCard, setShowNameCard] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const nameMenuRef = useRef<HTMLDivElement>(null);
  const hiNameRef = useRef<HTMLDivElement>(null);

  const closeMenu = (e: MouseEvent) => {
    if (
      nameMenuRef.current &&
      showNameCard == true &&
      !hiNameRef.current?.contains(e.target as Node) &&
      !nameMenuRef.current.contains(e.target as Node)
    ) {
      setShowNameCard(false);
      setShowNotifications(false);
    }
  };

  document.addEventListener('mousedown', closeMenu);

  return (
    <div className={styles.nameBar}>
      <div className={styles.nameBarFixedContainer}>
        <table className={styles.greeting}>
          <tbody>
            <tr>
              <td className={styles.padding}></td>
              <td className={styles.nameCircleSmallTd}>
                <div className={styles.nameCircleSmall}>
                  <Initials
                    firstName={firstName}
                    lastName={lastName}
                    bgColor="Primary"
                    borderColor="Primary"
                    size="Medium"></Initials>
                </div>
              </td>
              <td className={styles.hiNameTd}>
                <div
                  ref={hiNameRef}
                  className={styles.hiName}
                  onClick={() => {
                    setShowNameCard(!showNameCard);
                  }}>
                  Hi, {firstName}&nbsp;{!showNameCard ? '▶' : '▼'}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div ref={nameMenuRef} className={showNameCard ? styles.nameCard : styles.hideNameCard}>
          <div className={styles.nameCircleBig}>
            <Initials
              firstName={firstName}
              lastName={lastName}
              bgColor="Primary"
              borderColor="Primary"></Initials>
          </div>
          <div className={styles.nameCardName}>
            {firstName} {lastName}
          </div>
          <div className={styles.nameCardEmail}>{email}</div>
          <div className={styles.nameCardTitle}>{title}</div>
          <div className={styles.nameCardSupervisor}>
            Supervisor: {supervisor.firstName}&nbsp;{supervisor.lastName}
          </div>

          <div
            className={styles.nameCardNotification}
            onClick={() => {
              setShowNotifications(!showNotifications);
            }}>
            <i className="fa fa-bell"></i>&nbsp;Manage Notifications&nbsp;{!showNotifications ? '▶' : '▼'}
          </div>

          {showNotifications && (
            <div className={styles.settingsMenu}>
              <NotificationSettings />
            </div>
          )}

          <div className={styles.nameCardLogout} onClick={() => dispatch(logout())}>
            <i id={styles.logoutSymbol} className="fa-solid fa-arrow-right-from-bracket"></i>
            {' Logout'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameBar;
