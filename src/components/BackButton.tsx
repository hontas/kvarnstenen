import * as React from 'react';
import { StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

import COLORS from '../constants/colors';

interface Props {
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
}

export const BackButton = ({ onPress, style }: Props) => {
  const { top } = useSafeAreaInsets();
  const buttonStyle = (style
    ? [styles.container, { top }, style]
    : [styles.container, { top }]) as ViewStyle[];

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Entypo name="back" size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.whiteTranslucent,
    borderRadius: 30,
    position: 'absolute',
    left: 0,
    padding: 10,
    marginTop: -5,
    zIndex: 1,
  },
});
