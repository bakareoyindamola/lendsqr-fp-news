const palette = {
  neutral100: '#FFFFFF',
  neutral200: '#F4F2F1',

  primary100: '#213F7D',
  primary200: '#274A91',

  grey100: '#4F4F4F',
  grey200: '#333333',
  grey300: '#828282',
  grey600: '#F2F2F2',

  secondary100: '#DCDDE9',

  accent100: '#FFEED4',

  angry100: '#C81d25',

  overlay20: 'rgba(25, 16, 21, 0.2)',
} as const;

export const colors = {
  palette,
  transparent: 'rgba(0, 0, 0, 0)',
  text: palette.grey100,
  textDim: '',
  profileHeaderText: '#2C2435',
  background: palette.neutral100,
  buttonBackground: palette.neutral100,
  filledButtonBackground: palette.primary100,
  border: palette.grey600,
  inputBorder: '#DCDCDC',
  tint: '',
  separator: '',
  errorText: palette.angry100,
  errorBorder: palette.angry100,
  errorBackground: '',
};
