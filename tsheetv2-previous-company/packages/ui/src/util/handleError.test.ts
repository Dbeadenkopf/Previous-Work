import handleError from './handleError';

describe('handleError', () => {
  it('Should return default error', () => {
    expect(handleError(undefined)).toEqual('Internal server error');
  });
});
