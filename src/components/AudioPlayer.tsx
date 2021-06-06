import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

import { ProgressBar } from './ProgressBar';
import { AudioControls } from './AudioControls';

Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  staysActiveInBackground: true,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
}).catch(console.log);

export const AudioPlayer = ({ uri, parentSetSound, onComplete }: Props) => {
  const [soundObject, setSoundObject] = React.useState<Audio.Sound>();
  const [progress, setProgress] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const onPlaybackStatusUpdate = (status) => {
    if (!status.isLoaded) {
      setIsLoaded(false);
      return;
    }

    const { isPlaying, durationMillis, positionMillis, didJustFinish } = status;

    // console.log('onPlayBackStatusUpdate', status);

    setIsPlaying(isPlaying);

    if (durationMillis) {
      setProgress(positionMillis / durationMillis);
    }

    if (didJustFinish) {
      onComplete();
    }
  };

  const togglePlayState = React.useCallback(() => {
    if (!isPlaying) {
      soundObject?.playAsync();
    } else {
      soundObject?.pauseAsync();
    }
  }, [soundObject, isPlaying]);

  React.useEffect(() => {
    const loadSound = async () => {
      console.log('loading audio');

      const { sound, status } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );

      // console.log('createAsync status', status);
      setSoundObject(sound);
      setIsLoaded(status.isLoaded);

      await sound.setPositionAsync(0);
      await sound.playAsync();
      parentSetSound(sound);
    };

    const unloadSound = async () => {
      if (soundObject) {
        console.log('unloading audio');
        setIsPlaying(false);
        setIsLoaded(false);
        setProgress(0);
        await soundObject.unloadAsync();
      }
    };

    loadSound();

    return () => {
      unloadSound();
    };
  }, [uri]);

  const rewind = () =>
    soundObject?.getStatusAsync().then((status) => {
      if (status.isLoaded) {
        soundObject?.setPositionAsync(Math.max(status.positionMillis - 15 * 1000, 0));
      }
    });

  const fullRewind = () => {
    soundObject?.setPositionAsync(0);
  };

  const forwards = () =>
    soundObject?.getStatusAsync().then((status) => {
      if (status.isLoaded) {
        soundObject?.setPositionAsync(
          Math.min(status.positionMillis + 15 * 1000, status.durationMillis || 0)
        );
      }
    });

  const skipToEnd = async () => {
    console.log('skipToEnd', !!soundObject);
    if (!soundObject) return;
    const status = await soundObject.getStatusAsync();
    if (status.isLoaded && status.durationMillis) {
      soundObject.setPositionAsync(status.durationMillis);
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} />
      <AudioControls
        disabled={!isLoaded}
        onRewind={rewind}
        onLongRewind={fullRewind}
        onPlayPause={togglePlayState}
        onForwards={forwards}
        onLongForwards={skipToEnd}
        isPlaying={isPlaying}
      />
    </View>
  );
};

interface Props {
  uri: string;
  onComplete: () => void;
  parentSetSound: (sound: Audio.Sound) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'flex-end',
  },
});
