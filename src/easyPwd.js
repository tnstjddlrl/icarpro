import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

import ReactNativeBiometrics from 'react-native-biometrics'
 


const EasyPwd = () => {

  let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
  let payload = epochTimeSeconds + 'some message'
   
  ReactNativeBiometrics.createSignature({
      promptMessage: 'Sign in',
      payload: payload
    })
    .then((resultObject) => {
      const { success, signature } = resultObject
   
      if (success) {
        console.log(signature)
        verifySignatureWithServer(signature, payload)
      }
    })



  return(
    <View>
      <Text>간편비밀번호</Text>
      <TextInput keyboardType={'number-pad'} style={{width:chwidth,height:100,borderWidth:1}}></TextInput>
    </View>
  )
}

export default EasyPwd