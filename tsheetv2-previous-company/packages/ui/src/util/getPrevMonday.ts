const getPrevMonday = () => {
  const d = new Date(new Date().setHours(0, 0, 0, 0));
  const day = d.getDay();
  /* istanbul ignore next */
  const diff = d.getDate() - (day + (!day ? 13 : 6));
  d.setDate(diff);

  return d.toISOString();
};

export default getPrevMonday;
