import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

import {useNavigation} from '@react-navigation/native'

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

const logo = require('../img/icarlogo.png')

const Load = () => {
  const navigation = useNavigation()

  useEffect(()=>{
    setTimeout(() => {
      navigation.navigate('차량제어')
    }, 1000);
  },[])

  return(
    <SafeAreaView>
      <View style={{width:chwidth,height:chheight,justifyContent:"center",alignItems:"center"}}>
        <View style={{flex:3}}></View>
        <View style={{flex:2}}>
          <Image source={logo} style={{maxWidth:chwidth/1.5,maxHeight:chheight/8}}></Image>
        </View>
        <View style={{flex:2}}></View>
        <View style={{flex:3}}></View>
      </View>
    </SafeAreaView>
  )
}

export default Load