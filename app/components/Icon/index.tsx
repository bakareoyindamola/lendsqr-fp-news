import * as React from 'react';
import { ComponentType } from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { iconRegistry } from './iconRegistry.ts';

export type IconTypes = keyof typeof iconRegistry;

interface IconProps extends TouchableOpacityProps {
  icon: IconTypes;
  color?: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: TouchableOpacityProps['onPress'];
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props;

  const isPressable = !!WrapperProps.onPress;
  const Wrapper = (
    WrapperProps?.onPress ? TouchableOpacity : View
  ) as ComponentType<TouchableOpacityProps | ViewProps>;

  const $imageStyle: StyleProp<ImageStyle> = [
    $imageStyleBase,
    color !== undefined && { tintColor: color },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ];

  return (
    <Wrapper
      accessibilityRole={isPressable ? 'imagebutton' : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}>
      <Image
        testID="icon-image"
        style={$imageStyle}
        source={iconRegistry[icon]}
      />
    </Wrapper>
  );
}

const $imageStyleBase: ImageStyle = {
  resizeMode: 'contain',
};
