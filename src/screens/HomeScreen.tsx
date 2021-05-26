import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Animated, Easing, View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Video } from 'expo-av';

import useT from '../utils/useT';
import { selectScreen, selectScreensLoading, selectScreensError } from '../store/reducers/screens';
import { selectSlotsList, createNewGame } from '../store/reducers/game';
import * as Button from '../components/Button';
import { Heading } from '../components/Heading';
import { LoadingScreen } from './LoadingScreen';
import { ROUTE_NAMES } from '../constants/routes';
import { ScreenProps } from '../constants/types';

const SCREEN = Dimensions.get('screen');
const defaultAspectRatio = 16 / 9;
type Props = ScreenProps;

export function HomeScreen({ navigation }: Props) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectScreensLoading);
  const error = useSelector(selectScreensError);
  const screen = useSelector(selectScreen('home'));
  const slotsArray = useSelector(selectSlotsList);
  const hasSavedGames = slotsArray.length > 0;
  const t = useT(screen?.ui_texts);
  const video = React.useRef<Video>(null);
  const [videoSize, setVideoSize] = React.useState({
    width: SCREEN.width,
    height: SCREEN.width / defaultAspectRatio,
  });
  const hasVideo = Boolean(
    ['mov', 'mp4', 'm4v', '3gp'].includes(screen?.media?.url.split('.').pop())
  );

  const opacity = React.useRef(new Animated.Value(0)).current;
  const fadeIn = Animated.timing(opacity, {
    toValue: 1,
    useNativeDriver: true,
    duration: 5000,
    easing: Easing.linear,
  });

  const onReadyForDisplay = React.useCallback(({ naturalSize }) => {
    const { height, width } = naturalSize;
    const aspectRatio = width / height;
    setVideoSize((previous) => ({
      ...previous,
      height: SCREEN.width / aspectRatio,
    }));
  }, []);

  const onLoad = React.useCallback(() => {
    if (video.current) {
      video.current.playAsync();
      fadeIn.start();
    }
  }, [video, fadeIn]);

  const newGame = useCallback(async () => {
    await dispatch(createNewGame());
    navigation.navigate(ROUTE_NAMES.GAME_LOADING);
  }, [navigation, dispatch]);

  useEffect(() => {
    if (screen) {
      navigation.setOptions({ title: screen.name });
    }
  }, [screen, navigation]);

  if (error) return <Heading>Ngt gick snett {error}</Heading>;
  if (isLoading) return <LoadingScreen />;

  return (
    <SafeAreaView style={styles.container}>
      <Heading>{screen.title}</Heading>
      <Animated.View style={[styles.videoContainer, { opacity }]}>
        {hasVideo && (
          <Video
            ref={video}
            style={videoSize}
            source={{ uri: screen.media.url }}
            resizeMode="contain"
            isLooping
            onReadyForDisplay={onReadyForDisplay}
            onLoad={onLoad}
          />
        )}
      </Animated.View>
      <View style={styles.actionButtons}>
        <Button.Primary text={t('new_game')} style={styles.button} onPress={newGame} />
        {hasSavedGames && (
          <Button.Secondary
            text={t('continue_game')}
            style={styles.button}
            onPress={() => navigation.navigate(ROUTE_NAMES.CONTINUE_GAME)}
          />
        )}
        <Button.Tertiary
          text={t('how_to_play')}
          style={styles.button}
          onPress={() => navigation.navigate(ROUTE_NAMES.HOW_TO_PLAY)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 50,
    marginHorizontal: 20,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  actionButtons: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  button: {
    marginTop: 30,
  },
});
