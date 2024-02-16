import {enableFetchMocks} from 'jest-fetch-mock';
import 'jest-localstorage-mock';

enableFetchMocks();

import apiRequest, {BaseRoute, Method} from './apiRequest';

describe('apiRequest', () => {
  const mockResponse = {message: 'test'};
  const baseRoute = BaseRoute.USERS;
  const options = {method: Method.GET, queryParams: {test: 'test', test2: ['test', 'test']}};

  it('Should handle a successful response', async () => {
    fetchMock.once(JSON.stringify(mockResponse));
    const response = await apiRequest(baseRoute, '', options);
    expect(response).toEqual({data: mockResponse});
  });

  it('Should handle an error response', async () => {
    fetchMock.once(JSON.stringify(mockResponse), {status: 500});
    const response = await apiRequest(baseRoute, '', options);
    expect(response).toEqual({error: mockResponse});
  });

  it('Should handle rejected promise', async () => {
    fetchMock.mockRejectedValueOnce(new Error(mockResponse.message));
    const response = await apiRequest(baseRoute, '', options);
    expect(response).toEqual({error: mockResponse});
  });
});
