import jwt, {JwtPayload} from 'jsonwebtoken';

import errors from '../errors';
import catchAsync from '../util/catchAsync';

const verifyToken = catchAsync(async (req, res, next) => {
  const {
    cookies: {accessToken},
    headers: {authorization},
    body,
  } = req;

  if (!accessToken || !authorization) {
    next(errors.CREDENTIALS_NOT_FOUND);
  }

  const signature = authorization?.split(' ')[1];

  const decoded = jwt.verify(
    `${accessToken}.${signature}`,
    process.env.TIMESHEET_SECRET as string
  ) as JwtPayload;

  body.userId = decoded._id;

  next();
});

export default verifyToken;
