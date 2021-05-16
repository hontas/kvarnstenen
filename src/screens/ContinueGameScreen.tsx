import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import { Transition, Transitioning, TransitioningView } from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';

import * as Button from '../components/Button';
import {
  selectSlotsList,
  setCurrentSlot,
  removeSlot,
  CurrentChapter,
} from '../store/reducers/game';
import { selectScreen } from '../store/reducers/screens';
import COLORS from '../constants/colors';
import { ROUTE_NAMES } from '../constants/routes';
import { ScreenProps } from '../constants/types';
import { Heading } from '../components/Heading';
import { BackButton } from '../components/BackButton';

const transitionDuration = 350;
const transition = (
  <Transition.Together>
    <Transition.Out type="fade" durationMs={transitionDuration} interpolation="easeOut" />
    <Transition.Change durationMs={transitionDuration} interpolation="easeInOut" />
  </Transition.Together>
);

export function ContinueGameScreen({ navigation }: ScreenProps) {
  const dispatch = useDispatch();
  const slotsArray = useSelector(selectSlotsList);
  const transitionReference = React.useRef<TransitioningView>(null);
  const screen = useSelector(selectScreen('continue-game'));

  React.useEffect(() => {
    if (screen) {
      navigation.setOptions({ title: screen.name });
    }
  }, [screen, navigation]);

  const slots = React.useMemo(
    () =>
      [...slotsArray]
        .filter(({ currentChapter }) => currentChapter)
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .map(({ id, currentChapter, updatedAt }) => {
          const { name, uid } = currentChapter as CurrentChapter;
          const chapterNumber = uid.split('-')[0];
          const date = Intl.DateTimeFormat('sv-SE', {
            dateStyle: 'short',
            timeStyle: 'short',
          }).format(updatedAt);

          return {
            id,
            chapterPath: uid,
            title: `Kapitel ${chapterNumber} - ${name}`,
            subTitle: `Sparad ${date}`,
          };
        }),
    [slotsArray]
  );

  const navigateToChapter = React.useCallback(
    ({ chapterPath, slotId }) => {
      dispatch(setCurrentSlot(slotId));
      navigation.navigate(ROUTE_NAMES.START_GAME, { startAt: chapterPath });
    },
    [navigation, dispatch]
  );

  const onRemoveSlot = React.useCallback(
    (slotId) => {
      transitionReference.current?.animateNextTransition();
      dispatch(removeSlot(slotId));
    },
    [dispatch]
  );

  const goBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={goBack} style={styles.backButton} />
      <Heading level={2}>{screen.title}</Heading>
      <ScrollView>
        <Transitioning.View
          style={styles.transitionContainer}
          transition={transition}
          ref={transitionReference}
        >
          {slots.map(({ id, chapterPath, title, subTitle }) => {
            return (
              <View key={id} style={styles.buttonWrapper}>
                <Button.Primary
                  text={title}
                  style={styles.button}
                  containerStyle={styles.buttonContainer}
                  onPress={() => navigateToChapter({ chapterPath, slotId: id })}
                >
                  <Text style={styles.buttonSubText}>{subTitle}</Text>
                </Button.Primary>
                <Button.Secondary
                  style={styles.buttonRemove}
                  containerStyle={styles.buttonRemoveContainer}
                  onPress={() => onRemoveSlot(id)}
                >
                  <Entypo name="trash" size={24} color={'black'} />
                </Button.Secondary>
              </View>
            );
          })}
        </Transitioning.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const MARGIN = 20;
const HEIGHT = 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
    marginHorizontal: MARGIN,
  },
  backButton: {
    marginLeft: -10,
  },
  transitionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    flexDirection: 'column',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    height: HEIGHT,
    marginTop: MARGIN,
    alignItems: 'flex-start',
  },
  buttonRemoveContainer: {
    flexGrow: 0,
    flexBasis: 45,
  },
  buttonRemove: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    height: HEIGHT,
    marginTop: MARGIN,
  },
  buttonSubText: {
    color: COLORS.button.text_primary,
    alignSelf: 'flex-start',
  },
});
