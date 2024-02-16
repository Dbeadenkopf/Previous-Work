import React, {useEffect, useState} from 'react';

import {resubmitTimesheet, saveTimesheet} from '@actions/timesheet';
import Button from '@components/Button';
import Modal from '@components/Modal';
import {useAppDispatch, useAppSelector} from '@hooks';
import {selectSelected} from '@selectors/timesheet';
import getWeek from '@util/getWeek';

import Day from './Day';

import styles from './Timesheet.module.scss';

interface IProps {
  selectedWeek: string;
  futureTimesheet?: boolean;
  rejectedTimesheet?: boolean;
}

const Timesheet = ({selectedWeek, futureTimesheet, rejectedTimesheet}: IProps) => {
  const dispatch = useAppDispatch();
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const timesheet = useAppSelector(selectSelected);

  useEffect(() => {
    if (!showModal) {
      setChecked(false);
    }
  }, [showModal]);

  return (
    <div className={styles.timesheet}>
      {getWeek(new Date(selectedWeek)).map((day, i) => (
        <Day
          key={i}
          dayOfWeek={day}
          collapseDays={futureTimesheet || rejectedTimesheet ? true : false}
          showProjects={futureTimesheet ? false : true}
        />
      ))}

      {rejectedTimesheet ? (
        <div className={styles.resubmitButtonContainer}>
          <div className={styles.buttons}>
            <Button
              className={styles.save}
              color="primary"
              onClick={() => {
                dispatch(saveTimesheet(true));
                setSaved(true);
              }}>
              Save Timesheet
            </Button>
            <Button
              className={styles.resubmit}
              color="success"
              disabled={!saved}
              onClick={() => setShowModal(!showModal)}>
              Resubmit Timesheet
            </Button>
          </div>
        </div>
      ) : (
        // cur and future timesheets
        <div className={styles.buttonContainer}>
          <Button className={styles.saveButton} color="primary" onClick={() => dispatch(saveTimesheet(true))}>
            Save Timesheet
          </Button>
        </div>
      )}

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
                dispatch(
                  resubmitTimesheet({
                    timesheetId: timesheet._id as string,
                  })
                );
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
    </div>
  );
};

export default Timesheet;
