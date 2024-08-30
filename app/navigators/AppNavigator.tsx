import React from 'react';
import { useColorScheme } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import * as Screens from '../screens';
import { RootState } from '../store';
import { colors } from '../theme';
import { navigationRef } from './navigationUtilities';

export type AppStackParamList = {
  Welcome: undefined;
  NewsDetails: undefined;
  Login: undefined;
  LoginWithGoogle: undefined;
  Signup: undefined;
  SignupWithGoogle: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

export type AppNavigatorProps = NativeStackNavigationProp<AppStackParamList>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = function AppStack() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
      }}
      initialRouteName={isAuthenticated ? 'Welcome' : 'Login'}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
          <Stack.Screen
            name="NewsDetails"
            component={Screens.NewsDetailsScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
          <Stack.Screen
            name="LoginWithGoogle"
            component={Screens.LoginWithGoogleScreen}
          />
          <Stack.Screen name="Signup" component={Screens.SignupScreen} />
          <Stack.Screen
            name="SignupWithGoogle"
            component={Screens.SignupWithGoogleScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      ref={navigationRef}
      {...props}>
      <AppStack />
    </NavigationContainer>
  );
};
