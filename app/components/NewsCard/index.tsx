import React from 'react';
import {
  ImageStyle,
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
import { colors, spacing } from '../../theme';
import { DateTime } from '../DateTime';
import { Image } from '../Image';
import { Spacer } from '../Spacer';
import { Text } from '../Text';

export interface TrendingCardProps {
  data: NewsItem;
}

export const NewsCard = (props: TrendingCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const appNavigation = useNavigation<AppNavigatorProps>();
  const { data } = props;
  const { attributes } = data;

  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        dispatch(setCurrentlyReading(data));
        appNavigation.navigate('NewsDetails');
      }}>
      <View style={$NewsCardContainer}>
        <Image
          source={require('../../../assets/images/login_background.png')}
          style={$newsImage}
        />
        <View>
          <DateTime date={attributes.published_date} />
          <Spacer height={9} />
          <Text
            preset="buttonLabel"
            style={$newsTitle}
            text={attributes.title}
          />
          <Spacer height={2} />
          <Text preset="pictureLabel" style={$numbersInfoText}>
            In {attributes.topic}
          </Text>
          <Spacer height={15} />
          <View style={[$flexDirectionRowAndAlignCenter, $numbersContainer]}>
            <Text preset="numberText">
              {getRandomNumber(1, 900)}k{' '}
              <Text preset="pictureLabel" style={$numbersInfoText}>
                likes
              </Text>
            </Text>
            <Text preset="numberText">
              {getRandomNumber(1, 900)}k{' '}
              <Text preset="pictureLabel" style={$numbersInfoText}>
                views
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const $NewsCardContainer: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: spacing.s8,
  padding: spacing.s10,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 16,
};

const $newsImage: ImageStyle = {
  width: 120,
  height: 140,
  borderRadius: spacing.s8,
};

const $flexDirectionRowAndAlignCenter: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const $newsTitle: TextStyle = {
  maxWidth: '70%',
  color: '#333333',
};

const $numbersContainer: TextStyle = {
  gap: 17,
};

const $numbersInfoText: TextStyle = {
  color: '#BDBDBD',
};
