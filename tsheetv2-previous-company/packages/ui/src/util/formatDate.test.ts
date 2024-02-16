import formatDate, {offsetDate} from './formatDate';

describe('formatDate', () => {
  const exDate = '2022-06-07 20:00:00.000Z';
  it('Should return formatted date from date string', () => {
    expect(formatDate(exDate)).toEqual('06/07/2022');
  });
});

describe('offsetDate', () => {
  const exDate = '2022-06-07 20:00:00.000Z';
  it('Should add the number of days passed in and return the new offset date', () => {
    expect(offsetDate(exDate, 3)).toEqual('06/10/2022');
  });
});
