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

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

const Settings = () => {
  return(
    <View>
      <Text>회원가입</Text>
      <TextInput style={{}}></TextInput>
    </View>
  )
}

export default Settings