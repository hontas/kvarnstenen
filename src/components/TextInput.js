import * as React from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';

import COLORS from '../constants/colors';
import * as TYPOGRAPHY from '../constants/typography';
import LAYOUT from '../constants/layout';

function Input({ placeholder, onChangeText, style }) {
  return <TextInput style={[styles.container, style]} onChangeText={onChangeText} placeholder={placeholder} />;
}
Input.propTypes = {
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  style: TextInput.propTypes.style,
};

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
