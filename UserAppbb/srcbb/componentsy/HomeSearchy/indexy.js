import React from "react";
import { View, Text,Pressable } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import {useNavigation} from '@react-navigation/native'


// import styles from './styles.js';      // NOTE:don't give this name('styles' when default import) ...not working ...own explore
import stylescc from './styles.js';


const HomeSearchbb = (props) => {
  const navigationbb = useNavigation();
 
  const goToSearchbb = () => {
    navigationbb.navigate('DestinationSearchStacknm')
  }


  return (
    <View style={{    backgroundColor:'#ebe8f7'  }}>
      {/*  Input Box */}
      <Pressable onPress={goToSearchbb} style={stylescc.inputBox}>
        {/* we using pressable instead of view sothat we can redirect  bb*/}
        <Text style={stylescc.inputText}>Where To?</Text>

        <View style={stylescc.timeContainer}>
          <AntDesign name={'clockcircle'} size={16} color={'#535353'} />
          <Text>Now</Text>
          <MaterialIcons name={'keyboard-arrow-down'} size={16} />
        </View>
      </Pressable>

      {/* Previous destination */}
      <View style={stylescc.row}>
        <View style={stylescc.iconContainer}>
          <AntDesign name={'clockcircle'} size={20} color={'#ffffff'} />
        </View>
        <Text style={stylescc.destinationText}>Spin Nightclub</Text>
      </View>

      {/* Home destination */}
      <View style={stylescc.row}>
        <View style={[stylescc.iconContainer, {backgroundColor: '#218cff'}]}>
          <Entypo name={'home'} size={20} color={'#ffffff'} />
        </View>
        <Text style={stylescc.destinationText}>Home</Text>
      </View>
    </View>
  );


};


// const HomeSearchbb = (props) => {
 
//   return (
//     <Text>taki taki</Text>
//   )
// }
export default HomeSearchbb;
