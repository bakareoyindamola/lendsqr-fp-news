import React from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { NewsCard } from '../NewsCard';
import { Spacer } from '../Spacer';
import { Text } from '../Text';
import { FilterExplore } from './filterExplore.tsx';
import { Loader } from './loader.tsx';

const ItemSeparator = () => <Spacer height={16} />;
const ListFooter = () => <Spacer height={20} />;

export const Explore = () => {
  const { exploreIsLoading, exploreData } = useSelector(
    (state: RootState) => state.news,
  );

  return (
    <View>
      <Text preset="textLabel">Explore</Text>
      <Spacer height={23} />
      <FilterExplore />
      <Spacer height={37} />
      {exploreIsLoading && <Loader />}
      {!exploreIsLoading && (
        <FlashList
          data={exploreData}
          ItemSeparatorComponent={ItemSeparator}
          ListFooterComponent={ListFooter}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <Animated.View entering={FadeInDown.delay(50 * index)}>
                <NewsCard data={item} />
              </Animated.View>
            );
          }}
          estimatedItemSize={100}
        />
      )}
    </View>
  );
};
