import React, {useState, useEffect} from 'react';
import {View, TextInput, SafeAreaView} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';


import styles from './styles.js';
import PlaceRowbb from './PlaceRowy.js';


const homePlaceLocationbb = {
  description: 'Homed',
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlaceLocationbb = {
  description: 'Workd',
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

const DestinationSearchbb = (props) => {
  const [originPlacebb, setOriginPlacebb] = useState(null);
  const [destinationPlacebb, setDestinationPlacebb] = useState(null);

  const navigationdd = useNavigation();

  const checkNavigationbb = () => {
    if (originPlacebb && destinationPlacebb) {      // if not any value is null
      navigationdd.navigate('SearchResultsStacknm', {
        originPlacebb,
        destinationPlacebb,
      })
    }
  }

  useEffect(() => {
    // console.warn('useEffect is called');
    // if (originPlacebb && destinationPlacebb) {      // if both variable have some value
    //   console.warn('Redirect to results');
    // }

    // NOTE: writing it here didn't work for him(IOS) ...that's why he put them on another function 
    // if (originPlacebb && destinationPlacebb) {      // if not any value is null
    //   navigationdd.navigate('SearchResultsStacknm', {
    //     originPlacebb,
    //     destinationPlacebb,
    //   })
    // }

    checkNavigationbb();
  }, [originPlacebb, destinationPlacebb]);

  return (
    <SafeAreaView>      
          {/* sothat we will able to see properly baby. */}
      <View style={styles.container}>

        <GooglePlacesAutocomplete
          placeholder="Where from?"
          onPress={(data, details = null) => {
            setOriginPlacebb({data, details});
            // console.log('dd---',details);
          }}
          suppressDefaultStyles       // all the default style is gone...we will give our own style baby

          // styles={{
          //   textInput: styles.textInput,      // here 'textInput' is predefined bb ....we know this from documentation  https://github.com/FaridSafi/react-native-google-places-autocomplete#styling
          // }}
          styles={{
            textInput: styles.textInput,
            container: styles.autocompleteContainer,
            listView: styles.listView,
            separator: styles.separator,      // the line which we see
          }}
          
          fetchDetails        // we give it 'true' sothat 'onPress' we get 'details'...we need 'details' because there->geometry we will get 'latitude longitude' value
          query={{
            key: 'AIzaSyCUPImSqcouLZL3qjXl_b8bzni0B-njcD8',
            language: 'en',
          }}
          enablePoweredByContainer={false}       // own explore: now powered by google won't show
          renderRow={(data) => <PlaceRowbb data={data} />}    // everyrow data will call this function


          // when we will click on 'Where from' and it will show it and if we click will show all the nearby location baby
          currentLocation={true}
          currentLocationLabel='Current location baby'

          renderDescription={(data) => data.description || data.vicinity}     // to show location not the business name bb...learn lots of parameter from https://github.com/FaridSafi/react-native-google-places-autocomplete#props ....you also can define show current location around 50 meter...you also can decide how you can sort them

          predefinedPlaces={[homePlaceLocationbb, workPlaceLocationbb]}   // later we will fetch from dataBase bb


        />

        <GooglePlacesAutocomplete
          placeholder="Where to?"
          onPress={(data, details = null) => {
            setDestinationPlacebb({data, details});
          }}
          
          // styles={{
          //   textInput: styles.textInput,
          // }}
          styles={{
            textInput: styles.textInput,
            container: {
              ...styles.autocompleteContainer,
              top: 57,      // this is how we override 
            // backgroundColor: 'red',      // if you don't understand which part is this give a background color baby

            },
            separator: styles.separator,
          }}

          fetchDetails
          query={{
            key: 'AIzaSyCUPImSqcouLZL3qjXl_b8bzni0B-njcD8',
            language: 'en',
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles      

          renderRow={(data) => <PlaceRowbb data={data} />}   

        />

         {/* NOTE:this is cool fuck....just use "position: 'absolute'" and go and fuck */}
        {/* Circle near Origin input */}
        <View style={styles.circle} />

        {/* Line between dots */}
        <View style={styles.line} />

        {/* Square near Destination input */}
        <View style={styles.square} />

      </View>
    </SafeAreaView>
  );
};

export default DestinationSearchbb;
