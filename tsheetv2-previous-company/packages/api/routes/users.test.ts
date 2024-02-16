import {userIds} from '../db/seed/local/ids';
import {roleIds} from '../db/seed/shared/ids';
import errors from '../errors';
import request from '../util/supertest';

describe('/users ', () => {
  const {adam} = userIds;
  const exampleBody = {
    notifications: {
      email: {
        submission: {
          on: true,
          time: {
            hour: '10',
            minute: '30',
            period: 'AM',
          },
        },
        approval: false,
        rejection: false,
        comment: false,
        approvalReminder: false,
        resubmission: false,
      },
      slack: {
        submission: {
          on: true,
          time: {
            hour: '10',
            minute: '30',
            period: 'AM',
          },
        },
        approval: false,
        rejection: false,
        comment: false,
        approvalReminder: false,
        resubmission: false,
      },
    },
  };

  describe('GET /', () => {
    it('Should return success with all users', async () => {
      const {statusCode} = await request.get(`/api/users`);

      expect(statusCode).toBe(200);
    });

    it('Should return success with users under supervisor', async () => {
      const {statusCode} = await request
        .get(`/api/users`)

        .query({supervisor: adam});
      expect(statusCode).toBe(200);
    });

    it('Should return success with removed users', async () => {
      const {statusCode} = await request.get(`/api/users?status=removed`);

      expect(statusCode).toBe(200);
    });
  });

  describe('GET /:id', () => {
    it('Should return success', async () => {
      const {statusCode} = await request.get(`/api/users/${adam}`);

      expect(statusCode).toBe(200);
    });

    it('Should return not found', async () => {
      const {statusCode, body} = await request.get('/api/users/6317f5398a9ff49039e9934c');

      expect(statusCode).toBe(404);
      expect(body.message).toBe(errors.USER_NOT_FOUND.message);
    });
  });

  describe('PUT /users/notifications', () => {
    it('Should return success for changing the notifications settings', async () => {
      const {statusCode} = await request.put(`/api/users/notifications`).send(exampleBody);
      expect(statusCode).toBe(200);
    });
    it('Should return success for changing notifications and rescheduling/scheduling jobs', async () => {
      const {statusCode} = await request
        .put(`/api/users/notifications`)
        .send({...exampleBody, timezone: 'America/New_York'});
      expect(statusCode).toBe(200);
    });
  });

  describe('POST /login', () => {
    const loginPayload = {
      credential: 'emily.employee@t1cg.com',
    };
    const errorPayload = {
      credential: 'not_found@t1cg.com',
    };

    it('Should return success', async () => {
      const {statusCode} = await request.post('/api/users/login').send(loginPayload);
      expect(statusCode).toBe(200);
    });

    it('Should return not found', async () => {
      const {statusCode, body} = await request.post('/api/users/login').send(errorPayload);
      expect(statusCode).toBe(404);
      expect(body.message).toBe(errors.USER_NOT_FOUND.message);
    });
  });

  describe('POST /logout', () => {
    it('Should return success', async () => {
      const {statusCode} = await request.post(`/api/users/logout`);

      expect(statusCode).toBe(200);
    });
  });

  describe('POST /timezone', () => {
    it('Should return success', async () => {
      const {statusCode} = await request
        .put(`/api/users/timezone`)
        .send({...exampleBody, timezone: 'America/New_York'});

      expect(statusCode).toBe(200);
    });
  });

  describe('POST /register', () => {
    const newUserPayload = {
      first: 'a',
      last: 'b',
      email: 'c',
      title: 'd',
      supervisor: userIds.manny,
      userId: userIds.adam,
      notifications: {
        email: {
          submission: false,
          approval: false,
          rejection: false,
          comment: false,
          approvalReminder: false,
          resubmission: false,
        },
        slack: {
          submission: false,
          approval: false,
          rejection: false,
          comment: false,
          approvalReminder: false,
          resubmission: false,
        },
      },
    };

    const newUserSlackPayload = {
      ...newUserPayload,
      email: 'andrew.fleming@t1cg.com',
    };

    it('Should successfully add employee', async () => {
      const {statusCode} = await request.post('/api/users/register').send(newUserPayload);
      expect(statusCode).toBe(201);
    });

    it('Should successfully add employee with slackId', async () => {
      const {statusCode} = await request.post('/api/users/register').send(newUserSlackPayload);
      expect(statusCode).toBe(201);
    });

    it('Should return invalid user', async () => {
      await request.post('/api/users/register').send(newUserPayload);
      const {statusCode, body} = await request.post('/api/users/register').send(newUserPayload);
      expect(statusCode).toBe(400);
      expect(body.message).toBe(errors.EMAIL_ALREADY_EXISTS.message);
    });
  });

  describe('PUT /:id/removed', () => {
    it('Should return success and remove adam', async () => {
      const {statusCode} = await request.put(`/api/users/${adam}/removed`);
      expect(statusCode).toBe(200);
    });

    it('Should return success and reactivate adam', async () => {
      const {statusCode} = await request.put(`/api/users/${adam}/removed?status=active`);
      expect(statusCode).toBe(200);
    });
  });

  describe('PUT /:id', () => {
    const employeeInfoPayload = {
      title: 'Adam the almighty',
      roles: [roleIds.timesheetWriter],
    };

    it('Should return success for changing the title and removing a role', async () => {
      const {statusCode} = await request.put(`/api/users/${adam}`).send(employeeInfoPayload);
      expect(statusCode).toBe(200);
    });
    it('Should return success for changing the title and adding a role', async () => {
      const {statusCode} = await request.put(`/api/users/${adam}`).send(employeeInfoPayload);
      expect(statusCode).toBe(200);
    });
  });
});
