import NetInfo from '@react-native-community/netinfo';
import crashlytics from '@react-native-firebase/crashlytics';
import MockAdapter from 'axios-mock-adapter';
import { displayErrorMessage } from '../../components';
import config from '../../config';
import { AuthAxios, checkNetworkConnection } from './index.ts';

jest.mock('../../components', () => ({
  displayErrorMessage: jest.fn(),
}));

jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(),
}));

jest.mock('@react-native-firebase/crashlytics', () => ({
  recordError: jest.fn(),
}));

describe('AuthAxios', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(AuthAxios);
  });

  afterEach(() => {
    mockAxios.restore();
    jest.clearAllMocks();
  });

  it('should attach the Authorization header to requests', async () => {
    const response = { data: { message: 'success' } };
    mockAxios.onGet('/test').reply(200, response);

    const result = await AuthAxios.get('/test');

    expect(result.data).toEqual(response);
    // @ts-ignore
    expect(mockAxios.history.get[0].headers.Authorization).toBe(
      `Bearer ${config.TOKEN}`,
    );
  });

  it('should handle network errors correctly', async () => {
    (NetInfo.fetch as jest.Mock).mockResolvedValueOnce({ isConnected: false });

    await expect(checkNetworkConnection()).rejects.toThrow(
      'Network not connected',
    );
    expect(displayErrorMessage).toHaveBeenCalledWith(
      'Network Error',
      'Network not connected',
    );
  });

  it('should call displayErrorMessage on response error', async () => {
    const errorResponse = {
      error: { name: 'ServerError', message: 'Internal Server Error' },
    };
    mockAxios.onGet('/error').reply(500, errorResponse);

    try {
      await AuthAxios.get('/error');
    } catch (error) {
      expect(displayErrorMessage).toHaveBeenCalledWith(
        'ServerError',
        'Internal Server Error',
      );
    }
  });

  it('should show a network error if the request fails due to no connection', async () => {
    (NetInfo.fetch as jest.Mock).mockResolvedValueOnce({ isConnected: false });

    try {
      await AuthAxios.get('/test');
    } catch (error) {
      expect(displayErrorMessage).toHaveBeenCalledWith(
        'Network Error',
        'Network not connected',
      );
    }
  });

  it('should log the error to crashlytics when an error occurs', async () => {
    const spy = jest.spyOn(crashlytics(), 'recordError');

    const errorResponse = {
      error: { name: 'ServerError', message: 'Internal Server Error' },
    };
    mockAxios.onGet('/error').reply(500, errorResponse);

    try {
      await AuthAxios.get('/error');
    } catch (error) {
      expect(spy).toHaveBeenCalledWith(error);
    }
  });
});
