import express from 'express';
import {Types} from 'mongoose';

import errors from '../errors';
import joiValidation from '../middleware/joiValidation';
import verifyToken from '../middleware/verifyToken';
import Project from '../mongoose/models/project';
import catchAsync from '../util/catchAsync';
import {createMeta, options} from '../util/query';
import * as v from '../validations/projects';

const router = express.Router();

const paths = ['created.user', 'lead', 'removed.user', 'updated.user'];

router
  .route('/')
  .get(
    verifyToken,
    catchAsync(async (req, res) => {
      const projects = await Project.find().sort('label').populate(paths);
      res.status(200).json({projects});
    })
  )

  // TODO: refactor as POST endpoint to create new project, use PUT /:id endpoint to update
  .put(
    verifyToken,
    joiValidation(v.projects_put),
    catchAsync(async (req, res) => {
      const {projectId, label, name, lead} = req.body;

      const meta = createMeta(req);

      const update = projectId ? {_id: projectId, updated: meta} : {_id: new Types.ObjectId(), created: meta};

      const result = await Project.findByIdAndUpdate(
        update._id,
        {...update, label, name, lead},
        {...options, upsert: true}
      );

      res.json(result);
    })
  );

router
  .route('/:id')
  .get(
    catchAsync(async (req, res, next) => {
      const project = await Project.findById(req.params.id).populate(paths);
      return !project ? next(errors.PROJECT_NOT_FOUND) : res.json(project);
    })
  )
  .put(
    verifyToken,
    joiValidation(v.projects_id_put),
    catchAsync(async (req, res, next) => {
      const {name, label, lead} = req.body;

      let update = {};

      if (name) {
        update = {...update, name};
      }

      if (label) {
        update = {...update, label};
      }

      if (lead) {
        update = {...update, lead};
      }

      const project = await Project.findByIdAndUpdate(
        req.params.id,
        {...update, updated: createMeta(req)},
        {new: true}
      );

      return !project ? next(errors.PROJECT_NOT_FOUND) : res.json(project);
    })
  );

// TODO: add/remove subprojects on the FE, send array of subprojects in the body
router.put(
  '/:id/subprojects',
  catchAsync(async (req, res, next) => {
    const {subLabel, subName, action} = req.body;
    const projectId = req.params.id;
    let update = {};

    const exists = await Project.findOne({subProjects: {$elemMatch: {label: subLabel}}});

    if (action === 'add') {
      if (exists) {
        return next(errors.SUBPROJECT_ALREADY_EXISTS);
      } else {
        update = {
          ...update,
          $push: {subProjects: {$each: [{label: subLabel, name: subName}], $sort: {label: 1}}},
        };
      }
    }

    if (action === 'delete') {
      if (!exists) {
        return next(errors.SUBPROJECT_NOT_FOUND);
      } else {
        update = {
          ...update,
          $pull: {subProjects: {label: subLabel, name: subName}},
        };
      }
    }

    const result = await Project.findByIdAndUpdate(projectId, update, options);
    return res.json(result);
  })
);

// TODO: rename /:id/removed (PUT), send boolean to unset in the body
router.put(
  '/:id/:status',
  verifyToken,
  joiValidation(v.projects_id_status_put),
  catchAsync(async (req, res, next) => {
    const {id, status} = req.params;

    let update = {};

    const meta = createMeta(req);

    if (status === 'archived') {
      update = {
        ...update,
        removed: meta,
        updated: meta,
      };
    }

    if (status === 'active') {
      update = {
        ...update,
        $unset: {removed: 1},
        updated: meta,
      };
    }

    const project = await Project.findByIdAndUpdate(id, update, options);

    return !project ? next(errors.PROJECT_NOT_FOUND) : res.json(project);
  })
);

export default router;
