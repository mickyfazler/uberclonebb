import React,{useEffect} from "react";
import { Image } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const OrderMapbb = ({ car }) => {

  // useEffect(() => {
    console.log("ss",car);
  // }, [])
  

  // copied from uberTypeRow baby
  const getImage = (type) => {
    if (type === 'UberX') {
      return require('../../../assetsy/images/top-UberX.png');
    }
    if (type === 'Comfort') {
      return require('../../../assetsy/images/top-Comfort.png');
    }
    return require('../../../assetsy/images/top-UberXL.png');
  }

  return (
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

      {car && (<Marker
      //  {car.latitude!=null && car.longitude!=null && (<Marker 
        // coordinate={{latitude: car.latitude, longitude: car.longitude}}
        // "car.latitude  ? car.latitude : 0" it is ternary operation nothing else GENIUS: who understand after 2 hours later 😁
        coordinate={{latitude: car.latitude  ? car.latitude : 0, longitude: car.longitude  ? car.longitude : 0}}

      >
        <Image
          style={{
            width: 70,
            height: 70,
            resizeMode: 'contain',
            transform: [{
              rotate: `${car.heading}deg`

            }]
          }}
          source={getImage(car.type)}
        />
      </Marker>)} 
    </MapView>
  );
};

export default OrderMapbb;
