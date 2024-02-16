import express, {CookieOptions} from 'express';
import {OAuth2Client} from 'google-auth-library';
import jwt from 'jsonwebtoken';
import {Types} from 'mongoose';
import {rescheduleJob, scheduledJobs} from 'node-schedule';

import {roleIds} from '../db/seed/shared/ids';
import errors from '../errors';
import joiValidation from '../middleware/joiValidation';
import verifyToken from '../middleware/verifyToken';
import Users from '../mongoose/models/user';
import catchAsync from '../util/catchAsync';
import {runJob} from '../util/job/scheduleJob';
import {createMeta, options} from '../util/query';
import {getSlackIdByEmail} from '../util/slack';
import * as v from '../validations/users';

const router = express.Router();

const secretKey = process.env.TIMESHEET_SECRET as string;
const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  secure: true,
};

const paths = ['approver', 'created.user', 'removed.user', 'roles', 'supervisor', 'updated.user'];

router.get(
  '/',
  verifyToken,
  joiValidation(v.users_get),
  catchAsync(async (req, res) => {
    const {supervisor, status} = req.query;

    let filter = {};

    filter = {...filter, removed: {$exists: false}, firstName: {$ne: 'Scheduler'}};

    if (supervisor) {
      filter = {...filter, supervisor};
    }

    if (status === 'removed') {
      filter = {...filter, removed: {$exists: true}};
    }

    const users = await Users.find(filter).populate(paths);

    res.json({users});
  })
);

router.get(
  '/:id',
  verifyToken,
  joiValidation(v.users_id_get),
  catchAsync(async (req, res, next) => {
    const user = await Users.findById(req.params.id).populate(paths);
    return !user ? next(errors.USER_NOT_FOUND) : res.json(user);
  })
);

// TODO: rename /:id/notifications (PUT), send id as route param
router.put(
  '/notifications',
  verifyToken,
  joiValidation(v.users_notifications_put),
  catchAsync(async (req, res) => {
    const {userId, notifications, email, timezone} = req.body;

    const meta = createMeta(req);

    const notificationSettings = {dayOfWeek: [1, 2, 3, 4, 5], second: 0, tz: timezone};
    const slackTime = {
      minute: Number(notifications.slack.submission.time.minute),
      hour: Number(notifications.slack.submission.time.hour),
    };
    const emailTime = {
      minute: Number(notifications.email.submission.time.minute),
      hour: Number(notifications.email.submission.time.hour),
    };

    if (notifications.slack.submission.on && scheduledJobs[`${userId}-daily-submission-reminder-slack`]) {
      rescheduleJob(`${userId}-daily-submission-reminder-slack`, {...notificationSettings, ...slackTime});
    }

    if (notifications.email.submission.on && scheduledJobs[`${userId}-daily-submission-reminder-email`]) {
      rescheduleJob(`${userId}-daily-submission-reminder-email`, {...notificationSettings, ...emailTime});
    }

    if (
      notifications.slack.submission.on &&
      scheduledJobs[`${userId}-daily-submission-reminder-slack`] === undefined
    ) {
      runJob({
        rule: {...notificationSettings, ...slackTime},
        jobName: `daily-submission-reminder-slack`,
        userInfo: {id: userId, email},
      });
    }

    if (
      notifications.email.submission.on &&
      scheduledJobs[`${userId}-daily-submission-reminder-email`] === undefined
    ) {
      runJob({
        rule: {...notificationSettings, ...emailTime},
        jobName: `daily-submission-reminder-email`,
        userInfo: {id: userId, email},
      });
    }

    const result = await Users.findByIdAndUpdate(
      req.body.userId,
      {notifications, updated: meta},
      options
    ).populate(paths);
    res.json(result);
  })
);

router.post(
  '/login',
  joiValidation(v.users_login_post),
  catchAsync(async (req, res, next) => {
    const {credential} = req.body;

    let email = credential;

    /* istanbul ignore if */
    if (process.env.NODE_ENV === 'production') {
      const client = new OAuth2Client(process.env.TIMESHEET_OAUTH2_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.TIMESHEET_OAUTH2_CLIENT_ID,
      });
      email = ticket.getPayload()?.email;
    }

    const user = await Users.findOne({email}).populate(paths);

    if (!user) {
      return next(errors.USER_NOT_FOUND);
    }

    const {_id, roles} = user;
    const maxAge = 28800000;
    const [header, payload, signature] = jwt
      .sign({_id, roles}, secretKey, {expiresIn: `${maxAge}`})
      .split('.');

    res
      .cookie('accessToken', `${header}.${payload}`, {...cookieOptions, maxAge})
      .json({user, exp: `${new Date().getTime() + maxAge}`, signature});
  })
);

