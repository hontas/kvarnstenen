import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Animated, Easing, Image, View, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Audio, Video } from 'expo-av';
import { Entypo } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useT from '../utils/useT';
import { selectScreen, selectScreensLoading, selectScreensError } from '../store/reducers/screens';
import { selectSlotsList, createNewGame } from '../store/reducers/game';
import * as Button from '../components/Button';
import { Heading } from '../components/Heading';
import { Layout } from '../components/Layout';
import { LoadingScreen } from './LoadingScreen';
import { ROUTE_NAMES } from '../constants/routes';
import { ScreenProps } from '../constants/types';
import * as LAYOUT from '../constants/layout';
import { Paragraph } from '../components/Paragraph';

const SCREEN = Dimensions.get('screen');
const kvarnstenSize = Math.round(SCREEN.width / 1.5);
const defaultAspectRatio = 16 / 9;
type Props = ScreenProps;

export function HomeScreen({ navigation }: Props) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectScreensLoading);
  const error = useSelector(selectScreensError);
  const screen = useSelector(selectScreen('home'));
  const slotsArray = useSelector(selectSlotsList);
  const insets = useSafeAreaInsets();
  const hasSavedGames = slotsArray.length > 0;
  const t = useT(screen?.ui_texts);
  const video = React.useRef<Video>(null);
  const sound = React.useRef<Audio.Sound>(null);
  const imageRotation = React.useRef<Animated.Value>(new Animated.Value(0)).current;
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [videoSize, setVideoSize] = React.useState({
    width: SCREEN.width,
    height: SCREEN.width / defaultAspectRatio,
  });

  const [hasVideo, hasAudio] = React.useMemo(() => {
    if (!screen?.media?.url) return [false, false];

    const fileType = screen.media.url.split('.').pop();
    return [['mov', 'mp4', 'm4v', '3gp'].includes(fileType), ['mp3'].includes(fileType)];
  }, [screen]);

  const opacity = React.useRef(new Animated.Value(0)).current;
  const fadeIn = Animated.timing(opacity, {
    toValue: 1,
    useNativeDriver: true,
    duration: 5000,
    easing: Easing.linear,
  });
  const rotate = Animated.loop(
    Animated.timing(imageRotation, {
      toValue: 1,
      useNativeDriver: true,
      duration: 100000,
      easing: Easing.linear,
    })
  );

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

  const unloadSound = React.useCallback(() => {
    if (sound.current) {
      sound.current.unloadAsync().catch((error) => {
        console.log('error', error);
      });
    }
  }, []);

  const newGame = React.useCallback(async () => {
    await dispatch(createNewGame());

    unloadSound();

    navigation.navigate(ROUTE_NAMES.GAME_LOADING);
  }, [navigation, dispatch]);

  const continueGame = React.useCallback(async () => {
    unloadSound();

    navigation.navigate(ROUTE_NAMES.CONTINUE_GAME);
  }, [navigation, unloadSound]);

  React.useEffect(() => {
    if (screen) {
      navigation.setOptions({ title: screen.name });
    }
  }, [screen, navigation]);

  const loadSound = React.useCallback(() => {
    Audio.Sound.createAsync({ uri: screen.media.url }, { shouldPlay: true, isLooping: true })
      .then((audio) => {
        sound.current = audio.sound;
      })
      .catch((error) => {
        console.log('loadSound', error);
      });
  }, []);

  React.useEffect(() => {
    if (!hasAudio) return;

    loadSound();

    return () => unloadSound();
  }, [hasAudio, loadSound, unloadSound]);

  React.useEffect(() => {
    if (!sound.current) return;

    if (isPlaying) {
      sound.current.playAsync();
    } else {
      sound.current.pauseAsync();
    }
  }, [sound, isPlaying]);

  const toggleMuted = React.useCallback(() => {
    setIsPlaying((previous) => !previous);
  }, []);

  if (error)
    return (
      <Layout>
        <Heading>{t('generic_error_message')}</Heading>
        <Paragraph>{error}</Paragraph>
      </Layout>
    );

  if (isLoading) return <LoadingScreen />;

  return (
    <Layout>
      <View style={[styles.volumeContainer, { top: insets.top, right: insets.right }]}>
        <Pressable onPress={toggleMuted} style={styles.volumeButton}>
          <Entypo name={isPlaying ? 'sound' : 'sound-mute'} size={24} color="white" />
        </Pressable>
      </View>
      <Heading containerStyle={styles.heading}>{screen.title}</Heading>
      {hasVideo ? (
        <Animated.View style={[styles.mediaContainer, styles.videoContainer, { opacity }]}>
          <Video
            ref={video}
            style={videoSize}
            source={{ uri: screen.media.url }}
            resizeMode="contain"
            isLooping
            onReadyForDisplay={onReadyForDisplay}
            onLoad={onLoad}
          />
        </Animated.View>
      ) : (
        <Animated.View
          style={[
            styles.mediaContainer,
            {
              transform: [
                {
                  rotateZ: imageRotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-360deg'],
                  }),
                },
              ],
            },
            { opacity },
          ]}
        >
          <Image
            style={styles.image}
            source={require('../../assets/kvarnsten.png')}
            width={kvarnstenSize}
            height={kvarnstenSize}
            onLoad={() => {
              fadeIn.start();
              rotate.start();
            }}
          />
        </Animated.View>
      )}
      <View style={styles.actionButtons}>
        <Button.Primary text={t('new_game')} style={styles.button} onPress={newGame} />
        {hasSavedGames && (
          <Button.Secondary
            text={t('continue_game')}
            style={styles.button}
            onPress={continueGame}
          />
        )}
        <Button.Tertiary
          text={t('how_to_play')}
          style={styles.button}
          onPress={() => navigation.navigate(ROUTE_NAMES.HOW_TO_PLAY)}
          onLongPress={() => navigation.navigate(ROUTE_NAMES.VERSION_INFO)}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  volumeContainer: {
    position: 'absolute',
  },
  volumeButton: {
    padding: 10,
  },
  heading: {
    alignItems: 'center',
  },
  mediaContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    marginHorizontal: -LAYOUT.horizontalMargin,
  },
  image: {
    opacity: 0.5,
    width: kvarnstenSize,
    height: kvarnstenSize,
  },
  actionButtons: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  button: {
    marginTop: LAYOUT.horizontalMargin,
  },
});
