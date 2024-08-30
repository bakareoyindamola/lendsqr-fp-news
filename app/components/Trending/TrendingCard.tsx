import React from 'react';
import {
  ImageBackground,
  ImageStyle,
  ImageURISource,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AppNavigatorProps } from '../../navigators/AppNavigator.tsx';
import { AppDispatch } from '../../store';
import { NewsItem } from '../../store/news/news.types.ts';
import { setCurrentlyReading } from '../../store/news/newsSlice.ts';
import { spacing } from '../../theme';
import { DateTime } from '../DateTime';
import { ProfileImageAndName } from '../ProfileImageAndName';
import { Spacer } from '../Spacer';
import { Text } from '../Text';

export interface TrendingCardProps {
  data: NewsItem;
}

export const TrendingCard = (props: TrendingCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const appNavigation = useNavigation<AppNavigatorProps>();
  const { data } = props;
  const { attributes } = data;
  const imageUrl = attributes.image_url as ImageURISource;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        dispatch(setCurrentlyReading(data));
        appNavigation.navigate('NewsDetails');
      }}>
      <ImageBackground
        style={$imageBackgroundContainer}
        source={
          imageUrl
            ? { uri: imageUrl }
            : require('../../../assets/images/login_background.png')
        }>
        <View style={$backdrop} />
        <View style={$contentContainerStyle}>
          <View style={$labelContainer}>
            <Text
              preset="textLabel"
              style={[$fontSize10, $whiteText]}
              text={attributes.topic}
            />
          </View>
          <View>
            <DateTime date={attributes.published_date} textColor="#FFFFFF" />
            <Spacer height={9} />
            <Text
              preset="textLabel"
              style={$whiteText}
              text={attributes.title}
            />
            <Spacer height={14} />
            <ProfileImageAndName name={attributes.author} textColor="white" />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const $imageBackgroundContainer: ImageStyle = {
  position: 'relative',
  minWidth: 300,
  maxWidth: 300,
  height: 237,
  maxHeight: 237,
  borderRadius: spacing.s24,
  overflow: 'hidden',
};

const $backdrop: ViewStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  opacity: 0.65,
};

const $contentContainerStyle: ViewStyle = {
  height: 237,
  maxHeight: 237,
  borderRadius: spacing.s24,
  paddingHorizontal: spacing.s20,
  paddingVertical: spacing.s18,
  justifyContent: 'space-between',
  zIndex: 1,
};

const $labelContainer: ViewStyle = {
  backgroundColor: '#2C2525',
  alignSelf: 'flex-start',
  paddingHorizontal: spacing.s12,
  paddingVertical: spacing.s2,
  borderRadius: spacing.s40,
};

const $fontSize10: TextStyle = {
  fontSize: 10,
};

const $whiteText: TextStyle = {
  color: 'white',
};
