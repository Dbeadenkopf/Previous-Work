# Utils

## apiRequest.ts

### apiRequest()

A wrapper function for making api calls. Primarily used with redux `createAsyncThunk`.

PARAMS:

- `baseRoute: BaseRoute`
- `route: string`
- `options: Options`

EXAMPLE:

```js
const baseRoute = BaseRoute.EXAMPLE;
const route = `/${id}`;
const options = {
  method: Method.GET,
  queryParams: {
    name: 'Emily',
  },
};

// Make GET request to /example/:id
const response = await apiRequest(baseRoute, route, options);
```

## checkPermission.ts

### checkPermission()

Accepts an array of required permissions and an array of user permissions. Returns `true` if user array includes all items from required array.

PARAMS:

- `requiredPermissions: string[]`
- `userPermissions: string[]`

EXAMPLE:

```js
const requiredPermissions = ['READ_REVIEW', 'WRITE_REVIEW'];
const userPermissions = ['READ_TIMESHEET', 'WRITE_TIMESHEET', 'READ_REVIEW', 'WRITE_REVIEW'];

// Check if userPermissions satisfies all requiredPermissions.
const hasPermission = checkPermission(requiredPermissions, userPermissions); // true

if (!hasPermission) {
  console.log('Nah');
} else {
  console.log('👍');
}
```

## filterSlots.ts

### filterSlots()

Accepts a timesheet and returns a new timesheet, filtered by timeslots that have start and end times. If a timeslot does not include start and end times, it returns an empty hours array.

You can also use the `projects` param to _filter out_ an array of projects from the timesheet.

PARAMS:

- `timesheet: Schemas.Timesheet`
- `projects?: string[]`

EXAMPLE:

```js
const timesheet = state.timesheet.selected;
const projects = ['Break'];

// Returns a timesheet that filters out any breaks
filterSlots(timesheet, projects);
```

## formatDate.ts

### formatDate()

Converts date to `mm/dd/yyyy` string format.

PARAMS:

- `date: string | Date`

EXAMPLE:

```js
const date = '2022-06-07 20:00:00.000Z';

formatDate(date); // '06/07/2022'
```

### offsetDate()

Adds days to an existing date and returns the new date in `mm/dd/yyyy` string format.

PARAMS:

- `date: string | Date`
- `offsetDays: number`

EXAMPLE:

```js
const date = '2022-06-07 20:00:00.000Z';
const offsetDays = 3;

offsetDate(date, offsetDays); // '06/10/2022'
```

## formatMs.ts

### formatMs()

Converts milliseconds into `00:00` format.

PARAMS:

- `ms: number`

EXAMPLE:

```js
const start = '2022-08-25T14:00:00.000Z'; // 10:00 AM
const end = '2022-08-25T19:00:00.000Z'; // 3:00 PM
const ms = getTimeDiff(start, end); // '18000000' (5 hours)

formatMs(ms); // '05:00'
```

## formatTime.ts

### formatTime()

Converts date to `00:00 AM/PM` string format.

PARAMS:

- `date: string | Date`

EXAMPLE:

```js
const date = '2022-08-24T20:54:52.771Z';

formatTime(date); // '04:54 PM'
```

## getCurrentMonday.ts

### getCurrentMonday()

Returns the monday of the current week.

EXAMPLE:

```js
getCurrentMonday(); // '2022-08-22T04:00:00.000Z'
```

## getPrevMonday.ts

### getPrevMonday()

Returns the monday of the previous week.

EXAMPLE:

```js
getPrevMonday(); // '2022-08-15T04:00:00.000Z'
```

## getTimeDiff.ts

### getTimeDiff()

Calculates the difference between two dates (date2 - date1) (in milliseconds).

Primarily used to calculate the total passage of time, given start and end times.

PARAMS:

- `date1: Date | string`
- `date2: Date | string`

EXAMPLE:

```js
const date1 = '2022-08-25T14:00:00.000Z'; // 10:00 AM
const date2 = '2022-08-25T19:00:00.000Z'; // 3:00 PM

getTimeDiff(date1, date2); // '18000000' (5 hours)
```

## getTotalHours.ts

### getTotalWeekHours()

Calculates total hours worked in a week (in milliseconds).

PARAMS:

- `week: Schemas.Time`
- `projectID?: string`

EXAMPLE:

