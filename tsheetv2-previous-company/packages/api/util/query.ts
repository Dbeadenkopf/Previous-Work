import {Request} from 'express';

export const options = {
  new: true,
  runValidators: true,
};

export const createMeta = (req: Request) => {
  const {ip, body} = req;

  return {date: new Date(), ip, user: body.userId};
};
