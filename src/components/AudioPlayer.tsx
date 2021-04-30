import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';

import { ProgressBar } from './ProgressBar';
import { AudioControls } from './AudioControls';

Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
  .then(() => console.log('playSilentOk'))
  .catch(console.log);

export const AudioPlayer = ({ uri, soundRef, onComplete }: Props) => {
  const sound = React.useRef<Audio.Sound>();
  const [message, setMessage] = React.useState('');
  const [progress, setProgress] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [status, setStatus] = React.useState<AVPlaybackStatus>();

  const onPlaybackStatusUpdate = (status) => {
    // console.log('onPlayBackStatusUpdate', status);
    if (playing !== status.isPlaying) {
      setStatus(status);
    }
    if (status.isLoaded && status.durationMillis) {
      setProgress(status.positionMillis / status.durationMillis);
    }
    if (status.didJustFinish) {
      onComplete();
      setPlaying(false);
    }
  };

  React.useEffect(() => {
    if (!status || !status.isLoaded) return;

    if (playing && !status.isPlaying) {
      sound.current?.playAsync();
    }
    if (!playing && status.isPlaying) {
      sound.current?.pauseAsync();
    }
  }, [sound, playing, status]);

  React.useEffect(() => {
    setMessage('Laddar ljudfil');
    console.log('laddar ljudfil', uri);
    Audio.Sound.createAsync({ uri }, { shouldPlay: false }, onPlaybackStatusUpdate).then((audio) => {
      sound.current = soundRef.current = audio.sound;
      console.log('play it');
      sound.current.playAsync();
      setMessage('');
      setStatus(status);
      setPlaying(true);
    });

    return () => {
      if (sound.current) {
        setMessage('unloading sound');
        sound.current?.unloadAsync();
        setStatus(undefined);
        setPlaying(false);
        setProgress(0);
        setMessage('');
      }
    };
  }, [uri]);

  const rewind = () =>
    sound.current?.getStatusAsync().then((status) => {
      if (status.isLoaded) {
        sound.current?.setPositionAsync(Math.max(status.positionMillis - 15 * 1000, 0));
      }
    });

  const fullRewind = () => {
    sound.current?.setPositionAsync(0);
    setProgress(0);
  };

  const playPause = () => setPlaying(!playing);

  const forwards = () =>
    sound.current?.getStatusAsync().then((status) => {
      if (status.isLoaded) {
        sound.current?.setPositionAsync(Math.min(status.positionMillis + 15 * 1000, status.durationMillis || 0));
      }
    });

  const skipToEnd = () => {
    if (status?.isLoaded && status.durationMillis) {
      sound.current?.playFromPositionAsync(status.durationMillis);
    } else {
      sound.current?.getStatusAsync().then((status) => {
        if (status.isLoaded && status.durationMillis) {
          sound.current?.setPositionAsync(status.durationMillis);
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <ProgressBar progress={progress} />
      <AudioControls
        onRewind={rewind}
        onLongRewind={fullRewind}
        onPlayPause={playPause}
        onForwards={forwards}
        onLongForwards={skipToEnd}
        isPlaying={playing}
      />
    </View>
  );
};

interface Props {
  uri: string;
  onComplete: () => void;
  soundRef: React.RefObject<Audio.Sound>;
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'flex-end',
  },
});
