import * as React from 'react';
import { View, StyleSheet, Text, ImageSourcePropType, Image as RNImage, ViewStyle } from 'react-native';

import COLORS from '../constants/colors';

interface Props {
  width: number;
  height: number;
  placeholder?: boolean;
  source?: ImageSourcePropType;
  alt?: string;
  style?: ViewStyle;
  borderRadius?: number;
}

export const Image = ({ width, height, placeholder, source, style, alt, borderRadius = 0 }: Props) => {
  const imageSource = (placeholder
    ? { uri: `http://placekitten.com/${width}/${height}` }
    : source) as ImageSourcePropType;
  const imageStyles = [
    styles.image,
    { width, height },
    alt ? { borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius } : { borderRadius },
  ];
  const altTextStyles = [
    styles.altTextContainer,
    { borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius },
  ];

  return (
    <View style={[styles.container, style]}>
      <RNImage style={imageStyles} source={imageSource} />
      {alt && (
        <View style={altTextStyles}>
          <Text style={styles.altText}>{alt}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: COLORS.black,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      height: 10,
      width: 0,
    },
  },
  image: {},
  altTextContainer: {
    backgroundColor: COLORS.white,
  },
  altText: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
