import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { spacing } from './spacing.ts';

export const $authFlex: ViewStyle = {
  flex: 0.85,
};

export const $authSubHeadingText: ViewStyle = {
  maxWidth: '80%',
};

export const $authContentContainerWrapper: ViewStyle = {
  paddingHorizontal: spacing.s20,
};

export const $authContentWrapper: ViewStyle = {
  alignItems: 'center',
  backgroundColor: 'transparent',
  paddingVertical: spacing.s60,
};

export const $flexOne: ViewStyle = {
  flex: 1,
};

export const $fullWidth: ViewStyle = {
  width: '100%',
};

export const $centerTextStyle: TextStyle = {
  textAlign: 'center',
};

export const $imageBackground: ImageStyle = {
  flex: 1,
  objectFit: 'contain',
};
