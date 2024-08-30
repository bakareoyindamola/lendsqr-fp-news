import NetInfo from '@react-native-community/netinfo';
import crashlytics from '@react-native-firebase/crashlytics';
import axios from 'axios';
import { displayErrorMessage } from '../../components';
import config from '../../config';

interface ApiError extends Error {
  response: any;
}

const BASE_API = config.API_URL;

export const SomethingWentWrongErrorText =
  'Something went wrong, please try again';

const handleResponse = (requestConfig: any) => requestConfig;

const handleError = async (error: ApiError) => {
  if (!error.response) {
    // Network error or timeout
    displayErrorMessage(
      'Network Error',
      'Network not connected or request timed out',
    );
  } else {
    const { data: result } = error.response;

    displayErrorMessage(
      `${result.error.name}` || 'Error',
      `${result.error.message}`,
    );
  }

  crashlytics().recordError(error);
  return Promise.reject(error.response?.data);
};

export const AuthAxios = axios.create({
  baseURL: BASE_API,
  timeout: 10000,
});

export const checkNetworkConnection = async () => {
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    displayErrorMessage('Network Error', 'Network not connected');
    const error = new Error('Network not connected');
    error.name = 'NetworkError';
    throw error;
  }
};

const addNetworkCheckInterceptor = (axiosInstance: any) => {
  axiosInstance.interceptors.request.use(
    async (requestConfig: any) => {
      try {
        await checkNetworkConnection();
        const cancelTokenSource = axios.CancelToken.source();

        requestConfig.cancelToken = cancelTokenSource.token;

        return requestConfig;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    (error: Error) => {
      return Promise.reject(error);
    },
  );
};

addNetworkCheckInterceptor(AuthAxios);

AuthAxios.interceptors.request.use(
  async (requestConfig: any) => {
    try {
      const token = config.TOKEN;
      requestConfig.headers.Authorization = `Bearer ${token}`;

      return requestConfig;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  error => Promise.reject(error),
);

AuthAxios.interceptors.response.use(handleResponse, handleError);
