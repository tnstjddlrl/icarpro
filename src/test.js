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
import Toast from 'react-native-toast-message';

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

const Test = () => {
  const navigation = useNavigation()

  return(
    <View>
      <TouchableOpacity onPress={()=>navigation.navigate('회원가입')}>
              <Text>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('간편비밀번호')}>
              <Text>간편비밀번호</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>client.write(json)}>
              <Text>소켓통신</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{ Toast.show({
        type: 'success',
        position: 'top',
        text1: '패닉 명령',
        text2: '패닉 명령을 [ON]하였습니다.',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => { },
        onHide: () => { },
        onPress: () => { }
      });}}>
              <Text>토스트</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('차량등록')}>
              <Text>차량등록</Text>
            </TouchableOpacity><Text>회원가입</Text>

            <TouchableOpacity onPress={()=>navigation.navigate('차량제어')}>
              <Text>차량제어</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('테스트2')}>
              <Text>테스트2</Text>
            </TouchableOpacity>
    </View>
  )
}

export default Test