router.post(
  '/logout',
  catchAsync(async (req, res) => {
    res.clearCookie('accessToken', cookieOptions).json({message: 'Successfully logged out'});
  })
);

// TODO: rename /:id (PUT), consolidating with the existing /:id (PUT) route below and refactor to use upsert
// this endpoint will then serve to add or edit users
router.put(
  '/timezone',
  verifyToken,
  joiValidation(v.users_timezone_put),
  catchAsync(async (req, res) => {
    const {notifications, timezone, userId} = req.body;
    const meta = {
      date: new Date(),
      ip: req.ip,
      user: userId,
    };

    const notificationSettings = {dayOfWeek: [1, 2, 3, 4, 5], second: 0, tz: timezone};
    const slackTime = {
      minute: Number(notifications.slack.submission.time.minute),
      hour: Number(notifications.slack.submission.time.hour),
    };
    const emailTime = {
      minute: Number(notifications.email.submission.time.minute),
      hour: Number(notifications.email.submission.time.hour),
    };

    if (notifications.slack.submission.on && scheduledJobs[`${userId}-daily-submission-reminder-slack`]) {
      rescheduleJob(`${userId}-daily-submission-reminder-slack`, {...notificationSettings, ...slackTime});
    }

    if (notifications.email.submission.on && scheduledJobs[`${userId}-daily-submission-reminder-email`]) {
      rescheduleJob(`${userId}-daily-submission-reminder-email`, {...notificationSettings, ...emailTime});
    }

    const result = await Users.findByIdAndUpdate(
      userId,
      {timezone, updated: meta},
      {new: true, runValidators: true}
    ).populate(paths);

    res.json(result);
  })
);

router.post(
  '/register',
  verifyToken,
  catchAsync(async (req, res, next) => {
    const email = req.body.email;
    const slackId = await getSlackIdByEmail(email);

    const newUser = {
      _id: new Types.ObjectId(),
      approver: req.body.supervisor,
      created: {
        date: new Date(),
        ip: req.ip,
        user: req.body.userId,
      },
      email: email,
      firstName: req.body.first,
      lastName: req.body.last,
      roles: [roleIds.timesheetWriter],
      title: req.body.title,
      supervisor: req.body.supervisor,
      ...(!!slackId && {slackId: slackId}),
      notifications: {
        email: {
          submission: {on: true, time: {hour: '17', minute: '0', period: 'PM'}},
          approval: true,
          rejection: true,
          comment: true,
          approvalReminder: true,
          resubmission: true,
        },
        slack: {
          submission: {on: true, time: {hour: '17', minute: '0', period: 'PM'}},
          approval: true,
          rejection: true,
          comment: true,
          approvalReminder: true,
          resubmission: true,
        },
      },
      timezone: 'America/New_York',
    };

    const exists = await Users.findOne({email});

    if (exists) {
      return next(errors.EMAIL_ALREADY_EXISTS);
    }

    Users.insertMany(newUser);

    // set daily slack and email reminders for new user to 5:00 pm.  User can change in notification settings.
    const settings = {minute: 0, dayOfWeek: [1, 2, 3, 4, 5], hour: 17, tz: 'America/New_York'};

    runJob({
      rule: settings,
      jobName: 'daily-submission-reminder-slack',
      userInfo: {id: newUser._id.toString(), email},
    });
    runJob({
      rule: settings,
      jobName: 'daily-submission-reminder-email',
      userInfo: {id: newUser._id.toString(), email},
    });

    return res.status(201).json(newUser);
  })
);

router.put(
  '/:id/removed',
  verifyToken,
  joiValidation(v.users_remove),
  catchAsync(async (req, res) => {
    const {id} = req.params;
    const {status} = req.query;

    const meta = createMeta(req);

    let filter = {};

    filter = {...filter, updated: meta};

    if (status === 'active') {
      filter = {...filter, $unset: {removed: ''}};
    } else {
      filter = {...filter, removed: meta};
    }

    const users = await Users.findByIdAndUpdate(id, filter, options).populate(paths);

    res.json(users);
  })
);

router.put(
  '/:id',
  verifyToken,
  joiValidation(v.users_put),
  catchAsync(async (req, res) => {
    const {id} = req.params;
    const {title, roles} = req.body;

    const meta = createMeta(req);

    const filter = {roles, title, updated: meta};

    const result = await Users.findByIdAndUpdate(id, filter, options).populate(paths);
    res.json(result);
  })
);

export default router;
