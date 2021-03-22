import * as React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

import { screenPropTypes } from '../constants/propTypes';

export function LoadingScreen({ navigation }) {
  console.log('navigation', navigation);

  return (
    <SafeAreaView style={styles.container}>
      <Text>LOADING</Text>
    </SafeAreaView>
  );
}
LoadingScreen.propTypes = {
  ...screenPropTypes,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 20,
  },
});
