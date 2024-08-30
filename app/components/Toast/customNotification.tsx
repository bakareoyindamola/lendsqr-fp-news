import React from 'react';
import { Platform, TextStyle, View, ViewStyle } from 'react-native';
import { spacing } from '../../theme';
import { useSafeAreaInsetsStyle } from '../../utils/useSafeAreaInsetStyle.ts';
import { Icon } from '../Icon';
import { Spacer } from '../Spacer';
import { Text } from '../Text';

export interface CustomNotificationProps {
  title: string;
  description: string;
  alertType: 'error' | 'success' | 'info';
}

export const CustomNotification: React.FC<CustomNotificationProps> = ({
  title,
  description,
  alertType,
}) => {
  const $containerInsets = useSafeAreaInsetsStyle(['top']);

  let backgroundColor: string;
  let IconComponent: React.ReactNode;
  switch (alertType) {
    case 'error':
      backgroundColor = '#DC180D';
      IconComponent = <Icon icon={'error'} size={20} />;
      break;
    case 'success':
      backgroundColor = '#5CA513';
      IconComponent = <Icon icon={'success'} size={20} />;
      break;
    default:
      backgroundColor = '#333';
      IconComponent = null;
  }

  return (
    <View
      style={[
        $container,
        {
          backgroundColor,
          marginTop:
            Platform.OS === 'ios'
              ? $containerInsets.paddingTop
              : $containerInsets.paddingTop + 20,
        },
      ]}>
      {IconComponent && <View>{IconComponent}</View>}

      <View style={$body}>
        <Text preset="textLabel" style={[$whiteText]}>
          {title}
        </Text>
        <Spacer height={3} />
        <Text style={[$whiteText]}>{description}</Text>
      </View>
    </View>
  );
};

const $container: ViewStyle = {
  flexDirection: 'row',
  paddingHorizontal: 20,
  paddingVertical: 16,
  borderRadius: 20,
  margin: 10,
};

const $body: ViewStyle = {
  width: '85%',
  marginLeft: spacing.s8,
};

const $whiteText: TextStyle = {
  color: 'white',
};
