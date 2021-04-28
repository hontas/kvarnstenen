import * as React from 'react';
import { useSelector } from 'react-redux';
import { Animated, StyleSheet, SafeAreaView, Text } from 'react-native';

import { Heading } from '../components/Heading';
import * as Button from '../components/Button';
import { AudioPlayer } from '../components/AudioPlayer';
import { selectChapters } from '../store/reducers/chapters';
import { screenPropTypes } from '../constants/propTypes';
export function ChapterScreen({ navigation, route }) {
  const routeName = route.name.split('/')[1];
  const chapters = useSelector(selectChapters);
  const chapter = chapters[routeName];

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

  return (
    <SafeAreaView style={styles.container}>
      <Heading>{chapter.name}</Heading>
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
            key={chapter_link || index}
            text={choice_text}
            style={styles.button}
            onPress={() => navigation.navigate(`chapter/${chapter_link}`)}
          />
        ))}
      </Animated.View>
      <AudioPlayer uri={chapter.body.audio[0].url} onComplete={onComplete} />
    </SafeAreaView>
  );
}
ChapterScreen.propTypes = {
  ...screenPropTypes,
};

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
