import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Modal
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import client from './Client'

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { fcmToken, modemNumber, easyPWD } from './atom/atoms'

import RNRestart from 'react-native-restart';

import axios from 'axios'


const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height


const back = require('../img/backbtn.png')

const on = require('../img/pwd/on.png')
const ready = require('../img/pwd/ready.png')
const off = require('../img/pwd/off.png')



const Startpwd = ({ route }) => {
  const navigation = useNavigation()

  const [pwd, setpwd] = useState('')
  const inputRef = useRef()

  const [pushToken, setPushToken] = useRecoilState(fcmToken)
  const [atModemn, setAtModemn] = useRecoilState(modemNumber)

  const [atEasyPWD, setAtEasyPWD] = useRecoilState(easyPWD)

  const [saveModal, setSaveModal] = useState(false)

  console.log('간편 : ' + pushToken)

  useEffect(() => {
    inputRef.current.focus()
    client.on('data', function (data) {
      if ('' + data == 'pwd_suc') {
        setSaveModal(true)
        setTimeout(() => {
          setSaveModal(false)
        }, 2000);
      } else {
        //Alert.alert('비밀번호가 틀렸습니다.')
      }
      console.log('간편 비밀번호 내에서 받기 ' + data);
      // Alert.alert('서버에서 보내온 메시지 ', '' + data)
    });
  }, [])

  useEffect(() => {
    if (pwd.match(/^[0-9]+$/) == null && pwd != '') {
      Alert.alert('숫자만 입력가능합니다!')
      setpwd('')
    }
  }, [pwd])



  async function registerClick() {

    // console.log(pwd.length)


    if (pwd.length === 4) {
      if (atEasyPWD === pwd) {
        // Alert.alert('맞음!')
        navigation.navigate('차량제어')
      } else {
        Alert.alert('비밀번호 오류!')
      }

    } else {

      Alert.alert('4자리 모두 입력해주세요.')
      return;

    }


  }


  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={{ width: chwidth, height: chheight }}>
        {/* 헤더 */}
        <View style={{ flex: 0.8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
          <TouchableWithoutFeedback onPress={() => { }}>
            <View style={{ width: 30 }}>

            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.maintxt}>i도어 비밀번호</Text>
          <TouchableWithoutFeedback onPress={() => registerClick()}>
            <Text style={styles.savetxt}>인증</Text>
          </TouchableWithoutFeedback>
        </View>
        {/* 헤더 끝 */}

        {/* 본문 */}
        <View style={{ flex: 10 }}>

          <View style={{ flex: 2.5, justifyContent: 'flex-end', alignItems: "center" }}>
            <Text style={styles.title}>비밀번호 인증</Text>
            <Text style={styles.sub}>비밀번호 네자리를 입력하세요</Text>
          </View>

          <View style={{ flex: 2, alignItems: "center" }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 80, height: 50 }}>

              {(pwd.length != 0) ? <Image source={on} style={{ marginRight: 12 }}></Image> : <Image source={ready} style={{ marginRight: 12 }}></Image>}

              {pwd.length == 0 && <Image source={off} style={{ marginRight: 12 }}></Image>}
              {(pwd.length == 1) && <Image source={ready} style={{ marginRight: 12 }}></Image>}
              {(pwd.length >= 2) && <Image source={on} style={{ marginRight: 12 }}></Image>}

              {pwd.length < 2 && <Image source={off} style={{ marginRight: 12 }}></Image>}
              {(pwd.length == 2) && <Image source={ready} style={{ marginRight: 12 }}></Image>}
              {(pwd.length >= 3) && <Image source={on} style={{ marginRight: 12 }}></Image>}

              {pwd.length < 3 && <Image source={off}></Image>}
              {(pwd.length == 3) && <Image source={ready}></Image>}
              {(pwd.length >= 4) && <Image source={on}></Image>}

            </View>
          </View>

          <View style={{ flex: 4 }}>

          </View>

        </View>
        {/* 본문 끝 */}
      </View>
      <TextInput style={{ position: 'absolute', width: chwidth, height: chheight * 4, marginTop: 120 }} keyboardType={'number-pad'}
        onChangeText={(txt) => setpwd(txt)} value={pwd} maxLength={4} ref={inputRef}
      ></TextInput>

      <Modal visible={saveModal} transparent={true} animationType={'fade'}>
        <SafeAreaView style={{ width: chwidth, height: chheight, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: chwidth - 80, height: 80, backgroundColor: 'white', marginTop: -300, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.modaltxt}>설정한 내용이 저장되었습니다.</Text>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  maintxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.24,
    color: "#393e46"
  },
  savetxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 17,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "right",
    color: "#f75929"
  },
  title: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.29,
    textAlign: "center",
    color: "#393e46"
  },
  sub: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 15,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: 'rgb(68,73,80)',
    marginTop: 16
  },
  modaltxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "black",
    width: chwidth - 80,
    textAlign: 'center'
  },
})

export default Startpwd