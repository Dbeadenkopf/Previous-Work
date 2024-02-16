import {NextFunction, Request, Response} from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const {method, originalUrl} = req;
    const {statusCode} = res;
    const duration = getDurationInMilliseconds(start).toFixed(2);
    const type = logType(statusCode);
    // eslint-disable-next-line no-console
    console.log(`${formattedTime()} ${type} | ${method} ${originalUrl} took ${duration}ms [${statusCode}]`);
  });

  next();
};

// LogType represents logging type based off the response status code
// "I" for Informational in light blue, "E" for Error in red
const logType = (statusCode: number) => (statusCode === 500 ? '\x1b[31mE\x1b[0m' : '\x1b[94mI\x1b[0m');

// getDurationInMilliseconds return duration in milliseconds
const getDurationInMilliseconds = (start: [number, number]) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const formattedTime = () => {
  const time = new Date();
  return (
    time.getFullYear() +
    '-' +
    (time.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    time.getDate().toString().padStart(2, '0') +
    ' ' +
    time.getHours().toString().padStart(2, '0') +
    ':' +
    time.getMinutes().toString().padStart(2, '0') +
    ':' +
    time.getSeconds().toString().padStart(2, '0') +
    ':' +
    time.getMilliseconds().toString().padStart(3, '0')
  );
};

export default logger;
