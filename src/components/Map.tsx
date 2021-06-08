import * as React from 'react';
import { Animated, Easing, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { useValue } from '../utils/animated';
import { Image } from './Image';

const SCREEN = Dimensions.get('screen');
const ZOOM = 0.002;
const IMAGE_MAX_SIZE = Math.round(SCREEN.width * 0.8);

export const Map = ({
  latLng,
  marker = true,
  markerTitle,
  markerDescription,
  markerImage,
}: Properties) => {
  const animValue = useValue(0);
  const [toValue, setToValue] = React.useState(1);

  const imageSize = React.useMemo(() => {
    if (!markerImage) return { width: 0, height: 0 };

    const aspectRatio = markerImage ? markerImage.width / markerImage.height : 1;

    if (isPortrait(markerImage)) {
      const height = Math.min(markerImage.height, IMAGE_MAX_SIZE);
      const width = Math.round(height * aspectRatio);
      return { width, height };
    } else {
      const width = Math.min(markerImage.width, IMAGE_MAX_SIZE);
      const height = Math.round(width / aspectRatio);
      return { width, height };
    }
  }, [markerImage]);

  const onMarkerPress = React.useCallback(() => {
    Animated.timing(animValue, {
      toValue,
      useNativeDriver: true,
      duration: 350,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      setToValue((previous) => previous ^ 1);
    });
  }, [toValue]);

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
        />
      )}
      {markerImage && (
        <Marker coordinate={latLng} onPress={onMarkerPress} anchor={{ x: 0.5, y: 0.5 }}>
          <Animated.View style={{ opacity: animValue }}>
            <Image
              borderRadius={0}
              source={markerImage}
              width={imageSize.width}
              height={imageSize.height}
              alt={markerDescription}
            />
          </Animated.View>
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

function isPortrait({ width, height }) {
  return height > width;
}
