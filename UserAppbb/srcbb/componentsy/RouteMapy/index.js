import React from "react";
import { Text } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCUPImSqcouLZL3qjXl_b8bzni0B-njcD8';     

const RouteMapbb = ({originrr, destinationrr}) => {
  console.log(originrr,destinationrr);
  const origin = {
    latitude: originrr.details.geometry.location.lat,
    longitude: originrr.details.geometry.location.lng,
  };

  const destination = {
    latitude: destinationrr.details.geometry.location.lat,
    longitude: destinationrr.details.geometry.location.lng,
  };
 /* 
own explore:.
28.450627 -16.263045
  (latitude,longitude) search this on google maps and put the near location on 'whear to and where from'
where to
 Santa Cruz de Tenerife, Spain
where from
  Ctra. Santa Cruz Laguna, Santa Cruz de Tenerife, Spain
*/
  return ( 
    // <Text>hello</Text>
    <MapView
      style={{width: '100%', height: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true} 
      initialRegion={{
        latitude: 28.450627,
        longitude: -16.263045,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }}>
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_APIKEY}

        // changing the color and width
        strokeWidth={5}
        strokeColor="black"
      />
      <Marker
        coordinate={origin}
        title={'Originbaby'}
      />
      <Marker
        coordinate={destination}
        title={"Destinationbaby"}
      />
    </MapView>
  );


};

export default RouteMapbb;
