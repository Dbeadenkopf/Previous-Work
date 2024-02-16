import * as actions from '@actions/timesheet';
import {createReducer} from '@reduxjs/toolkit';
import handleError from '@util/handleError';

interface State {
  selected: Schemas.Timesheet;
  rejectedTimesheets: Schemas.Timesheet[];
  tickets: string[];
  getTicketsRequest: RequestStatus;
  getTimesheetRequest: RequestStatus;
  getTimesheetByIdRequest: RequestStatus;
  saveTimesheetRequest: RequestStatus;
  submitDayRequest: RequestStatus;
  resubmitTimesheetRequest: RequestStatus;
  getRejectedTimesheetsRequest: RequestStatus;
  timeslotProject: {dayOfWeek: keyof Schemas.Time; slotNumber: number};
}

export const initialState: State = {
  selected: {
    comments: [],
    created: {
      date: '',
      ip: '',
      user: {} as Schemas.User,
    },
    time: {
      fri: {
        hours: [
          {
            end: '',
            project: {
              label: '',
            },
            start: '',
            ticket: '',
          },
        ],
      },
      mon: {
        hours: [
          {
            end: '',
            project: {
              label: '',
            },
            start: '',
            ticket: '',
          },
        ],
      },
      sat: {
        hours: [
          {
            end: '',
            project: {
              label: '',
            },
            start: '',
            ticket: '',
          },
        ],
      },
      sun: {
        hours: [
          {
            end: '',
            project: {
              label: '',
            },
            start: '',
            ticket: '',
          },
        ],
      },
      thu: {
        hours: [
          {
            end: '',
            project: {
              label: '',
            },
            start: '',
            ticket: '',
          },
        ],
      },
      tue: {
        hours: [
          {
            end: '',
            project: {
              label: '',
            },
            start: '',
            ticket: '',
          },
        ],
      },
      wed: {
        hours: [
          {
            end: '',
            project: {
              label: '',
            },
            start: '',
            ticket: '',
          },
        ],
      },
    },
    weekOf: '',
  },
  tickets: [],
  getTicketsRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  getTimesheetRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  getTimesheetByIdRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  saveTimesheetRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  submitDayRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  resubmitTimesheetRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  rejectedTimesheets: [],
  getRejectedTimesheetsRequest: {
    error: '',
    fetching: false,
    success: false,
  },
  timeslotProject: {dayOfWeek: '' as keyof Schemas.Time, slotNumber: 0},
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.updateTime, (state, action) => {
      state.selected.time[action.payload.dayOfWeek].hours[action.payload.slotNumber][
        action.payload.whichTime
      ] = action.payload.dateAndTime;
    })
    .addCase(actions.updateNote, (state, action) => {
      state.selected.time[action.payload.dayOfWeek].note = action.payload.note;
    })
    .addCase(actions.getTimesheet.pending, (state) => {
      state.getTimesheetRequest = {...initialState.getTimesheetRequest, fetching: true};
    })
    .addCase(actions.getTimesheet.fulfilled, (state, action) => {
      state.getTimesheetRequest = {...initialState.getTimesheetRequest, success: true};

      state.selected = action.payload;
    })
    .addCase(actions.getTimesheet.rejected, (state, action) => {
      state.getTimesheetRequest = {
        ...initialState.getTimesheetRequest,
        error: handleError(action.error.message),
      };

      state.selected = {...initialState.selected, weekOf: action.meta.arg.weekOf};
    })
    .addCase(actions.getTimesheetById.pending, (state) => {
      state.getTimesheetByIdRequest = {...initialState.getTimesheetByIdRequest, fetching: true};
    })
    .addCase(actions.getTimesheetById.fulfilled, (state, action) => {
      state.getTimesheetByIdRequest = {...initialState.getTimesheetByIdRequest, success: true};
      state.selected = action.payload;
    })
    .addCase(actions.getTimesheetById.rejected, (state, action) => {
      state.getTimesheetByIdRequest = {
        ...initialState.getTimesheetByIdRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.addSlot, (state, action) => {
      state.selected.time[action.payload.dayOfWeek].hours.push({
        end: '',
        project: {
          label: '',
        },
        start: '',
        ticket: '',
      });
    })
    .addCase(actions.removeSlot, (state, action) => {
      state.selected.time[action.payload.dayOfWeek].hours.pop();
    })
    .addCase(actions.saveTimesheet.pending, (state) => {
      state.saveTimesheetRequest = {...initialState.saveTimesheetRequest, fetching: true};
    })
    .addCase(actions.saveTimesheet.fulfilled, (state, action) => {
      state.saveTimesheetRequest = {...initialState.saveTimesheetRequest, success: true};

      state.selected = {...action.payload, weekOf: state.selected.weekOf};
    })
    .addCase(actions.saveTimesheet.rejected, (state, action) => {
      state.saveTimesheetRequest = {
        ...initialState.saveTimesheetRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.setProject, (state, action) => {
      const {project, dayOfWeek, slotNumber} = action.payload;
      state.timeslotProject = {dayOfWeek, slotNumber};
      state.selected.time[dayOfWeek].hours[slotNumber].project = project;
      state.selected.time[dayOfWeek].hours[slotNumber].ticket = '';
      delete state.selected.time[dayOfWeek].hours[slotNumber].manualTicketInput;
    })
    .addCase(actions.setSubProject, (state, action) => {
      const {subProject, dayOfWeek, slotNumber} = action.payload;
      state.selected.time[dayOfWeek].hours[slotNumber].project.subProject = subProject;
    })
    .addCase(actions.submitDay.pending, (state) => {
      state.submitDayRequest = {...initialState.submitDayRequest, fetching: true};
    })
    .addCase(actions.submitDay.fulfilled, (state, action) => {
      state.submitDayRequest = {...initialState.submitDayRequest, success: true};

      const {day} = action.meta.arg;
      state.selected.time[day].submitted = action.payload.time[day].submitted;
    })
    .addCase(actions.submitDay.rejected, (state, action) => {
      state.submitDayRequest = {
        ...initialState.submitDayRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.getTickets.pending, (state) => {
      state.getTicketsRequest = {...initialState.getTicketsRequest, fetching: true};
    })
    .addCase(actions.getTickets.fulfilled, (state, action) => {
      state.getTicketsRequest = {...initialState.getTicketsRequest, success: true};
      state.tickets = [...new Set([...state.tickets, ...action.payload])];
    })
    .addCase(actions.getTickets.rejected, (state, action) => {
      state.getTicketsRequest = {
        ...initialState.getTimesheetRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.setTicket, (state, action) => {
      const {ticket, dayOfWeek, slotNumber} = action.payload;
      state.selected.time[dayOfWeek].hours[slotNumber].ticket = ticket;
      delete state.selected.time[dayOfWeek].hours[slotNumber].manualTicketInput;
    })
    .addCase(actions.setManualTicketInput, (state, action) => {
      const {manualTicketInput, dayOfWeek, slotNumber} = action.payload;
      state.selected.time[dayOfWeek].hours[slotNumber].manualTicketInput = manualTicketInput;
    })
    .addCase(actions.clearTimesheet, (state) => {
      state.selected = {...initialState.selected};
    })
    .addCase(actions.resubmitTimesheet.pending, (state) => {
      state.resubmitTimesheetRequest = {...initialState.resubmitTimesheetRequest, fetching: true};
    })
    .addCase(actions.resubmitTimesheet.fulfilled, (state, action) => {
      state.resubmitTimesheetRequest = {...initialState.resubmitTimesheetRequest, success: true};
      state.selected = action.payload;
    })
    .addCase(actions.resubmitTimesheet.rejected, (state, action) => {
      state.resubmitTimesheetRequest = {
        ...initialState.resubmitTimesheetRequest,
        error: handleError(action.error.message),
      };
    })
    .addCase(actions.getRejectedTimesheets.pending, (state) => {
      state.getRejectedTimesheetsRequest = {...initialState.getRejectedTimesheetsRequest, fetching: true};
    })
    .addCase(actions.getRejectedTimesheets.fulfilled, (state, action) => {
      state.getRejectedTimesheetsRequest = {...initialState.getRejectedTimesheetsRequest, success: true};
      state.rejectedTimesheets = action.payload;
    })
    .addCase(actions.getRejectedTimesheets.rejected, (state, action) => {
      state.getRejectedTimesheetsRequest = {
        ...initialState.getRejectedTimesheetsRequest,
        error: handleError(action.error.message),
      };
    });
});

export default reducer;
