import React from 'react';
import { View, ViewStyle } from 'react-native';
import { colors, spacing } from '../../theme';
import { Icon } from '../Icon';
import { Text } from '../Text';

export const FloatingDetails = () => {
  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <View style={$contentContainer}>
      <View style={$innerContent}>
        <View style={$content}>
          <Icon icon="like" />
          <Text preset="profileHeader">{getRandomNumber(20, 900)}k</Text>
        </View>
        <View style={$content}>
          <Icon icon="comment" />
          <Text preset="profileHeader">{getRandomNumber(20, 900)}k</Text>
        </View>
      </View>
    </View>
  );
};

const $contentContainer: ViewStyle = {
  position: 'absolute',
  bottom: 30,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  zIndex: 1,
  backgroundColor: 'transparent',
};

const $innerContent: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 18,
  paddingHorizontal: spacing.s16,
  paddingVertical: spacing.s10,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: spacing.s20,
  backgroundColor: 'white',
};

const $content: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 3,
};
