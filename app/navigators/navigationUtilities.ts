import type { PersistNavigationConfig } from '../config/config.base';
import type { AppStackParamList, NavigationProps } from './AppNavigator';
import { useEffect, useRef, useState } from 'react';
import analytics from '@react-native-firebase/analytics';
import {
  createNavigationContainerRef,
  NavigationState,
  PartialState,
} from '@react-navigation/native';
import Config from '../config';
import * as storage from '../utils/storage';
import { useIsMounted } from '../utils/useIsMounted';

type Storage = typeof storage;

export const navigationRef = createNavigationContainerRef<AppStackParamList>();

export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>,
): string {
  const route = state.routes[state.index ?? 0];

  // Found the active route -- return the name
  if (!route.state) {
    return route.name as keyof AppStackParamList;
  }

  // Recursive call to deal with nested routers
  return getActiveRouteName(route.state as NavigationState<AppStackParamList>);
}

function navigationRestoredDefaultState(
  persistNavigation: PersistNavigationConfig,
) {
  if (persistNavigation === 'always') {
    return false;
  }

  if (persistNavigation === 'dev' && __DEV__) {
    return false;
  }

  if (persistNavigation === 'prod' && !__DEV__) {
    return false;
  }

  // all other cases, disable restoration by returning true
  return true;
}

export function useNavigationPersistence(
  storage: Storage,
  persistenceKey: string,
) {
  const [initialNavigationState, setInitialNavigationState] =
    useState<NavigationProps['initialState']>();
  const isMounted = useIsMounted();

  const initNavState = navigationRestoredDefaultState(Config.persistNavigation);
  const [isRestored, setIsRestored] = useState(initNavState);

  const routeNameRef = useRef<keyof AppStackParamList | undefined>();

  const onNavigationStateChange = async (
    state: NavigationState | undefined,
  ) => {
    const previousRouteName = routeNameRef.current;
    if (state !== undefined) {
      const currentRouteName = getActiveRouteName(state);

      if (previousRouteName !== currentRouteName) {
        // track screens.
        void analytics().logScreenView({
          screen_name: currentRouteName,
          screen_class: currentRouteName,
        });

        if (__DEV__) {
          console.log(currentRouteName);
        }
      }

      // Save the current route name
      routeNameRef.current = currentRouteName as keyof AppStackParamList;

      // Persist state to storage
      void storage.save(persistenceKey, state);
    }
  };

  const restoreState = async () => {
    try {
      const state = (await storage.load(persistenceKey)) as
        | NavigationProps['initialState']
        | null;
      if (state) {
        setInitialNavigationState(state);
      }
    } finally {
      if (isMounted()) {
        setIsRestored(true);
      }
    }
  };

  useEffect(() => {
    if (!isRestored) {
      void restoreState();
    }
  }, [isRestored]);

  return {
    onNavigationStateChange,
    restoreState,
    isRestored,
    initialNavigationState,
  };
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}
