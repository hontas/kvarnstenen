import * as React from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';

import { Heading } from '../components/Heading';

interface Props {
  children: React.ElementType;
  text?: string;
}

export function LoadingScreen({ children, text }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      {text ? <Heading>{text}</Heading> : children}
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
});
