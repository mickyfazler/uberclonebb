import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, Pressable } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import stylesbb from './styles.js'
import NewOrderPopupbb from "../../componentsy/NewOrderPopupy";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const origin = {latitude: 28.450927, longitude: -16.260845};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyCUPImSqcouLZL3qjXl_b8bzni0B-njcD8';    

import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getCar, listOrders } from '../../graphqly/queriesy';
import { updateCar, updateOrder } from '../../graphqly/mutationsy';




const HomeScreeny = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [myPosition, setMyPosition] = useState(null);
  const [order, setOrder] = useState(null)        // accepted order bb
  const [car, setCar] = useState(null);


// current orders we got but we neither accepted or declined bb
const [newOrders, setNewOrders] = useState([]);

/*   const [newOrder, setNewOrder] = useState({      
    id: '1',
    type: 'UberX',

    // originLatitude: 28.453327,
    // oreiginLongitude: -16.263045,
    originLatitude: 28.450457773948123,
    oreiginLongitude:  -16.264397419621446,

    // destLatitude: 28.452927,
    // destLongitude: -16.260845,
    destLatitude: 28.452385297122508,
    destLongitude:  -16.27307642920701,

    user: {
      rating: 4.8,
      name: 'Ciara',
    }
  }) */
 
  const fetchCary = async () => {
    try {
      const userDatabb = await Auth.currentAuthenticatedUser();
      const carDatabb = await API.graphql(
        graphqlOperation(getCar, { id: userDatabb.attributes.sub }),
      );
      setCar(carDatabb.data.getCar);
    } catch (e) {
      console.error("1 ",e);
    }
  }


  const fetchOrdersy = async () => {
    try {
        const ordersDatabb = await API.graphql(
          graphqlOperation(
            listOrders,
            //only fetching those orders where  status=='NEW' ....'eq' means equal to
            { filter: { status: { eq: 'NEW'}}}
            )
        );
        setNewOrders(ordersDatabb.data.listOrders.items);
    } catch (e) {
      console.log("2 ",e);
    }
  }


  useEffect(() => {
    fetchCary();
    fetchOrdersy();
  }, []);
  const onDecline = () => {
    setNewOrders(newOrders.slice(1));   // delete first item on the array bb
    console.warn("decilined the order");
  }

  const onAccept = async (nwOrdr) => {
    try {
      const input = {
      // con inputbb = { // errorx: own explore: name must be "input" because that is given on "schema.graphql"
        id: nwOrdr.id,
        status: "PICKING_UP_CLIENT",
        carId: car.id
      }
      console.log("3a ",input);
      const ordersDatabb = await API.graphql(
        // graphqlOperation(updateOrder, { input })       // errorx: own explore: name must be "input" because that is given on "schema.graphql"
        graphqlOperation(updateOrder, { input })
      )
      console.log("3b ",ordersDatabb);

      setOrder(ordersDatabb.data.updateOrder);
    } catch (e) {
        console.log(" 3",e);
    }

    setNewOrders(newOrders.slice(1));

  }

  const onGoPress = async () => {
    // Update the car and set it to active
    try {
      const userDatabb = await Auth.currentAuthenticatedUser();
      const input = {
        id: userDatabb.attributes.sub,
        isActive: !car.isActive,
      }
      const updatedCarDatabb = await API.graphql(
        graphqlOperation(updateCar, { input })
      )
      setCar(updatedCarDatabb.data.updateCar);
    } catch (e) {
      console.error("4 ",e);
    }
  }

  const onUserLocationChange =async (event) => {
    console.log('onUserLocationChange called baby');
    // console.log(event.nativeEvent.coordinate.longitude);
    // console.log(event.nativeEvent.coordinate.latitude);
  


    const { latitude, longitude, heading } = event.nativeEvent.coordinate
    // Update the car position bb
    try {
      const userDatabb = await Auth.currentAuthenticatedUser();
      const input = {
        id: userDatabb.attributes.sub,
        latitude,
        longitude,
        heading,
      }
      console.log("5 a", input);
      const updatedCarDatabb = await API.graphql(
        graphqlOperation(updateCar, { input })
      )
      console.log("5 b", updatedCarDatabb.data.updateCar);

      setCar(updatedCarDatabb.data.updateCar);
    } catch (e) {
      console.log("5 e",e);
    }

  }

  const onDirectionFound = (event) => {
   
    // console.log("Direction found: ", event);
    if (order) {
      setOrder({
        ...order,
        distance: event.distance,
        duration: event.duration,
        pickedUp: order.pickedUp || event.distance < 0.2,       // "event.distance" is distance between driver current location and destination
        isFinished: order.pickedUp && event.distance < 0.2,
      })
    }
  }

  const getDestination = () => {

    // if we piced up the rider than we want to go their destination  
  
    if (order && order.pickedUp) {
      return {
        latitude: order.destLatitude,
        longitude: order.destLongitude,
      }
    }

    // picking up the rider bb
    return {
      latitude: order.originLatitude,
      longitude: order.oreiginLongitude,
    }
  }

  const renderBottomTitle = () => {
    if (order && order.isFinished) {
      return (
        <View style={{ alignItems: 'center' }}>
          <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center', backgroundColor: '#cb1a1a', width: 200, padding: 10,  }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>COMPLETE {order.type}</Text>
          </View>
          <Text style={stylesbb.bottomText}>{order.user.name}</Text>
        </View>
      )
    }

    // we have taken our rider from origin and now going to his destination bb
    if (order && order.pickedUp) {
      return (
        <View style={{ alignItems: 'center' }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} min</Text>
            <View style={{ backgroundColor: '#d41212', marginHorizontal: 10, width: 30, height: 30, alignItems:'center', justifyContent: 'center', borderRadius: 20}}>
              <FontAwesome name={"user"} color={"white"} size={20} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>      
                {/* "toFixed()" is a javascript function bb */}
          </View>
          <Text style={stylesbb.bottomText}>Dropping off {order?.user?.username}</Text>
        </View>
      )
    }

    // going to take our rider from his origin bb
    if (order) {
      return (
        <View style={{ alignItems: 'center' }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} min</Text>
            <View style={{ backgroundColor: '#1e9203', marginHorizontal: 10, width: 30, height: 30, alignItems:'center', justifyContent: 'center', borderRadius: 20}}>
              <FontAwesome name={"user"} color={"white"} size={20} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
          </View>
          <Text style={stylesbb.bottomText}>Picking up {order?.user?.username}</Text>
        </View>
      )
    }
    if (car?.isActive) {
      return (
        <Text style={stylesbb.bottomText}>You're online</Text>
      )
    }
    return (<Text style={stylesbb.bottomText}>You're offline</Text>);
  }

  return (
    <View>
      <MapView
        style={{width: '100%', height: Dimensions.get('window').height - 150}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        onUserLocationChange={onUserLocationChange}         // if my/driver location change when I drive then this function will learn
      
        initialRegion={{
          latitude: 28.450627,
          longitude: -16.263045,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        }}
      >
        {order && (
          <MapViewDirections
            origin={{
              latitude: car?.latitude,
              longitude: car?.longitude,
            }}

            onReady={onDirectionFound}      // if it(MapViewDirections) found direction/path between origin and destination then this will be called bb
            destination={getDestination()}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="black"
          />
        )}
      </MapView>



       {/* SECTION:all buttons starts baby */}
      <Pressable
        onPress={() => console.warn('Balance')}
        style={stylesbb.balanceButton}>
        <Text style={stylesbb.balanceText}>
          <Text style={{ color: 'green' }}>$</Text>
          {' '}
          0.00
        </Text>
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[stylesbb.roundButton, {top: 10, left: 10}]}>
        <Entypo name={"menu"} size={24} color="#4a4a4a" />
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[stylesbb.roundButton, {top: 10, right: 10}]}>
        <Fontisto name={"search"} size={24} color="#4a4a4a"/>
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[stylesbb.roundButton, {bottom: 110, left: 10}]}>
        <Ionicons name={"shield"} size={24} color="#4a4a4a"/>
      </Pressable>

      <Pressable
        onPress={() => console.warn('Hey')}
        style={[stylesbb.roundButton, {bottom: 110, right: 10}]}>
        <Ionicons name={"location"} size={24} color="#4a4a4a"/>
      </Pressable>

      <Pressable
        onPress={onGoPress}
        style={stylesbb.goButton}>
        <Text style={stylesbb.goText}>
          {car?.isActive ? 'END' : 'GO'}
        </Text>
      </Pressable>
       {/* SECTION:all buttons ends baby */}


      <View style={stylesbb.bottomContainer}>
        <Ionicons name={"options"} size={30} color="#4a4a4a"/>
          {renderBottomTitle()}
        <AntDesign name={"bars"} size={30} color="#4a4a4a" />
      </View>


      {/* if new order comes then show the popup */}
      {newOrders.length > 0 && !order && <NewOrderPopupbb
        newOrder={newOrders[0]}
        duration={2}
        distance={0.5}
        // duration={tt.duration}
        // distance={tt.distance}
        onDecline={onDecline}
        onAccept={() => onAccept(newOrders[0])}
      />}
    </View>
  );
};

export default HomeScreeny;
