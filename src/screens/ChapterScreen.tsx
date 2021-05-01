import * as React from 'react';
import { useSelector } from 'react-redux';
import { Animated, StyleSheet, SafeAreaView, Text } from 'react-native';
import { Audio } from 'expo-av';

import { LoadingBoundary } from '../components/LoadingBoundary';
import { Heading } from '../components/Heading';
import * as Button from '../components/Button';
import { Map } from '../components/Map';
import { AudioPlayer } from '../components/AudioPlayer';
import { selectChapters } from '../store/reducers/chapters';

export function ChapterScreen({ navigation, route }) {
  const routeName = route.name.split('/')[1];
  const chapters = useSelector(selectChapters);
  const chapter = chapters[routeName];

  const [sound, setSound] = React.useState<Audio.Sound>();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnimTiming = Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  });
  const onComplete = () => fadeAnimTiming.start();

  React.useEffect(() => {
    return () => {
      fadeAnim.setValue(0);
    };
  }, [chapter]);

  const goToNextScreen = async (chapter_link) => {
    console.log('goToNextScreen');
    if (sound) {
      console.log('unloading sound from ChapterScreen');
      await sound.unloadAsync();
      console.log('unloaded');
    }
    navigation.navigate(`chapter/${chapter_link}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Heading>{chapter.name}</Heading>

      <LoadingBoundary isLoading={!sound} loadingText="Laddar ljudfiler">
        {chapter.geo_location && (
          <Map
            latLng={chapter.geo_location}
            markerTitle={chapter.geo_location_title}
            markerDescription={chapter.geo_location_description}
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
        {chapter.choices.map(({ choice_text, chapter_link }, index) => (
          <Button.Primary
            disabled={false}
            key={chapter_link || index}
            text={choice_text}
            style={styles.button}
            onPress={() => goToNextScreen(chapter_link)}
          />
        ))}
      </Animated.View>
      <AudioPlayer uri={chapter.body.audio[0].url} onComplete={onComplete} parentSetSound={setSound} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
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
  button: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
});
