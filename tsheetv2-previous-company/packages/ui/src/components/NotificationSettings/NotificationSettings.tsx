import moment from 'moment';
import React, {useEffect, useRef} from 'react';

import {cancelNotification, updateNotificationSettings} from '@actions/auth';
import TimeDropdown from '@components/TimeDropdown';
import Toggle from '@components/Toggle';
import {useAppDispatch, useAppSelector} from '@hooks';
import {selectPermissions, selectUser} from '@selectors/auth';
import checkPermission from '@util/checkPermission';

import styles from './NotificationSettings.module.scss';

const NotificationSettings = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectUser);
  const permissions = useAppSelector(selectPermissions);

  const editor = checkPermission(['READ_REVIEW', 'WRITE_REVIEW'], permissions);

  const {
    notifications: {email, slack},
  } = currentUser;

  const emailAddress = currentUser.email;

  const convertTimeString = (time: Schemas.NotificationTime, type: string) => {
    const timeString = time.hour + ':' + time.minute + ' ' + time.period;

    const convertedTimeString =
      type === '12Hour'
        ? moment(timeString, ['HH:mm']).format('hh:mm')
        : moment(timeString, ['h:mm A']).format('HH:mm');

    return {
      hour: convertedTimeString.split(':')[0],
      minute: convertedTimeString.split(':')[1],
      period: time.period,
    };
  };

  const slackNotificationTimeRef = useRef(
    convertTimeString(
      {
        hour: slack.submission.time.hour,
        minute: slack.submission.time.minute,
        period: slack.submission.time.period,
      },
      '12Hour'
    ) ?? convertTimeString({hour: '5', minute: '00', period: 'PM'}, '12Hour')
  );

  const emailNotificationTimeRef = useRef(
    convertTimeString(
      {
        hour: email.submission.time.hour,
        minute: email.submission.time.minute,
        period: email.submission.time.period,
      },
      '12Hour'
    ) ?? convertTimeString({hour: '5', minute: '00', period: 'PM'}, '12Hour')
  );

  const handleSlackSubmissionReminder = (hour: string, minute: string, period: string) => {
    slackNotificationTimeRef.current = {...slackNotificationTimeRef.current, hour, minute, period};

    const convertedTime = convertTimeString(
      {
        hour: slackNotificationTimeRef.current.hour,
        minute: slackNotificationTimeRef.current.minute,
        period: slackNotificationTimeRef.current.period,
      },
      '24Hour'
    );

    if (convertedTime.hour && convertedTime.minute && convertedTime.period && emailAddress) {
      dispatch(
        updateNotificationSettings({
          notifications: {
            slack: {
              ...slack,
              submission: {
                ...slack.submission,
                time: convertedTime,
              },
            },
            email,
          },
          email: emailAddress,
          set: true,
        })
      );
    }
  };

  const handleEmailSubmissionReminder = (hour: string, minute: string, period: string) => {
    emailNotificationTimeRef.current = {...emailNotificationTimeRef.current, hour, minute, period};
    const convertedTime = convertTimeString(
      {
        hour: emailNotificationTimeRef.current.hour,
        minute: emailNotificationTimeRef.current.minute,
        period: emailNotificationTimeRef.current.period,
      },
      '24Hour'
    );

    if (convertedTime.hour && convertedTime.minute && convertedTime.period) {
      dispatch(
        updateNotificationSettings({
          notifications: {
            email: {
              ...email,
              submission: {
                ...email.submission,
                time: convertedTime,
              },
            },
            slack,
          },
          email: emailAddress,
          set: true,
        })
      );
    }
  };

  useEffect(() => {
    if (slack.submission && slack.submission.on === false) {
      dispatch(cancelNotification(`${currentUser._id}-daily-submission-reminder-slack`));
    }
    if (email.submission && email.submission.on === false) {
      dispatch(cancelNotification(`${currentUser._id}-daily-submission-reminder-email`));
    }
  }, [slack.submission, currentUser._id, dispatch, email.submission]);

  return (
    <div className={styles.container}>
      <div className={styles.header1}>Emails</div>
      <div>
        <div className={styles.content}>
          Submission Reminders{' '}
          <Toggle
            isToggled={email.submission.on}
            onToggle={() =>
              dispatch(
                updateNotificationSettings({
                  notifications: {
                    email: {
                      ...email,
                      submission: {
                        ...email.submission,
                        on: !email.submission.on,
                      },
                    },
                    slack,
                  },
                  email: emailAddress,
                })
              )
            }
          />
        </div>
        {email.submission.on && (
          <TimeDropdown
            notificationTime={emailNotificationTimeRef.current}
            updateTime={handleEmailSubmissionReminder}
          />
        )}
      </div>
      {editor && (
        <div className={styles.content}>
          Approval Reminders{' '}
          <Toggle
            isToggled={email.approvalReminder}
            onToggle={() =>
              dispatch(
                updateNotificationSettings({
                  notifications: {
                    email: {...email, approvalReminder: !email.approvalReminder},
                    slack,
                  },
                })
              )
            }
          />
        </div>
      )}
      <div className={styles.content}>
        Timesheet Approvals{' '}
        <Toggle
          isToggled={email.approval}
          onToggle={() =>
            dispatch(
              updateNotificationSettings({
                notifications: {
                  email: {...email, approval: !email.approval},
                  slack,
                },
              })
            )
          }
        />
      </div>
      <div className={styles.content}>
        Timesheet Rejections{' '}
        <Toggle
          isToggled={email.rejection}
          onToggle={() =>
            dispatch(
              updateNotificationSettings({
                notifications: {
                  email: {...email, rejection: !email.rejection},
                  slack,
                },
              })
            )
          }
        />
      </div>
      {editor && (
        <div className={styles.content}>
          Timesheet Resubmission{' '}
          <Toggle
            isToggled={email.resubmission}
            onToggle={() =>
              dispatch(
                updateNotificationSettings({
                  notifications: {
                    email: {...email, resubmission: !email.resubmission},
                    slack,
                  },
                })
              )
            }
          />
        </div>
      )}
      <div className={styles.content}>
        Timesheet Comments{' '}
        <Toggle
          isToggled={email.comment}
          onToggle={() =>
            dispatch(
              updateNotificationSettings({
                notifications: {
                  email: {...email, comment: !email.comment},
                  slack,
                },
              })
            )
          }
        />
      </div>

      <div className={styles.header2}>Slack</div>

      <div>
        <div className={styles.content}>
          Submission Reminders{' '}
          <Toggle
            isToggled={slack.submission.on}
            onToggle={() =>
              dispatch(
                updateNotificationSettings({
                  notifications: {
                    slack: {
                      ...slack,
                      submission: {
                        ...slack.submission,
                        on: !slack.submission.on,
                      },
                    },
                    email,
                  },
                  email: emailAddress,
                })
              )
            }
          />
        </div>
        {slack.submission.on && (
          <TimeDropdown
            notificationTime={slackNotificationTimeRef.current}
            updateTime={handleSlackSubmissionReminder}
          />
        )}
      </div>
      {editor && (
        <div className={styles.content}>
          Approval Reminders{' '}
          <Toggle
            isToggled={slack.approvalReminder}
            onToggle={() =>
              dispatch(
                updateNotificationSettings({
                  notifications: {
                    slack: {...slack, approvalReminder: !slack.approvalReminder},
                    email,
                  },
                })
              )
            }
          />
        </div>
      )}
      <div className={styles.content}>
        Timesheet Approvals{' '}
        <Toggle
          isToggled={slack.approval}
          onToggle={() =>
            dispatch(
              updateNotificationSettings({
                notifications: {
                  slack: {...slack, approval: !slack.approval},
                  email,
                },
              })
            )
          }
        />
      </div>
      <div className={styles.content}>
        Timesheet Rejections{' '}
        <Toggle
          isToggled={slack.rejection}
          onToggle={() =>
            dispatch(
              updateNotificationSettings({
                notifications: {
                  slack: {...slack, rejection: !slack.rejection},
                  email,
                },
              })
            )
          }
        />
      </div>
      {editor && (
        <div className={styles.content}>
          Timesheet Resubmission{' '}
          <Toggle
            isToggled={slack.resubmission}
            onToggle={() =>
              dispatch(
                updateNotificationSettings({
                  notifications: {
                    slack: {...slack, resubmission: !slack.resubmission},
                    email,
                  },
                })
              )
            }
          />
        </div>
      )}
      <div className={styles.content}>
        Timesheet Comments{' '}
        <Toggle
          isToggled={slack.comment}
          onToggle={() =>
            dispatch(
              updateNotificationSettings({
                notifications: {
                  slack: {...slack, comment: !slack.comment},
                  email,
                },
              })
            )
          }
        />
      </div>
    </div>
  );
};

export default NotificationSettings;
