import React from "react";
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeNavigator from "./Homey";
import CustomDrawer from "./CustomDrawery";

const Drawer = createDrawerNavigator();

const FuncDummyScreenbb = (props) => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>{props.namebb}</Text>
  </View>
)

const RootNavigatorbb = (props) => {
  return (
    <NavigationContainer>
      {/* <Drawer.Navigator >  */}
          {/* in IOS By default swipe works and title don't show ....That's what I want */}
      {/* <Drawer.Navigator screenOptions={{swipeEnabled:true,headerShown:false}}>  */}
      {/* //  in android By default swipe works is not working and title is showing ....that's why {headerTitle:''} given /blank title ...in the actual build only give {headerShown:false} and I hope header will hide and swipe will work.....swipe is not working is emulator problem */}
      {/* <Drawer.Navigator drawerContent={ */}
      <Drawer.Navigator screenOptions={{headerShown:false}} drawerContent={
        (props) => (
          <CustomDrawer {...props}  />)
      }>
        {/* <Drawer.Screen name="HomeDrawernm" component={HomeNavigator}  options={{ headerTitle:''}}/> */}
        <Drawer.Screen name="HomeDrawernm" component={HomeNavigator}  />

        <Drawer.Screen name="Your_TripsDrawernm">
           {() => <FuncDummyScreenbb namebb={"Your_TripsNm"} />}
          {/* because we want to send some data to our component/function(FuncDummyScreenbb) that's why we are doing like this  instead of like upper 'component={FunctionName}'*/}

            {/* we need to RETURN a react element that's why give call back function...if you don't give '{}' it will give errorx */}

        </Drawer.Screen>

        <Drawer.Screen name="HelpDrawernm">
          {() => <FuncDummyScreenbb namebb={"HelpDrNm"} />}
        </Drawer.Screen>

        <Drawer.Screen name="WalletDrawernm">
          {() => <FuncDummyScreenbb namebb={"WalletDrNm"} />}
        </Drawer.Screen>

        <Drawer.Screen name="SettingsDrawernm">
          {() => <FuncDummyScreenbb namebb={"SettingsDrNm"} />}
        </Drawer.Screen>

      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigatorbb;
