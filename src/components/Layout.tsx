import React from 'react';
import { StyleSheet, SafeAreaView, ViewStyle } from 'react-native';

import { Background } from './Background';
import * as LAYOUT from '../constants/layout';

interface Props {
  children: JSX.Element | JSX.Element[];
  contentContainerStyle?: ViewStyle;
}

export function Layout({ children, contentContainerStyle }: Props) {
  return (
    <Background>
      <SafeAreaView style={[styles.container, contentContainerStyle]}>{children}</SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
    marginHorizontal: LAYOUT.horizontalMargin,
  },
});
