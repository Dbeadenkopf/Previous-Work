import mongoose from 'mongoose';

import {roleIds} from '../db/seed/shared/ids';
import errors from '../errors';
import request from '../util/supertest';

describe('/roles ', () => {
  const role = roleIds.timesheetWriter;
  const fakeRole = new mongoose.Types.ObjectId();

  const role1_info = {
    name: 'Example1 Role',
    description: 'example description of example1 role',
    permissions: ['EXAMPLE1_READ', 'EXAMPLE1_WRITE'],
    userId: '62607cbed7d2b193f8e30dcc',
  };
  const role2_info = {
    name: 'Example2 Role',
    description: 'example description of example2 role',
    permissions: ['EXAMPLE2_READ', 'EXAMPLE2_WRITE'],
    roleId: role,
    userId: '62607cbed7d2b193f8e30dcc',
  };

  describe('GET /', () => {
    it('Should return success with all roles', async () => {
      const {statusCode} = await request.get(`/api/roles`);
      expect(statusCode).toBe(200);
    });
  });
  describe('PUT /', () => {
    it('Should return success without roleId', async () => {
      const {statusCode} = await request.put('/api/roles').send(role1_info);
      expect(statusCode).toBe(200);
    });
    it('Should return success with roleId', async () => {
      const {statusCode} = await request.put('/api/roles').send(role2_info);
      expect(statusCode).toBe(200);
    });
    it('Should return error on duplicate role entry', async () => {
      const {statusCode} = await request.put('/api/roles').send(role1_info);

      expect(statusCode).toBe(400);
    });
  });

  describe('DELETE /roles/:id ', () => {
    it('Should return success', async () => {
      const {statusCode} = await request.delete(`/api/roles/${role}`);
      expect(statusCode).toBe(200);
    });

    it('Should return not found', async () => {
      const {statusCode, body} = await request.delete(`/api/roles/${fakeRole}`);

      expect(statusCode).toBe(404);
      expect(body.message).toBe(errors.ROLE_NOT_FOUND.message);
    });
  });
});
