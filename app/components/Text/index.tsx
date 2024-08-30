import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import { colors, typography } from '../../theme';

type Sizes = keyof typeof $sizeStyles;
type Weights = keyof typeof typography.primary;
type Presets = keyof typeof $presets;

export interface TextProps extends RNTextProps {
  text?: string;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  preset?: Presets;
  weight?: Weights;
  size?: Sizes;
}

export function Text(props: TextProps) {
  const {
    weight,
    text,
    children,
    style: $styleOverride,
    size,
    ...rest
  } = props;

  const content = text || children;
  const preset: Presets = props.preset ?? 'default';

  const $styles: StyleProp<TextStyle> = [
    $presets[preset],
    weight && $fontWeightStyles[weight],
    size && $sizeStyles[size],
    $styleOverride,
  ];

  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  );
}

const $sizeStyles = {
  header: { fontSize: 30, lineHeight: 40 } satisfies TextStyle,
  subheader: { fontSize: 16, lineHeight: 24 } satisfies TextStyle,
  medium: { fontSize: 14, lineHeight: 21 } satisfies TextStyle,
  small: { fontSize: 12, lineHeight: 18 } satisfies TextStyle,
};

const $fontWeightStyles = Object.entries(typography.primary).reduce(
  (acc, [weight, fontFamily]) => {
    return { ...acc, [weight]: { fontFamily } };
  },
  {},
) as Record<Weights, TextStyle>;

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.medium,
  $fontWeightStyles.normal,
  { color: colors.text },
];

const $presets = {
  default: $baseStyle,

  bold: [$baseStyle, $fontWeightStyles.bold] as StyleProp<TextStyle>,

  heading: [
    $baseStyle,
    $sizeStyles.header,
    $fontWeightStyles.bold,
    { color: colors.palette.grey200 },
  ] as StyleProp<TextStyle>,

  subheading: [
    $baseStyle,
    $sizeStyles.medium,
    $fontWeightStyles.normal,
    { color: colors.palette.grey100 },
  ] as StyleProp<TextStyle>,

  profileHeader: [
    $baseStyle,
    $sizeStyles.medium,
    $fontWeightStyles.bold,
    { color: colors.profileHeaderText },
  ] as StyleProp<TextStyle>,

  formLabel: [
    $baseStyle,
    $fontWeightStyles.medium,
    { color: colors.palette.grey300 },
  ] as StyleProp<TextStyle>,

  buttonLabel: [
    $baseStyle,
    $sizeStyles.subheader,
    $fontWeightStyles.bold,
    { color: colors.palette.neutral100 },
  ] as StyleProp<TextStyle>,

  textLabel: [
    $baseStyle,
    $sizeStyles.subheader,
    $fontWeightStyles.bold,
    { color: colors.palette.grey200 },
  ] as StyleProp<TextStyle>,

  pictureLabel: [
    $baseStyle,
    $sizeStyles.small,
    $fontWeightStyles.medium,
    { color: colors.palette.grey200 },
  ] as StyleProp<TextStyle>,

  formHelper: [
    $baseStyle,
    $sizeStyles.small,
    $fontWeightStyles.normal,
  ] as StyleProp<TextStyle>,

  numberText: [
    $baseStyle,
    $sizeStyles.small,
    $fontWeightStyles.bold,
    { color: colors.palette.grey100 },
  ] as StyleProp<TextStyle>,
};
