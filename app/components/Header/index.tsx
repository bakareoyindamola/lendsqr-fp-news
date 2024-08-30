import React, { ReactElement } from 'react';
import { Platform, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { colors, spacing } from '../../theme';
import {
  ExtendedEdge,
  useSafeAreaInsetsStyle,
} from '../../utils/useSafeAreaInsetStyle';
import { Text, TextProps } from '../Text';

export interface HeaderProps {
  titleMode?: 'center' | 'flex';
  titleStyle?: StyleProp<TextStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  title?: TextProps['text'];
  LeftActionComponent?: ReactElement;
  RightActionComponent?: ReactElement;
  safeAreaEdges?: ExtendedEdge[];
}

interface HeaderActionProps {
  ActionComponent?: ReactElement;
}

export function Header(props: HeaderProps) {
  const {
    backgroundColor = colors.background,
    LeftActionComponent,
    RightActionComponent,
    safeAreaEdges = ['top'],
    title,
    titleMode = 'center',
    titleContainerStyle: $titleContainerStyleOverride,
    style: $styleOverride,
    titleStyle: $titleStyleOverride,
    containerStyle: $containerStyleOverride,
  } = props;

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  return (
    <View
      style={[
        $container,
        $containerInsets,
        {
          paddingTop:
            Platform.OS === 'ios'
              ? $containerInsets.paddingTop
              : $containerInsets.paddingTop + 20,
        },
        { backgroundColor },
        $containerStyleOverride,
      ]}>
      <View style={[$wrapper, $styleOverride]}>
        <HeaderAction ActionComponent={LeftActionComponent} />

        {!!title && (
          <View
            style={[
              titleMode === 'center' && $titleWrapperCenter,
              titleMode === 'flex' && $titleWrapperFlex,
              $titleContainerStyleOverride,
            ]}>
            <Text
              weight="medium"
              size="medium"
              text={title}
              style={[$title, $titleStyleOverride]}
            />
          </View>
        )}

        <HeaderAction ActionComponent={RightActionComponent} />
      </View>
    </View>
  );
}

function HeaderAction(props: HeaderActionProps) {
  const { ActionComponent } = props;

  if (ActionComponent) {
    return ActionComponent;
  }

  return <View style={[$actionFillerContainer]} />;
}

const $wrapper: ViewStyle = {
  height: 72,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: spacing.s20,
};

const $container: ViewStyle = {
  width: '100%',
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
};

const $title: TextStyle = {
  textAlign: 'center',
};

const $actionFillerContainer: ViewStyle = {
  width: 16,
};

const $titleWrapperCenter: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  position: 'absolute',
  paddingHorizontal: spacing.s20,
  zIndex: 1,
};

const $titleWrapperFlex: ViewStyle = {
  justifyContent: 'center',
  flexGrow: 1,
};
