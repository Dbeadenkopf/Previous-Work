import express from 'express';
import {Types} from 'mongoose';

import errors from '../errors';
import joiValidation from '../middleware/joiValidation';
import verifyToken from '../middleware/verifyToken';
import Roles from '../mongoose/models/role';
import catchAsync from '../util/catchAsync';
import {createMeta, options} from '../util/query';
import * as v from '../validations/roles';

const router = express.Router();

router
  .route('/')
  .get(
    catchAsync(async (req, res) => {
      const roles = await Roles.find().sort('name');

      res.json({roles});
    })
  )

  // TODO: refactor as POST endpoint to create new role, and a PUT /:id endpoint to update
  .put(
    verifyToken,
    joiValidation(v.roles_put),
    catchAsync(async (req, res) => {
      const {roleId, name, description, permissions} = req.body;

      const meta = createMeta(req);

      const update = roleId ? {_id: roleId, updated: meta} : {_id: new Types.ObjectId(), created: meta};

      const result = await Roles.findByIdAndUpdate(
        update._id,
        {...update, name, description, permissions},
        {
          ...options,
          upsert: true,
        }
      );

      res.json(result);
    })
  );

router.delete(
  '/:id',
  verifyToken,
  joiValidation(v.roles_remove),
  catchAsync(async (req, res, next) => {
    const result = await Roles.findOneAndDelete({_id: req.params.id});

    return !result ? next(errors.ROLE_NOT_FOUND) : res.json('Role deleted!');
  })
);

export default router;
