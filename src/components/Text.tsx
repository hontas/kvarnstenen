import * as React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text as RNText, TextStyle } from 'react-native';

import { selectConfig } from '../store/reducers/config';

interface Props {
  children: JSX.Element | string;
  style?: TextStyle | TextStyle[];
}

export function Regular({ children, style }: Props) {
  const { text_color_primary: color } = useSelector(selectConfig);

  return <RNText style={[styles.text, { color }, style]}>{children}</RNText>;
}

const styles = StyleSheet.create({
  text: {
    lineHeight: 25,
  },
});
