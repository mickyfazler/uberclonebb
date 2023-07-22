import React, { useState, useEffect } from "react";
import { View, Dimensions, Text } from "react-native";
import { useRoute } from '@react-navigation/native';
import { API, graphqlOperation,Auth } from 'aws-amplify';
import { getOrder, getCar } from '../../../src/graphql/queries';
import { onOrderUpdated, onCarUpdated } from './subscriptionsy';
import OrderMapbb from "../../componentsy/OrderMapy";

const OrderScreenbb = (props) => {
  // const [car, setCar] = useState(null);
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





  return (
    <View style={{ flex: 1 }}>
      {/* <View style={{height: Dimensions.get('window').height - 400}}> */}
      <View >
        <Text >Order status: </Text>

        {ordery?.status != 'NEW' && (
          <Text style={{color:'yellow',backgroundColor: 'hotpink',}}> {ordery?.status}</Text>
        )
        }
        {ordery?.status == 'NEW' && (<Text> {ordery?.status}</Text>)}
      </View>
      <View style={{ flex: 1 }}>
      {/* <View style={{ flex: 1 }}> */}
       {/* NOTE:if 'car' or  'ordery' any info update through state then 'OrderMapbb' whole again and again re-render  */}
        {/* <OrderMapbb car={car} ordery={ordery} /> */}
        <OrderMapbb ordery={ordery} />
      </View>

      

    </View>
  );
};

export default OrderScreenbb;
