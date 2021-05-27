import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Text, StyleSheet } from 'react-native';

import { selectConfig } from '../store/reducers/config';
import * as TYPOGRAPHY from '../constants/typography';

export function Paragraph({ children, style }) {
  const { text_color_primary: color } = useSelector(selectConfig);

  return <Text style={[styles.paragraph, { color }, style]}>{children}</Text>;
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
