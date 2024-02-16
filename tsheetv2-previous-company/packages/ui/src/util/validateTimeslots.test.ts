import validateTimeslots from './validateTimeslots';

const hoursNormal = [
  {
    start: '2022-04-04T05:00:00.684Z',
    end: '2022-04-04T06:00:00.684Z',
    project: {
      label: 'ISP',
      subProject: {
        label: 'CDX',
      },
    },
    ticket: 'ISPC-1000',
  },
];

const breakTicketEntry = [
  {
    start: '2022-04-04T05:00:00.684Z',
    end: '2022-04-04T06:00:00.684Z',
    project: {
      label: 'Break',
      subProject: {
        label: '',
      },
    },
    ticket: '',
  },
];

const hoursEqual = [
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

const hoursNegative = [
  {
    start: '2022-04-04T06:00:00.684Z',
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

const startEmptyEndFilled = [
  {
    start: '',
    end: '2022-04-04T06:00:00.684Z',
    project: {
      label: '',
      subProject: {
        label: '',
      },
    },
    ticket: '',
  },
];

const startEmptyProjectFilled = [
  {
    start: '',
    end: '',
    project: {
      label: 'ISP',
      subProject: {
        label: 'CDX',
      },
    },
    ticket: 'ISPC-1000',
  },
];

const startEmptyEndEmptyProjectEmpty = [
  {
    start: '',
    end: '',
    project: {
      label: '',
      subProject: {
        label: '',
      },
    },
    ticket: '',
  },
];

const startEmptyMultipleEndFilled = [
  {
    start: '2022-04-04T05:00:00.684Z',
    end: '2022-04-04T06:00:00.684Z',
    project: {
      label: 'ISP',
      subProject: {
        label: 'CDX',
      },
    },
    ticket: 'ISPC-1000',
  },
  {
    start: '',
    end: '2022-04-04T05:00:00.684Z',
    project: {
      label: '',
      subProject: {
        label: '',
      },
    },
    ticket: '',
  },
];

const startEmptyMultipleProjectFilled = [
  {
    start: '2022-04-04T05:00:00.684Z',
    end: '2022-04-04T06:00:00.684Z',
    project: {
      label: 'ISP',
      subProject: {
        label: 'CDX',
      },
    },
    ticket: 'ISPC-1000',
  },
  {
    start: '',
    end: '',
    project: {
      label: 'ISP',
      subProject: {
        label: 'CDX',
      },
    },
    ticket: 'ISPC-1000',
  },
];

const endEmpty = [
  {
    start: '2022-04-04T05:00:00.684Z',
    end: '',
    project: {
      label: 'ISP',
      subProject: {
        label: 'CDX',
      },
    },
    ticket: 'ISPC-1000',
  },
];

const hoursConflict = [
  {
    start: '2022-04-04T05:00:00.684Z',
    end: '2022-04-04T06:00:00.684Z',
    project: {
      label: 'ISP',
      subProject: {
        label: 'CDX',
      },
    },
    ticket: 'ISPC-1000',
  },
  {
    start: '2022-04-04T05:00:00.684Z',
    end: '2022-04-04T06:00:00.684Z',
    project: {
      label: 'ISP',
      subProject: {
        label: 'CDX',
      },
    },
    ticket: 'ISPC-1000',
  },
];

const hoursNoConflict = [
  {
    start: '2022-04-04T05:00:00.684Z',
    end: '2022-04-04T06:00:00.684Z',
    project: {
      label: 'ISP',
      subProject: {
        label: 'CDX',
      },
    },
    ticket: 'ISPC-1000',
  },
  {
    start: '2022-04-04T06:00:00.684Z',
    end: '2022-04-04T07:00:00.684Z',
    project: {
      label: 'ISP',
      subProject: {
        label: 'CDX',
      },
    },
    ticket: 'ISPC-1000',
  },
];

const projectError = [
  {
    start: '2022-04-04T05:00:00.684Z',
    end: '2022-04-04T06:00:00.684Z',
    project: {
      label: '',
      subProject: {
        label: '',
      },
    },
    ticket: 'ISPC-1000',
  },
];

const subProjectError = [
  {
    start: '2022-04-04T05:00:00.684Z',
    end: '2022-04-04T06:00:00.684Z',
    project: {
      label: 'ISP',
      subProject: {
        label: '',
      },
    },
    ticket: 'ISPC-1000',
  },
];

const ticketError1 = [
  {
    start: '2022-04-04T05:00:00.684Z',
    end: '2022-04-04T06:00:00.684Z',
    project: {
      label: 'ISP',
      subProject: {
        label: 'CDX',
      },
    },
    ticket: '',
  },
];

const ticketError2 = [
  {
    start: '2022-04-04T05:00:00.684Z',
    end: '2022-04-04T06:00:00.684Z',
    project: {
      label: 'AMS',
      subProject: {
        label: '',
      },
    },
    ticket: '',
  },
];

const ticketError3 = [
  {
    start: '2022-04-04T05:00:00.684Z',
    end: '2022-04-04T06:00:00.684Z',
    project: {
      label: 'BZ',
      subProject: {
        label: 'API',
      },
    },
    ticket: '',
  },
];

const ticketError4 = [
  {
    start: '2022-04-04T05:00:00.684Z',
    end: '2022-04-04T06:00:00.684Z',
    project: {
      label: 'TT',
      subProject: {
        label: '',
      },
    },
    ticket: '',
  },
];

const otherTicketError = [
  {
    start: '2022-04-04T05:00:00.684Z',
    end: '2022-04-04T06:00:00.684Z',
    manualTicketInput: '',
    project: {
      label: 'ISP',
      subProject: {
        label: 'CDX',
      },
    },
    ticket: 'Other',
  },
];

const projects: Schemas.Project[] = [
  {
    created: {
      date: '2022-08-01T00:00:00.000Z',
      ip: '0.0.0.0',
      user: {} as Schemas.User,
    },
    label: 'ISP',
    lead: {} as Schemas.User,
    name: 'Innovation Support Platform',
    subProjects: [{label: 'CDX', name: 'CDX'}],
  },
  {
    created: {
      date: '2022-08-01T00:00:00.000Z',
      ip: '0.0.0.0',
      user: {} as Schemas.User,
    },
    label: 'AMS',
    lead: {} as Schemas.User,
    name: 'Analysis and Management System',
  },
  {
    created: {
      date: '2022-08-01T00:00:00.000Z',
      ip: '0.0.0.0',
      user: {} as Schemas.User,
    },
    label: 'TT',
    lead: {} as Schemas.User,
    name: 'Timesheet',
  },
  {
    created: {
      date: '2022-08-01T00:00:00.000Z',
      ip: '0.0.0.0',
      user: {} as Schemas.User,
    },
    label: 'BZ',
    lead: {} as Schemas.User,
    name: 'Beautyzone',
    subProjects: [{label: 'WEB', name: 'API'}],
  },
];

describe('validateTimeslots', () => {
  it('Should return no error', () => {
    expect(validateTimeslots(hoursNormal, projects)).toEqual('');
  });
  it('Should return no error', () => {
    expect(validateTimeslots(breakTicketEntry, projects)).toEqual('');
  });
  it('Should return timeslot empty error', () => {
    expect(validateTimeslots(startEmptyEndEmptyProjectEmpty, projects)).toEqual('Timeslot is empty.');
  });
  it('Should return end required before start error', () => {
    expect(validateTimeslots(hoursNegative, projects)).toEqual(
      'Please enter a start time that is before the end time.'
    );
    expect(validateTimeslots(hoursEqual, projects)).toEqual(
      'Please enter a start time that is before the end time.'
    );
  });
  it('Should return empty start time error (single with end time)', () => {
    expect(validateTimeslots(startEmptyEndFilled, projects)).toEqual('Please enter a start time.');
  });
  it('Should return empty start time error (single with project)', () => {
    expect(validateTimeslots(startEmptyProjectFilled, projects)).toEqual('Please enter a start time.');
  });
  it('Should return empty start time error (multiple with end time)', () => {
    expect(validateTimeslots(startEmptyMultipleEndFilled, projects)).toEqual('Please enter a start time.');
  });
  it('Should return empty start time error (multiple with project)', () => {
    expect(validateTimeslots(startEmptyMultipleProjectFilled, projects)).toEqual(
      'Please enter a start time.'
    );
  });
  it('Should return empty end time error', () => {
    expect(validateTimeslots(endEmpty, projects)).toEqual('Please enter an end time.');
  });
  it('Should return conflicting times error', () => {
    expect(validateTimeslots(hoursConflict, projects)).toEqual('Timeslots contain overlapping times.');
  });
  it('Should not return conflicting times error', () => {
    expect(validateTimeslots(hoursNoConflict, projects)).toEqual('');
  });
  it('Should have an error with the projects', () => {
    expect(validateTimeslots(projectError, projects)).toEqual('Please select a project.');
  });
  it('Should have an error with the sub-projects', () => {
    expect(validateTimeslots(subProjectError, projects)).toEqual('Please select a sub-project.');
  });
  it('Should not have an error with the tickets for ignored projects (with sub-projects)', () => {
    expect(validateTimeslots(ticketError1, projects)).toEqual('');
  });
  it('Should not have an error with the tickets for ignored projects (with no sub-projects)', () => {
    expect(validateTimeslots(ticketError2, projects)).toEqual('');
  });
  it('Should have an error with the tickets (with sub-projects)', () => {
    expect(validateTimeslots(ticketError3, projects)).toEqual('Please select a ticket.');
  });
  it('Should have an error with the tickets (with no sub-projects)', () => {
    expect(validateTimeslots(ticketError4, projects)).toEqual('Please select a ticket.');
  });
  it('Should have an error with the other entry for tickets', () => {
    expect(validateTimeslots(otherTicketError, projects)).toEqual("Please enter a description for 'Other'.");
  });
});
