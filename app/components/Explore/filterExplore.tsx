import React, { useEffect } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useDispatch, useSelector } from 'react-redux';
import { topics } from '../../constants/filterData.ts';
import { AppDispatch, RootState } from '../../store';
import { getExploreNewsAsync } from '../../store/news/newsSlice.ts';
import { spacing } from '../../theme';
import { Button } from '../Button';
import { Spacer } from '../Spacer';

const ItemSeparator = () => <Spacer width={16} />;
const ListFooter = () => <Spacer width={20} />;

export const FilterExplore = () => {
  const { exploreIsLoading } = useSelector((state: RootState) => state.news);
  const [topic, setTopic] = React.useState<string[]>(topics);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setTopic([...topics]);
  }, [exploreIsLoading]);

  return (
    <View>
      <FlashList
        data={topic}
        horizontal
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={ListFooter}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <Button
              style={$button}
              text={item}
              textStyle={$text}
              disabled={exploreIsLoading}
              onPress={() => {
                dispatch(
                  getExploreNewsAsync({
                    page: 1,
                    filter: [
                      {
                        field: 'topic',
                        operator: '$contains',
                        value: item,
                      },
                    ],
                  }),
                );
              }}
            />
          );
        }}
        estimatedItemSize={topics.length}
      />
    </View>
  );
};

const $button: ViewStyle = {
  paddingHorizontal: spacing.s22,
  paddingVertical: spacing.s8,
  minHeight: spacing.s36,
  height: spacing.s36,
  maxHeight: spacing.s36,
  backgroundColor: '#F0F0F0',
  borderColor: '#F0F0F0',
};

const $text: TextStyle = {
  color: '#828282',
  fontSize: 14,
  fontWeight: 'normal',
};
