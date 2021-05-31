import * as React from 'react';
import { TextInput, StyleSheet, ViewStyle } from 'react-native';

import COLORS from '../constants/colors';
import * as TYPOGRAPHY from '../constants/typography';
import LAYOUT from '../constants/layout';

interface Props {
  placeholder: string;
  onChangeText: () => void;
  style: ViewStyle;
}

function Input({ placeholder, onChangeText, style }: Props) {
  return (
    <TextInput
      style={[styles.container, style]}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.button.bg_primary,
    fontSize: TYPOGRAPHY.fontSize.large,
    alignItems: 'center',
    justifyContent: 'center',
    height: LAYOUT.input.height,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export { Input as TextInput };
