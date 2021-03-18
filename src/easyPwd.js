import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

import ReactNativeBiometrics from 'react-native-biometrics'
 
const oh = require('../img/oh.png')

const EasyPwd = () => {

  const [pwd,setPwd] = useState('');

  console.log(pwd.length)

  return(
    <View>
      <Text>간편비밀번호</Text>
      <View style={{flexDirection:"row"}}>
        {pwd.length >= 1 &&<Image source={oh} style={{height:100,width:100}}></Image>}
        {pwd.length >= 2 &&<Image source={oh} style={{height:100,width:100}}></Image>}
        {pwd.length >= 3 &&<Image source={oh} style={{height:100,width:100}}></Image>}
        {pwd.length >= 4 &&<Image source={oh} style={{height:100,width:100}}></Image>}
      </View>

      <TextInput autoFocus={true} keyboardType={'number-pad'} onChangeText={text=>setPwd(text)} value={pwd} style={{width:chwidth,height:100,borderWidth:1}}></TextInput>
    </View>
  )
}

export default EasyPwd