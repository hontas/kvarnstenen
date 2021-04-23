import * as React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity, ViewPropTypes } from 'react-native';

import COLORS from '../constants/colors';
import TYPOGRAPHY from '../constants/typography';
import LAYOUT from '../constants/layout';

const propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string,
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  children: PropTypes.element,
  disabled: PropTypes.bool,
};

function Button({ onPress, text, style, textStyle, children, disabled, ...rest }) {
  return (
    <TouchableOpacity {...rest} disabled={disabled} style={[styles.container, style]} onPress={onPress}>
      <View>
        {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
        {children}
      </View>
    </TouchableOpacity>
  );
}
Button.propTypes = propTypes;

export function Primary({ style, disabled, ...props }) {
  return (
    <Button
      disabled={disabled}
      style={[styles.primaryContainer, disabled && styles.primaryContainerDisabled, style]}
      textStyle={styles.primaryText}
      {...props}
    />
  );
}
Primary.propTypes = propTypes;

export function Secondary({ style, disabled, ...props }) {
  return (
    <Button
      style={[styles.secondaryContainer, disabled && styles.secondaryContainerDisabled, style]}
      textStyle={styles.secondaryText}
      {...props}
    />
  );
}
Secondary.propTypes = propTypes;

export function Tertiary({ style, ...props }) {
  return <Button style={style} textStyle={styles.tertiaryText} {...props} />;
}
Tertiary.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 5,
    height: LAYOUT.button.height,
    justifyContent: 'center',
    padding: 10,
    width: '100%',
  },
  primaryContainer: {
    backgroundColor: COLORS.button.bg_primary,
  },
  primaryContainerDisabled: {
    backgroundColor: COLORS.button.disabled,
  },
  primaryText: {
    color: COLORS.button.text_primary,
  },
  secondaryContainer: {
    backgroundColor: COLORS.button.bg_secondary,
  },
  secondaryText: {
    color: COLORS.button.text_secondary,
  },
  tertiaryText: {
    color: COLORS.button.bg_primary,
  },
  text: {
    fontSize: TYPOGRAPHY.fontSize.large,
  },
});
