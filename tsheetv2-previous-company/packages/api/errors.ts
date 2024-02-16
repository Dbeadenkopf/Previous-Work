export enum APIErrorMessage {
  TIMESHEET_NOT_FOUND = 'Timesheet not found',
  USER_NOT_FOUND = 'User not found',
  EMAIL_ALREADY_EXISTS = 'Email already exists',
  PROJECT_NOT_FOUND = 'Project not found',
  INTERNAL_SERVER_ERR = 'Internal Server Error',
  BAD_REQUEST = 'Bad Request',
  ROUTE_NOT_FOUND = 'Route not found',
  CREDENTIALS_NOT_FOUND = 'Credentials not provided',
  INVALID_CREDENTIALS = 'Invalid credentials',
  TIMESLOT_EMPTY = 'Timeslot is empty',
  START_TIME_NOT_ENTERED = 'Please enter a start time',
  END_TIME_NOT_ENTERED = 'Please enter an end time',
  START_TIME_ERROR = 'Please enter a start time that is before the end time',
  OVERLAPPING_TIMES = 'Timeslots contain overlapping times',
  PROJECT_NOT_SELECTED = 'Please select a project',
  SUBPROJECT_NOT_SELECTED = 'Please select a sub-project',
  TICKET_NOT_SELECTED = 'Please select a ticket',
  OTHER_NOT_ENTERED = `Please enter a description for 'Other'`,
  SUBPROJECT_ALREADY_EXISTS = 'Sub-Project already exists',
  SUBPROJECT_NOT_FOUND = 'Sub-Project not found',
  ROLE_NOT_FOUND = 'Role not found',
}

export class APIError {
  readonly code: number;
  readonly message: APIErrorMessage;

  constructor(code: number, message: APIErrorMessage) {
    this.code = code;
    this.message = message;
  }
}

const errors: Record<keyof typeof APIErrorMessage, APIError> = {
  TIMESHEET_NOT_FOUND: new APIError(404, APIErrorMessage.TIMESHEET_NOT_FOUND),
  USER_NOT_FOUND: new APIError(404, APIErrorMessage.USER_NOT_FOUND),
  EMAIL_ALREADY_EXISTS: new APIError(400, APIErrorMessage.EMAIL_ALREADY_EXISTS),
  PROJECT_NOT_FOUND: new APIError(404, APIErrorMessage.PROJECT_NOT_FOUND),
  INTERNAL_SERVER_ERR: new APIError(500, APIErrorMessage.INTERNAL_SERVER_ERR),
  BAD_REQUEST: new APIError(400, APIErrorMessage.BAD_REQUEST),
  ROUTE_NOT_FOUND: new APIError(404, APIErrorMessage.ROUTE_NOT_FOUND),
  CREDENTIALS_NOT_FOUND: new APIError(401, APIErrorMessage.CREDENTIALS_NOT_FOUND),
  INVALID_CREDENTIALS: new APIError(401, APIErrorMessage.INVALID_CREDENTIALS),
  TIMESLOT_EMPTY: new APIError(400, APIErrorMessage.TIMESLOT_EMPTY),
  START_TIME_NOT_ENTERED: new APIError(400, APIErrorMessage.START_TIME_NOT_ENTERED),
  END_TIME_NOT_ENTERED: new APIError(400, APIErrorMessage.END_TIME_NOT_ENTERED),
  START_TIME_ERROR: new APIError(400, APIErrorMessage.START_TIME_ERROR),
  OVERLAPPING_TIMES: new APIError(400, APIErrorMessage.OVERLAPPING_TIMES),
  PROJECT_NOT_SELECTED: new APIError(400, APIErrorMessage.PROJECT_NOT_SELECTED),
  SUBPROJECT_NOT_SELECTED: new APIError(400, APIErrorMessage.SUBPROJECT_NOT_SELECTED),
  TICKET_NOT_SELECTED: new APIError(400, APIErrorMessage.TICKET_NOT_SELECTED),
  OTHER_NOT_ENTERED: new APIError(400, APIErrorMessage.OTHER_NOT_ENTERED),
  SUBPROJECT_ALREADY_EXISTS: new APIError(400, APIErrorMessage.SUBPROJECT_ALREADY_EXISTS),
  SUBPROJECT_NOT_FOUND: new APIError(404, APIErrorMessage.SUBPROJECT_NOT_FOUND),
  ROLE_NOT_FOUND: new APIError(404, APIErrorMessage.ROLE_NOT_FOUND),
};

export default errors;
