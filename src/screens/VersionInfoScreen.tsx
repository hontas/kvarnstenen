import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import { currentVersion, nativeVersion } from '../utils/device';
import { Layout } from '../components/Layout';
import { Paragraph } from '../components/Paragraph';
import { Heading } from '../components/Heading';
import * as LAYOUT from '../constants/layout';

export function VersionInfoScreen() {
  return (
    <Layout contentContainerStyle={styles.container}>
      <View style={styles.inner}>
        <Heading level={2} containerStyle={styles.header}>
          App info
        </Heading>
        <Paragraph>{`Build: ${nativeVersion}`}</Paragraph>
        <Paragraph>{`Version: ${currentVersion}`}</Paragraph>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
  },
  inner: {
    marginBottom: 50,
    marginHorizontal: LAYOUT.horizontalMargin,
  },
  header: {
    marginTop: LAYOUT.horizontalMargin,
  },
});
