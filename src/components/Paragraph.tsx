import * as React from 'react';
import { useSelector } from 'react-redux';
import { Text, StyleSheet, TextStyle } from 'react-native';

import { selectConfig } from '../store/reducers/config';
import * as TYPOGRAPHY from '../constants/typography';

interface Props {
  children: JSX.Element | string;
  style?: TextStyle;
}

export function Paragraph({ children, style = {} }: Props) {
  const { text_color_primary: color } = useSelector(selectConfig);

  return <Text style={[styles.paragraph, { color }, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: TYPOGRAPHY.fontSize.large,
    lineHeight: TYPOGRAPHY.fontSize.large * 1.4,
    marginVertical: TYPOGRAPHY.fontSize.large,
  },
});
