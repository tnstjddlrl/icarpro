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

const EasyPwd = () => {
  return(
    <View>
      <Text>간편비밀번호</Text>
      <TextInput keyboardType={'number-pad'} style={{width:chwidth,height:100,borderWidth:1}}></TextInput>
    </View>
  )
}

export default EasyPwd