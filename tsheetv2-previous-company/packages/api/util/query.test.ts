import {Request} from 'express';

import {createMeta} from './query';

describe('createMeta', () => {
  it('Should return meta data', () => {
    const req = {ip: 'test', body: {userId: 'test'}};
    const meta = createMeta(req as Request);

    expect(meta.ip).toEqual(req.ip);
    expect(meta.user).toEqual(req.body.userId);
  });
});
