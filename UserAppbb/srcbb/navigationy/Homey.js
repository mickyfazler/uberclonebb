import React from "react";
// import HomeScreen from "../screens/HomeScreen";
import HomeScreenbb from "../screensy/HomeScreeny/indexy";
import { createStackNavigator } from '@react-navigation/stack'
// import DestinationSearch from "../screens/DestinationSearch";
import DestinationSearchbb from "../screensy/DestinationSearchy";
import SearchResultsbb from "../screensy/SearchResults";
import OrderScreenbb from "../screensy/OrderScreeny";
// import SearchResults from "../screens/SearchResults";
const Stack = createStackNavigator();

const HomeNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,       // we don't want to show title/header any of our screen (stack navibation)
      }}
    >
      <Stack.Screen name={"HomeStacknm"} component={HomeScreenbb} />
      <Stack.Screen name={"DestinationSearchStacknm"} component={DestinationSearchbb} />
      <Stack.Screen name={"SearchResultsStacknm"} component={SearchResultsbb} />
      <Stack.Screen name={"OrderStacknm"} component={OrderScreenbb} />

    </Stack.Navigator>
  );
};

export default HomeNavigator;
