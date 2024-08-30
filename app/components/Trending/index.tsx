import React from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Spacer } from '../Spacer';
import { Text } from '../Text';
import { Loader } from './loader.tsx';
import { TrendingCard } from './TrendingCard.tsx';

const ItemSeparator = () => <Spacer width={16} />;
const ListFooter = () => <Spacer width={20} />;

export const Trending = () => {
  const { trendingIsLoading, trendingData } = useSelector(
    (state: RootState) => state.news,
  );

  if (trendingIsLoading) {
    return <Loader />;
  }

  return (
    <View>
      <Text preset="textLabel">Trending</Text>
      <Spacer height={21} />
      <FlashList
        data={trendingData}
        horizontal
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={ListFooter}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <TrendingCard data={item} />}
        estimatedItemSize={100}
      />
    </View>
  );
};
