import Timesheet from '../../../mongoose/models/timesheet';
import {schedulerId} from '../../../util/job/scheduleJob';
import {
  currentWeek,
  currentWeekStart,
  prevWeek,
  prevWeekStart,
  twoWeeksAgo,
  twoWeeksAgoStart,
} from '../shared/dates';

import {userIds} from './ids';

const mannyTimesheets = [
  // TWO WEEKS AGO (approved)
  new Timesheet({
    _id: '62f26ffd065ea1f3dae44a12',
    approved: {
      date: prevWeek.monday.start,
      ip: '0.0.0.0',
      user: userIds.adam,
    },
    comments: [],
    created: {
      date: twoWeeksAgo.monday.start,
      ip: '0.0.0.0',
      user: userIds.manny,
    },
    submitted: {
      date: twoWeeksAgo.friday.end,
      ip: '0.0.0.0',
      user: schedulerId,
    },
    submittedHours: 40,
    time: {
      mon: {
        hours: [
          {
            end: twoWeeksAgo.monday.end,
            project: {
              label: 'ISP',
              subProject: {
                label: 'CDX',
              },
            },
            start: twoWeeksAgo.monday.start,
            ticket: 'ISPC-1000',
          },
        ],
        submitted: {
          date: twoWeeksAgo.tuesday.end,
          ip: '0.0.0.0',
          user: userIds.manny,
        },
      },
      tue: {
        hours: [
          {
            end: twoWeeksAgo.tuesday.end,
            project: {
              label: 'ISP',
              subProject: {
                label: 'CDX',
              },
            },
            start: twoWeeksAgo.tuesday.start,
            ticket: 'ISPC-1000',
          },
        ],
        note: 'Researching',
        submitted: {
          date: twoWeeksAgo.tuesday.end,
          ip: '0.0.0.0',
          user: userIds.manny,
        },
      },
      wed: {
        hours: [
          {
            end: twoWeeksAgo.wednesday.end,
            project: {
              label: 'ISP',
              subProject: {
                label: 'CDX',
              },
            },
            start: twoWeeksAgo.wednesday.start,
            ticket: 'ISPC-1000',
          },
        ],
        submitted: {
          date: twoWeeksAgo.wednesday.end,
          ip: '0.0.0.0',
          user: userIds.manny,
        },
      },
      thu: {
        hours: [
          {
            end: twoWeeksAgo.thursday.end,
            project: {
              label: 'ISP',
              subProject: {
                label: 'CDX',
              },
            },
            start: twoWeeksAgo.thursday.start,
            ticket: 'ISPC-1000',
          },
        ],
        submitted: {
          date: twoWeeksAgo.thursday.end,
          ip: '0.0.0.0',
          user: userIds.manny,
        },
      },
      fri: {
        hours: [
          {
            end: twoWeeksAgo.friday.end,
            project: {
              label: 'ISP',
              subProject: {
                label: 'CDX',
              },
            },
            start: twoWeeksAgo.friday.start,
            ticket: 'ISPC-1000',
          },
        ],
        submitted: {
          date: twoWeeksAgo.friday.end,
          ip: '0.0.0.0',
          user: userIds.manny,
        },
      },
      sat: {
        hours: [],
      },
      sun: {
        hours: [],
      },
    },
    updated: {
      date: twoWeeksAgo.friday.end,
      ip: '0.0.0.0',
      user: userIds.manny,
    },
    weekOf: twoWeeksAgoStart,
  }),

  // PREVIOUS WEEK (rejected and resubmitted)
  new Timesheet({
    _id: '62336d39deedc2c333cea94e',
    comments: [
      {
        content: 'Sorry, gotta reject this',
        created: {
          date: prevWeek.friday.end,
          ip: '0.0.0.0',
          user: userIds.adam,
        },
      },
    ],
    created: {
      date: prevWeek.monday.start,
      ip: '0.0.0.0',
      user: userIds.manny,
    },
    rejected: {
      date: prevWeek.friday.end,
      ip: '0.0.0.0',
      user: userIds.adam,
    },
    submitted: {
      date: currentWeek.monday.start,
      ip: '0.0.0.0',
      user: userIds.manny,
    },
    submittedHours: 40,
    time: {
      mon: {
        hours: [
          {
            end: prevWeek.monday.end,
            project: {
              label: 'ISP',
              subProject: {
                label: 'CDX',
              },
            },
            start: prevWeek.monday.start,
            ticket: 'ISPC-1000',
          },
        ],
        submitted: {
          date: prevWeek.tuesday.end,
          ip: '0.0.0.0',
          user: userIds.manny,
        },
      },
      tue: {
        hours: [
          {
            end: prevWeek.tuesday.end,
            project: {
              label: 'ISP',
              subProject: {
                label: 'CDX',
              },
            },
            start: prevWeek.tuesday.start,
            ticket: 'ISPC-1000',
          },
        ],
        note: 'Researching',
        submitted: {
          date: prevWeek.tuesday.end,
          ip: '0.0.0.0',
          user: userIds.manny,
        },
      },
      wed: {
        hours: [
          {
            end: prevWeek.wednesday.end,
            project: {
              label: 'ISP',
              subProject: {
                label: 'CDX',
              },
            },
            start: prevWeek.wednesday.start,
            ticket: 'ISPC-1000',
          },
        ],
        submitted: {
          date: prevWeek.wednesday.end,
          ip: '0.0.0.0',
          user: userIds.manny,
        },
      },
      thu: {
        hours: [
          {
            end: prevWeek.thursday.end,
            project: {
              label: 'ISP',
              subProject: {
                label: 'CDX',
              },
            },
            start: prevWeek.thursday.start,
            ticket: 'ISPC-1000',
          },
        ],
        submitted: {
          date: prevWeek.thursday.end,
          ip: '0.0.0.0',
          user: userIds.manny,
        },
      },
      fri: {
        hours: [
          {
            end: prevWeek.friday.end,
            project: {
              label: 'ISP',
              subProject: {
                label: 'CDX',
              },
            },
            start: prevWeek.friday.start,
            ticket: 'ISPC-1000',
          },
        ],
        submitted: {
          date: prevWeek.friday.end,
          ip: '0.0.0.0',
          user: userIds.manny,
        },
      },
      sat: {
        hours: [],
      },
      sun: {
        hours: [],
      },
    },
    updated: {
      date: currentWeek.monday.start,
      ip: '0.0.0.0',
      user: userIds.manny,
    },
    weekOf: prevWeekStart,
  }),

  // CURRENT WEEK (not submitted)
  new Timesheet({
    _id: '6238b6da809a177db94e7af5',
    comments: [],
    created: {
      date: currentWeek.monday.start,
      ip: '0.0.0.0',
      user: userIds.manny,
    },
    time: {
      mon: {
        hours: [
          {
            end: currentWeek.monday.end,
            project: {
              label: 'ISP',
              subProject: {
                label: 'CDX',
              },
            },
            start: currentWeek.monday.start,
            ticket: 'ISPC-1000',
          },
        ],
        submitted: {
          date: currentWeek.tuesday.end,
          ip: '0.0.0.0',
          user: userIds.manny,
        },
      },
      tue: {
        hours: [
          {
            end: currentWeek.tuesday.end,
            project: {
              label: 'ISP',
              subProject: {
                label: 'CDX',
              },
            },
            start: currentWeek.tuesday.start,
            ticket: 'ISPC-1000',
          },
        ],
        note: 'Researching',
        submitted: {
          date: currentWeek.tuesday.end,
          ip: '0.0.0.0',
          user: userIds.manny,
        },
      },
      wed: {
        hours: [
          {
            end: currentWeek.wednesday.end,
            project: {
              label: 'ISP',
              subProject: {
                label: 'CDX',
              },
            },
            start: currentWeek.wednesday.start,
            ticket: 'ISPC-1000',
          },
        ],
        submitted: {
          date: currentWeek.wednesday.end,
          ip: '0.0.0.0',
          user: userIds.manny,
        },
      },
      thu: {
        hours: [
          {
            end: currentWeek.thursday.end,
            project: {
              label: 'ISP',
              subProject: {
                label: 'CDX',
              },
            },
            start: currentWeek.thursday.start,
            ticket: 'ISPC-1000',
          },
        ],
        submitted: {
          date: currentWeek.thursday.end,
          ip: '0.0.0.0',
          user: userIds.manny,
        },
      },
      fri: {
        hours: [],
      },
      sat: {
        hours: [],
      },
      sun: {
        hours: [],
      },
    },
    updated: {
      date: currentWeek.thursday.end,
      ip: '0.0.0.0',
      user: userIds.manny,
    },
    weekOf: currentWeekStart,
  }),
];

