import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import { Heading } from '../components/Heading';
import { screenPropTypes } from '../constants/propTypes';

export function ChapterScreen({ navigation }) {
  console.log('navigation', navigation);

  return (
    <SafeAreaView style={styles.container}>
      <Heading>Kapitel</Heading>
    </SafeAreaView>
  );
}
ChapterScreen.propTypes = {
  ...screenPropTypes,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    marginBottom: 50,
    marginHorizontal: 20,
  },
});
