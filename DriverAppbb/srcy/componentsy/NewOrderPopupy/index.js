import React from "react";
import { View, Text, Pressable } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from './styles.js';

const NewOrderPopupbb = ({ newOrder, onAccept, onDecline, duration, distance }) => {

  return (
    <View style={styles.root}>
      <Pressable onPress={onDecline} style={styles.declineButton}>
        <Text style={styles.declineText}><Text style={{fontSize:20,fontWeight:500}}>X</Text> Decline</Text>
      </Pressable>

         {/* NOTE:this is not a good thing to give "onPress" here bb */}
      <Pressable onPress={onAccept} style={styles.popupContainer}>

        <View style={styles.row}>
          <Text style={styles.uberType}>{newOrder.type}</Text>

          <View style={styles.userBg}>
            <View style={styles.userIcony}>

            <FontAwesome name={"user"} color={"white"} size={35} />
            </View>
          </View>

          <Text style={styles.uberType}>
            <AntDesign name={"star"} size={18}/>
            {newOrder.user.rating}
          </Text>
        </View>

        <View>
          <Text style={styles.minutes}>{duration} min</Text>
          <Text style={styles.distance}>{distance} mi</Text>
        </View>

        {/* own explore: */}
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <AntDesign name={"star"} size={18} color="lightgrey" />
          <Text style={{color:'white',fontSize:20,padding:5}}>Toward your destination</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default NewOrderPopupbb;
