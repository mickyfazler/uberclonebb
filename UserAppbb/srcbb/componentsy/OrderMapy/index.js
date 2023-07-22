import React,{useEffect,useState,useRef} from "react";
import { Image,StyleSheet,Dimensions } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker,AnimatedRegion} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { API, graphqlOperation,Auth } from 'aws-amplify';
import {  getCar } from '../../../src/graphql/queries';
import { onCarUpdated } from '../../screensy/OrderScreeny/subscriptionsy';


const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA =  0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyCUPImSqcouLZL3qjXl_b8bzni0B-njcD8';    

const OrderMapbb = ({ ordery }) => {
  
  const [car, setCar] = useState(null);
  const mapRef = useRef();
  const markerRef = useRef();
  // console.log("1-----",car);
  console.log("2-----",ordery);
  console.log("3-----",ordery?.originLatitude);
  
  


  // Fetch Car data when order is updated
  useEffect(() => {
    // console.log("car ");
    console.log('called 3');

    // if we don't have any order ....NOTE order.carId = '1' we give initially when creating the order and if order accepted by driver than there will be driver's real "carId" that's why given this logic ✌️ bro
    if (!ordery?.carId || ordery.carId === '1') {
      return;
    }

    const fetchCary = async () => {
      // graphqlOperation(getCar, { id: ordery.carId })

      try {
        let id=ordery.carId;
        const carDatay = await API.graphql(
          graphqlOperation(getCar, { id: ordery.carId })
        );
        // console.log(carDatay);
        console.log("dt2 ",carDatay,ordery.carId,car);

        setCar(carDatay.data.getCar);
      } catch (e) {
        console.warn("2 ",e)

      } 


    }
    fetchCary();
  }, [ordery])
  
  
  
  // Subscribe to car updates
  useEffect(() => {
    console.log('called 4');

    if (!ordery?.carId || ordery.carId === '1') {
      return;
    }

    const subscription = API.graphql(
      graphqlOperation(onCarUpdated, { id: ordery.carId })
    ).subscribe({
      next: ({ value }) => {console.log('car sub '); setCar(value.data.onCarUpdated);animate(coordinatek)},
      error: erro => console.warn("e2",erro)
    })

    return () => subscription.unsubscribe();
  }, [ordery])

  const [statey, setStatey] = useState({coordinatek:new AnimatedRegion({
    latitude: car?.latitude  ? car?.latitude : 0, longitude: car?.longitude  ? car?.longitude : 0,
    // latitude:  0, longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
})
})
  
  const {  coordinatek } = statey;

  useEffect(() => {
    setStatey({
      coordinatek:new AnimatedRegion({
      latitude: car?.latitude  ? car?.latitude : 0, longitude: car?.longitude  ? car?.longitude : 0,
      // latitude:  0, longitude: 0,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
      })
    })
  // animatey(coordinatek)

  }, [car])
  
//   useEffect(() => {
//     const interval = setInterval(() => {
//         // getLiveLocation()
//       animatey(coordinatek)

//     }, 6000);
//     return () => clearInterval(interval)
// }, [])

  // if (car) {
  //   setStatey({
  //     coordinatek:new AnimatedRegion({
  //       latitude: car.latitude  ? car.latitude : 0, longitude: car.longitude  ? car.longitude : 0,
  //       latitudeDelta: LATITUDE_DELTA,
  //       longitudeDelta: LONGITUDE_DELTA
  //     })
    
  //   })
  // }
  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == 'android') {
      if (markerRef.current) {
          console.log('animate called');
            markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
        }
    } else {
        coordinatek.timing(newCoordinate).start();
    }
}
// animatey(car.latitude,car.longitude)
// animatey(coordinatek)

  // useEffect(() => {
    console.log("ss",car);
  // }, [])
  

  // copied from uberTypeRow baby
  const getImage = (type) => {
    if (type === 'UberX') {
      return require('../../../assetsy/images/top-Comfort.png');      // using it sotaht look good because it's black and map is white

//     return require('../../../assetsy/images/top-UberX.png');
    }
    if (type === 'Comfort') {
      return require('../../../assetsy/images/top-UberX.png');
      // return require('../../../assetsy/images/top-Comfort.png');
    }
    return require('../../../assetsy/images/top-UberXL.png');
  }

  return (
    
    <MapView
    ref={mapRef}
    
    // style={StyleSheet.absoluteFill}     // learn from intellect programmer

      style={{width: '100%', height: '100%'}} 
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: 28.450627,
        longitude: -16.263045,
    // latitudeDelta: 0.0222,
        // longitudeDelta: 0.0121,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,

      }}>

    
{ordery && <MapViewDirections
        origin={{
          latitude: car?.latitude ? car?.latitude : ordery.originLatitude,
          longitude: car?.longitude ? car?.longitude : ordery.oreiginLongitude,
          // latitude: ordery.originLatitude, longitude: ordery.oreiginLongitude
        }}

        destination={{latitude: ordery.destLatitude, longitude: ordery.destLongitude}}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="red"

        onReady={result => {
  
          mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: 30,
                bottom: 50,
                left: 30,
                top: 50,
              },
          });
      }}
        
      />
    }

      {car && (<Marker.Animated
      ref={markerRef}
      //  {car.latitude!=null && car.longitude!=null && (<Marker.Animated 
        // coordinate={{latitude: car.latitude, longitude: car.longitude}}
        // "car.latitude  ? car.latitude : 0" it is ternary operation nothing else GENIUS: who understand after 2 hours later 😁
        // coordinate={{latitude: car.latitude  ? car.latitude : 0, longitude: car.longitude  ? car.longitude : 0}}
        coordinate={coordinatek}

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
      </Marker.Animated>)}

    </MapView>
  );
};

export default OrderMapbb;
