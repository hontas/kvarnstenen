import * as React from 'react';
import { Animated } from 'react-native';

export function useValue(intitialValue) {
  return React.useRef(new Animated.Value(intitialValue)).current;
}

export function useTiming(value: Animated.Value, config: Omit<Animated.TimingAnimationConfig, 'useNativeDriver'>) {
  return Animated.timing(value, {
    duration: 350,
    useNativeDriver: true,
    ...config,
  });
}
