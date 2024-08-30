import crashlytics from '@react-native-firebase/crashlytics';

export enum ErrorType {
  FATAL = 'Fatal',
  HANDLED = 'Handled',
}

export const reportCrash = (
  error: Error,
  type: ErrorType = ErrorType.FATAL,
) => {
  if (__DEV__) {
    const message = error.message || 'Unknown';
    console.error(error);
    console.log(message, type);

    // For testing purpose crashlytics should only be called on
    // prod or staging environment
    crashlytics().recordError(error);
  } else {
    crashlytics().recordError(error);
  }
};
