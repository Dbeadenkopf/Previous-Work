import mongoose from 'mongoose';

import {userIds} from '../db/seed/local/ids';
import {projectIds} from '../db/seed/shared/ids';
import errors from '../errors';
import Project from '../mongoose/models/project';
import request from '../util/supertest';

describe('/projects', () => {
  const project1_info = {label: 'BZ', name: 'Beauty Zone', lead: '62559d1466052aad915745ac'};
  const project2_info = {label: 'MPP', name: 'Medicare Provider Payment', lead: '62559d1466052aad915745ac'};
  const addSubProjectPayload = {
    subLabel: 'STV',
    subName: 'Steve',
    action: 'add',
  };
  const deleteSubProjectPayload = {
    subLabel: 'STV',
    subName: 'Steve',
    action: 'delete',
  };

  const projectId = projectIds.isp;
  const mockId = new mongoose.Types.ObjectId();

  describe('GET /', () => {
    it('Should return success', async () => {
      const {statusCode} = await request.get('/api/projects');

      expect(statusCode).toBe(200);
    });
  });

  describe('PUT /', () => {
    it('Should return success with _id', async () => {
      const {statusCode} = await request
        .put('/api/projects')
        .send({...project1_info, projectId: '63f7c11ad872c329ebfd8b8f'});
      expect(statusCode).toBe(200);
    });

    it('Should return success without _id', async () => {
      const {statusCode} = await request.put('/api/projects').send(project2_info);
      expect(statusCode).toBe(200);
    });
  });

  describe('GET /:id', () => {
    it('Should return success', async () => {
      const {statusCode} = await request.get(`/api/projects/${projectId}`);
      expect(statusCode).toBe(200);
    });

    it('Should return not found', async () => {
      const {statusCode, body} = await request.get(`/api/projects/${mockId}`);
      expect(statusCode).toBe(404);
      expect(body.message).toBe(errors.PROJECT_NOT_FOUND.message);
    });
  });

  describe('PUT /:id', () => {
    const managerId = userIds.manny;
    const projectDetails = {
      name: 'new name',
      label: 'new label',
      lead: managerId,
    };

    it('Should successfully update project details', async () => {
      const {statusCode} = await request.put(`/api/projects/${projectId}`).send(projectDetails);
      expect(statusCode).toBe(200);
    });

    it('Should return project not found', async () => {
      const {statusCode, body} = await request.put(`/api/projects/${mockId}`).send(projectDetails);

      expect(statusCode).toBe(404);
      expect(body.message).toBe(errors.PROJECT_NOT_FOUND.message);
    });
  });

  describe('PUT /:id/:status', () => {
    const managerId = userIds.manny;
    const ISP = projectIds.isp;
    const fakeProject = '6328930de8d3591f7f6e7620';

    it('Should successfully archive a project (adds "removed" field to a project document)', async () => {
      const {statusCode} = await request.put(`/api/projects/${ISP}/archived`).send({userId: managerId});
      expect(statusCode).toBe(200);
    });

    it('Should successfully activate a project (removes "removed" field from a project document)', async () => {
      const {statusCode} = await request.put(`/api/projects/${ISP}/active`).send({userId: managerId});
      expect(statusCode).toBe(200);
    });

    it('Should return project not found', async () => {
      const {statusCode, body} = await request
        .put(`/api/projects/${fakeProject}/active`)
        .send({userId: managerId});

      expect(statusCode).toBe(404);
      expect(body.message).toBe(errors.PROJECT_NOT_FOUND.message);
    });
  });

  describe('PUT /:id/subprojects', () => {
    it('Should successfully insert a new subproject', async () => {
      const {statusCode} = await request
        .put(`/api/projects/${projectId}/subprojects`)
        .send(addSubProjectPayload);
      expect(statusCode).toBe(200);
    });

    it('Should return invalid subproject', async () => {
      const {statusCode, body} = await request
        .put(`/api/projects/${projectId}/subprojects`)
        .send(addSubProjectPayload);
      expect(statusCode).toBe(400);
      expect(body.message).toBe(errors.SUBPROJECT_ALREADY_EXISTS.message);
    });

    it('Should successfully delete a subproject', async () => {
      await request.put(`/api/projects/${projectId}/subprojects`).send(deleteSubProjectPayload);

      const result = await Project.findOne({
        subProjects: {$elemMatch: {label: deleteSubProjectPayload.subLabel}},
      });

      expect(result).toBeNull();
    });

    it('Should return not found', async () => {
      const {statusCode, body} = await request
        .put(`/api/projects/${projectId}/subprojects`)
        .send(deleteSubProjectPayload);

      expect(statusCode).toBe(404);
      expect(body.message).toBe(errors.SUBPROJECT_NOT_FOUND.message);
    });
  });
});
