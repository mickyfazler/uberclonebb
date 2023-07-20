import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import styles from './styles.js';

import Ionicons from "react-native-vector-icons/Ionicons";

const UberTypeRowbb = (props) => {
  const {typebb , onPressFuncbb, isSelectedbb} = props;

  const getImage = () => {
    if (typebb.type === 'UberX') {
      // return require('../../assets/images/UberX.jpeg');    //WRONGbecause of that my time wasted baby
      return require('../../../assetsy/images/UberX.jpeg');
    }
    if (typebb.type === 'Comfort') {
      return require('../../../assetsy/images/Comfort.jpeg');
    }
    return require('../../../assetsy/images/UberXL.jpeg');
  }

  return (
    <Pressable 
    onPress={onPressFuncbb}
      style={[styles.container, {
        backgroundColor: isSelectedbb ? '#efefef' : 'white',
      }]}
    > 

      {/*  Image */}
      <Image
        style={styles.image}
        // source={require(`../../../assetsy/images/${type.type}.jpeg`)}
        source={getImage()}     // not working like upper that's why using like this
      />

      <View style={styles.middleContainer}>
        <Text style={styles.type}>
          {typebb.type}{' '}      
          <Ionicons name={'person'} size={16} />
          3
        </Text>
        <Text style={styles.time}>
          8:03PM drop off
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <Ionicons name={'pricetag'} size={18} color={'#42d742'} />
        <Text style={styles.price}>est. ${typebb.price}</Text>
      </View>
    </Pressable>
  );
};

export default UberTypeRowbb;
