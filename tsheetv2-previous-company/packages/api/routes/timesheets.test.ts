import {userIds} from '../db/seed/local/ids';
import timesheetSeed from '../db/seed/local/timesheetSeed';
import projectSeed from '../db/seed/shared/projectSeed';
import errors from '../errors';
import request from '../util/supertest';

describe('/timesheets ', () => {
  const timesheet = timesheetSeed[5];
  const {adam} = userIds;
  const project = projectSeed({aaron: adam, dicky: adam, jesse: adam, peter: adam, phillip: adam})[0];

  describe('GET /:id', () => {
    it('Should return success', async () => {
      const {statusCode} = await request.get(`/api/timesheets/${timesheet._id}`);
      expect(statusCode).toBe(200);
    });

    it('Should return not found', async () => {
      const {statusCode, body} = await request.get(`/api/timesheets/${adam}`);
      expect(statusCode).toBe(404);
      expect(body.message).toBe(errors.TIMESHEET_NOT_FOUND.message);
    });
  });

  describe('PUT /:id/comments', () => {
    const commentPayload = {
      comment: 'Great job!',
    };

    it('Should return success', async () => {
      const {statusCode} = await request
        .put(`/api/timesheets/${timesheet._id}/comments`)
        .send(commentPayload);
      expect(statusCode).toBe(200);
    });

    it('Should return timesheet not found', async () => {
      const {statusCode, body} = await request.put(`/api/timesheets/${adam}/comments`).send(commentPayload);
      expect(statusCode).toBe(404);
      expect(body.message).toBe(errors.TIMESHEET_NOT_FOUND.message);
    });
  });

  describe('PUT /:id/:status', () => {
    it('Should return success for submitted status', async () => {
      const {statusCode} = await request.put(`/api/timesheets/${timesheet._id}/submitted`);
      expect(statusCode).toBe(200);
    });

    it('Should return success after resubmitting rejected timesheet and log email', async () => {
      await request.put(`/api/timesheets/${timesheet._id}/submitted`);

      await request.put(`/api/timesheets/${timesheet._id}/rejected`);

      const {statusCode} = await request.put(`/api/timesheets/${timesheet._id}/submitted`);

      expect(statusCode).toBe(200);
    });
    it('Should return success for rejected status', async () => {
      const {statusCode} = await request.put(`/api/timesheets/${timesheet._id}/rejected`);

      expect(statusCode).toBe(200);
    });

    it('Should return success for approved status', async () => {
      const {statusCode} = await request.put(`/api/timesheets/${timesheet._id}/approved`);

      expect(statusCode).toBe(200);
    });

    it('Should return timesheet not found', async () => {
      const {statusCode, body} = await request.put(`/api/timesheets/${adam}/submitted`);

      expect(statusCode).toBe(404);
      expect(body.message).toBe(errors.TIMESHEET_NOT_FOUND.message);
    });
  });

  describe('GET /', () => {
    it('Should return success (all timesheets)', async () => {
      const {statusCode} = await request.get(`/api/timesheets`);
      expect(statusCode).toBe(200);
    });

    it('Should return success (timesheets by weekOf and createdBy)', async () => {
      const {statusCode} = await request.get(`/api/timesheets`).query({
        createdBy: String(timesheet.created.user),
        weekOf: timesheet.weekOf,
      });
      expect(statusCode).toBe(200);
    });

    it('Should return success (timesheets by projectLabel)', async () => {
      const {statusCode} = await request.get(`/api/timesheets`).query({
        projectLabel: String(project.label),
      });
      expect(statusCode).toBe(200);
    });

    it('Should return success (submitted timesheets)', async () => {
      const {statusCode} = await request.get(`/api/timesheets`).query({status: 'submitted'});
      expect(statusCode).toBe(200);
    });

    it('Should return success (approved timesheets)', async () => {
      const {statusCode} = await request.get(`/api/timesheets`).query({status: 'approved'});
      expect(statusCode).toBe(200);
    });

    it('Should return success (unapproved timesheets)', async () => {
      const {statusCode} = await request.get(`/api/timesheets`).query({status: 'unapproved'});
      expect(statusCode).toBe(200);
    });

    it('Should return success (timesheets approved by userId)', async () => {
      const {statusCode} = await request.get(`/api/timesheets`).query({approvedBy: adam});
      expect(statusCode).toBe(200);
    });

    it('Should return success (rejected timesheet created by userId)', async () => {
      const {statusCode} = await request.get(`/api/timesheets`).query({createdBy: adam, status: 'rejected'});
      expect(statusCode).toBe(200);
    });
    it('Should return success (timesheets with individual day unsubmitted or submitted late by weekOf, date, and dayName)', async () => {
      const {statusCode} = await request
        .get(`/api/timesheets`)
        .query({date: new Date().toString(), weekOf: timesheet.weekOf, dayName: 'tue'});
      expect(statusCode).toBe(200);
    });
  });

  describe('PUT /', () => {
    it('Should return success with _id', async () => {
      const {statusCode} = await request
        .put('/api/timesheets')

        .send({
          timesheet: {_id: '6238b6da809a177db94e7adc'},
        });
      expect(statusCode).toBe(200);
    });

    it('Should return success without _id', async () => {
      const {statusCode} = await request
        .put('/api/timesheets')

        .send({timesheet: {}});
      expect(statusCode).toBe(200);
    });
  });

  describe('PUT /:id/time/:day/submitted', () => {
    const day = 'mon';

    it('Should return success', async () => {
      const {statusCode} = await request.put(`/api/timesheets/${timesheet._id}/time/${day}/submitted`);

      expect(statusCode).toBe(200);
    });

    it('Should return timesheet not found', async () => {
      const {code, message} = errors.TIMESHEET_NOT_FOUND;
      const {statusCode, body} = await request.put(`/api/timesheets/${adam}/time/${day}/submitted`);

      expect(statusCode).toBe(code);
      expect(body.message).toBe(message);
    });
  });
});
