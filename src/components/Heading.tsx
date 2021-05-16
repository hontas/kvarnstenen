import * as React from 'react';
import { Text, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';

import * as TYPOGRAPHY from '../constants/typography';

interface Props {
  children: string | string[];
  style?: ViewStyle | TextStyle;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const fontSizes = {
  1: TYPOGRAPHY.fontSize.heading1,
  2: TYPOGRAPHY.fontSize.heading2,
  3: TYPOGRAPHY.fontSize.heading3,
  4: TYPOGRAPHY.fontSize.large,
  5: TYPOGRAPHY.fontSize.medium,
  6: TYPOGRAPHY.fontSize.medium,
};

export function Heading({ children, style, level = 1 }: Props) {
  return (
    <View style={[styles.container, { marginVertical: fontSizes[level] }]}>
      <Text style={[styles.heading, { fontSize: fontSizes[level] }, style]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: TYPOGRAPHY.fontSize.heading1,
  },
  heading: {
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
});
