import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

import COLORS from '../constants/colors';

const noop = () => {};

export const AudioControls = ({
  disabled,
  onRewind,
  onLongRewind = noop,
  onPlayPause,
  onForwards = noop,
  onLongForwards,
  isPlaying,
}: Props) => {
  const insets = useSafeAreaInsets();
  const buttonStyles = styles.controlButton;
  const buttonColor = disabled ? COLORS.whiteTransparent : COLORS.white;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom, marginBottom: -insets.bottom }]}>
      <TouchableOpacity disabled={disabled} style={buttonStyles} onPress={onRewind} onLongPress={onLongRewind}>
        <Entypo name="controller-fast-backward" size={24} color={buttonColor} />
      </TouchableOpacity>
      <TouchableOpacity disabled={disabled} style={buttonStyles} onPress={onPlayPause}>
        <Entypo name={isPlaying ? 'controller-paus' : 'controller-play'} size={24} color={buttonColor} />
      </TouchableOpacity>
      <TouchableOpacity disabled={disabled} style={buttonStyles} onPress={onForwards} onLongPress={onLongForwards}>
        <Entypo name="controller-fast-forward" size={24} color={buttonColor} />
      </TouchableOpacity>
    </View>
  );
};

interface Props {
  disabled: boolean;
  onRewind: () => void;
  onLongRewind: () => void;
  onPlayPause: () => void;
  onForwards: () => void;
  onLongForwards: () => void;
  isPlaying: boolean;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.grayDark,
    flexDirection: 'row',
  },
  controlButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
