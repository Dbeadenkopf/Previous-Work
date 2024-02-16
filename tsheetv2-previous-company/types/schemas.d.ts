declare namespace Schemas {
  interface Comment {
    content: string;
    created: Meta;
  }

  interface Day {
    hours: Timeslot[];
    note?: string;
    submitted?: Meta;
  }

  interface Meta {
    date: Date | string;
    ip: string;
    user: User;
  }

  interface Project {
    _id?: string;
    created: Meta;
    label: string;
    lead: User;
    name: string;
    removed?: Meta;
    subProjects?: SubProject[];
    updated?: Meta;
  }

  interface Role {
    _id?: string;
    description?: string;
    name: string;
    permissions: string[];
  }

  interface SelectedProject {
    label: string;
    subProject?: SelectedProject;
  }

  interface SubProject {
    label: string;
    name: string;
    subProjects?: SubProject[];
  }

  interface Time {
    fri: Day;
    mon: Day;
    sat: Day;
    sun: Day;
    thu: Day;
    tue: Day;
    wed: Day;
  }

  interface Timesheet {
    _id?: string;
    approved?: Meta;
    comments: Comment[];
    created: Meta;
    rejected?: Meta;
    submitted?: Meta;
    submittedHours?: number;
    time: Time;
    updated?: Meta;
    weekOf: Date | string;
  }

  interface Timeslot {
    end: Date | string;
    project: SelectedProject;
    start: Date | string;
    ticket: string;
    manualTicketInput?: string;
  }

  interface Notifications {
    email: {
      submission: {on: boolean; time: NotificationTime};
      approval: boolean;
      rejection: boolean;
      comment: boolean;
      approvalReminder: boolean;
      resubmission: boolean;
    };
    slack: {
      submission: {on: boolean; time: NotificationTime};
      approval: boolean;
      rejection: boolean;
      comment: boolean;
      approvalReminder: boolean;
      resubmission: boolean;
    };
  }

  interface User {
    _id?: string;
    approver: User;
    created: Meta;
    email: string;
    slackId: string;
    firstName: string;
    lastName: string;
    removed?: Meta;
    roles: Role[];
    title: string;
    supervisor: User;
    notifications: Notifications;
    updated?: Meta;
    timezone?: string;
  }

  interface NotificationTime {
    hour?: string;
    minute?: string;
    period?: string;
  }

  interface dayTimesheets {
    time: Schemas.Time[];
    created: string;
  }
}
