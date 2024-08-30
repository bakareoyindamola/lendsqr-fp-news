import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

export interface SpacerProps {
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
}

export function Spacer(props: SpacerProps) {
  const { width, height } = props;

  const $styles: StyleProp<ViewStyle> = [
    width !== undefined && { width },
    height !== undefined && { height },
  ];

  return <View style={$styles} />;
}
