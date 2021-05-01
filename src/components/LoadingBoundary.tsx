import * as React from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';

interface Props {
  isLoading: boolean;
  children: JSX.Element;
  loadingText?: string;
}

export const LoadingBoundary = ({ children, isLoading, loadingText }: Props) => {
  if (isLoading) {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" />
        {loadingText && <Text>{loadingText}</Text>}
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
