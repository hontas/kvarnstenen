import * as React from 'react';
import { Animated, Easing, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { useValue } from '../utils/animated';
import { Image } from './Image';

const SCREEN = Dimensions.get('screen');
const ZOOM = 0.002;
const IMAGE_WIDTH = Math.round(SCREEN.width * 0.8);

export const Map = ({
  latLng,
  marker = true,
  markerTitle,
  markerDescription,
  markerImage,
}: Properties) => {
  const animValue = useValue(0);
  const [toValue, setToValue] = React.useState(1);
  const IMAGE_HEIGHT = markerImage
    ? Math.round(IMAGE_WIDTH / (markerImage.width / markerImage.height))
    : 0;

  const onMarkerPress = React.useCallback(() => {
    Animated.timing(animValue, {
      toValue,
      useNativeDriver: true,
      duration: 350,
      easing: Easing.out(Easing.ease),
    }).start();
    setToValue((previous) => previous ^ 1);
  }, [toValue, animValue]);

  return (
    <MapView
      style={styles.map}
      mapType="mutedStandard"
      region={{
        ...latLng,
        latitudeDelta: ZOOM,
        longitudeDelta: ZOOM,
      }}
      showsCompass={false}
      toolbarEnabled={false}
    >
      {marker && (
        <Marker
          coordinate={latLng}
          image={require('../../assets/red-x2.png')}
          title={markerTitle}
          description={markerTitle && markerDescription}
          onPress={onMarkerPress}
        >
          {markerImage && (
            <Animated.View
              style={{
                opacity: animValue,
                transform: [
                  {
                    translateY: animValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                        -IMAGE_HEIGHT * 0.8,
                        -IMAGE_HEIGHT - (markerDescription ? 40 : 0),
                      ],
                    }),
                  },
                ],
              }}
            >
              <Image
                borderRadius={0}
                style={{ transform: [{ translateX: -IMAGE_WIDTH / 2 + 25 }] }}
                source={markerImage}
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                alt={markerDescription}
              />
            </Animated.View>
          )}
        </Marker>
      )}
    </MapView>
  );
};

type LatLng = {
  longitude: number;
  latitude: number;
};

interface Properties {
  latLng: LatLng;
  marker?: boolean;
  markerTitle?: string;
  markerDescription?: string;
  markerImage?: {
    uri: string;
    width: number;
    height: number;
  };
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: SCREEN.width,
    height: SCREEN.width,
  },
});
