import { Image } from 'react-native'
import React, { useState, useEffect } from "react";

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import cars from '../../../assetsy/datay/cars';

import {API, graphqlOperation} from 'aws-amplify';
import { listCars } from '../../../src/graphql/queries';      // we are using it instead of writing our own query to save time baby


const Homemapbb = () => {

  // getting card data from server baby
  const [cars, setCars] = useState([]);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await API.graphql(
          graphqlOperation(
            listCars
          )
        )
        // console.log(response);
        setCars(response.data.listCars.items);
      } catch (e) {   // user may not have internet connection
        console.error(e);
      }
    };

    fetchCars();
  }, [])




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
    // <View style={{height:300,backgroundColor:'skyblue',justifyContent:'center',alignItems:'center'}}>
    //   <Text>Homemapbb</Text>
    // </View>


    <MapView
      style={{width: '100%', height: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}      // it will show your current location on blue circle ...fuck you are not seeing it ...so set like https://stackoverflow.com/questions/47528006/how-to-set-the-location-manually-in-android-studio-emulator  own explore:...first find your cordinates on "" and then put that latitude and longtitude on google map like '28.455256 -16.256835' ,copy the plus code like "FP4V+473 Santa Cruz de Tenerife, Spain"/"C. Alcalde Josė Emilio Garcia Gómez, 38005 Santa Cruz de Tenerife, Spain" and paste on android studio emulator 

      initialRegion={{
        latitude: 28.450627,
        longitude: -16.263045,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
        
        
      }}>
      {cars.map((car) => (
        <Marker
          key={car.id}
          // coordinate={{latitude: car.latitude , longitude: car.longitude }}
          coordinate={{latitude: car.latitude  ? car.latitude : 0, longitude: car.longitude  ? car.longitude : 0}}

        >
          <Image
            style={{width: 70, height: 70, resizeMode: 'contain',
            transform: [{
              // rotate: `90deg`       // rotating car image baby
              rotate: `${car.heading}deg`
            }]

          }}
            source={getImage(car.type)}
          />
        </Marker>
      ))}
    </MapView>
  )
}

export default Homemapbb