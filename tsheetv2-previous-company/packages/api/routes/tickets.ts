import express from 'express';

import joiValidation from '../middleware/joiValidation';
import verifyToken from '../middleware/verifyToken';
import catchAsync from '../util/catchAsync';
import getProjectTickets from '../util/jiraRequest';
import * as v from '../validations/tickets';

const router = express.Router();

// Get tickets for the requested project
router.get(
  '/',
  verifyToken,
  joiValidation(v.tickets_get),
  catchAsync(async (req, res) => {
    const {projectLabel} = req.query;

    const {issues} = await getProjectTickets(projectLabel as string);
    const tickets = issues?.map((i: {key: string}) => i.key) ?? [];

    res.json({tickets});
  })
);

export default router;
