import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { selectConfig } from '../store/reducers/config';

interface Props {
  children: JSX.Element | JSX.Element[];
  style?: ViewStyle | ViewStyle[];
  flip?: boolean;
}

export function Background({ children, style, flip }: Props) {
  const config = useSelector(selectConfig);
  const colors = [
    config.background_color_primary,
    config.background_color_gradient_primary || config.background_color_primary,
  ];

  if (flip) colors.reverse();

  return (
    <LinearGradient style={[styles.background, style]} colors={colors}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
