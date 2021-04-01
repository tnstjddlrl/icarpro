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

import {
  Player,
  Recorder,
  MediaStates
} from '@react-native-community/audio-toolkit';

import { modemNumber, userNumber, fcmToken, isCarRace, bootRestTime } from './atom/atoms'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';

import RNExitApp from 'react-native-kill-app';


import Toast from 'react-native-toast-message';
import client from './Client.js'


const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

function testModem() {
  var txt = { type: "R", type_sub: "conntest" }
  txt = JSON.stringify(txt)

  client.write(txt)
  Alert.alert('전송 : ' + txt)
}





const Test = () => {
  const navigation = useNavigation()

  const state = useRecoilValue(modemNumber)
  const token = useRecoilValue(fcmToken)
  const [neww, setneww] = useRecoilState(userNumber)
  const atcarrace = useRecoilValue(isCarRace)


  console.log('모뎀 넘버 : ' + state)
  console.log('유저 넘버 : ' + neww)
  console.log(token)
  console.log(atcarrace)

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
        {/* <TouchableOpacity onPress={() => {AsyncStorage.setItem("@is_first",'notfirst'),console.log('어싱크 테스트')}}>
        <Text>어싱크 테스트</Text>
      </TouchableOpacity> */}
        <TouchableOpacity onPress={() => client.destroy()}>
          <Text>소켓 연결 끊기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => client.connect({ port: 3400, host: "175.126.232.72", timeout: 1000 })}>
          <Text>소켓 연결</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => client.write('test')}>
          <Text>소켓 전송</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => RNExitApp.exitApp()}>
          <Text>앱종료</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => new Player('bbibb3.mp3').play(err=>console.log(err))}>
          <Text>사운드 플레이</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => testModem()}>
          <Text>모뎀접속테스트</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </View>
  )
}

export default Test