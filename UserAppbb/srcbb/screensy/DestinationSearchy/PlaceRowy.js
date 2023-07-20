import React from "react";
import { View, Text } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import styles from './styles'

const PlaceRowbb = ({ data }) => {
  return (
    <View style={styles.row}>
      {/* <View style={styles.iconContainer}> */}
        {/* <Entypo name='location-pin' siz={20} color={'white'} /> */}

        {/* we also can give different icon based on description */}
        {data.description === 'Homed' 
          ? 
          <View style={[styles.iconContainer,{backgroundColor:'blue'}]}> 
                {/* complete     own explore: GENIUS:  */}
          <Entypo name='home' size={15} color={'white'}  />
        </View>
          : 
          <View style={styles.iconContainer}>
          <Entypo name='location-pin' size={15} color={'white'} />
            </View>
        }
      <Text style={styles.locationText}>{data.description || data.vicinity}</Text>
        {/* '.description' is the search text........'.description' don't get for 'current location; there we got '.vicinity' ....NOTE: it displays the business name not the location that's why we uses 'renderDescription' */}
    </View>
  );
};

export default PlaceRowbb;
