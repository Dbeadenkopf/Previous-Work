import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {json} from 'express';

import errors from './errors';
import errorHandler from './middleware/errorHandler';
import logger from './middleware/logger';
import job from './routes/job';
import projects from './routes/projects';
import roles from './routes/roles';
import tickets from './routes/tickets';
import timesheets from './routes/timesheets';
import users from './routes/users';

const app = express();
// middleware
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:2000', 'https://sprint-tsheetv2.t1cg.codes', 'https://timesheet.t1cg.io'],
  })
);
app.use(json());
app.use(cookieParser());
process.env.NODE_ENV !== 'test' && app.use(logger);

// routes
app.use('/api/timesheets', timesheets);
app.use('/api/projects', projects);
app.use('/api/tickets', tickets);
app.use('/api/users', users);
app.use('/api/job', job);
app.use('/api/roles', roles);
app.use((req, res, next) => next(errors.ROUTE_NOT_FOUND));
// error handling
app.use(errorHandler);

export default app;
