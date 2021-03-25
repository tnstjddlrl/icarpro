import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  TextInput,
  BackHandler,
  SafeAreaView
} from 'react-native';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import { networkState,newState,fcmToken } from './atom/atoms'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';


import Toast from 'react-native-toast-message';
import client from './Client.js'


const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

const Test = () => {
  const navigation = useNavigation()

  const state = useRecoilValue(networkState)
  const token = useRecoilValue(fcmToken)
  const [neww,setneww] = useRecoilState(newState)

  console.log(state)
  console.log(neww)
  console.log(token)

  useEffect(() => {
    const backAction = () => {
      Alert.alert("종료", "앱을 종료하시겠습니까?", [
        {
          text: "아니요",
          onPress: () => null,
          style: "cancel"
        },
        { text: "예", onPress: () => {client.destroy();BackHandler.exitApp()} }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  

  return (
    <View>
      <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate('간편비밀번호')}>
        <Text>간편비밀번호</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('차량등록')}>
        <Text>차량등록</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('차량제어')}>
        <Text>차량제어</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('차량상태')}>
        <Text>차량상태</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('스와이프테스트')}>
        <Text>스와이프테스트</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('설정')}>
        <Text>설정</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('스크롤베이스')}>
        <Text>스크롤베이스</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {AsyncStorage.setItem("@is_first",'notfirst'),console.log('어싱크 테스트')}}>
        <Text>어싱크 테스트</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => client.destroy()}>
        <Text>소켓 연결 끊기</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => client.write('test')}>
        <Text>소켓 전송</Text>
      </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

export default Test