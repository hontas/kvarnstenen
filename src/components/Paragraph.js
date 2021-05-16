import * as React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

import * as TYPOGRAPHY from '../constants/typography';

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
    lineHeight: TYPOGRAPHY.fontSize.large * 1.4,
    marginVertical: TYPOGRAPHY.fontSize.large,
  },
});
