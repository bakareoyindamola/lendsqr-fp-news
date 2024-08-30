import React from 'react';
import { ImageURISource } from 'react-native';
import Animated, {
  AnimatedProps,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

export interface ProfileImageProps extends AnimatedProps<any> {
  size?: number;
  shape?: 'rounded' | 'square';
}

export function Image(props: ProfileImageProps) {
  const { size, shape = 'rounded', ...ImageProps } = props;
  const source = props.source as ImageURISource;

  // Unique shared values
  const borderRadius = useSharedValue(
    shape === 'rounded' && size ? size / 2 : 0,
  );

  const $animatedStyle = useAnimatedStyle(
    () => ({
      borderRadius: borderRadius.value,
      width: size,
      height: size,
    }),
    [size, shape],
  );

  return (
    <Animated.Image
      {...ImageProps}
      source={source}
      style={[$animatedStyle, props.style]}
    />
  );
}
