import React from 'react';
import { ImageURISource, TextStyle, View, ViewStyle } from 'react-native';
import { Image } from '../Image';
import { Text } from '../Text';

export interface ProfileImageAndNameProps {
  name: string;
  photoUrl?: string;
  textColor?: TextStyle['color'];
}

export const ProfileImageAndName = (props: ProfileImageAndNameProps) => {
  const { textColor = '#333333', name } = props;
  const photoUrl = props.photoUrl as ImageURISource;

  const $textStyle = [{ color: textColor }];

  return (
    <View style={$imageContainer}>
      <Image
        size={26}
        source={
          photoUrl
            ? { uri: photoUrl }
            : require('../../../assets/images/LoginBackground.png')
        }
      />
      <Text preset="formHelper" style={$textStyle} text={name} />
    </View>
  );
};

const $imageContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
};