```js
// 40 hr work week
const week: Schemas.Time = {
  mon: {
    hours: [
      {
        start: '2022-08-22T13:00:00.000Z',
        end: '2022-08-22T21:00:00.000Z',
        project: {
          label: 'ISP',
          subProject: {
            label: 'CDX',
          },
        },
        ticket: 'ISPC-1000',
      },
    ],
  },
  // etc.
};

getTotalWeekHours(week); // 144000000 (40 hrs)
```

### getTotalDayHours()

Calculates total hours worked in a day (in milliseconds).

PARAMS:

- `day: Schemas.Day`
- `projectID?: string`

EXAMPLE:

```js
const week: Schemas.Time = {
  mon: {
    hours: [
      {
        start: '2022-08-22T13:00:00.000Z',
        end: '2022-08-22T21:00:00.000Z',
        project: {
          label: 'ISP',
          subProject: {
            label: 'CDX',
          },
        },
        ticket: 'ISPC-1000',
      },
    ],
  },
  // etc.
};

const monday = week['mon'];

getTotalDayHours(monday); // 28800000 (8 hrs)
```

## getWeek.ts

### getWeek()

Returns an array of Date objects for the week of a given date.

If no date is given, it will return an array of the current week.

PARAMS:

- `date?: Date`

EXAMPLE:

```js
const date = new Date('8/8/2022');

getWeek(date); // Returns array of Date objects for the week of 8/8/2022

/*
[
  2022-08-08T04:00:00.000Z,
  2022-08-09T04:00:00.000Z,
  2022-08-10T04:00:00.000Z,
  2022-08-11T04:00:00.000Z,
  2022-08-12T04:00:00.000Z,
  2022-08-13T04:00:00.000Z,
  2022-08-14T04:00:00.000Z
]
*/
```

## handleError.ts

### handleError()

A wrapper function that returns the default message `'Internal server error'` if the provided error is undefined. If provided error is a valid string, it will return that error instead.

Used to handle error responses in redux reducers.

PARAMS:

- `error?: string`

EXAMPLE:

```js
    .addCase(actions.getTimesheet.rejected, (state, action) => {
      state.getTimesheetRequest = {
        ...initialState.getTimesheetRequest,
        // 'Internal server error' or valid error message
        error: handleError(action.error.message),
      };
    })
```

## padTo2Digits.ts

### padTo2Digits()

Adds a leading zero to single digit values.

PARAMS:

- `num: number`

EXAMPLE:

```js
padTo2Digits(1); // '01'
padTo2Digits(12); // '12'
```

## sortSlots.ts

### sortSlots()

Returns a new timesheet with slots in ascending order (latest date at bottom).

PARAMS:

- `timesheet: Schemas.Timesheet`

EXAMPLE:

```js
const timesheet = useAppSelector(selectSelected);

/* 
timesheet.time.fri =
{
  hours: [
    {
      end: '2022-07-30T01:00:00.051Z',
      project: [Object],
      start: '2022-07-30T00:00:00.134Z',
      ticket: '',
    },
    {
      end: '2022-07-29T16:00:00.781Z',
      project: [Object],
      start: '2022-07-29T14:00:00.885Z',
      ticket: '',
    },
  ];
} 
*/

const newTimesheet = sortSlots(timesheet);

/*
newTimesheet.time.fri =
{
  hours: [
    {
      end: '2022-07-29T16:00:00.781Z',
      project: [Object],
      start: '2022-07-29T14:00:00.885Z',
      ticket: '',
    },
    {
      end: '2022-07-30T01:00:00.051Z',
      project: [Object],
      start: '2022-07-30T00:00:00.134Z',
      ticket: '',
    },
  ];
}
*/
```

## validateTimeslots.ts

### validateTimeslots()

Validates time slots. If there are no errors, it returns an empty string.

Invalid slots are when

- Slots have equal times
- Slots have negative hours (end time is earlier than start time)
- Slots are empty
- There are conflicting hours (project hours coincide with other project hours)

PARAMS:

- `hoursArray: Schemas.Timeslot[]`
- `projects: Schemas.Project[]`

EXAMPLE:

```js
const hoursArray = [
  {
    start: '2022-04-04T05:00:00.684Z',
    end: '2022-04-04T05:00:00.684Z',
    project: {
      label: 'ISP',
      subProject: {
        label: 'CDX',
      },
    },
    ticket: 'ISPC-1000',
  },
];

validateTimeslots(hoursArray); // 'Cannot Enter Equal Times'
```
