import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Audio } from 'expo-av';

import { ProgressBar } from './ProgressBar';
import { AudioControls } from './AudioControls';

Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
  .then(() => console.log('playSilentOk'))
  .catch(console.log);

export const AudioPlayer = ({ uri, onComplete }) => {
  const [sound, setSound] = React.useState();
  const [message, setMessage] = React.useState();
  const [progress, setProgress] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [status, setStatus] = React.useState(null);

  const onPlaybackStatusUpdate = (status) => {
    // console.log('onPlayBackStatusUpdate', status);
    if (playing !== status.isPlaying) {
      setStatus((prev) => ({ ...prev, isPlaying: status.isPlaying }));
    }
    if (status.isLoaded && status.isPlaying && status.playableDurationMillis) {
      setProgress(status.positionMillis / status.playableDurationMillis);
    }
    if (status.didJustFinish) {
      setPlaying(false);
      onComplete();
    }
  };

  React.useEffect(() => {
    if (!sound || !status || !status.isLoaded) return;

    if (playing && !status.isPlaying) {
      sound.playAsync();
    }
    if (!playing && status.isPlaying) {
      sound.pauseAsync();
    }
  }, [sound, playing, status]);

  React.useEffect(() => {
    setMessage('Laddar ljudfil');
    Audio.Sound.createAsync({ uri }, { shouldPlay: false }, onPlaybackStatusUpdate).then(({ sound }) => {
      setMessage('Laddad');
      setSound(sound);
      sound.getStatusAsync().then((status) => {
        // console.log(status);
        setMessage('');
        setStatus(status);
      });
    });

    return () => {
      if (sound) {
        setMessage('unloading sound');
        sound.unloadAsync();
        setSound(null);
        setStatus(null);
        setPlaying(false);
        setProgress(0);
        setMessage('');
      }
    };
  }, [uri]);

  const rewind = () =>
    sound.getStatusAsync().then(({ positionMillis }) => {
      sound.setPositionAsync(Math.max(positionMillis - 15 * 1000, 0));
    });
  const playPause = () => setPlaying(!playing);
  const forwards = () =>
    sound.getStatusAsync().then(({ positionMillis, durationMillis }) => {
      sound.setPositionAsync(Math.min(positionMillis + 15 * 1000, durationMillis));
    });

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <ProgressBar progress={progress} />
      <AudioControls onRewind={rewind} onPlayPause={playPause} onForwards={forwards} isPlaying={playing} />
    </View>
  );
};

AudioPlayer.propTypes = {
  uri: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'flex-end',
  },
});
