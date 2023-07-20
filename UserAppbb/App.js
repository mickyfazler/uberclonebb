import 'react-native-gesture-handler';
import React, { useState,useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
// import HomeScreenbb from './srcbb/screensy/HomeScreeny/indexy';
// import DestinationSearchbb from './srcbb/screensy/DestinationSearchy';
// import SearchResultsbb from './srcbb/screensy/SearchResults';
import {  SafeAreaView,  StatusBar,} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import RootNavigatorbb from './srcbb/navigationy/Rooty';
// import RootNavigatorbb from './src/navigationy/Rooty';


navigator.geolocation = require('@react-native-community/geolocation');     // NOTE:if you don't give then also works........If you need to have geolocation API aligned with the browser (cross-platform apps), or want to support backward compatibility, please consider adding following lines at the root level, for example at the top of your App.js file



import { withAuthenticator } from 'aws-amplify-react-native'

// https://docs.amplify.aws/start/getting-started/setup/q/integration/react-native/#set-up-frontend    copied from there
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';     // this is a file ....look does it there properly
Amplify.configure(awsExports);


const App = () => {



  // copied from GO TO😝-->: https://reactnative.dev/docs/permissionsandroid.html#example  ....just changed for location
  const androidPermissionbb = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Uber App location Permission",
          message:
            "Uber App needs access to FAZLE'S location " +
            "so you can take awesome rides.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "Fuck"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      androidPermissionbb();
    } else {
      // IOS .....for ios this will automatically ask for location permission based on what you give 'NSLocationWhenInUseUsageDescription' or 'NSLocationAlwaysAndWhenInUseUsageDescription'(see notesy.html) baby 
      Geolocation.requestAuthorization();
    }
  }, [])

  return (
    <>
              
      {/* <HomeScreenbb/> */}
      {/* <DestinationSearchbb/> */}

      {/* <SearchResultsbb/> */}
      <RootNavigatorbb/>
      {/* <Text>hello bb</Text> */}

   
    </>
  );
};




// export default App;
export default  withAuthenticator(App);