import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import COLORS from '../constants/colors';

interface Props {
  progress: number;
}

export const ProgressBar = ({ progress }: Props) => {
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: 4,
    width: '100%',
  },
  bar: {
    backgroundColor: COLORS.grayDark,
    borderColor: COLORS.gray,
    borderWidth: StyleSheet.hairlineWidth,
    position: 'absolute',
    width: '100%',
    height: 3,
    right: '100%',
  },
});
