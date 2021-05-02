import * as React from 'react';
import { Text, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';

import * as TYPOGRAPHY from '../constants/typography';

interface Props {
  children: JSX.Element;
  style: ViewStyle | TextStyle;
}

export function Heading({ children, style }: Props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.heading, style]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: TYPOGRAPHY.fontSize.heading1,
  },
  heading: {
    fontSize: TYPOGRAPHY.fontSize.heading1,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
});
