/* eslint-disable no-console */
import {google} from 'googleapis';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const sendMail = async (mailOptions: Mail.Options) => {
  if (process.env.TIMESHEET_SEND_NOTIFICATIONS !== 'true') {
    return;
  }

  try {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.TIMESHEET_CLIENT_ID,
      process.env.TIMESHEET_CLIENT_SECRET,
      process.env.TIMESHEET_REDIRECT_URI
    );
    oAuth2Client.setCredentials({refresh_token: process.env.TIMESHEET_REFRESH_TOKEN});

    const accessToken = await oAuth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.TIMESHEET_ADMIN_EMAIL,
        clientId: process.env.TIMESHEET_CLIENT_ID,
        clientSecret: process.env.TIMESHEET_CLIENT_SECRET,
        refreshToken: process.env.TIMESHEET_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    } as SMTPTransport.Options);

    // Token details
    transporter.on('token', (token) => {
      console.log(`
        A new access token was generated...
        User: ${token.user}
        Access Token: ${token.accessToken}
        Expires: ${new Date(token.expires).getMinutes()} minutes
      `);
    });

    // Mailhog
    if (process.env.TIMESHEET_EMAIL_SERVICE === 'mailhog') {
      transporter = nodemailer.createTransport({
        port: 1025,
        host: 'mailhog',
      });
    }

    const result = await transporter.sendMail({from: process.env.TIMESHEET_ADMIN_EMAIL, ...mailOptions});
    console.log('Email successfully sent...', result);
  } catch (error) {
    console.log(error);
  }
};

export default sendMail;
