const getCurrentMonday = () => {
  const d = new Date(new Date().setHours(0, 0, 0, 0));
  const day = d.getDay();
  /* istanbul ignore next */
  const diff = d.getDate() - day + (!day ? -6 : 1);
  d.setDate(diff);

  return d.toISOString();
};

export default getCurrentMonday;
