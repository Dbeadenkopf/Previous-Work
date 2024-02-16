import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';

import {
  getTickets,
  saveTimesheet,
  setManualTicketInput,
  setProject,
  setSubProject,
  setTicket,
  updateTime,
} from '@actions/timesheet';
import Dropdown from '@components/Dropdown';
import InputField from '@components/InputField';
import {useBlocker} from '@components/Timesheet/Day/Timeslot/useBlocker';
import {useAppDispatch, useAppSelector} from '@hooks';
import {selectProjects} from '@selectors/framework';
import {
  selectGetTicketsRequest,
  selectSaveTimesheetRequest,
  selectSelected,
  selectTickets,
  selectTimeslotProject,
} from '@selectors/timesheet';
import combineClasses from '@t1cg/combine-classes';
import formatMs from '@util/formatMs';
import getTimeDiff from '@util/getTimeDiff';
import {fillHoliday} from '@util/holiday';
import padTo2Digits from '@util/padTo2Digits';

import styles from './Timeslot.module.scss';

interface Props {
  slotNumber: number;
  startDate: Date;
  endDate: Date;
  dayOfWeek: Date;
  showProjects?: boolean;
}

const Timeslot = ({slotNumber, startDate, endDate, dayOfWeek, showProjects = true}: Props) => {
  const dispatch = useAppDispatch();

  let projects = useAppSelector(selectProjects);
  projects = [
    ...projects,
    {label: 'Break', name: 'Break'} as Schemas.Project,
    {label: 'PTO', name: 'PTO'} as Schemas.Project,
  ];
  const tickets = useAppSelector(selectTickets);
  const selected = useAppSelector(selectSelected);
  const getTicketsRequest = useAppSelector(selectGetTicketsRequest);
  const timeslotProject = useAppSelector(selectTimeslotProject);
  const saveTimesheetRequest = useAppSelector(selectSaveTimesheetRequest);

  const [totalHours, setTotalHours] = useState('');

  const rejected =
    selected.submitted && selected.rejected && selected.submitted.date < selected.rejected.date;

  const dayAbbreviation = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][
    dayOfWeek.getDay()
  ] as keyof Schemas.Time;

  const isProjectSlot =
    timeslotProject.dayOfWeek === dayAbbreviation && timeslotProject.slotNumber === slotNumber;

  const getSlotHours = useCallback((start: Date, end: Date) => {
    const startEndTotal = getTimeDiff(start, end);

    setTotalHours(!startEndTotal ? '00:00' : formatMs(startEndTotal));
  }, []);

  const formatValue = (initialDate: Date) =>
    isNaN(initialDate.getHours())
      ? ''
      : padTo2Digits(initialDate.getHours()) + ':' + padTo2Digits(initialDate.getMinutes());

  const formatAndUpdateTime = (timeString: string, whichTime: 'start' | 'end') => {
    const day: Date = dayOfWeek;
    let updatedDay = '';

    if (timeString) {
      const [hours, minutes] = timeString.split(':');
      day.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
      updatedDay = new Date(day).toISOString();
    }

    dispatch(
      updateTime({
        dateAndTime: updatedDay,
        dayOfWeek: dayAbbreviation,
        whichTime,
        slotNumber,
      })
    );
  };

  const {submitted, hours} = selected.time[dayAbbreviation];
  const {project, ticket, manualTicketInput} = hours[slotNumber];
  const selectedProject = projects.find((p) => p.label === project.label || p.name === project.label)?.label;
  const selectedSubProject = project.subProject?.label;
  const timeout = useRef(0);

  const projectOptions = projects.map((p) => ({id: p.label, name: p.name.length > 20 ? p.label : p.name}));

  const subProjectOptions =
    projects
      .find((p) => p.label === selectedProject)
      ?.subProjects?.map((sub) => ({id: sub.label, name: sub.label})) ?? [];

  const ticketOptions = tickets.reduce(
    (filtered, t) =>
      t.slice(0, selectedProject?.length) === selectedProject ? [...filtered, {id: t, name: t}] : filtered,
    [] as {
      id: string;
      name: string;
    }[]
  );

  // -- Automatically save Timesheet <start>
  const clearTimer = () => {
    clearTimeout(timeout.current);
    timeout.current = 0;
  };

  const autoSave = useCallback(() => {
    clearTimer();
    timeout.current = window.setTimeout(() => {
      dispatch(saveTimesheet(true));
    }, 60000);

    return () => {
      clearTimer();
    };
  }, [dispatch]);

  const saveChanges = useCallback(() => {
    if (timeout.current) {
      clearTimer();
      dispatch(saveTimesheet(false));
    }
  }, [dispatch]);

  // Saves changes before navigation
  useBlocker(saveChanges, !!timeout.current);

  useEffect(() => {
    window.addEventListener('beforeunload', saveChanges);
    return () => {
      window.removeEventListener('beforeunload', saveChanges);
    };
  }, [saveChanges]);

  useEffect(() => {
    if (saveTimesheetRequest.success) {
      clearTimer();
    }
  }, [saveTimesheetRequest.success, timeout]);
  // -- Automatically save Timesheet <end>

  useEffect(() => {
    getSlotHours(startDate, endDate);
  }, [getSlotHours, startDate, endDate]);

  useEffect(() => {
    if (
      selectedProject &&
      !['Break', 'PTO', 'Admin', 'Outing', 'ISP', 'AMS'].includes(selectedProject) &&
      (!submitted || rejected)
    ) {
      dispatch(getTickets(selectedProject));
    }
  }, [dispatch, rejected, selectedProject, submitted]);

  useEffect(() => {
    const holiday = fillHoliday(selected._id ? selected.weekOf : +selected.weekOf);
    if (holiday.day && selected.time[holiday.day].hours[0]?.project?.label === '') {
      dispatch(
        updateTime({
          dateAndTime: holiday.sd,
          dayOfWeek: holiday.day,
          whichTime: 'start',
          slotNumber: 0,
        })
      );
      dispatch(
        updateTime({
          dateAndTime: holiday.ed,
          dayOfWeek: holiday.day,
          whichTime: 'end',
          slotNumber: 0,
        })
      );
      dispatch(
        setProject({
          project: {label: 'Federal Holiday'},
          dayOfWeek: holiday.day,
          slotNumber: 0,
        })
      );
    }
  }, [dispatch, selected._id, selected.time, selected.weekOf, slotNumber]);

  return (
    <>
      <div className={styles.timeInputContainer}>
        <div className={styles.inputFieldContainer}>
          <InputField
            label="Start Time:"
            value={formatValue(startDate)}
            type="time"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              formatAndUpdateTime(e.target.value, 'start');
              autoSave();
            }}
            disabled={!!submitted && !rejected}
            flex={true}
            align="center"
            width="small"
            height="medium"
          />
          <InputField
            label="End Time:"
            value={formatValue(endDate)}
            type="time"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              formatAndUpdateTime(e.target.value, 'end');
              autoSave();
            }}
            disabled={!!submitted && !rejected}
            flex={true}
            align="center"
            width="small"
            height="medium"
          />
        </div>
        <span
          className={combineClasses(styles.totalHours, {
            [styles.negativeHours]: totalHours.includes('-'),
          })}>
          Total Hours: {totalHours}
        </span>
      </div>
      <div className={styles.detailsContainer}>
        <Dropdown
          label="Project:"
          options={showProjects || rejected ? projectOptions : [{id: 'PTO', name: 'PTO'}]}
          onChange={(e) => {
            dispatch(
              setProject({
                project: {label: (e.target as HTMLSelectElement).value},
                dayOfWeek: dayAbbreviation,
                slotNumber,
              })
            );
            autoSave();
          }}
          value={projectOptions.find((p) => p.id === selectedProject)?.name ?? ''}
          disabled={!!submitted && !rejected}
          flex={true}
          blank={true}
          align="center"
          width="small"
          height="medium"
        />
        <Dropdown
          label="Sub-Project:"
          options={subProjectOptions}
          onChange={(e) => {
            dispatch(
              setSubProject({
                subProject: {label: (e.target as HTMLSelectElement).value},
                dayOfWeek: dayAbbreviation,
                slotNumber,
              })
            );
            autoSave();
          }}
          value={selectedSubProject ?? ''}
          disabled={!subProjectOptions.length || (!!submitted && !rejected)}
          flex={true}
          blank={true}
          align="center"
          width="small"
          height="medium"
        />

        <Dropdown
          loading={getTicketsRequest.fetching && isProjectSlot}
          label="Ticket:"
          options={
            getTicketsRequest.fetching && isProjectSlot
              ? []
              : !submitted || rejected
              ? [...ticketOptions, {id: 'Other', name: 'Other'}]
              : [{id: ticket, name: ticket}]
          }
          onChange={(e) => {
            dispatch(
              setTicket({
                ticket: (e.target as HTMLSelectElement).value,
                dayOfWeek: dayAbbreviation,
                slotNumber,
              })
            );
            autoSave();
          }}
          value={ticket}
          disabled={
            !selectedProject ||
            ['Break', 'PTO', 'Outing'].includes(selectedProject) ||
            (!!submitted && !rejected) ||
            (getTicketsRequest.fetching && isProjectSlot)
          }
          flex={true}
          blank={true}
          align="center"
          width="small"
          height="medium"
        />
        {ticket === 'Other' && (
          <div className={styles.manualTicketInput}>
            <InputField
              maxLength={280}
              placeholder="Your description..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                dispatch(
                  setManualTicketInput({
                    dayOfWeek: dayAbbreviation,
                    slotNumber,
                    manualTicketInput: e.target.value,
                  })
                );
                autoSave();
              }}
              defaultValue={manualTicketInput ?? ''}
              disabled={!!submitted && !rejected}
              align="center"
              height="medium"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Timeslot;
