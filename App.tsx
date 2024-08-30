import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NotifierWrapper } from 'react-native-notifier';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Config from './app/config';
import { AppNavigator } from './app/navigators/AppNavigator.tsx';
import { useNavigationPersistence } from './app/navigators/navigationUtilities.ts';
import { ErrorBoundary } from './app/screens';
import { store } from './app/store';
import * as storage from './app/utils/storage';

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

function App() {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  useEffect(() => {
    let remoteConfigListenerUnsubscribe = remoteConfig().onConfigUpdated(
      (event, error) => {
        console.log(event);
        if (error !== undefined) {
          console.log(
            'remote-config listener subscription error: ' +
              JSON.stringify(error),
          );
        } else {
          console.log('remote-config updated keys: ' + JSON.stringify(event));

          void remoteConfig().activate();
        }
      },
    );

    remoteConfigListenerUnsubscribe();
  }, []);

  if (!isNavigationStateRestored) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={$flex}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <ErrorBoundary catchErrors={Config.catchErrors}>
            <NotifierWrapper>
              <AppNavigator
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
            </NotifierWrapper>
          </ErrorBoundary>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;

const $flex: ViewStyle = {
  flex: 1,
};
