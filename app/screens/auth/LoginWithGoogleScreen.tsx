import React, { useMemo, useState } from 'react';
import { ImageBackground, View, ViewStyle } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loginInWithGoogle } from '../../businessLogic/login';
import {
  Button,
  displayErrorMessage,
  displaySuccessMessage,
  Screen,
  Spacer,
  Text,
} from '../../components';
import { Icon } from '../../components/Icon';
import { AppNavigatorProps } from '../../navigators/AppNavigator.tsx';
import { AppDispatch } from '../../store';
import { login } from '../../store/auth/authSlice.ts';
import { saveUserDetails } from '../../store/user/userSlice.ts';
import {
  $authContentContainerWrapper,
  $authContentWrapper,
  $authFlex,
  $authSubHeadingText,
  $centerTextStyle,
  $flexOne,
  $imageBackground,
  spacing,
} from '../../theme';

export const LoginWithGoogleScreen = () => {
  const appNavigation = useNavigation<AppNavigatorProps>();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);

  const googleIcon = useMemo(() => {
    if (loading) {
      return () => <View />;
    }

    return () => (
      <View style={$iconSpace}>
        <Icon icon={'google'} size={20} />
      </View>
    );
  }, [loading]);

  return (
    <ImageBackground
      accessibilityRole="image"
      testID="new-app-screen-header"
      source={require('../../../assets/images/logo_background.png')}
      style={$imageBackground}>
      <Screen
        preset="auto"
        backgroundColor="transparent"
        contentContainerStyle={$flexOne}
        safeAreaEdges={['top', 'bottom']}>
        <View style={[$flexOne, $authContentContainerWrapper]}>
          <View style={[$authContentWrapper, $authFlex]}>
            <Icon icon={'logo'} />
            <Spacer height={40} />
            <Text
              testID="login-with-google-heading"
              preset="heading"
              style={[$centerTextStyle]}>
              Welcome
            </Text>
            <Spacer height={22} />
            <Text
              preset="subheading"
              testID="login-with-google-subtext"
              style={[$centerTextStyle, $authSubHeadingText]}>
              Get the latest headlines and stay updated with breaking news from
              around the world
            </Text>
          </View>

          <View>
            <Button
              LeftAccessory={googleIcon}
              testID="login-with-google-button"
              preset="filled"
              onPress={async () => {
                setLoading(true);
                try {
                  const result = await loginInWithGoogle();
                  if (result?.user && result?.additionalUserInfo) {
                    if (result.additionalUserInfo.isNewUser) {
                      displayErrorMessage(
                        'Error',
                        'Please go through the signup process before logging in',
                        5000,
                      );
                      appNavigation.navigate('Signup');
                    } else {
                      displaySuccessMessage(
                        'Google Sign-in Success',
                        'User Logged in successfully!',
                      );
                      dispatch(
                        saveUserDetails({
                          isNewUser: result.additionalUserInfo.isNewUser,
                          displayName: `${result.user.displayName}`,
                          photoURL: result.user.photoURL,
                          email: result.user.email,
                          email_verified: result.user.emailVerified,
                          username: result.additionalUserInfo.username || null,
                        }),
                      );
                      dispatch(login());
                    }
                  }
                } catch (error: any) {
                  crashlytics().recordError(error);
                } finally {
                  setLoading(false);
                }
              }}
              text={loading ? 'Loading...' : 'Sign in with Google'}
              disabled={loading}
            />
          </View>
        </View>
      </Screen>
    </ImageBackground>
  );
};

const $iconSpace: ViewStyle = {
  marginRight: spacing.s10,
};
