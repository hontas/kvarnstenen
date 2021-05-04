import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';

import COLORS from '../constants/colors';
import * as TYPOGRAPHY from '../constants/typography';

interface VariantProps {
  children?: JSX.Element;
  disabled?: boolean;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  text?: string;
  accessibilityLabel?: string;
}

interface Props extends VariantProps {
  textStyle: TextStyle | TextStyle[];
}

function Button({ onPress, text, style, textStyle, children, disabled, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest} disabled={disabled} style={[styles.container, style]} onPress={onPress}>
      <View>
        {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
        {children}
      </View>
    </TouchableOpacity>
  );
}

export function Primary({ style = {}, disabled, ...props }: VariantProps) {
  const disabledStyles = disabled ? styles.primaryContainerDisabled : {};

  return (
    <Button
      disabled={disabled}
      style={[styles.primaryContainer, disabledStyles, style]}
      textStyle={styles.primaryText}
      {...props}
    />
  );
}

export function Secondary({ style = {}, disabled, ...props }: VariantProps) {
  const disabledStyles = disabled ? styles.secondaryContainerDisabled : {};

  return (
    <Button style={[styles.secondaryContainer, disabledStyles, style]} textStyle={styles.secondaryText} {...props} />
  );
}

export function Tertiary({ style, ...props }: VariantProps) {
  return <Button style={style} textStyle={styles.tertiaryText} {...props} />;
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
