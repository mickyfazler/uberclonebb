import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from './styles.js';
// import UberTypeRow from '../UberTypeRow';

// import typesData from '../../assets/data/types';     // WRONG own explore: fuck 
import typesData from '../../../assetsy/datay/typesy.js';
import UberTypeRowbb from "../UberTypeRowy/index.js";

const UberTypesbb = ({ typeStateRy,onSubmitbb }) => {
  const [selectedTypey, setSelectedTypey] = typeStateRy;



  return (
    <View>
      {/* <Text>hola</Text> */}

      {/* {console.warn(typesData)} */}
      {typesData.map((typ) => (
        <UberTypeRowbb typebb={typ} key={typ.id}
        isSelectedbb={typ.type === selectedTypey}
        onPressFuncbb={() =>{
           setSelectedTypey(typ.type)
          //  console.log(selectedTypey);
          
          }}
        
        
        /> 
            /* need unique key fuck  */
        
      ))}


      <Pressable onPress={onSubmitbb} style={{
        backgroundColor: 'black',
        padding: 10,
        margin: 10,
        alignItems: 'center',
      }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          Confirm Uber
        </Text>
      </Pressable>
    </View>
  );
};

export default UberTypesbb;
