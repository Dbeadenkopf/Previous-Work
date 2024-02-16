import schedule from "node-schedule";
import { load } from "./extract-transform-load.js";

const rule = new schedule.RecurrenceRule();
rule.hour = 16;
rule.minute = 3;
rule.dayOfWeek = 0;
schedule.scheduleJob(rule, function () {
  load();
});
