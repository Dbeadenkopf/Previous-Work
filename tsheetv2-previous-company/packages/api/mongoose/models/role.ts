import {model} from 'mongoose';

import User from '../models/user';
import {role} from '../schemas';

role.post('findOneAndDelete', async (document) => {
  if (document) {
    const {_id} = document;
    await User.updateMany({$pull: {roles: {$in: [{_id}]}}});
  }
});

export default model('Role', role);
