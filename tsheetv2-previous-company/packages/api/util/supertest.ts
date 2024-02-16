/* istanbul ignore file */
import jwt from 'jsonwebtoken';
import {agent as supertest} from 'supertest';

import app from '../app';
import userSeed from '../db/seed/local/userSeed';

const {_id, roles} = userSeed[0];
const [header, payload, signature] = jwt
  .sign({_id, roles}, process.env.TIMESHEET_SECRET as string, {expiresIn: '5m'})
  .split('.');

const request = supertest(app);
request.set({cookie: [`accessToken=${header}.${payload}`], authorization: [`Bearer ${signature}`]});

export default request;
