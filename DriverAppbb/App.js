
import React, { useEffect } from 'react';
import HomeScreeny from './srcy/screensy/HomeScreeny';


import {  SafeAreaView,  StatusBar,} from 'react-native';
// import Amplify, {  Auth,  API,  graphqlOperation,} from 'aws-amplify';   // WRONG own explore: GENIUS:
import {Amplify,  Auth,  API,  graphqlOperation,} from 'aws-amplify';   // GENIUS: we also need to import "Amplify" like this

import config from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';

import { getCarId } from './srcy/graphqly/queriesy';
import { createCar } from './srcy/graphqly/mutationsy';


Amplify.configure(config);

const App = () => {
  
  useEffect(() => {
    // Auth.signOut()
    const updateUserCar = async () => {
      // Get authenticated user
      const authenticatedUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
      if (!authenticatedUser) {
        return;
      }

      // Check if the user has already a car
      const carData = await API.graphql(
        graphqlOperation(
          getCarId,
          { id: authenticatedUser.attributes.sub }
        )
      )

      if (!!carData.data.getCar) {
        console.log("User already has a car assigned");
        return;
      }

      // If not, create a new car for the user
      const newCar = {
        id: authenticatedUser.attributes.sub,
        type: 'UberX',
        userId: authenticatedUser.attributes.sub,
      }
      await API.graphql(graphqlOperation(
        createCar, { input: newCar }
      ))
    };

    updateUserCar();



  
  }, [])
  return (
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <HomeScreeny />
    </SafeAreaView>
  </>
  )
}

// export default App
export default withAuthenticator(App);
