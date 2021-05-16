import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';

import COLORS from '../constants/colors';
import * as TYPOGRAPHY from '../constants/typography';

interface Props {
  children?: JSX.Element;
  disabled?: boolean;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  text?: string;
  accessibilityLabel?: string;
}

function Button({ onPress, text, style, textStyle, children, disabled, ...rest }: Props) {
  return (
    <TouchableOpacity
      {...rest}
      disabled={disabled}
      style={[styles.container, style]}
      onPress={onPress}
    >
      <View>
        {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
        {children}
      </View>
    </TouchableOpacity>
  );
}

export function Primary({ style = {}, textStyle = {}, disabled, ...props }: Props) {
  const disabledStyles = disabled ? styles.primaryContainerDisabled : {};

  return (
    <Button
      disabled={disabled}
      style={[styles.primaryContainer, disabledStyles, style]}
      textStyle={[styles.primaryText, textStyle]}
      {...props}
    />
  );
}

export function Secondary({ style = {}, textStyle = {}, disabled, ...props }: Props) {
  const disabledStyles = disabled ? styles.secondaryContainerDisabled : {};

  return (
    <Button
      style={[styles.secondaryContainer, disabledStyles, style]}
      textStyle={[styles.secondaryText, textStyle]}
      {...props}
    />
  );
}

export function Tertiary({ style = {}, textStyle = {}, ...props }: Props) {
  return <Button style={style} textStyle={[styles.tertiaryText, textStyle]} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 5,
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
  secondaryContainerDisabled: {},
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
