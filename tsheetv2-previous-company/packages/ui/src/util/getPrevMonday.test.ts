import getPrevMonday from './getPrevMonday';

describe('getPrevMonday', () => {
  it('Should return the monday of the current week', () => {
    const d = new Date(new Date().setHours(0, 0, 0, 0));
    const day = d.getDay();
    const diff = d.getDate() - (day + (!day ? 13 : 6));
    d.setDate(diff);

    expect(getPrevMonday()).toEqual(d.toISOString());
  });
});
