# Cron Job Scheduling

The `node-schedule` package is used in the app to schedule cron jobs (tasks that run on a specified schedule). To learn more about the package, visit <https://www.npmjs.com/package/node-schedule>.

The `runJob` and `cancelJob` functions in `scheduleJob.ts` are used to run and stop individual jobs throughout the app.

## Workflow

- Under the `runJob` function, use the `schedule.scheduleJob` function to run a process based on a given job name.

  - Note, every job takes a `rule` (i.e. time schedule) and a `jobName`.
  - Rules can be in the form of a _string_ using the following scheduling syntax:

    ```bash
    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    │
    │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
    │    │    │    │    └───── month (1 - 12)
    │    │    │    └────────── day of month (1 - 31)
    │    │    └─────────────── hour (0 - 23)
    │    └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, OPTIONAL)
    ```

  - E.g.

    ```js
    // Run 'exampleJob' every five seconds.
    runJob({rule: '*/5 * * * * *', jobName: 'exampleJob'});
    ```

  - Alternatively, you can instead use node-schedule `RecurrenceRule` syntax:

    ```js
    const rule = new schedule.RecurrenceRule();
    rule.second = new schedule.Range(0, 59, 5); // from 0-59 seconds, step every 5 seconds
    rule.dayOfWeek = [0, 6];

    runJob({rule, jobName: 'exampleJob'});
    ```

- When ready to run (or cancel) the job, make a call to job routes `/run` or `/cancel`, providing the appropriate `jobName` and `rule` data.
