import React, { useMemo, useState } from 'react';
import { ImageBackground, View, ViewStyle } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loginInWithGoogle } from '../../businessLogic/login';
import {
  Button,
  displaySuccessMessage,
  Screen,
  Spacer,
  Text,
} from '../../components';
import { Icon } from '../../components/Icon';
import { AppNavigatorProps } from '../../navigators/AppNavigator.tsx';
import { AppDispatch, RootState } from '../../store';
import { login } from '../../store/auth/authSlice.ts';
import { saveUserDetails } from '../../store/user/userSlice.ts';
import {
  $authContentContainerWrapper,
  $authContentWrapper,
  $centerTextStyle,
  $flexOne,
  $imageBackground,
  spacing,
} from '../../theme';

function getLastName(fullName: string) {
  const nameParts = fullName.split(' ');
  return nameParts[nameParts.length - 1];
}

export const SignupWithGoogleScreen = () => {
  const appNavigation = useNavigation<AppNavigatorProps>();
  const dispatch = useDispatch<AppDispatch>();
  const { signupData } = useSelector((state: RootState) => state.auth);
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

  if (!signupData) {
    appNavigation.replace('Signup');
  }

  return (
    <ImageBackground
      accessibilityRole="image"
      testID="new-app-screen-header"
      source={require('../../../assets/images/LogoBackground.png')}
      style={$imageBackground}>
      <Screen
        preset="auto"
        backgroundColor="transparent"
        contentContainerStyle={$flexOne}
        safeAreaEdges={['top', 'bottom']}>
        <View
          style={[
            $flexOne,
            $authContentContainerWrapper,
            $contentContainerWrapper,
          ]}>
          <View style={[$authContentWrapper]}>
            <Icon icon={'logo'} />
            <Spacer height={40} />
            <Text
              testID="signup-with-google-heading"
              preset="heading"
              style={[$centerTextStyle]}>
              Hello, {getLastName(signupData?.fullName || '')}!
            </Text>
          </View>
          <Button
            LeftAccessory={googleIcon}
            testID="signup-button"
            preset="filled"
            onPress={async () => {
              setLoading(true);
              try {
                const result = await loginInWithGoogle();
                if (result?.user && result?.additionalUserInfo) {
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
              } catch (error: any) {
                crashlytics().recordError(error);
              } finally {
                setLoading(false);
              }
            }}
            text={loading ? 'Loading...' : 'Continue with Google'}
            disabled={loading}
          />
        </View>
      </Screen>
    </ImageBackground>
  );
};

const $iconSpace: ViewStyle = {
  marginRight: spacing.s10,
};

const $contentContainerWrapper: ViewStyle = {
  justifyContent: 'center',
};
