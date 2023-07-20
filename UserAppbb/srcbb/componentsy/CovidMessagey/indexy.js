import { View, Text } from 'react-native'
import React from 'react'
import stylesbb from './stylesy'

const CovidMessagebb = () => {
  return (
    <View style={stylesbb.container}>
      <Text style={stylesbb.title}>Travel only if necessary</Text>
      <Text style={stylesbb.text}>
        Upgrading this package often requires the font files linked to your projects to be updated as well. If the automatic 
      </Text>
      <Text style={stylesbb.learnMore}>Learn more</Text>
    </View>
  )
}

export default CovidMessagebb