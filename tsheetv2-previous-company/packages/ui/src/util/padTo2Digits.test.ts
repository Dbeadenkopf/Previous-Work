import padTo2Digits from './padTo2Digits';

describe('padTo2Digits', () => {
  it('Should return padded number as string', () => {
    expect(padTo2Digits(1)).toEqual('01');
  });
});
