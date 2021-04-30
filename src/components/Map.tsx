import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// import { assassinsCreed } from '../constants/mapStyles';

const SCREEN = Dimensions.get('screen');
const zoom = 0.002;

export const Map = ({ latLng, markerTitle, markerDescription }: Props) => {
  return (
    <MapView
      style={styles.map}
      mapType="mutedStandard"
      region={{
        ...latLng,
        latitudeDelta: zoom,
        longitudeDelta: zoom,
      }}
      showsCompass={false}
      toolbarEnabled={false}
    >
      <Marker
        coordinate={latLng}
        image={require('../../assets/red-x2.png')}
        flat={true}
        rotation={20}
        title={markerTitle}
        description={markerDescription}
      />
    </MapView>
  );
};

type LatLng = {
  longitude: number;
  latitude: number;
};

interface Props {
  latLng: LatLng;
  markerTitle?: string;
  markerDescription?: string;
}

const styles = StyleSheet.create({
  map: {
    width: SCREEN.width,
    height: SCREEN.width,
  },
});
