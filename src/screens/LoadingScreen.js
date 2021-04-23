import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import PropTypes, { childrenPropType } from '../constants/propTypes';
import { Heading } from '../components/Heading';
export function LoadingScreen({ children, text }) {
  return <SafeAreaView style={styles.container}>{text ? <Heading>{text}</Heading> : children}</SafeAreaView>;
}

LoadingScreen.propTypes = {
  children: childrenPropType,
  text: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
  },
});
