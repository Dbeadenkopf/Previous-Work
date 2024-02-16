import {produce} from 'immer';

import {store} from '../store';

import * as selectors from './timesheet';

describe('Timesheet selectors', () => {
  it('Should return the time of the selected timesheet', () => {
    const state = produce(store.getState(), (draft) => {
      draft.timesheet.selected.time.fri.note = 'test';
    });
    expect(selectors.selectTime(state)).toEqual(state.timesheet.selected.time);
  });

  it('Should return the data of the selected timesheet', () => {
    const state = produce(store.getState(), (draft) => {
      draft.timesheet.selected._id = 'test';
    });
    expect(selectors.selectSelected(state)).toEqual(state.timesheet.selected);
  });

  it('Should return the getTimesheetRequest status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.timesheet.getTimesheetRequest.error = 'test';
    });
    expect(selectors.selectGetTimesheetRequest(state)).toEqual(state.timesheet.getTimesheetRequest);
  });

  it('Should return the saveTimesheetRequest status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.timesheet.saveTimesheetRequest.error = 'test';
    });
    expect(selectors.selectSaveTimesheetRequest(state)).toEqual(state.timesheet.saveTimesheetRequest);
  });

  it('Should return the tickets data', () => {
    const state = produce(store.getState(), (draft) => {
      draft.timesheet.tickets = ['ISP-123'];
    });
    expect(selectors.selectTickets(state)).toEqual(state.timesheet.tickets);
  });

  it('Should return the getTicketRequest', () => {
    const state = produce(store.getState(), (draft) => {
      draft.timesheet.getTicketsRequest.error = 'test';
    });
    expect(selectors.selectGetTicketsRequest(state)).toEqual(state.timesheet.getTicketsRequest);
  });

  it('Should return update submission status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.timesheet.resubmitTimesheetRequest.error = 'test';
    });
    expect(selectors.selectResubmitTimesheetRequest(state)).toEqual(state.timesheet.resubmitTimesheetRequest);
  });

  it('should return the data of the timesheets', () => {
    const state = produce(store.getState(), (draft) => {
      draft.timesheet.rejectedTimesheets = [{} as Schemas.Timesheet];
    });

    expect(selectors.selectTimesheets(state)).toEqual(state.timesheet.rejectedTimesheets);
  });

  it('should reutrn the getRejectedTimesheets status', () => {
    const state = produce(store.getState(), (draft) => {
      draft.timesheet.getRejectedTimesheetsRequest.error = 'test';
    });
    expect(selectors.selectGetRejectedTimesheetsRequest(state)).toEqual(
      state.timesheet.getRejectedTimesheetsRequest
    );
  });

  it('Should return timeslotProject', () => {
    const state = produce(store.getState(), (draft) => {
      draft.timesheet.timeslotProject = {dayOfWeek: 'mon', slotNumber: 0};
    });
    expect(selectors.selectTimeslotProject(state)).toEqual(state.timesheet.timeslotProject);
  });
});
