import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { spacing } from '../../theme';
import { formatDate } from '../../utils/formatDate.ts';
import { Text } from '../Text';

export interface DateTimeProps {
  date: Date;
  textColor?: TextStyle['color'];
}

export const DateTime = (props: DateTimeProps) => {
  const { textColor = '#BDBDBD', date } = props;

  const formattedData = formatDate(date);
  const $textStyle = [$dateTimeText, textColor && { color: textColor }];
  return (
    <View style={$flexDirectionRowAndAlignCenter}>
      <Text preset="textLabel" style={$textStyle}>
        {formattedData.day}
      </Text>
      <View style={$dot} />
      <Text preset="textLabel" style={$textStyle}>
        {formattedData.hours}
      </Text>
    </View>
  );
};

const $flexDirectionRowAndAlignCenter: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const $dateTimeText: TextStyle = {
  fontSize: 10,
  color: '#BDBDBD',
  textTransform: 'uppercase',
};

const $dot: ViewStyle = {
  width: spacing.s4,
  height: spacing.s4,
  borderRadius: spacing.s4,
  backgroundColor: '#BDBDBD',
  marginHorizontal: 3,
};
