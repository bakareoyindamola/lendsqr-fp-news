import React, { useMemo } from 'react';
import {
  ImageStyle,
  ImageURISource,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import {
  Button,
  FloatingDetails,
  Header,
  Image,
  Screen,
  Spacer,
  Text,
} from '../../components';
import { DateTime } from '../../components/DateTime';
import { Icon } from '../../components/Icon';
import { ProfileImageAndName } from '../../components/ProfileImageAndName';
import { AppNavigatorProps } from '../../navigators/AppNavigator.tsx';
import { goBack } from '../../navigators/navigationUtilities.ts';
import { RootState } from '../../store';
import { colors, spacing } from '../../theme';

const BackIcon = () => <Icon icon="back" />;
const SaveIcon = () => (
  <View style={$buttonSpacer}>
    <Icon icon="save" />
  </View>
);
const ShareIcon = () => (
  <View style={$buttonSpacer}>
    <Icon icon="share" />
  </View>
);

export const NewsDetailsScreen = () => {
  const { currentlyReading } = useSelector((state: RootState) => state.news);
  const appNavigation = useNavigation<AppNavigatorProps>();

  const LeftActionComponent = useMemo(
    () => (
      <Button
        style={[$buttonOverride]}
        LeftAccessory={BackIcon}
        onPress={goBack}
      />
    ),
    [],
  );

  const RightActionComponent = useMemo(
    () => (
      <View style={$rightButtonContainer}>
        <Button
          style={[$buttonOverride]}
          textStyle={[$buttonText]}
          LeftAccessory={SaveIcon}
          onPress={() => false}
          text={'Save'}
        />
        <Button
          style={[$buttonOverride]}
          textStyle={[$buttonText]}
          LeftAccessory={ShareIcon}
          onPress={() => false}
          text={'Share'}
        />
      </View>
    ),
    [],
  );

  if (!currentlyReading) {
    return appNavigation.replace('Welcome');
  }

  const { attributes } = currentlyReading;
  const imageUrl = attributes.image_url as ImageURISource;

  return (
    <View style={$parentContainer}>
      <Header
        titleMode="flex"
        LeftActionComponent={LeftActionComponent}
        RightActionComponent={RightActionComponent}
      />
      <Screen preset="auto" contentContainerStyle={$contentWrapper}>
        <View style={$contentContainer}>
          <View>
            <Animated.View entering={FadeInDown.delay(100)}>
              <DateTime date={attributes.published_date} />
            </Animated.View>
            <Spacer height={9} />
            <Animated.View entering={FadeInDown.delay(100 * 2)}>
              <Text preset="textLabel">{attributes.title}</Text>
              <Spacer height={9} />
              <ProfileImageAndName name={attributes.author} />
              <Spacer height={24} />
              <Image
                source={
                  imageUrl
                    ? { uri: imageUrl }
                    : require('../../../assets/images/login_background.png')
                }
                style={$newsImage}
              />
            </Animated.View>
            <Spacer height={24} />
            <Animated.View entering={FadeInDown.delay(100 * 3)}>
              <Text preset="subheading">
                {attributes.summary.replace(/\{"\\n\\n"}/g, '\n\n')}
              </Text>
            </Animated.View>
          </View>
        </View>
      </Screen>

      <FloatingDetails />
    </View>
  );
};

const $parentContainer: ViewStyle = {
  flex: 1,
  position: 'relative',
};

const $contentWrapper: ViewStyle = {
  paddingBottom: 50,
};

const $contentContainer: ViewStyle = {
  paddingTop: spacing.s20,
  paddingHorizontal: spacing.s20,
};

const $buttonSpacer: ViewStyle = {
  marginRight: spacing.s8,
};

const $rightButtonContainer: ViewStyle = {
  flexDirection: 'row',
  gap: spacing.s8,
};

const $buttonOverride: ViewStyle = {
  minHeight: 36,
  maxHeight: 36,
  paddingVertical: 0,
  borderColor: colors.palette.grey600,
};

const $buttonText: TextStyle = {
  fontSize: 14,
  fontFamily: 'SpaceGrotesk-Medium',
  color: colors.palette.grey100,
};

const $newsImage: ImageStyle = {
  width: '100%',
  height: 206,
  borderRadius: spacing.s24,
};
