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
  SafeAreaView,
  Vibration
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
} from '@react-native-community/audio-toolkit';

import { modemNumber, userNumber, fcmToken, isCarRace, bootRestTime } from './atom/atoms'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';

import RNExitApp from 'react-native-kill-app';


import Toast from 'react-native-toast-message';
import client from './Client.js'
import moduleclient from './ModuleClient'


const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height


import TcpSocket from 'react-native-tcp-socket';

function testModem(modem) {
  var txt = { type: "R", type_sub: "conntest",data: { modem : modem } }
  txt = JSON.stringify(txt)

  client.write(txt)
  Alert.alert('전송 : ' + txt)
}

client.on('data',function(data){
  console.log('테스트에서 데이터 받기 : ' + data)
  // console.log(data)
  var ee = ''+data
  if(ee == '송신 완료'){
    Alert.alert('송신완료! 서버와 이중 연결 성공')
  }else{
    ee = ee.replace(/'/gi,"").split(',')

  if(ee[0].split(':')[0] == 'conn_ip'){
    var port = Number(ee[1].split(':')[1])
    console.log(port)
    console.log(ee[0].split(':')[1])

    // const moduleclient = TcpSocket.createConnection({ port: port, host: ee[0].split(':')[1], timeout: 1000 }, () => {
    //   console.log('모듈연결됨')
    //   Alert.alert('모듈 연결되었습니다.')
    //   moduleclient.write('hello, module?')
    // });
    moduleclient.connect({ port: port, host: ee[0].split(':')[1]},()=>{
      Alert.alert('모듈과 연결됨')
      moduleclient.write('test conntest2.');
      // client.write(JSON.stringify({ type: "R", type_sub: "conntest2" }))
      // Alert.alert('서버에 conntest2 전송')
      // moduleclient.destroy()
    })
  }
  }
})







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
        <Text style={{fontFamily:'AppleSDGothicNeo-Medium'}}>아이카</Text>
        <TouchableOpacity onPress={() => navigation.navigate('간편비밀번호')}>
          <Text style={{fontSize:25,margin:10}}>간편비밀번호</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('차량등록')}>
          <Text style={{fontSize:25,margin:10}}>차량등록</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('차량제어')}>
          <Text style={{fontSize:25,margin:10}}>차량제어</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('차량상태')}>
          <Text style={{fontSize:25,margin:10}}>차량상태</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate('스와이프테스트')}>
          <Text style={{fontSize:25,margin:10}}>스와이프테스트</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate('설정')}>
          <Text style={{fontSize:25,margin:10}}>설정</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate('스크롤베이스')}>
          <Text style={{fontSize:25,margin:10}}>스크롤베이스</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => {AsyncStorage.setItem("@is_first",'notfirst'),console.log('어싱크 테스트')}}>
        <Text>어싱크 테스트</Text>
      </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => client.destroy()}>
          <Text style={{fontSize:25,margin:10}}>소켓 연결 끊기</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => client.connect({ port: 3400, host: "175.126.232.72", timeout: 1000 })}>
          <Text style={{fontSize:25,margin:10}}>소켓 연결</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => client.write('test')}>
          <Text style={{fontSize:25,margin:10}}>소켓 전송</Text>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => RNExitApp.exitApp()}>
          <Text style={{fontSize:25,margin:10}}>앱종료</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => new Player('bbibb3.mp3').play(err=>console.log(err))}>
          <Text style={{fontSize:25,margin:10}}>사운드 플레이</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={() => Vibration.vibrate(1000)}>
          <Text style={{fontSize:25,margin:10}}>진동 테스트</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={() => testModem(state)}>
          <Text style={{fontSize:25,margin:10}}>모뎀접속테스트</Text>
        </TouchableOpacity> */}

      </SafeAreaView>
    </View>
  )
}

export default Test