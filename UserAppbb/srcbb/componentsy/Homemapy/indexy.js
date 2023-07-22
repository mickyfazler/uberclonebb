import { Image,Dimensions } from 'react-native'
import React, { useState, useEffect,useRef } from "react";

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import cars from '../../../assetsy/datay/cars';

import {API, graphqlOperation} from 'aws-amplify';
import { listCars } from '../../../src/graphql/queries';      // we are using it instead of writing our own query to save time baby
import Geolocation from '@react-native-community/geolocation';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA =  0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const Homemapbb = () => {
  const mapRefbb = useRef()

  // getting card data from server baby
  const [cars, setCars] = useState([]);

  // const [myPosition, setMyPosition] = useState(null);

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

    function animateToMyLocationbb(x) {
      console.log('aa',x);
      mapRefbb.current.animateToRegion(x)
    }

    
    const getLocationbb=()=>{
      Geolocation.getCurrentPosition(info =>{ 
        console.log('ll',info);
        console.log('l2',info.coords.latitude);
        console.log('l3',info.coords.longitude);
  
        
        animateToMyLocationbb({latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA})
        
        }
        );
      // console.log('aa1',myPosition);      // here you may not get use location because to get location takes time own explore: GENIUS: (you will get null)
  
      // const CurrentlocationAnimatebb = setTimeout(myGreeting, 5000);
    }

 
    getLocationbb()

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
    ref={mapRefbb}

      style={{width: '100%', height: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}      // it will show your current location on blue circle ...fuck you are not seeing it ...so set like https://stackoverflow.com/questions/47528006/how-to-set-the-location-manually-in-android-studio-emulator  own explore:...first find your cordinates on "" and then put that latitude and longtitude on google map like '28.455256 -16.256835' ,copy the plus code like "FP4V+473 Santa Cruz de Tenerife, Spain"/"C. Alcalde Josė Emilio Garcia Gómez, 38005 Santa Cruz de Tenerife, Spain" and paste on android studio emulator 

      initialRegion={{
        // latitude: 28.450627,
        // longitude: -16.263045,
        // latitudeDelta: 0.0222,
        // longitudeDelta: 0.0121,

        latitude: 24.450627,
        longitude: -12.263045,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
        
        
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