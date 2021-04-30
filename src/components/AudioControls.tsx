import * as React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

import Colors from '../constants/colors';

const noop = () => {};

export const AudioControls = ({
  onRewind,
  onLongRewind = noop,
  onPlayPause,
  onForwards = noop,
  onLongForwards,
  isPlaying,
}: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom, marginBottom: -insets.bottom }]}>
      <TouchableOpacity style={styles.controlButton} onPress={onRewind} onLongPress={onLongRewind}>
        <Entypo name="controller-fast-backward" size={24} color={Colors.white} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButton} onPress={onPlayPause}>
        <Entypo name={isPlaying ? 'controller-paus' : 'controller-play'} size={24} color={Colors.white} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButton} onPress={onForwards} onLongPress={onLongForwards}>
        <Entypo name="controller-fast-forward" size={24} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};

interface Props {
  onRewind: () => void;
  onLongRewind: () => void;
  onPlayPause: () => void;
  onForwards: () => void;
  onLongForwards: () => void;
  isPlaying: boolean;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grayDark,
    flexDirection: 'row',
  },
  controlButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
