/* istanbul ignore file */
import fetch from 'node-fetch';

const JQLSearchURL = `https://t1cg-dev.atlassian.net/rest/api/3/search`;

const getProjectTickets = async (projectLabel: string) => {
  const jql = `project = ${projectLabel} AND assignee is not EMPTY AND (resolved is EMPTY OR resolved > startOfDay("-14"))`;
  const response = await fetch(JQLSearchURL, {
    body: JSON.stringify({
      jql,
      maxResults: 100,
      startAt: 0,
    }),
    headers: {
      Authorization: `Basic ${process.env.TIMESHEET_JIRA_TOKEN}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  return response.json();
};

export default getProjectTickets;
