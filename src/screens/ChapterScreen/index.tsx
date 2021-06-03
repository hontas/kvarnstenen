import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from 'react-native';
import { Audio } from 'expo-av';
import { useKeepAwake } from 'expo-keep-awake';

import useT from '../../utils/useT';
import { LoadingBoundary } from '../../components/LoadingBoundary';
import { Heading } from '../../components/Heading';
import * as Button from '../../components/Button';
import { Map } from '../../components/Map';
import { AudioPlayer } from '../../components/AudioPlayer';
import { MenuButton } from '../../components/MenuButton';
import { selectChapters } from '../../store/reducers/chapters';
import { setCurrentChapter } from '../../store/reducers/game';
import { selectConfig } from '../../store/reducers/config';
import { selectScreen } from '../../store/reducers/screens';
import COLORS from '../../constants/colors';
import { ScreenProps } from '../../constants/types';
import { getChapterRouteName } from '../../constants/routes';
import * as TYPOGRAPHY from '../../constants/typography';
import { Layout } from '../../components/Layout';
import * as Text from '../../components/Text';
import { Menu } from './Menu';

const SCREEN = Dimensions.get('screen');

const getAspectRatio = (dimensions) => {
  if (!dimensions) return 1;

  const { width, height } = dimensions;
  return width / height;
};

export function ChapterScreen({ navigation, route }: ScreenProps) {
  useKeepAwake();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = React.useState(false);
  const routeName = route.name.split('/')[1];
  const screen = useSelector(selectScreen('chapter'));
  const chapters = useSelector(selectChapters);
  const chapter = chapters[routeName];
  const { text_color_primary, text_color_dim } = useSelector(selectConfig);
  const t = useT(screen?.ui_texts);
  // show_name should default to true but will return null if unset.
  const showTitle = chapter.show_name ?? true;
  const name = showTitle ? chapter.name : '';

  const markerImage = chapter.geo_location_image && {
    uri: chapter.geo_location_image.url,
    width: chapter.geo_location_image.dimensions.width,
    height: chapter.geo_location_image.dimensions.height,
  };

  const imageAspectRatio = getAspectRatio(chapter.image?.dimensions);

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

  const goToNextScreen = async (chapter_link) => {
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
      <Layout contentContainerStyle={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Heading level={2} containerStyle={styles.heading}>
            {name}
          </Heading>

          <LoadingBoundary isLoading={isLoading} loadingText="Laddar ljudfiler">
            <>
              {chapter.image && (
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: chapter.image.url }}
                    style={[
                      styles.image,
                      {
                        width: SCREEN.width,
                        height: SCREEN.width / imageAspectRatio,
                      },
                    ]}
                  />
                </View>
              )}
              {chapter.geo_location && !chapter.image && (
                <Map
                  latLng={chapter.geo_location}
                  markerTitle={chapter.geo_location_title}
                  markerDescription={chapter.geo_location_description}
                  markerImage={markerImage}
                />
              )}
            </>
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
            <Text.Regular style={[styles.choiceHeadline, { color: text_color_primary }]}>
              {chapter.choices_headline}
            </Text.Regular>
            {chapter.choices.map(
              ({ choice_type, choice_text, hide_help_text, chapter_link }, index) => {
                if (choice_type === 'password') {
                  return (
                    <View style={styles.passwordContainer} key={chapter_link || index}>
                      <TextInput
                        style={styles.input}
                        onChangeText={(password) => {
                          if (password.toLowerCase() === choice_text.toLowerCase()) {
                            goToNextScreen(chapter_link);
                          }
                        }}
                      />
                      {!hide_help_text && (
                        <View style={styles.helperContainer}>
                          <Button.Tertiary
                            onPress={() => goToNextScreen(chapter_link)}
                            text={t('skip_password_help_text')}
                            style={styles.helpButton}
                            textStyle={[styles.smallText, { color: text_color_dim }]}
                          ></Button.Tertiary>
                        </View>
                      )}
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
              }
            )}
          </Animated.View>
        </ScrollView>
        {chapter.audio && (
          <AudioPlayer uri={chapter.audio.url} onComplete={onComplete} parentSetSound={setSound} />
        )}
      </Layout>
      <Menu
        visible={showMenu}
        onDismiss={async (to?: string) => {
          if (to && sound) {
            await sound.unloadAsync();
          }
          setShowMenu(false);
          if (to) navigation.navigate(to);
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 0,
    marginBottom: 0,
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
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
  },
  choiceHeadline: {
    color: COLORS.white,
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
    backgroundColor: COLORS.whiteTranslucent,
    borderColor: COLORS.gray,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    padding: 16,
  },
  button: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  passwordContainer: {
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
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSize.small,
    lineHeight: TYPOGRAPHY.fontSize.small,
    marginRight: TYPOGRAPHY.fontSize.small / 3,
  },
});
