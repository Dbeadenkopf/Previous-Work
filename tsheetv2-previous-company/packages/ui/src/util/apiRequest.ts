export enum Method {
  DELETE = 'DELETE',
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
}

export enum BaseRoute {
  PROJECTS = '/projects',
  ROLES = '/roles',
  TIMESHEETS = '/timesheets',
  USERS = '/users',
  TICKETS = '/tickets',
  JOBS = '/job',
}

export interface QueryParams {
  [prop: string]: string | string[];
}

interface Options {
  body?: object | string;
  headers?: HeadersInit;
  method: Method;
  queryParams?: QueryParams;
}

const apiRequest = async <T>(baseRoute: BaseRoute, route: string, options: Options) => {
  const {body, headers, method, queryParams} = options;
  let query = '';
  const params = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    });
    query = `?${params}`;
  }

  const request: RequestInit = {
    body: JSON.stringify(body),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('signature')}`,
      ...headers,
    },
    method,
  };

  /* istanbul ignore next */
  const url =
    process.env.TIMESHEET_MODE === 'production' ? window.TIMESHEET_API_URL : process.env.TIMESHEET_API_URL;

  try {
    const response = await fetch(url + baseRoute + route + query, request);
    const data: T = await response.json();

    if (!response.ok) {
      return {error: data as APIMessage};
    }

    return {data};
  } catch (err) {
    return {error: {message: (err as Error).message}};
  }
};

export default apiRequest;
