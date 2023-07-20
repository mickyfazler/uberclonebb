import { View, Text, StyleSheet,Dimensions } from 'react-native'
import React from 'react'
import Homemapbb from '../../componentsy/Homemapy/indexy'
import CovidMessagebb from '../../componentsy/CovidMessagey/indexy'
import HomeSearchbb from '../../componentsy/HomeSearchy/indexy'

const HomeScreenbb = () => {
  return (
    <View>
      {/* <Text>HomeScreenbb</Text> */}
      {/* <Homemapbb/> */}
      <View style={{height: Dimensions.get('window').height - 390}}>
      {/* <View style={{height: '100%'}}> */}
        {/* <RouteMap /> */}
        <Homemapbb/>
      </View>

      {/*  Covid Message*/}
      <CovidMessagebb/>

      {/*  Bottom Comp*/}
      <HomeSearchbb/>
    </View>
  )
}

export default HomeScreenbb