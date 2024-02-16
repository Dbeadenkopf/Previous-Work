import express from 'express';
import {Types} from 'mongoose';

import errors from '../errors';
import joiValidation from '../middleware/joiValidation';
import validateTimeslots from '../middleware/validateTimeslots';
import verifyToken from '../middleware/verifyToken';
import Timesheet from '../mongoose/models/timesheet';
import catchAsync from '../util/catchAsync';
import sendMail from '../util/email/sendEmail';
import formatDate from '../util/formatDate';
import {createMeta, options} from '../util/query';
import * as v from '../validations/timesheets';

const router = express.Router();

const paths = [
  'approved.user',
  'comments.created.user',
  'created.user',
  'rejected.user',
  'submitted.user',
  'updated.user',
];

router.get(
  '/:id',
  verifyToken,
  joiValidation(v.timesheets_id_get),
  catchAsync(async (req, res, next) => {
    const timesheet = await Timesheet.findById(req.params.id).populate([
      ...paths,
      {
        path: 'created.user',
        populate: {
          path: 'approver',
        },
      },
    ]);

    return !timesheet ? next(errors.TIMESHEET_NOT_FOUND) : res.json(timesheet);
  })
);

router.put(
  '/:id/comments',
  verifyToken,
  joiValidation(v.timesheets_id_comment_put),
  catchAsync(async (req, res, next) => {
    const comment = {
      content: req.body.comment,
      created: createMeta(req),
    };

    const timesheet = await Timesheet.findByIdAndUpdate(
      req.params.id,
      {
        $push: {comments: comment},
      },
      options
    ).populate(paths);

    if (timesheet) {
      await sendMail({
        to: timesheet.created.user.email,
        subject: `Comment on timesheet for ${formatDate(timesheet.created.date)}`,
        html: `<p>${timesheet.comments[timesheet.comments.length - 1].created.user.firstName} ${
          timesheet.comments[timesheet.comments.length - 1].created.user.lastName
        } commented on timesheet for week ${formatDate(timesheet.created.date)}</p>`,
      });
    }

    return !timesheet ? next(errors.TIMESHEET_NOT_FOUND) : res.json(timesheet);
  })
);

router.put(
  '/:id/:status',
  verifyToken,
  joiValidation(v.timesheets_id_status_put),
  catchAsync(async (req, res, next) => {
    const timesheetId = req.params.id;
    const status = req.params.status;

    const meta = createMeta(req);

    const timesheet = await Timesheet.findByIdAndUpdate(
      timesheetId,
      {
        $set: {[status]: meta},
      },
      options
    ).populate([
      ...paths,
      {
        path: 'created.user',
        populate: {
          path: 'approver',
        },
      },
    ]);

    if (timesheet) {
      switch (status) {
        case 'submitted':
          if (timesheet.rejected && !timesheet.approved) {
            await sendMail({
              to: timesheet.created.user.approver.email,
              subject: `${timesheet.created.user.firstName} ${timesheet.created.user.lastName} Timesheet Resubmission`,
              html: `<p>${timesheet.created.user.firstName}  ${
                timesheet.created.user.lastName
              } has resubmitted the timesheet for the week of ${formatDate(timesheet.weekOf)}</p>`,
            });
          }
          break;
        case 'rejected':
          await sendMail({
            to: timesheet.created.user.email,
            subject: `${timesheet.created.user.firstName} ${timesheet.created.user.lastName} Timesheet Status Update`,
            html: `<p>Your timesheet for the week of ${formatDate(
              timesheet.weekOf
            )} has been <span style="color:red;">${status}</span></p>`,
          });
          break;
        case 'approved':
          await sendMail({
            to: timesheet.created.user.email,
            subject: `${timesheet.created.user.firstName} ${timesheet.created.user.lastName} Timesheet Status Update`,
            html: `<p>Your timesheet for the week of ${formatDate(
              timesheet.weekOf
            )} has been <span style="color:green;">${status}</span></p>`,
          });
          break;
      }
    }

    return !timesheet ? next(errors.TIMESHEET_NOT_FOUND) : res.json(timesheet);
  })
);