const emilyTimesheets = [
  // TWO WEEKS AGO (approved)
  new Timesheet({
    _id: '62f27047dedb7fff40d0391d',
    approved: {
      date: prevWeek.monday.start,
      ip: '0.0.0.0',
      user: userIds.manny,
    },
    comments: [],
    created: {
      date: twoWeeksAgo.monday.start,
      ip: '0.0.0.0',
      user: userIds.emily,
    },
    submitted: {
      date: twoWeeksAgo.friday.end,
      ip: '0.0.0.0',
      user: schedulerId,
    },
    submittedHours: 40,
    time: {
      mon: {
        hours: [
          {
            end: twoWeeksAgo.monday.end,
            project: {
              label: 'TT',
            },
            start: twoWeeksAgo.monday.start,
            ticket: 'TT-1000',
          },
        ],
        submitted: {
          date: twoWeeksAgo.tuesday.end,
          ip: '0.0.0.0',
          user: userIds.emily,
        },
      },
      tue: {
        hours: [
          {
            end: twoWeeksAgo.tuesday.end,
            project: {
              label: 'TT',
            },
            start: twoWeeksAgo.tuesday.start,
            ticket: 'TT-1000',
          },
        ],
        note: 'Researching',
        submitted: {
          date: twoWeeksAgo.tuesday.end,
          ip: '0.0.0.0',
          user: userIds.emily,
        },
      },
      wed: {
        hours: [
          {
            end: twoWeeksAgo.wednesday.end,
            project: {
              label: 'TT',
            },
            start: twoWeeksAgo.wednesday.start,
            ticket: 'TT-1000',
          },
        ],
        submitted: {
          date: twoWeeksAgo.wednesday.end,
          ip: '0.0.0.0',
          user: userIds.emily,
        },
      },
      thu: {
        hours: [
          {
            end: twoWeeksAgo.thursday.end,
            project: {
              label: 'TT',
            },
            start: twoWeeksAgo.thursday.start,
            ticket: 'TT-1000',
          },
        ],
        submitted: {
          date: twoWeeksAgo.thursday.end,
          ip: '0.0.0.0',
          user: userIds.emily,
        },
      },
      fri: {
        hours: [
          {
            end: twoWeeksAgo.friday.end,
            project: {
              label: 'TT',
            },
            start: twoWeeksAgo.friday.start,
            ticket: 'TT-1000',
          },
        ],
        submitted: {
          date: twoWeeksAgo.friday.end,
          ip: '0.0.0.0',
          user: userIds.emily,
        },
      },
      sat: {
        hours: [],
      },
      sun: {
        hours: [],
      },
    },
    updated: {
      date: twoWeeksAgo.friday.end,
      ip: '0.0.0.0',
      user: userIds.emily,
    },
    weekOf: twoWeeksAgoStart,
  }),

  // PREVIOUS WEEK (rejected and resubmitted)
  new Timesheet({
    _id: '6238b6da809a177db94e7adc',
    comments: [
      {
        content: 'Sorry, gotta reject this',
        created: {
          date: prevWeek.friday.end,
          ip: '0.0.0.0',
          user: userIds.manny,
        },
      },
    ],
    created: {
      date: prevWeek.monday.start,
      ip: '0.0.0.0',
      user: userIds.emily,
    },
    rejected: {
      date: prevWeek.friday.end,
      ip: '0.0.0.0',
      user: userIds.manny,
    },
    submitted: {
      date: currentWeek.monday.start,
      ip: '0.0.0.0',
      user: userIds.emily,
    },
    submittedHours: 40,
    time: {
      mon: {
        hours: [
          {
            end: prevWeek.monday.end,
            project: {
              label: 'TT',
            },
            start: prevWeek.monday.start,
            ticket: 'TT-1000',
          },
        ],
        submitted: {
          date: prevWeek.tuesday.end,
          ip: '0.0.0.0',
          user: userIds.emily,
        },
      },
      tue: {
        hours: [
          {
            end: prevWeek.tuesday.end,
            project: {
              label: 'TT',
            },
            start: prevWeek.tuesday.start,
            ticket: 'TT-1000',
          },
        ],
        note: 'Researching',
        submitted: {
          date: prevWeek.tuesday.end,
          ip: '0.0.0.0',
          user: userIds.emily,
        },
      },
      wed: {
        hours: [
          {
            end: prevWeek.wednesday.end,
            project: {
              label: 'TT',
            },
            start: prevWeek.wednesday.start,
            ticket: 'TT-1000',
          },
        ],
        submitted: {
          date: prevWeek.wednesday.end,
          ip: '0.0.0.0',
          user: userIds.emily,
        },
      },
      thu: {
        hours: [
          {
            end: prevWeek.thursday.end,
            project: {
              label: 'TT',
            },
            start: prevWeek.thursday.start,
            ticket: 'TT-1000',
          },
        ],
        submitted: {
          date: prevWeek.thursday.end,
          ip: '0.0.0.0',
          user: userIds.emily,
        },
      },
      fri: {
        hours: [
          {
            end: prevWeek.friday.end,
            project: {
              label: 'TT',
            },
            start: prevWeek.friday.start,
            ticket: 'TT-1000',
          },
        ],
        submitted: {
          date: prevWeek.friday.end,
          ip: '0.0.0.0',
          user: userIds.emily,
        },
      },
      sat: {
        hours: [],
      },
      sun: {
        hours: [],
      },
    },
    updated: {
      date: currentWeek.monday.start,
      ip: '0.0.0.0',
      user: userIds.emily,
    },
    weekOf: prevWeekStart,
  }),

  // CURRENT WEEK (not submitted)
  new Timesheet({
    _id: '6238b6da809a177db94e7b08',
    comments: [],
    created: {
      date: currentWeek.monday.start,
      ip: '0.0.0.0',
      user: userIds.emily,
    },
    time: {
      mon: {
        hours: [
          {
            end: currentWeek.monday.end,
            project: {
              label: 'TT',
            },
            start: currentWeek.monday.start,
            ticket: 'TT-1000',
          },
        ],
        submitted: {
          date: currentWeek.tuesday.end,
          ip: '0.0.0.0',
          user: userIds.emily,
        },
      },
      tue: {
        hours: [
          {
            end: currentWeek.tuesday.end,
            project: {
              label: 'TT',
            },
            start: currentWeek.tuesday.start,
            ticket: 'TT-1000',
          },
        ],
        note: 'Researching',
        submitted: {
          date: currentWeek.tuesday.end,
          ip: '0.0.0.0',
          user: userIds.emily,
        },
      },
      wed: {
        hours: [
          {
            end: currentWeek.wednesday.end,
            project: {
              label: 'TT',
            },
            start: currentWeek.wednesday.start,
            ticket: 'TT-1000',
          },
        ],
        submitted: {
          date: currentWeek.wednesday.end,
          ip: '0.0.0.0',
          user: userIds.emily,
        },
      },
      thu: {
        hours: [
          {
            end: currentWeek.thursday.end,
            project: {
              label: 'TT',
            },
            start: currentWeek.thursday.start,
            ticket: 'TT-1000',
          },
        ],
        submitted: {
          date: currentWeek.thursday.end,
          ip: '0.0.0.0',
          user: userIds.emily,
        },
      },
      fri: {
        hours: [],
      },
      sat: {
        hours: [],
      },
      sun: {
        hours: [],
      },
    },
    updated: {
      date: currentWeek.thursday.end,
      ip: '0.0.0.0',
      user: userIds.emily,
    },
    weekOf: currentWeekStart,
  }),
];

export default [...mannyTimesheets, ...emilyTimesheets];
