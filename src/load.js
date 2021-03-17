import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native'

const Load = () => {
  const navigation = useNavigation()

  useEffect(()=>{
    setTimeout(() => {
      navigation.navigate('차량제어')
    }, 1000);
  },[])

  return(
    <View>
      <Text style={{fontSize:50}}>로딩화면</Text>
    </View>
  )
}

export default Load