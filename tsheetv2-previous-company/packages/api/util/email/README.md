# Email

## Setup

### Mailhog

Running `npm start` from the root directory will start mailhog, along with the other containers in the docker-compose file. Mailhog is a tool used to intercept emails for testing purposes. It sets up a local email service by using a fake SMTP server. It also provides a web UI resembling a real email inbox. -->

With the Mailhog container running, visit <http://localhost:8025> to view the UI. Any email sent using the local environment will be intercepted and displayed here.

### Environment

Add the following env variables to your shell config file:

```zsh
export TIMESHEET_CLIENT_ID='576982331211-qem2c1d80g9jbu8n7vbksol2bhi3ggek.apps.googleusercontent.com'
export TIMESHEET_CLIENT_SECRET='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'
export TIMESHEET_REDIRECT_URI="http://localhost:2000/timesheet"
export TIMESHEET_REFRESH_TOKEN='1//04zHa9rQHpFrDCgYIARAAGAQSNwF-L9Ir3mUelvfxsBh87Irg1TukSUk8q7Ju5ZcBCVU9QJZETQHhP8-qTKxZdbJ7ME5LHqYXIjA'
export TIMESHEET_ADMIN_EMAIL='timesheet@t1cg.com'
export TIMESHEET_EMAIL_SERVICE="mailhog"
```

Lastly, if you haven't already, make sure to run `npm i` from the root directory to install the necessary dependencies.

## Sending Emails

The `sendMail` function will send an email to the recipient(s) you define in the `to` field. Check your logs to see if successful.

If `TIMESHEET_EMAIL_SERVICE` is set to `'mailhog'`, the email will show in mailhog instead.

To build an email, create an object with message fields like `to`, `subject`, `html`, etc. For more options, visit <https://nodemailer.com/message/>.

- Note, you do not need to include a `from` field, since the default is set to the admin account.

Pass the object into the `sendMail` function.

```js
const mailOptions = {
  to: 'user@gmail.com',
  subject: 'Hello World!',
  html: '<h1>Hello World!</h1>',
};

sendMail(mailOptions);
```
