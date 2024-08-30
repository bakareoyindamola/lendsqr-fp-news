import React, { ComponentType } from 'react';
import {
  GestureResponderEvent,
  Keyboard,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { Text, TextProps } from '../Text';

type Presets = keyof typeof $viewPresets;

export interface ButtonAccessoryProps {
  style: StyleProp<any>;
  pressableState: PressableStateCallbackType;
  disabled?: boolean;
}

export interface ButtonProps extends Omit<PressableProps, 'onPress'> {
  text?: TextProps['text'];
  style?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  pressedTextStyle?: StyleProp<TextStyle>;
  disabledTextStyle?: StyleProp<TextStyle>;
  preset?: Presets;
  RightAccessory?: ComponentType<ButtonAccessoryProps>;
  LeftAccessory?: ComponentType<ButtonAccessoryProps>;
  children?: React.ReactNode;
  disabled?: boolean;
  disabledStyle?: StyleProp<ViewStyle>;
  onPress?: PressableProps['onPress'];
}

/**
 * A component that allows users to take actions and make choices.
 * Wraps the Text component with a Pressable component.
 * @example
 * <Button
 *   style={styles.button}
 *   textStyle={styles.buttonText}
 *   onPress={handleButtonPress}
 * />
 */
export function Button(props: ButtonProps) {
  const {
    text,
    style: $viewStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    disabledTextStyle: $disabledTextStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    disabled,
    disabledStyle: $disabledViewStyleOverride,
    onPress,
    ...rest
  } = props;
  const preset: Presets = props.preset ?? 'default';

  function $viewStyle({
    pressed,
  }: PressableStateCallbackType): StyleProp<ViewStyle> {
    return [
      $viewPresets[preset],
      $viewStyleOverride,
      pressed && [$pressedViewPresets[preset], $pressedViewStyleOverride],
      !!disabled && $disabledViewStyleOverride,
    ];
  }

  function $textStyle({
    pressed,
  }: PressableStateCallbackType): StyleProp<TextStyle> {
    return [
      $textPresets[preset],
      $textStyleOverride,
      pressed && [$pressedTextPresets[preset], $pressedTextStyleOverride],
      !!disabled && $disabledTextStyleOverride,
    ];
  }

  return (
    <Pressable
      style={$viewStyle}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      onPress={(e: GestureResponderEvent) => {
        Keyboard.dismiss();
        if (onPress) {
          onPress(e);
        }
      }}
      {...rest}
      disabled={disabled}>
      {state => (
        <>
          {!!LeftAccessory && (
            <LeftAccessory
              style={$leftAccessoryStyle}
              pressableState={state}
              disabled={disabled}
            />
          )}

          <Text preset="buttonLabel" text={text} style={$textStyle(state)}>
            {children}
          </Text>

          {!!RightAccessory && (
            <RightAccessory
              style={$rightAccessoryStyle}
              pressableState={state}
              disabled={disabled}
            />
          )}
        </>
      )}
    </Pressable>
  );
}

const $baseViewStyle: ViewStyle = {
  minHeight: 56,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  paddingVertical: spacing.s12,
  paddingHorizontal: spacing.s12,
  overflow: 'hidden',
};

const $baseTextStyle: TextStyle = {
  fontSize: 16,
  lineHeight: 20,
  fontFamily: typography.primary.bold,
  textAlign: 'center',
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
};

const $rightAccessoryStyle: ViewStyle = { marginStart: spacing.s8, zIndex: 1 };
const $leftAccessoryStyle: ViewStyle = { marginEnd: spacing.s8, zIndex: 1 };

const $viewPresets = {
  default: [
    $baseViewStyle,
    {
      borderWidth: 1,
      borderColor: colors.filledButtonBackground,
      backgroundColor: colors.buttonBackground,
    },
  ] as StyleProp<ViewStyle>,
  filled: [
    $baseViewStyle,
    { backgroundColor: colors.filledButtonBackground },
  ] as StyleProp<ViewStyle>,
  error: [
    $baseViewStyle,
    { borderWidth: 1, borderColor: colors.errorBorder },
  ] as StyleProp<ViewStyle>,
};

const $textPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: [$baseTextStyle, { color: colors.palette.primary100 }],
  filled: [$baseTextStyle, { color: colors.palette.neutral100 }],
  error: [$baseTextStyle, { color: colors.errorText }],
};

const $pressedViewPresets: Record<Presets, StyleProp<ViewStyle>> = {
  default: { backgroundColor: colors.palette.neutral200 },
  filled: { backgroundColor: colors.palette.primary200 },
  error: { backgroundColor: colors.palette.neutral200 },
};

const $pressedTextPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: { opacity: 0.9 },
  filled: { opacity: 0.9 },
  error: { opacity: 0.9 },
};
