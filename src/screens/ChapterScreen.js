import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Audio } from 'expo-av';

import { Heading } from '../components/Heading';
import * as Button from '../components/Button';
import { selectChapters } from '../store/reducers/chapters';
import { screenPropTypes } from '../constants/propTypes';
import Colors from '../constants/colors';

Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
  .then(() => console.log('playSilentOk'))
  .catch(console.log);
export function ChapterScreen({ navigation, route }) {
  const routeName = route.name.split('/')[1];
  const chapters = useSelector(selectChapters);
  const chapter = chapters[routeName];
  // console.log('chapter', chapter);

  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState();
  const [progress, setProgress] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  // const [status, setStatus] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const onPlaybackStatusUpdate = (status) => {
    // console.log('onPlayBackStatusUpdate', status);
    if (status.isLoaded && status.isPlaying && status.playableDurationMillis) {
      setProgress(status.positionMillis / status.playableDurationMillis);
    }
    if (status.didJustFinish) {
      setShowChoices(true);
    }
  };

  useEffect(() => {
    Audio.Sound.createAsync({ uri: chapter.body.audio[0].url }, { shouldPlay: false }, onPlaybackStatusUpdate).then(
      ({ sound }) => {
        setSound(sound);
        sound.getStatusAsync().then((status) => {
          // console.log(status);
          setIsLoaded(status.isLoaded);
        });
      }
    );
    return () => {
      sound && sound.unloadAsync();
      setIsLoaded(false);
      setPlaying(false);
    };
  }, [chapter]);

  useEffect(() => {
    if (!sound) return;
    if (playing) {
      if (isLoaded) {
        console.log('playing');
        sound.playAsync();
      }
    } else {
      if (isLoaded) {
        console.log('pausing');
        sound.pauseAsync();
      }
    }
  }, [sound, playing, isLoaded]);

  useEffect(() => {
    return () => {
      sound && sound.unloadAsync();
    };
  }, [sound]);

  return (
    <SafeAreaView style={styles.container}>
      <Heading>{chapter.name}</Heading>
      <Button.Secondary text={playing ? '⏸' : '▶️'} onPress={() => setPlaying(!playing)} />
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { transform: [{ translateX: progress * 255 }] }]} />
      </View>
      <View style={[styles.choices, { opacity: showChoices && styles.showChoices }]}>
        {chapter.choices.map(({ choice_text, chapter_link }) => (
          <Button.Primary
            key={chapter_link}
            text={choice_text}
            style={styles.button}
            onPress={() => navigation.navigate(`chapter/${chapter_link}`)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}
ChapterScreen.propTypes = {
  ...screenPropTypes,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    marginBottom: 50,
    marginHorizontal: 20,
  },
  choices: {
    flex: 1,
    justifyContent: 'flex-end',
    opacity: 0.1,
    width: '100%',
  },
  showChoices: {
    opacity: 1,
  },
  button: {
    marginBottom: 10,
  },
  progressBarContainer: {
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: 10,
    width: '100%',
  },
  progressBar: {
    backgroundColor: Colors.green,
    position: 'absolute',
    width: '100%',
    height: 3,
    right: '100%',
  },
});
