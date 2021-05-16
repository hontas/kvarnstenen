import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Animated,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useKeepAwake } from 'expo-keep-awake';

import { LoadingBoundary } from '../../components/LoadingBoundary';
import { Heading } from '../../components/Heading';
import * as Button from '../../components/Button';
import { Map } from '../../components/Map';
import { AudioPlayer } from '../../components/AudioPlayer';
import { MenuButton } from '../../components/MenuButton';
import { selectChapters } from '../../store/reducers/chapters';
import { setCurrentChapter } from '../../store/reducers/game';
import COLORS from '../../constants/colors';
import { ScreenProps } from '../../constants/types';
import { getChapterRouteName } from '../../constants/routes';
import * as TYPOGRAPHY from '../../constants/typography';
import { Menu } from './Menu';

export function ChapterScreen({ navigation, route }: ScreenProps) {
  useKeepAwake();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = React.useState(false);
  const routeName = route.name.split('/')[1];
  const chapters = useSelector(selectChapters);
  const chapter = chapters[routeName];

  const previousChapterPath = route.params?.from;
  const previousChapter = previousChapterPath && chapters[previousChapterPath.split('/')[1]];

  const markerImage = chapter.geo_location_image && {
    uri: chapter.geo_location_image.url,
    width: chapter.geo_location_image.dimensions.width,
    height: chapter.geo_location_image.dimensions.height,
  };

  const [sound, setSound] = React.useState<Audio.Sound>();
  const isLoading = chapter.audio && !sound;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnimTiming = Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  });
  const onComplete = React.useCallback(() => fadeAnimTiming.start(), [fadeAnimTiming]);

  React.useEffect(() => {
    if (!chapter.audio) {
      setTimeout(onComplete, 3000);
    }

    return () => {
      console.log('unload audio?');
      fadeAnim.setValue(0);
    };
  }, [chapter, fadeAnim, onComplete]);

  const goToPreviousScreen = async () => {
    console.log('goToPreviousScreen');
    if (!previousChapterPath) return;

    if (sound) {
      console.log('unloading sound from ChapterScreen');
      await sound.unloadAsync();
      console.log('unloaded');
    }

    dispatch(setCurrentChapter(previousChapterPath, previousChapter.name));
    navigation.goBack();
  };

  const goToNextScreen = async (chapter_link) => {
    console.log('goToNextScreen');
    if (sound) {
      console.log('unloading sound from ChapterScreen');
      await sound.unloadAsync();
      console.log('unloaded');
    }

    const chapterRouteName = getChapterRouteName(chapter_link);
    dispatch(setCurrentChapter(chapterRouteName, chapters[chapter_link].name));
    navigation.navigate(chapterRouteName, { from: getChapterRouteName(chapter.path) });
  };

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <MenuButton onPress={() => setShowMenu(true)} style={styles.menuButton} />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {/* {previousChapterPath && (
            <Button.Tertiary onPress={goToPreviousScreen} style={styles.backButton}>
              <Entypo name="back" size={24} color={COLORS.whiteTransparent} />
            </Button.Tertiary>
          )} */}
          <Heading level={2} containerStyle={styles.heading}>
            {chapter.name}
          </Heading>

          <LoadingBoundary isLoading={isLoading} loadingText="Laddar ljudfiler">
            {chapter.geo_location && (
              <Map
                latLng={chapter.geo_location}
                markerTitle={chapter.geo_location_title}
                markerDescription={chapter.geo_location_description}
                markerImage={markerImage}
              />
            )}
          </LoadingBoundary>

          <Animated.View
            style={[
              styles.choices,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.choiceHeadline}>{chapter.choices_headline}</Text>
            {chapter.choices.map(({ choice_type, choice_text, chapter_link }, index) => {
              if (choice_type === 'password') {
                return (
                  <View key={chapter_link || index}>
                    <TextInput
                      style={styles.input}
                      onChangeText={(password) => {
                        if (password.toLowerCase() === choice_text.toLowerCase()) {
                          goToNextScreen(chapter_link);
                        }
                      }}
                    />
                    <View style={styles.helperContainer}>
                      <Text style={styles.smallText}>Om du inte hittar koden</Text>
                      <Button.Tertiary
                        onPress={() => goToNextScreen(chapter_link)}
                        text="klicka här"
                        style={styles.helpButton}
                        textStyle={styles.smallText}
                      ></Button.Tertiary>
                    </View>
                  </View>
                );
              }

              if (!chapter_link) return;

              return (
                <Button.Primary
                  disabled={false}
                  key={chapter_link || index}
                  text={choice_text}
                  style={styles.button}
                  onPress={() => goToNextScreen(chapter_link)}
                />
              );
            })}
          </Animated.View>
        </ScrollView>
        {chapter.audio && (
          <AudioPlayer uri={chapter.audio.url} onComplete={onComplete} parentSetSound={setSound} />
        )}
      </SafeAreaView>
      <Menu visible={showMenu} navigation={navigation} onDismiss={() => setShowMenu(false)} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButton: {
    left: 10,
    marginTop: 4,
  },
  heading: {
    marginTop: 0,
    marginHorizontal: 40,
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // backButton: {
  //   width: 'auto',
  //   position: 'absolute',
  //   left: 10,
  //   top: 0,
  // },
  choiceHeadline: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  choices: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
    opacity: 0.1,
    paddingHorizontal: 20,
    width: '100%',
  },
  input: {
    borderColor: COLORS.gray,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    padding: 16,
  },
  button: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  helperContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
  helpButton: {
    padding: 0,
    flex: 0,
    width: 'auto',
  },
  smallText: {
    color: COLORS.grayLighter,
    fontSize: TYPOGRAPHY.fontSize.small,
    lineHeight: TYPOGRAPHY.fontSize.small,
    marginRight: TYPOGRAPHY.fontSize.small / 3,
  },
});
