# Timesheet

## About

Timesheet is an application for communicating the duration of tasks that employees have worked on throughout the week.

## Composition

Timesheet is a [monorepo](https://en.wikipedia.org/wiki/Monorepo), meaning that there are multiple code bases in a single repository. In our case, this includes [api](./packages/api) and [ui](./packages/ui). Each of these directories are [workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) and are managed from a root package. This means that any workspace script can be run from the root directory by using the workspace option:

```bash
$ npm run <command> -w <workspace>
```

Generally speaking, all commands could/should be run from root. **There is no need change directories to run a command in a workspace**

## Getting Started

```bash
# Clone this repository
$ git clone https://github.com/t1cg/tsheetv2.git

# Go into the repository
$ cd tsheetv2
```

### Prerequisites

#### nvm

The project requires node lts/gallium (v16), use nvm to use the correct version:

1. [Install nvm](https://github.com/nvm-sh/nvm#install--update-script)
2. Verify installation by running `nvm -v`
3. Run `nvm use` to use the version of node defined in the [.nvmrc](./.nvmrc)
4. If you do not have the required version installed, install it with `nvm install lts/gallium`

> You can set the default nvm version to lts/gallium using `nvm alias default lts/gallium`. This will ensure you are using the correct node and npm version every time you open a new terminal

#### js-util

The project also contains private packages from [t1cg/js-util](https://github.com/t1cg/js-util) which cannot be installed without first authenticating. Follow the instructions for authenticating [here](https://github.com/t1cg/js-util#installing-the-packages). Once you're logged in to the registry, you should be able to install any js-util package.

#### Environment Variables

Add the following variables to the shell configuration file and source it.

```bash
export TIMESHEET_DB_PASS="iamatimesheetwriter"
export TIMESHEET_DB_URI="mongodb://localhost:27017/timesheetDB"
export TIMESHEET_DB_USER="timesheetWrite"
export TIMESHEET_SECRET="gCz*aa5wH^#+R7Zr"
export TIMESHEET_API_URL="http://localhost:2001/api"
export TIMESHEET_JIRA_TOKEN="jiraAccountEmail:JiraToken" # convert this to base64
export TIMESHEET_SLACK_BOT_TOKEN="xoxb-143682120609-3632251125622-xMGioy8d0QSwthSRjBJ4NIxW"
export TIMESHEET_SLACK_SIGNING_SECRET="385e15fede9da705cf65083eafc33bbe"
export TIMESHEET_OAUTH2_CLIENT_ID="931006364133-hbsg0d6k6petrn7mh6ik1h3e2ed7o5ff.apps.googleusercontent.com"
export TIMESHEET_SEND_NOTIFICATIONS="false" # set to "true" when testing notifications locally
```

To get the value for `TIMESHEET_JIRA_TOKEN`, first, you need to log in to Jira and [generate a token](https://help.siteimprove.com/support/solutions/articles/80000448174-how-to-create-an-api-token-from-your-atlassian-account). After you have your Jira token, you need to convert `yourJiraEmail:yourJiraToken` string to base64. To do the conversion, you can open your terminal and run the following:

```bash
echo -n yourJiraEmail:yourJiraToken | base64
```

To set up email environment, click [here](packages/api/util/email/README.md).

## Development Setup

Assuming the prerequisites have been completed, you can now install the dependencies and run the app:

```bash
# Install dependencies to run scripts
$ npm ci

# Run the app through docker
$ npm start
```

## Contributing

Take a look at the [contributing guidelines](./CONTRIBUTING.md) for project conventions.
