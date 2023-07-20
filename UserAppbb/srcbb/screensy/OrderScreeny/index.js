import React, { useState, useEffect } from "react";
import { View, Dimensions, Text } from "react-native";
import { useRoute } from '@react-navigation/native';
import { API, graphqlOperation,Auth } from 'aws-amplify';
import { getOrder, getCar } from '../../../src/graphql/queries';
import { onOrderUpdated, onCarUpdated } from './subscriptionsy';
import OrderMapbb from "../../componentsy/OrderMapy";

const OrderScreenbb = (props) => {
  const [car, setCar] = useState(null);
  const [ordery, setOrdery] = useState(null);

  const route = useRoute();
  // console.log(route.params.ordId);

  // Fetching order info on initial render bb
  useEffect(() => {
    console.log('called 1');
    const fetchOrdery = async () => {
      try {
        const orderDatay = await API.graphql(
          graphqlOperation(getOrder, { id: route.params.ordId })
        );
        console.log("dt1",orderDatay.data);
        setOrdery(orderDatay.data.getOrder);
      } catch (e) {
       console.warn(" 1",e)
      }
    }
    fetchOrdery();
  }, [])


  // Subscribe to order updates which order we created bb
  useEffect(() => {
    console.log('called 2');

    const subscriptionbb = API.graphql(
      // if if this{id} order do any update(onOrderUpdated) operation then 'next' func will call bb
      graphqlOperation(onOrderUpdated, { id: route.params.ordId })
      ).subscribe({
      // next: ({ val }) => {console.log("x1",val);setOrdery(val.data.onOrderUpdated)},  //errorx
      next: ({ value }) => {console.log("x1",value);setOrdery(value.data.onOrderUpdated)},
      error: err => console.warn("e" ,err)
    })

    return () => subscriptionbb.unsubscribe();
  }, [])



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
      next: ({ value }) => {console.log('car sub '); setCar(value.data.onCarUpdated)},
      error: erro => console.warn("e2",erro)
    })

    return () => subscription.unsubscribe();
  }, [ordery])

  return (
    <View>
      <View style={{height: Dimensions.get('window').height - 400}}>
        <OrderMapbb car={car} />
      </View>
      <View>
        <Text>Order status: {ordery?.status}</Text>
      </View>
    </View>
  );
};

export default OrderScreenbb;
