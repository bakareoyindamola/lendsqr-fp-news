import React, { useEffect, useMemo, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Explore,
  Header,
  Image,
  Screen,
  Spacer,
  Text,
  Trending,
} from '../../components';
import { AppDispatch, RootState } from '../../store';
import {
  getExploreNewsAsync,
  getNewsAsync,
} from '../../store/news/newsSlice.ts';
import { spacing } from '../../theme';

export const WelcomeScreen = () => {
  const [adsEnabled, setAdsEnabled] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const { displayName, isNewUser, photoURL } = useSelector(
    (state: RootState) => state.user,
  );
  const defaultImage = require('../../../assets/icons/user.png');

  const LeftActionComponent = useMemo(
    () => (
      <View style={$leftActionComponentContainer}>
        <Image size={38} source={photoURL ? { uri: photoURL } : defaultImage} />
        <Spacer width={8} />
        <View>
          <Text preset="profileHeader">
            {isNewUser ? 'Welcome' : 'Welcome back'},
          </Text>
          <Text>{displayName} 👋</Text>
        </View>
      </View>
    ),
    [],
  );

  const RightActionComponent = useMemo(
    () => (
      <Button
        preset="error"
        style={$errorButton}
        onPress={() => {
          throw new Error('New Runtime Error');
        }}>
        Error
      </Button>
    ),
    [],
  );

  useEffect(() => {
    (async () => {
      await remoteConfig().fetch(10);
      const fetchedRemoteData = await remoteConfig().fetchAndActivate();
      if (fetchedRemoteData) {
        const isAdsEnabledRemoteData = remoteConfig().getValue('advertisement');
        setTimeout(() => {
          setAdsEnabled(isAdsEnabledRemoteData.asBoolean());
        }, 10000);
      }
    })();
  }, []);

  const getRandomPageNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    dispatch(getNewsAsync({ page: getRandomPageNumber(1, 10) }));
    dispatch(getExploreNewsAsync({ page: getRandomPageNumber(5, 15) }));
  }, []);

  return (
    <View style={$parentContainer}>
      <Header
        titleMode="flex"
        LeftActionComponent={LeftActionComponent}
        RightActionComponent={RightActionComponent}
      />
      <Screen preset="auto" contentContainerStyle={$contentWrapper}>
        <View>
          <Spacer height={20} />
          <View style={$contentContainer}>
            <Trending />
            {adsEnabled && (
              <View>
                <Spacer height={30} />
                <Text preset="textLabel">Ads Enabled</Text>
              </View>
            )}
            <Spacer height={30} />
            <View style={$newsCardContainer}>
              <Explore />
            </View>
          </View>
        </View>
      </Screen>
    </View>
  );
};

const $parentContainer: ViewStyle = {
  flex: 1,
};

const $contentWrapper: ViewStyle = {
  paddingBottom: spacing.s40,
};

const $leftActionComponentContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const $errorButton: ViewStyle = {
  paddingHorizontal: spacing.s22,
  paddingVertical: spacing.s8,
  minHeight: spacing.s36,
};

const $contentContainer: ViewStyle = {
  paddingLeft: spacing.s20,
};

const $newsCardContainer: ViewStyle = {
  paddingRight: spacing.s20,
};
