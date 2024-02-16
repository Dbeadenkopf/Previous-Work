import {Schema} from 'mongoose';

// allow empty strings to pass the `required` validator
Schema.Types.String.checkRequired((v) => typeof v === 'string');

const maxLength = 40;

const meta = new Schema<Schemas.Meta>(
  {
    date: {type: Date, required: true},
    ip: {type: String, required: true, maxLength},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  },
  {_id: false}
);

const comment = new Schema<Schemas.Comment>(
  {
    content: {type: String, required: true, maxLength: 280},
    created: {type: meta, required: true},
  },
  {_id: false}
);

const selectedProject = new Schema<Schemas.SelectedProject>(
  {
    label: {type: String, required: true, maxLength: 20},
    subProject: {type: {}},
  },
  {_id: false}
);

const timeslot = new Schema<Schemas.Timeslot>(
  {
    end: {type: Date, required: true},
    project: {type: selectedProject, required: true},
    start: {type: Date, required: true},
    ticket: {type: String, required: true, maxLength},
    manualTicketInput: {
      type: String,
      trim: true,
      maxLength: 280,
    },
  },
  {_id: false}
);

const day = new Schema<Schemas.Day>(
  {
    hours: {type: [timeslot], required: true},
    note: {type: String, maxLength: 280},
    submitted: {type: meta},
  },
  {_id: false}
);

const subProject = new Schema<Schemas.SubProject>(
  {
    label: {type: String, required: true, maxLength: 4},
    name: {type: String, required: true, maxLength},
    subProjects: {type: []},
  },
  {_id: false}
);

export const project = new Schema<Schemas.Project>({
  created: {type: meta, required: true},
  label: {type: String, required: true, maxLength: 15, unique: true},
  lead: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  name: {type: String, required: true, maxLength, unique: true},
  removed: {type: meta},
  subProjects: {type: [subProject]},
  updated: {type: meta},
});

export const role = new Schema<Schemas.Role>({
  name: {type: String, required: true, maxLength, unique: true},
  description: {type: String, maxLength: 280},
  permissions: {type: [String], required: true},
});

export const time = new Schema<Schemas.Time>(
  {
    fri: {type: day, required: true},
    mon: {type: day, required: true},
    sat: {type: day, required: true},
    sun: {type: day, required: true},
    thu: {type: day, required: true},
    tue: {type: day, required: true},
    wed: {type: day, required: true},
  },
  {_id: false}
);

export const notificationTime = new Schema<Schemas.NotificationTime>(
  {
    hour: {type: String},
    minute: {type: String},
    period: {type: String},
  },
  {_id: false}
);

export const notifications = new Schema<Schemas.Notifications>({
  email: {
    submission: {type: {on: Boolean, time: notificationTime}, _id: false},
    approval: {type: Boolean},
    rejection: {type: Boolean},
    comment: {type: Boolean},
    approvalReminder: {type: Boolean},
    resubmission: {type: Boolean},
  },
  slack: {
    submission: {type: {on: Boolean, time: notificationTime}, _id: false},
    approval: {type: Boolean},
    rejection: {type: Boolean},
    comment: {type: Boolean},
    approvalReminder: {type: Boolean},
    resubmission: {type: Boolean},
  },
});

export const user = new Schema<Schemas.User>({
  approver: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  created: {type: meta, required: true},
  firstName: {type: String, required: true, maxLength},
  lastName: {type: String, required: true, maxLength},
  email: {type: String, required: true, maxLength},
  slackId: {type: String, maxLength},
  removed: {type: meta},
  roles: {type: [{type: Schema.Types.ObjectId, ref: 'Role'}], required: true},
  title: {type: String, required: true, maxLength},
  supervisor: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  notifications: {type: notifications, required: true},
  updated: {type: meta},
  timezone: {type: String},
});

export const timesheet = new Schema<Schemas.Timesheet>({
  approved: {type: meta},
  comments: {type: [comment]},
  created: {type: meta, required: true},
  rejected: {type: meta},
  submitted: {type: meta},
  submittedHours: {type: Number},
  time: {type: time, required: true},
  updated: {type: meta},
  weekOf: {type: Date, required: true},
});
