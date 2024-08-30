import React from 'react';
import { ImageBackground, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Button, Screen, Spacer, Text } from '../../components';
import { AppNavigatorProps } from '../../navigators/AppNavigator.tsx';
import {
  $centerTextStyle,
  $imageBackground,
  colors,
  spacing,
} from '../../theme';

export const LoginScreen = () => {
  const appNavigation = useNavigation<AppNavigatorProps>();

  return (
    <ImageBackground
      accessibilityRole="image"
      testID="new-app-screen-header"
      source={require('../../../assets/images/login_background.png')}
      style={$imageBackground}>
      <Screen
        preset="auto"
        backgroundColor="transparent"
        contentContainerStyle={[$screenContentContainer]}
        safeAreaEdges={['top']}>
        <View style={$contentWrapper}>
          <Animated.View entering={FadeInDown.delay(100)}>
            <Text
              testID="login-heading"
              preset="heading"
              style={[$centerTextStyle]}>
              News from around the world for you
            </Text>
          </Animated.View>

          <Spacer height={8} />

          <Animated.View entering={FadeInDown.delay(100 * 2)}>
            <Text
              preset="subheading"
              testID="login-subtext"
              style={[$centerTextStyle]}>
              Stay informed with the latest stories and updates from every
              corner of the globe.
            </Text>
          </Animated.View>

          <Spacer height={40} />
          <Animated.View entering={FadeInDown.delay(100 * 3)}>
            <Button
              testID="login-button"
              preset="filled"
              onPress={() => {
                appNavigation.navigate('Signup');
              }}>
              Register
            </Button>
            <Spacer height={16} />
            <Button
              testID="login-button"
              onPress={() => {
                appNavigation.navigate('LoginWithGoogle');
              }}>
              Login
            </Button>
          </Animated.View>
        </View>
      </Screen>
    </ImageBackground>
  );
};

const $screenContentContainer: ViewStyle = {
  flex: 1,
  paddingTop: spacing.s20,
  justifyContent: 'flex-end',
};

const $contentWrapper: ViewStyle = {
  backgroundColor: colors.background,
  paddingHorizontal: spacing.s20,
  paddingTop: spacing.s46,
  paddingBottom: spacing.s36,
  borderTopLeftRadius: spacing.s32,
  borderTopRightRadius: spacing.s32,
};
