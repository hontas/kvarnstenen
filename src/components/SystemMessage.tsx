import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Transition, Transitioning, TransitioningView } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Updates from 'expo-updates';
import NetInfo from '@react-native-community/netinfo';

import { dismissUpdateAvailable, selectUpdateAvailable } from '../store/reducers/localState';
import COLORS from '../constants/colors';
import { selectConfig } from '../store/reducers/config';
import { selectScreen } from '../store/reducers/screens';
import useT from '../utils/useT';

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
  const config = useSelector(selectConfig);
  const screen = useSelector(selectScreen('system-messages'));
  const t = useT(screen?.ui_texts);

  const [isConnected, setIsConnected] = React.useState(true);
  const [showToaster, setShowToaster] = React.useState(true);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const topTransitionReference = React.useRef<TransitioningView>(null);
  const bottomTransitionReference = React.useRef<TransitioningView>(null);

  const onUpdate = React.useCallback(() => {
    setShowToaster(false);
    Updates.reloadAsync();
  }, []);

  const onDismiss = React.useCallback(() => {
    dispatch(dismissUpdateAvailable());
    setShowToaster(false);
  }, [dispatch]);

  React.useEffect(
    () =>
      NetInfo.addEventListener((state) => {
        setIsConnected(state.isConnected);
      }),
    []
  );

  return (
    <>
      <View style={[styles.container, styles.topContainer]}>
        <Transitioning.View ref={topTransitionReference} transition={transition}>
          {!isConnected && (
            <View
              style={[
                styles.messageContainer,
                {
                  backgroundColor: config.background_color_gradient_primary,
                  paddingTop: insets.top,
                },
              ]}
            >
              <Text style={styles.text}>{t('not_connected_message')}</Text>
            </View>
          )}
        </Transitioning.View>
      </View>
      <View style={[styles.container, styles.bottomContainer]}>
        <Transitioning.View ref={bottomTransitionReference} transition={transition}>
          {showToaster && updateAvailable && (
            <View
              style={[
                styles.messageContainer,
                { backgroundColor: config.background_color_primary, paddingBottom: insets.bottom },
              ]}
            >
              <Text style={styles.text}>{t('update_available')}</Text>
              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.button} onPress={onUpdate}>
                  <Text style={[styles.buttonText, styles.text]}>{t('reload_to_update')}</Text>
                </TouchableOpacity>
                <Text style={styles.text}>{t('or')}</Text>
                <TouchableOpacity style={styles.button} onPress={onDismiss}>
                  <Text style={[styles.buttonText, styles.text]}>{t('dismiss')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Transitioning.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    width: '100%',
    zIndex: 99,
  },
  topContainer: {
    top: 0,
  },
  bottomContainer: {
    bottom: 0,
  },
  messageContainer: {
    alignItems: 'center',
    padding: 20,
  },
  text: {
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
