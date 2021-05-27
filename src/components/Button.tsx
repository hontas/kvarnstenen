import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { useSelector } from 'react-redux';

import { selectConfig } from '../store/reducers/config';
import COLORS from '../constants/colors';
import * as TYPOGRAPHY from '../constants/typography';
import * as Text from './Text';

interface Props {
  children?: JSX.Element | JSX.Element[];
  disabled?: boolean;
  onPress: () => void;
  containerStyle?: ViewStyle | ViewStyle[];
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  text?: string;
  Icon?: () => JSX.Element;
  accessibilityLabel?: string;
}

function Button({
  onPress,
  text,
  style,
  Icon,
  containerStyle,
  textStyle = {},
  children,
  disabled,
  ...rest
}: Props) {
  return (
    <TouchableOpacity {...rest} disabled={disabled} onPress={onPress} style={containerStyle}>
      <View style={[styles.container, style]}>
        {Icon && <Icon />}
        {text && <Text.Regular style={[styles.text, textStyle]}>{text}</Text.Regular>}
        {children}
      </View>
    </TouchableOpacity>
  );
}

export function Primary({ style = {}, textStyle = {}, disabled, ...props }: Props) {
  const disabledStyles = disabled ? styles.primaryContainerDisabled : {};
  const {
    button_background_primary: backgroundColor,
    text_color_primary,
    button_text_color_primary,
  } = useSelector(selectConfig);
  const color = button_text_color_primary || text_color_primary;

  return (
    <Button
      disabled={disabled}
      style={[styles.primaryContainer, disabledStyles, { backgroundColor }, style]}
      textStyle={[styles.primaryText, { color }, textStyle]}
      {...props}
    />
  );
}

export function Secondary({ style = {}, textStyle = {}, disabled, ...props }: Props) {
  const disabledStyles = disabled ? styles.secondaryContainerDisabled : {};
  const {
    button_background_primary,
    button_background_secondary,
    text_color_primary,
    button_text_color_primary,
    button_text_color_secondary,
  } = useSelector(selectConfig);
  const backgroundColor = button_background_secondary || button_background_primary;
  const color = button_text_color_secondary || button_text_color_primary || text_color_primary;

  return (
    <Button
      style={[styles.secondaryContainer, disabledStyles, { backgroundColor }, style]}
      textStyle={[styles.secondaryText, { color }, textStyle]}
      {...props}
    />
  );
}

export function Tertiary({ style = {}, textStyle = {}, ...props }: Props) {
  const { text_color_primary } = useSelector(selectConfig);
  const color = text_color_primary;

  return (
    <Button style={style} textStyle={[styles.tertiaryText, { color }, textStyle]} {...props} />
  );
}

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
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
    fontWeight: '500',
  },
});
