// import analytics from '@react-native-firebase/analytics';
// import crashlytics from '@react-native-firebase/crashlytics';
import { configureStore, Middleware } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice.ts';
import newsReducer from './news/newsSlice.ts';
import userReducer from './user/userSlice.ts';

const recordEvents: Middleware = () => next => (action: any) => {
  // Track redux toolkit events
  return next(action);
};

const logger: Middleware = () => next => (action: any) => {
  if (__DEV__) {
    console.log('Logger Middleware: Action received:', action.type);
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    news: newsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(recordEvents, logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
