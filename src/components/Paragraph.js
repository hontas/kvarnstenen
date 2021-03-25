import * as React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

import TYPOGRAPHY from '../constants/typography';

export function Paragraph({ children, style }) {
  return <Text style={[styles.paragraph, style]}>{children}</Text>;
}
Paragraph.propTypes = {
  children: PropTypes.string,
  style: Text.propTypes.style,
};

const styles = StyleSheet.create({
  paragraph: {
    fontSize: TYPOGRAPHY.fontSize.large,
    marginVertical: TYPOGRAPHY.fontSize.large,
  },
});