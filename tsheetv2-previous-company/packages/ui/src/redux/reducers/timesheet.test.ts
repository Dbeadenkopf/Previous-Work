import {produce} from 'immer';

import * as actions from '@actions/timesheet';

import reducer, {initialState} from './timesheet';

describe('Timesheet reducer', () => {
  const error = 'test';

  it('Should properly handle updateTime action', () => {
    const dateAndTime = new Date().toISOString();
    const dayOfWeek = 'mon';
    const whichTime = 'start';
    const slotNumber = 0;

    const expectedState = produce(initialState, (draft) => {
      draft.selected.time[dayOfWeek].hours[slotNumber][whichTime] = dateAndTime;
    });

    const nextState = reducer(
      initialState,
      actions.updateTime({dateAndTime, dayOfWeek, whichTime, slotNumber})
    );
    expect(nextState).toEqual(expectedState);
  });

  it('Should properly handle updateNote action', () => {
    const note = 'Lunch was delicious';
    const dayOfWeek = 'mon';

    const expectedState = produce(initialState, (draft) => {
      draft.selected.time[dayOfWeek].note = note;
    });

    const nextState = reducer(initialState, actions.updateNote({note, dayOfWeek}));
    expect(nextState).toEqual(expectedState);
  });

  it('Should properly handle addSlot action', () => {
    const dayOfWeek = 'mon';
    const emptySlot = {
      end: '',
      project: {
        label: '',
      },
      start: '',
      ticket: '',
    };

    const expectedState = produce(initialState, (draft) => {
      draft.selected.time[dayOfWeek].hours.push(emptySlot);
    });

    const nextState = reducer(initialState, actions.addSlot({dayOfWeek}));

    expect(nextState).toEqual(expectedState);
  });

  it('Should properly handle removeSlot action', () => {
    const dayOfWeek = 'mon';

    const expectedState = produce(initialState, (draft) => {
      draft.selected.time[dayOfWeek].hours.pop();
    });

    const nextState = reducer(initialState, actions.removeSlot({dayOfWeek}));

    expect(nextState).toEqual(expectedState);
  });

  it('Should properly handle setProject action', () => {
    const project = {label: 'ISP'};
    const dayOfWeek = 'mon';
    const slotNumber = 0;

    const expectedState = produce(initialState, (draft) => {
      draft.timeslotProject = {dayOfWeek, slotNumber};
      draft.selected.time[dayOfWeek].hours[slotNumber].project = project;
    });

    const nextState = reducer(initialState, actions.setProject({project, dayOfWeek, slotNumber}));
    expect(nextState).toEqual(expectedState);
  });

  it('Should properly handle setSubProject action', () => {
    const subProject = {label: 'CDX'};
    const dayOfWeek = 'mon';
    const slotNumber = 0;

    const expectedState = produce(initialState, (draft) => {
      draft.selected.time[dayOfWeek].hours[slotNumber].project.subProject = subProject;
    });

    const nextState = reducer(initialState, actions.setSubProject({subProject, dayOfWeek, slotNumber}));
    expect(nextState).toEqual(expectedState);
  });

  it('Should properly handle setTicket action', () => {
    const ticket = 'ISP-111';
    const dayOfWeek = 'mon';
    const slotNumber = 0;

    const expectedState = produce(initialState, (draft) => {
      draft.selected.time[dayOfWeek].hours[slotNumber].ticket = ticket;
    });

    const nextState = reducer(initialState, actions.setTicket({ticket, dayOfWeek, slotNumber}));
    expect(nextState).toEqual(expectedState);
  });

  describe('getTimesheet', () => {
    const args = {createdBy: 'test', weekOf: 'test'};

    it('Should properly handle pending action', () => {
      const getTimesheetRequest = {...initialState.getTimesheetRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getTimesheetRequest = getTimesheetRequest;
      });

      const nextState = reducer(initialState, actions.getTimesheet.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const getTimesheetRequest = {...initialState.getTimesheetRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getTimesheetRequest = getTimesheetRequest;
      });

      const nextState = reducer(
        initialState,
        actions.getTimesheet.fulfilled(initialState.selected, '', args)
      );
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const getTimesheetRequest = {...initialState.getTimesheetRequest, error};

      const nextState = reducer(initialState, actions.getTimesheet.rejected(new Error(error), '', args));

      const expectedState = produce(initialState, (draft) => {
        draft.getTimesheetRequest = getTimesheetRequest;
        draft.selected.weekOf = args.weekOf;
      });

      expect(nextState).toEqual(expectedState);
    });
  });

  describe('saveTimesheet', () => {
    it('Should properly handle pending action', () => {
      const saveTimesheetRequest = {...initialState.saveTimesheetRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.saveTimesheetRequest = saveTimesheetRequest;
      });

      const nextState = reducer(initialState, actions.saveTimesheet.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const saveTimesheetRequest = {...initialState.saveTimesheetRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.saveTimesheetRequest = saveTimesheetRequest;
      });

      const nextState = reducer(
        initialState,
        actions.saveTimesheet.fulfilled(initialState.selected, '', true)
      );
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const saveTimesheetRequest = {...initialState.saveTimesheetRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.saveTimesheetRequest = saveTimesheetRequest;
      });

      const nextState = reducer(initialState, actions.saveTimesheet.rejected(new Error(error), '', true));
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('submitDay', () => {
    const args = {day: 'fri' as keyof Schemas.Time, userId: 'test'};

    it('Should properly handle pending action', () => {
      const submitDayRequest = {...initialState.submitDayRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.submitDayRequest = submitDayRequest;
      });

      const nextState = reducer(initialState, actions.submitDay.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const submitDayRequest = {...initialState.submitDayRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.submitDayRequest = submitDayRequest;
      });

      const nextState = reducer(initialState, actions.submitDay.fulfilled(initialState.selected, '', args));
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const submitDayRequest = {...initialState.submitDayRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.submitDayRequest = submitDayRequest;
      });

      const nextState = reducer(initialState, actions.submitDay.rejected(new Error(error), '', args));
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('getTickets', () => {
    it('Should properly handle pending action', () => {
      const getTicketsRequest = {...initialState.getTicketsRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getTicketsRequest = getTicketsRequest;
      });

      const nextState = reducer(initialState, actions.getTickets.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const getTicketsRequest = {...initialState.getTicketsRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getTicketsRequest = getTicketsRequest;
        draft.tickets = [];
      });

      const nextState = reducer(initialState, actions.getTickets.fulfilled(initialState.tickets, '', ''));
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const getTicketsRequest = {...initialState.getTicketsRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.getTicketsRequest = getTicketsRequest;
      });

      const nextState = reducer(initialState, actions.getTickets.rejected(new Error(error), '', ''));
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('getTimesheetById', () => {
    it('Should properly handle pending action', () => {
      const getTimesheetByIdRequest = {...initialState.getTimesheetByIdRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getTimesheetByIdRequest = getTimesheetByIdRequest;
      });

      const nextState = reducer(initialState, actions.getTimesheetById.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const getTimesheetByIdRequest = {...initialState.getTimesheetByIdRequest, success: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getTimesheetByIdRequest = getTimesheetByIdRequest;
      });

      const nextState = reducer(
        initialState,
        actions.getTimesheetById.fulfilled(initialState.selected, '', '')
      );
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle rejected action', () => {
      const getTimesheetByIdRequest = {...initialState.getTimesheetByIdRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.getTimesheetByIdRequest = getTimesheetByIdRequest;
      });

      const nextState = reducer(initialState, actions.getTimesheetById.rejected(new Error(error), '', ''));
      expect(nextState).toEqual(expectedState);
    });
  });
  describe('setTicketDescription', () => {
    it('Should properly handle setTicketDescription action', () => {
      const dayOfWeek = 'mon';
      const slotNumber = 0;
      const manualTicketInput = 'example description';

      const expectedState = produce(initialState, (draft) => {
        draft.selected.time[dayOfWeek].hours[slotNumber].manualTicketInput = manualTicketInput;
      });

      const nextState = reducer(
        initialState,
        actions.setManualTicketInput({manualTicketInput, dayOfWeek, slotNumber})
      );

      expect(nextState).toEqual(expectedState);
    });
  });

  describe('clear timesheet', () => {
    it('Should properly handle clear action', () => {
      const expectedState = produce(initialState, (draft) => {
        draft.selected = initialState.selected;
      });
      const nextState = reducer(initialState, actions.clearTimesheet());
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('resubmitTimesheet', () => {
    const args = {timesheetId: 'test', userId: 'test'};

    it('Should properly handle pending action', () => {
      const resubmitTimesheet = {...initialState.resubmitTimesheetRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.resubmitTimesheetRequest = resubmitTimesheet;
      });

      const nextState = reducer(initialState, actions.resubmitTimesheet.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('Should properly handle fulfilled action', () => {
      const resubmitTimesheet = {...initialState.resubmitTimesheetRequest, success: true};

      const expectedApprovedState = produce(initialState, (draft) => {
        draft.resubmitTimesheetRequest = resubmitTimesheet;
      });

      const nextApprovedState = reducer(
        initialState,
        actions.resubmitTimesheet.fulfilled(initialState.selected, '', args)
      );

      expect(nextApprovedState).toEqual(expectedApprovedState);
    });

    it('Should properly handle rejected action', () => {
      const resubmitTimesheet = {...initialState.resubmitTimesheetRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.resubmitTimesheetRequest = resubmitTimesheet;
      });

      const nextState = reducer(initialState, actions.resubmitTimesheet.rejected(new Error(error), '', args));
      expect(nextState).toEqual(expectedState);
    });
  });

  describe('getRejectedTimesheets', () => {
    const args = {createdBy: 'test'};

    it('should properly handle pending action', () => {
      const getRejectedTimesheets = {...initialState.getRejectedTimesheetsRequest, fetching: true};

      const expectedState = produce(initialState, (draft) => {
        draft.getRejectedTimesheetsRequest = getRejectedTimesheets;
      });

      const nextState = reducer(initialState, actions.getRejectedTimesheets.pending);
      expect(nextState).toEqual(expectedState);
    });

    it('should properly handle fulfilled action', () => {
      const getRejectedTimesheets = {...initialState.getRejectedTimesheetsRequest, success: true};

      const expectedApprovedState = produce(initialState, (draft) => {
        draft.getRejectedTimesheetsRequest = getRejectedTimesheets;
      });

      const nextApprovedState = reducer(
        initialState,
        actions.getRejectedTimesheets.fulfilled(initialState.rejectedTimesheets, '', args)
      );

      expect(nextApprovedState).toEqual(expectedApprovedState);
    });

    it('Should properly handle rejected action', () => {
      const getRejectedTimesheets = {...initialState.getRejectedTimesheetsRequest, error};

      const expectedState = produce(initialState, (draft) => {
        draft.getRejectedTimesheetsRequest = getRejectedTimesheets;
      });

      const nextState = reducer(
        initialState,
        actions.getRejectedTimesheets.rejected(new Error(error), '', args)
      );
      expect(nextState).toEqual(expectedState);
    });
  });
});
