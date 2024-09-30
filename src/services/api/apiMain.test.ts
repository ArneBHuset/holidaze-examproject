import baseApiCall from './apiMain';
import { baseUrl } from './variables/endpoints/baseUrl';
import { snackBarError } from '../snackbar/SnackBarError';

jest.mock('../snackbar/SnackBarError', () => ({
  snackBarError: jest.fn(),
}));
global.fetch = jest.fn();
describe('baseApiCall', () => {
  const apiParameters = {
    url: '/test-endpoint',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: undefined,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test case to verify that the baseApiCall makes a successful API call
   */
  it('should make a successful API call and return JSON data', async () => {
    const mockResponseData = { message: 'Success' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponseData,
      headers: {
        get: () => '100',
      },
      status: 200,
    });
    const response = await baseApiCall(apiParameters);
    expect(response).toEqual(mockResponseData);
    expect(global.fetch).toHaveBeenCalledWith(`${baseUrl}/test-endpoint`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: undefined,
    });
  });

  /**
   * Test case to verify that baseApiCall handles a failed API call
   */
  it('should handle a failed API call and skip snackbar', async () => {
    const mockErrorResponse = {
      message: 'Failed to fetch data',
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => mockErrorResponse,
      status: 400,
    });

    const response = await baseApiCall(apiParameters);
    expect(response).toBeUndefined();
    expect(snackBarError).toHaveBeenCalledWith('Failed to fetch data');
  });
});
