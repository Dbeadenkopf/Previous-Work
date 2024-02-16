/* istanbul ignore file */
import {App} from '@slack/bolt';

export enum SLACK_USERS {
  ROHAN_MORE = 'U028DHH346R',
  AARON_GRAY = 'UPJ88CQP5',
  COLLIN_WOODRUFF = 'U8LF3HBQQ',
  DREW_FLEMING = 'U0320DSUM7D',
  JACKSON_STYER = 'U029WN0G9A7',
  JESSE_TOULA = 'U8W2EUJ0H',
  KRISTINE_PETTY = 'UL51F025R',
  NICK_GALANTOWICZ = 'U4PKUA2SC',
  SAM_ROUTT = 'UH38941SB',
  STEVE_FLINT = 'U6AKKA5P0',
  VINCENT_LOPEZ = 'U0342L60UDB',
  XIU_WANG = 'UNDLL5H3P',
  YERAM_YOON = 'U028GJ4Q1LJ',
  ZAHRA_JAMIEL = 'U02TBJ4P919',
}

export const enum SLACK_CHANNELS {
  GENERAL = 'C488KN2EP',
  TIMESHEET = 'CMQRNV6Q0',
}

export const sendMessage = async (message: string, target: string, scheduledTime?: number) => {
  if (process.env.TIMESHEET_SEND_NOTIFICATIONS !== 'true') {
    return;
  }

  const app = new App({
    token: process.env.TIMESHEET_SLACK_BOT_TOKEN,
    signingSecret: process.env.TIMESHEET_SLACK_SIGNING_SECRET,
    socketMode: false,
    port: 3000,
  });

  const args = {
    token: process.env.TIMESHEET_SLACK_BOT_TOKEN,
    channel: target,
    text: message,
  };

  const result = scheduledTime
    ? await app.client.chat.scheduleMessage({
        ...args,
        post_at: scheduledTime,
      })
    : await app.client.chat.postMessage(args);

  return {result};
};

export const getSlackIdByEmail = async (email: string) => {
  const app = new App({
    token: process.env.TIMESHEET_SLACK_BOT_TOKEN,
    signingSecret: process.env.TIMESHEET_SLACK_SIGNING_SECRET,
    socketMode: false,
    port: 3000,
  });

  const args = {
    token: process.env.TIMESHEET_SLACK_BOT_TOKEN,
    email: email,
  };

  try {
    const result = await app.client.users.lookupByEmail(args);
    return result.user?.id;
  } catch (err) {
    return '';
  }
};
