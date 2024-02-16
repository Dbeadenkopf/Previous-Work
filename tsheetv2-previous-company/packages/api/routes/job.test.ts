import request from '../util/supertest';

describe('/job', () => {
  describe('PUT /run', () => {
    it('Should return running status', async () => {
      const {statusCode} = await request.put('/api/job/run').send({
        rule: '*/5 * * * * *',
        jobName: 'exampleJob',
      });
      expect(statusCode).toBe(200);
    });
  });

  describe('PUT /cancel', () => {
    it('Should return cancellation status', async () => {
      const {statusCode} = await request.put('/api/job/cancel').send({
        jobName: 'exampleJob',
      });
      expect(statusCode).toBe(200);
    });
  });
});
