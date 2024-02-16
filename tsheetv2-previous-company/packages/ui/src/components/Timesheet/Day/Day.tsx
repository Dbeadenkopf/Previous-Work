import React, {ChangeEvent, useEffect, useState} from 'react';

import {addSlot, removeSlot, submitDay, updateNote} from '@actions/timesheet';
import Button from '@components/Button/index';
import InputField from '@components/InputField';
import Modal from '@components/Modal';
import Tooltip from '@components/Tooltip';
import {useAppDispatch, useAppSelector} from '@hooks';
import {selectProjects} from '@selectors/framework';
import {selectSaveTimesheetRequest, selectSelected} from '@selectors/timesheet';
import combineClasses from '@t1cg/combine-classes';
import formatMs from '@util/formatMs';
import {getTotalDayHours} from '@util/getTotalHours';
import validateTimeslots from '@util/validateTimeslots';

import Timeslot from './Timeslot';

import styles from './Day.module.scss';

interface Props {
  dayOfWeek: Date;
  collapseDays: boolean;
  showProjects: boolean;
}

const Day = (props: Props) => {
  const {dayOfWeek, collapseDays, showProjects} = props;

  const [showNote, setShowNote] = useState(false);

  const dispatch = useAppDispatch();
  const {time: times, weekOf} = useAppSelector(selectSelected);
  const saveTimesheetRequest = useAppSelector(selectSaveTimesheetRequest);

  const [dayTotal, setDayTotal] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [checked, setChecked] = useState(false);
  const [saved, setSaved] = useState(false);

  const dayAbbreviation = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][
    dayOfWeek.getDay()
  ] as keyof Schemas.Time;

  const day = times[dayAbbreviation];
  const dayHrs = day.hours;

  const projects = useAppSelector(selectProjects);

  const [timeError, setTimeError] = useState(validateTimeslots(dayHrs, projects));

  const dayNames: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const today: Date = new Date();
  const todayDate: number = today.getDay();
  const givenDate: number = dayOfWeek.getDay();

  const local24HourDaySubmittedTime =
    day.submitted &&
    new Date(day.submitted.date)
      .toLocaleString('sv', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      .replace(' ', 'T');

  useEffect(() => {
    const lastSlotKey = dayHrs.length - 1;
    const lastSlot = dayHrs[lastSlotKey];
    const empty = lastSlot?.start === '' && lastSlot?.end === '' && lastSlot?.project.label === '';
    const filled = lastSlot?.start !== '' && lastSlot?.end !== '' && lastSlot?.project.label !== '';
    const holiday = lastSlot?.project.label === 'Federal Holiday';

    if (empty && ((timeError && lastSlotKey) || day.submitted)) {
      dispatch(removeSlot({dayOfWeek: dayAbbreviation}));
    }

    if (filled && !timeError && !day.submitted && !holiday) {
      dispatch(
        addSlot({
          dayOfWeek: dayAbbreviation,
        })
      );
    }

    setTimeError(validateTimeslots(dayHrs, projects));
    setDayTotal(formatMs(getTotalDayHours(day)));
  }, [dayAbbreviation, timeError, times, dispatch, dayHrs, projects, day.submitted, day]);

  useEffect(() => {
    setSaved(false);
  }, [times]);

  useEffect(() => {
    if (saveTimesheetRequest.success) {
      setSaved(true);
    }
  }, [saveTimesheetRequest.success]);

  useEffect(() => {
    if (!collapseDays) {
      setShowMenu(todayDate === givenDate);
    } else {
      setShowMenu(false);
    }
  }, [givenDate, todayDate, weekOf, collapseDays]);

  useEffect(() => {
    if (!showModal) {
      setChecked(false);
    }
  }, [showModal]);

  return (
    <>
      <div className={styles.dayContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.daySquare}>{dayOfWeek.getDate()}</div>
          <div className={styles.dateAndHoursContainer}>
            <div className={styles.date}>
              <span className={styles.dayOfWeek}>{dayNames[dayOfWeek.getDay()]}</span>
              <div className={styles.yearMonth}>
                {monthNames[dayOfWeek.getMonth()].slice(0, 3) + ' ' + dayOfWeek.getFullYear()}
              </div>
            </div>
            <div className={styles.hours}>
              {dayTotal} Hours <br />
              {local24HourDaySubmittedTime ? (
                local24HourDaySubmittedTime <
                new Date(new Date(dayOfWeek).setUTCHours(23, 59, 59, 999)).toISOString() ? (
                  <span className={combineClasses(styles.submittedStatus, styles.submitted)}>Submitted</span>
                ) : (
                  <span className={combineClasses(styles.submittedStatus, styles.submittedLate)}>
                    Submitted Late
                  </span>
                )
              ) : (
                !['sun', 'sat'].includes(dayAbbreviation) && (
                  <span className={combineClasses(styles.submittedStatus, styles.unsubmitted)}>
                    Unsubmitted
                  </span>
                )
              )}
            </div>
          </div>
          <div
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            className={styles.expandCollapse}>
            {`${showMenu ? '━' : '╋'}`}
          </div>
        </div>
        <div style={{display: showMenu ? 'block' : 'none'}}>
          {times[dayAbbreviation].hours.map((slot, i) => (
            <div
              className={combineClasses(styles.timeDetailsInputContainer, {
                [styles.slotDivider]: i > 0,
              })}
              key={i}>
              <Timeslot
                slotNumber={i}
                startDate={new Date(slot.start)}
                endDate={new Date(slot.end)}
                dayOfWeek={dayOfWeek}
                showProjects={showProjects}
              />
            </div>
          ))}
          <div style={{display: !day.submitted || day.note ? 'block' : 'none'}}>
            <div className={styles.noteContainer}>
              <span className={styles.expandCollapseNote} onClick={() => setShowNote(!showNote)}>
                <span>{!showNote ? '\u002b' : '\u2212'}&nbsp;</span>
                <span style={{textDecoration: 'underline'}}>
                  {`${!day.submitted ? 'Leave' : 'Read'}`} Note
                </span>
              </span>
              {showNote && (
                <div className={styles.inputFieldFlexContainer}>
                  <div className={styles.inputFieldContainer}>
                    <InputField
                      maxLength={280}
                      defaultValue={day.note}
                      multi={true}
                      rows={3}
                      placeholder="Your note..."
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        dispatch(updateNote({dayOfWeek: dayAbbreviation, note: e.target.value}))
                      }
                      disabled={!!day.submitted}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{display: !day.submitted ? 'block' : 'none'}}>
            <div className={styles.submitButtonContainer}>
              <Tooltip
                disabled={!timeError && saved}
                content={timeError || (saved ? '' : 'Timesheet must be saved before submitting')}>
                <span>
                  <Button
                    onClick={() => setShowModal(!showModal)}
                    className={styles.button}
                    disabled={!!timeError || !saved}>
                    Submit Timesheet
                  </Button>
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          close={() => {
            setShowModal(!showModal);
          }}>
          <p>
            <input
              className={styles.modalCheckbox}
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />{' '}
            I hereby attest that this information is true, accurate, and complete to the best of my knowledge.
          </p>
          <hr />
          <p className={styles.modalWarning}>This action cannot be undone!</p>
          <span className={styles.modalBtnContainer}>
            <Button
              onClick={() => {
                dispatch(submitDay({day: dayAbbreviation}));
                setShowModal(!showModal);
              }}
              disabled={!checked}>
              Yes
            </Button>
            <Button
              color="primary"
              onClick={() => {
                setShowModal(!showModal);
              }}>
              No
            </Button>
          </span>
        </Modal>
      )}
    </>
  );
};

export default Day;
