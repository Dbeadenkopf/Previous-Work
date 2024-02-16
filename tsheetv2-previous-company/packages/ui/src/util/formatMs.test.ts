import formatMs from './formatMs';

describe('formatMs', () => {
  it('Should format positive milliseconds to positive hours and minutes', () => {
    expect(formatMs(3600000)).toEqual('01:00');
  });

  it('Should format negative milliseconds to negative hours and minutes', () => {
    expect(formatMs(-3600000)).toEqual('-01:00');
  });
});
