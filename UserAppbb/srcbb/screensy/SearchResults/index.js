import React, { useState } from 'react';
import {View, Dimensions, Alert,SafeAreaView} from 'react-native';
import UberTypesbb from '../../componentsy/UberTypesy';
// import Homemapbb from '../../componentsy/Homemapy/indexy';
import RouteMapbb from '../../componentsy/RouteMapy';

import { createOrder } from '../../../src/graphql/mutations';

import { useRoute, useNavigation  } from '@react-navigation/native';

import { API, graphqlOperation, Auth } from 'aws-amplify';

const SearchResultsbb = (props) => {
  const typeStateR = useState(null);

  const routebb = useRoute();
  const navigationbb = useNavigation();


  console.log(routebb.params);
  const {originPlacebb, destinationPlacebb} = routebb.params

  const saveOrderbb = async () => {
    const [type] = typeStateR;

    // if we didn't select any car type uberX,uberXl...
    if (!type) {
      Alert.alert(
        "Hurraaay",
        "Your order has been submited",
        [{
          text: "Go home",
          onPress: () => console.log('no car type selected ')
        }]
      )
      return;
    }

    // submit to server
    try {
      const userInfo = await Auth.currentAuthenticatedUser();

      const date = new Date();
      const inputbb = {
        createdAt: date.toISOString(),
        type,
        originLatitude: originPlacebb.details.geometry.location.lat,
        oreiginLongitude: originPlacebb.details.geometry.location.lng,

        destLatitude: destinationPlacebb.details.geometry.location.lat,
        destLongitude: destinationPlacebb.details.geometry.location.lng,

        userId: userInfo.attributes.sub,
        carId: "1",
        status: "NEW",

      }

      const responsebb = await API.graphql(
        graphqlOperation(
          createOrder, {
            input: inputbb
          },
        )
      )

      // console.log(responsebb);
      navigationbb.navigate('OrderStacknm', { ordId: responsebb.data.createOrder.id });

     
    } catch (e) {
      console.error(e);
    }
  }


  return (
    <SafeAreaView>

    <View style={{display: 'flex'}}>
      <View style={{height: Dimensions.get('window').height - 400}}>
        {/* <Homemapbb/> */}
        {/* <RouteMapbb/> */}
        <RouteMapbb originrr={originPlacebb} destinationrr={destinationPlacebb} />

      {/* <Text>hola</Text> */}
      </View>

      {/* <UberTypesbb/> */}
      <View style={{height: 400}}>
        <UberTypesbb typeStateRy={typeStateR} onSubmitbb={saveOrderbb}/>
      </View>
    </View>
    </SafeAreaView>

  );
};

export default SearchResultsbb;
