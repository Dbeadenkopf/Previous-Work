import express from 'express';
import schedule from 'node-schedule';

import verifyToken from '../middleware/verifyToken';
import catchAsync from '../util/catchAsync';
import {cancelJob, runJob} from '../util/job/scheduleJob';

const router = express.Router();

router.put(
  '/run',
  verifyToken,
  catchAsync(async (req, res) => {
    const {rule, jobName} = req.body;

    /* istanbul ignore if */
    if (schedule.scheduledJobs[jobName]) {
      cancelJob(jobName);
    }

    runJob({rule, jobName});

    return res.json({message: `scheduled ${jobName}`});
  })
);

router.put(
  '/cancel',
  verifyToken,
  catchAsync(async (req, res) => {
    const {jobName} = req.body;

    cancelJob(jobName);

    return res.json({message: `canceled ${jobName}`});
  })
);

export default router;
