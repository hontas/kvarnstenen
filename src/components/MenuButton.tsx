import * as React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

import { selectConfig } from '../store/reducers/config';
// import COLORS from '../constants/colors';

interface Props {
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
}

export const MenuButton = ({ onPress, style }: Props) => {
  const { top } = useSafeAreaInsets();
  const { text_color_primary } = useSelector(selectConfig);
  const buttonStyle = (style
    ? [styles.container, { top }, style]
    : [styles.container, { top }]) as ViewStyle[];

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Entypo name="menu" size={24} color={text_color_primary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: COLORS.whiteTransparent,
    position: 'absolute',
    left: 0,
    padding: 10,
    marginTop: -5,
    zIndex: 1,
  },
});
