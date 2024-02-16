import getCurrentMonday from './getCurrentMonday';

describe('getCurrentMonday', () => {
  it('Should return the monday of the current week', () => {
    const d = new Date(new Date().setHours(0, 0, 0, 0));
    const day = d.getDay();
    const diff = d.getDate() - day + (!day ? -6 : 1);
    d.setDate(diff);

    expect(getCurrentMonday()).toEqual(d.toISOString());
  });
});
