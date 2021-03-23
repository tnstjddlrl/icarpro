import React, { useState, useEffect, useRef,useCallback } from 'react';
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
  StyleSheet
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app'

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height


const back = require('../img/backbtn.png')

const on = require('../img/pwd/on.png')
const ready = require('../img/pwd/ready.png')
const off = require('../img/pwd/off.png')

const CarState = () => {
  const navigation = useNavigation()

  const [pwd, setpwd] = useState('')
  const inputRef = useRef(<TextInput></TextInput>)

  const [pushToken, setPushToken] = useState(null)
  const [isAuthorized, setIsAuthorized] = useState(false)

  const handlePushToken = useCallback(async () => {
    const enabled = await messaging().hasPermission()
    if (enabled) {
      const fcmToken = await messaging().getToken()
      if (fcmToken) setPushToken(fcmToken)
    } else {
      const authorized = await messaging.requestPermission()
      if (authorized) setIsAuthorized(true)
    }
  }, [])

  const saveTokenToDatabase = useCallback(async (token) => {
    const { error } = await setFcmToken(token)
    if (error) throw Error(error)
  }, [])

  const saveDeviceToken = useCallback(async () => {
    if (isAuthorized) {
      const currentFcmToken = await firebase.messaging().getToken()
      if (currentFcmToken !== pushToken) {
        return saveTokenToDatabase(currentFcmToken)
      }
      return messaging().onTokenRefresh((token) => saveTokenToDatabase(token))
    }
  }, [pushToken, isAuthorized])

  useEffect(()=>{
    handlePushToken()
    saveDeviceToken()
    inputRef.current.focus()
  },[])

  useEffect(()=>{
    if(pwd.match(/^[0-9]+$/) == null && pwd !=''){
      Alert.alert('숫자만 입력가능합니다!')
      setpwd('')
    }
  },[pwd])

  function registerClick() {
    var txt = {type:"R",type_sub:"easyPwd", data : {pwd : pwd}}
    
    var res = client(txt)
    
    console.log(res)


    if(res == 'ok'){
      Alert.alert('등록되었습니다.')
    }else{

    }
    
  }
  

  console.log(pwd)
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={{ width: chwidth, height: chheight }}>
        {/* 헤더 */}
        <View style={{ flex: 0.8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
          <View>
            <Image source={back}></Image>
          </View>
          </TouchableOpacity>
          <Text style={styles.maintxt}>i도어 비밀번호</Text>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Text style={styles.savetxt}>저장</Text>
          </TouchableOpacity>
        </View>
        {/* 헤더 끝 */}

        {/* 본문 */}
        <View style={{ flex: 10 }}>

          <View style={{ flex: 2.5, justifyContent: 'flex-end', alignItems: "center" }}>
            <Text style={styles.title}>비밀번호 등록</Text>
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
      <TextInput style={{ position: 'absolute', width: chwidth, height: chheight * 4,marginTop:60 }} keyboardType={'number-pad'}
        onChangeText={(txt) => setpwd(txt)} value={pwd} maxLength={4} ref={inputRef}
      ></TextInput>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  maintxt: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.24,
    color: "#393e46"
  },
  savetxt: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 17,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "right",
    color: "#f75929"
  },
  title: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.29,
    textAlign: "center",
    color: "#393e46"
  },
  sub: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 15,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: 'rgb(68,73,80)',
    marginTop: 16
  }
})

export default CarState