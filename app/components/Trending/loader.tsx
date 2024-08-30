import React from 'react';
import { ActivityIndicator, TextStyle, View, ViewStyle } from 'react-native';
import { spacing } from '../../theme';
import { Text } from '../Text';

export const Loader = () => {
  return (
    <View style={$loaderContainer}>
      <ActivityIndicator size="large" />
      <Text style={$textContainer}>Fetching trending news...</Text>
    </View>
  );
};

const $loaderContainer: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  height: 237,
  marginRight: spacing.s20,
};

const $textContainer: TextStyle = {
  marginTop: spacing.s18,
};
