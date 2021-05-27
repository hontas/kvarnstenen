import * as React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';

import { Heading } from '../components/Heading';
import { Layout } from '../components/Layout';

interface Props {
  text?: string;
}

export function LoadingScreen({ text = '' }: Props) {
  return (
    <Layout contentContainerStyle={styles.container}>
      <Heading>{text}</Heading>
      <ActivityIndicator size="large" />
    </Layout>
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
