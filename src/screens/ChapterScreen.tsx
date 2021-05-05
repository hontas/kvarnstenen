import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  Animated,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  Text,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useKeepAwake } from 'expo-keep-awake';

import { LoadingBoundary } from '../components/LoadingBoundary';
import { Heading } from '../components/Heading';
import * as Button from '../components/Button';
import { Map } from '../components/Map';
import { AudioPlayer } from '../components/AudioPlayer';
import { selectChapters } from '../store/reducers/chapters';
import COLORS from '../constants/colors';

interface Props {
  navigation: {
    navigate: (path: string, parameters?: { from: string }) => void;
    goBack: () => void;
    reset: (state: { index: number; routes: Record<string, any>[] }) => void;
    setParams: (parameters: Record<string, any>) => void;
    setOptions: (parameters: Record<string, any>) => void;
  };
  route: {
    key: string;
    name: string;
    params?: {
      from: string;
    };
  };
}

export function ChapterScreen({ navigation, route }: Props) {
  useKeepAwake();
  const routeName = route.name.split('/')[1];
  const chapters = useSelector(selectChapters);
  const chapter = chapters[routeName];
  const insets = useSafeAreaInsets();

  const previousChapter = route.params?.from;

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
    if (sound) {
      console.log('unloading sound from ChapterScreen');
      await sound.unloadAsync();
      console.log('unloaded');
    }
    navigation.goBack();
  };

  const goToNextScreen = async (chapter_link) => {
    console.log('goToNextScreen');
    if (sound) {
      console.log('unloading sound from ChapterScreen');
      await sound.unloadAsync();
      console.log('unloaded');
    }
    navigation.navigate(`chapter/${chapter_link}`, { from: `chapter/${chapter.path}` });
  };

  return (
    <KeyboardAvoidingView style={styles.outerContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {previousChapter && (
            <Button.Tertiary onPress={goToPreviousScreen} style={styles.backButton}>
              <Entypo name="back" size={24} color={COLORS.whiteTransparent} />
            </Button.Tertiary>
          )}
          <Heading>{chapter.name}</Heading>

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
                  <TextInput
                    key={chapter_link || index}
                    style={styles.input}
                    onChangeText={(password) => {
                      if (password.toLowerCase() === choice_text.toLowerCase()) {
                        goToNextScreen(chapter_link);
                      }
                    }}
                  />
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
        {chapter.audio && <AudioPlayer uri={chapter.audio.url} onComplete={onComplete} parentSetSound={setSound} />}
      </SafeAreaView>
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
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 'auto',
    position: 'absolute',
    left: 10,
    top: 0,
  },
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
});
