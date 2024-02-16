import {enableFetchMocks} from 'jest-fetch-mock';

enableFetchMocks();
import request from '../util/supertest';

describe('/tickets', () => {
  describe('GET /', () => {
    it('Should return success with tickets', async () => {
      fetchMock.once(JSON.stringify({issues: [{key: 'TT-123'}]}));
      const {statusCode, body} = await request.get('/api/tickets?projectLabel=test');

      expect(statusCode).toBe(200);
      expect(body).toEqual({tickets: ['TT-123']});
    });

    it('Should return success without tickets', async () => {
      fetchMock.once(JSON.stringify({}));
      const {statusCode, body} = await request.get('/api/tickets?projectLabel=test');

      expect(statusCode).toBe(200);
      expect(body).toEqual({tickets: []});
    });
  });
});
