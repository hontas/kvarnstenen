import * as React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

import TYPOGRAPHY from '../constants/typography';

export function Heading({ children, style }) {
  return <Text style={[styles.heading, style]}>{children}</Text>;
}
Heading.propTypes = {
  children: PropTypes.string,
  style: Text.propTypes.style,
};

const styles = StyleSheet.create({
  heading: {
    fontSize: TYPOGRAPHY.fontSize.heading1,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginVertical: TYPOGRAPHY.fontSize.heading1,
  },
});
