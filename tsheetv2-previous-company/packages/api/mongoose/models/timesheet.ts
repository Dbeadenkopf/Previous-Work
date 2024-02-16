import {model} from 'mongoose';

import {timesheet} from '../schemas';

import './user';

export default model('Timesheet', timesheet);
