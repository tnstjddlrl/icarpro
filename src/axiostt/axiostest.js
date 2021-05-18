import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  Modal
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

axios.get(`https://jsonplaceholder.typicode.com/users`,{
  params:{
      city: 'Lebsackbury'
  }
}).then(res => {
    console.log(res)
  }).catch((err)=>{
    console.log(err)
  })

const Axiostest = () =>{
  const [test,setTest] =useState('')

  return(
    <View>
      <Text>axios test</Text>
    </View>
  )
}

export default Axiostest