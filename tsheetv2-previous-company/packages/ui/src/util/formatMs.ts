import padTo2Digits from './padTo2Digits';

const formatMs = (ms: number) => {
  const minutes = Math.round(ms / 60000);

  const hours = minutes / 60;
  const minutesRemainder = minutes % 60;

  return minutes >= 0
    ? padTo2Digits(Math.floor(hours)) + ':' + padTo2Digits(Math.abs(minutesRemainder))
    : '-' + padTo2Digits(Math.abs(Math.ceil(hours))) + ':' + padTo2Digits(Math.abs(minutesRemainder));
};

export default formatMs;
