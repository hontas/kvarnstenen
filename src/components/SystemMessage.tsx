import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Transition, Transitioning, TransitioningView } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Updates from 'expo-updates';

import { dismissUpdateAvailable, selectUpdateAvailable } from '../store/reducers/localState';
import COLORS from '../constants/colors';

const transitionDuration = 500;
const transition = (
  <Transition.Together>
    <Transition.In type="slide-top" durationMs={transitionDuration} interpolation="easeOut" />
    <Transition.Out type="slide-bottom" durationMs={transitionDuration} interpolation="easeOut" />
    <Transition.Change durationMs={transitionDuration} interpolation="easeInOut" />
  </Transition.Together>
);

export const SystemMessage = () => {
  const updateAvailable = useSelector(selectUpdateAvailable);
  const [showToaster, setShowToaster] = React.useState(true);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const transitionReference = React.useRef<TransitioningView>(null);

  const onUpdate = React.useCallback(() => {
    setShowToaster(false);
    Updates.reloadAsync();
  }, []);

  const onDismiss = React.useCallback(() => {
    dispatch(dismissUpdateAvailable());
    setShowToaster(false);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Transitioning.View ref={transitionReference} transition={transition}>
        {showToaster && updateAvailable && (
          <View style={[styles.updateContainer, { paddingBottom: insets.bottom }]}>
            <Text style={styles.updateText}>Uppdatering tillgänglig</Text>
            <View style={styles.actionContainer}>
              <TouchableOpacity style={styles.button} onPress={onUpdate}>
                <Text style={[styles.buttonText, styles.updateText]}>
                  Ladda om för att uppdatera
                </Text>
              </TouchableOpacity>
              <Text style={styles.updateText}>eller</Text>
              <TouchableOpacity style={styles.button} onPress={onDismiss}>
                <Text style={[styles.buttonText, styles.updateText]}>Stäng</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Transitioning.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 99,
  },
  updateContainer: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  updateText: {
    color: COLORS.white,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: COLORS.white,
  },
});