router
  .route('/')
  .get(
    verifyToken,
    joiValidation(v.timesheets_get),
    catchAsync(async (req, res) => {
      const {createdBy, weekOf, status, approvedBy, projectLabel, date, dayName} = req.query;

      let filter = {};

      if (createdBy) {
        filter = {...filter, 'created.user': createdBy};
      }

      if (weekOf) {
        filter = {...filter, weekOf};
        if (dayName) {
          filter = {
            ...filter,
            $or: [
              {[`time.${dayName}.submitted`]: {$exists: false}},
              {[`time.${dayName}.submitted.date`]: {$gte: date}},
            ],
          };
        }
      }

      if (projectLabel) {
        filter = {
          ...filter,
          $or: [
            {'time.mon.hours': {$elemMatch: {'project.label': projectLabel}}},
            {'time.tue.hours': {$elemMatch: {'project.label': projectLabel}}},
            {'time.wed.hours': {$elemMatch: {'project.label': projectLabel}}},
            {'time.thu.hours': {$elemMatch: {'project.label': projectLabel}}},
            {'time.fri.hours': {$elemMatch: {'project.label': projectLabel}}},
            {'time.sat.hours': {$elemMatch: {'project.label': projectLabel}}},
            {'time.sun.hours': {$elemMatch: {'project.label': projectLabel}}},
          ],
        };
      }

      if (status === 'submitted') {
        filter = {
          ...filter,
          submitted: {$exists: true},
          approved: {$exists: false},
          $or: [
            {rejected: {$exists: false}},
            {
              $where: 'this.submitted.date > this.rejected.date',
            },
          ],
        };
      }

      if (status === 'approved') {
        filter = {
          ...filter,
          approved: {$exists: true},
        };
      }

      if (status === 'rejected') {
        filter = {
          ...filter,
          rejected: {$exists: true},
          $and: [
            {approved: {$exists: false}},
            {
              $where: 'this.rejected.date > this.submitted.date',
            },
          ],
        };
      }

      if (status === 'unapproved') {
        filter = {
          ...filter,
          submitted: {$exists: true},
          approved: {$exists: false},
          'submitted.date': {$lte: new Date(Date.now() - 48 * 60 * 60 * 1000)},
          $or: [{rejected: {$exists: false}}, {$where: 'this.rejected.date < this.submitted.date'}],
        };
      }

      if (approvedBy) {
        filter = {...filter, 'approved.user': approvedBy};
      }

      const timesheets = await Timesheet.find(filter).populate([
        ...paths,
        {
          path: 'created.user',
          populate: {path: 'approver', populate: 'approver'},
        },
        {
          path: 'submitted.user',
          populate: {path: 'approver', populate: 'approver'},
        },
      ]);

      res.json(timesheets);
    })
  )

  // TODO: refactor as POST endpoint to create new timesheet, and a PUT /:id endpoint to update
  .put(
    verifyToken,
    joiValidation(v.timesheets_put),
    catchAsync(async (req, res) => {
      const {timesheet} = req.body;

      const meta = createMeta(req);

      const update = timesheet._id
        ? {...timesheet, updated: meta}
        : {_id: new Types.ObjectId(), ...timesheet, created: meta};

      const result = await Timesheet.findByIdAndUpdate(update._id, update, {
        ...options,
        upsert: true,
      }).populate(paths);

      res.json(result);
    })
  );

router.put(
  '/:id/time/:day/submitted',
  verifyToken,
  joiValidation(v.timesheets_id_time_day_submitted_put),
  validateTimeslots,
  catchAsync(async (req, res, next) => {
    const {id, day} = req.params;

    const timesheet = await Timesheet.findByIdAndUpdate(
      id,
      {
        [`time.${day}.submitted`]: createMeta(req),
      },
      options
    );

    return !timesheet ? next(errors.TIMESHEET_NOT_FOUND) : res.json(timesheet);
  })
);

export default router;
