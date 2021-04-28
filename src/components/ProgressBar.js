import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../constants/colors';

export const ProgressBar = ({ progress }) => {
  const [width, setWidth] = React.useState(0);

  const handleLayout = (event) => {
    setWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <View style={[styles.bar, { transform: [{ translateX: progress * width }] }]} />
    </View>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: 4,
    width: '100%',
  },
  bar: {
    backgroundColor: Colors.grayDark,
    position: 'absolute',
    width: '100%',
    height: 4,
    right: '100%',
  },
});
