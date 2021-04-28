import * as React from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';

import PropTypes, { childrenPropType } from '../constants/propTypes';
import { Heading } from '../components/Heading';
export function LoadingScreen({ children, text }) {
  return (
    <SafeAreaView style={styles.container}>
      {text ? <Heading>{text}</Heading> : children}
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
}

LoadingScreen.propTypes = {
  children: childrenPropType,
  text: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
});
