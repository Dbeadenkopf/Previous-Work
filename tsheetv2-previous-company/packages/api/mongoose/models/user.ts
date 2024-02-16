import {model} from 'mongoose';

import {user} from '../schemas';

import './role';

export default model('User', user);
