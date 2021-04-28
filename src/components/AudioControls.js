import * as React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

import Colors from '../constants/colors';

export const AudioControls = ({ onRewind, onPlayPause, onForwards, isPlaying }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom, marginBottom: -insets.bottom }]}>
      <TouchableOpacity style={styles.controlButton} onPress={onRewind}>
        <Entypo name="controller-fast-backward" size={24} color={Colors.white} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButton} onPress={onPlayPause}>
        <Entypo name={isPlaying ? 'controller-paus' : 'controller-play'} size={24} color={Colors.white} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButton} onPress={onForwards}>
        <Entypo name="controller-fast-forward" size={24} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};

AudioControls.propTypes = {
  onRewind: PropTypes.func.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  onForwards: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

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
