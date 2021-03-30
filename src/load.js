import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { modemNumber, userNumber, fcmToken, isCarRace,voltValue, voltValueSC } from './atom/atoms'

import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app'


import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage';

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

const logo = require('../img/icarlogo.png')

const Load = () => {
  const navigation = useNavigation()

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@is_first')
      return value
    } catch (e) {
      console.log(e)
    }
  }

  const getmodem = async () => {
    try {
      const value = await AsyncStorage.getItem('@modem_N')
      return value
    } catch (e) {
      console.log(e)
    }
  }

  const getuser = async () => {
    try {
      const value = await AsyncStorage.getItem('@user_N')
      return value
    } catch (e) {
      console.log(e)
    }
  }

  const getcar = async () => {
    try {
      const value = await AsyncStorage.getItem('@car_Race')
      return value
    } catch (e) {
      console.log(e)
    }
  }

  const getLowVoltValue = async () => {
    try {
      const value = await AsyncStorage.getItem('@lowvolt_Value')
      return value
    } catch (e) {
      console.log(e)
    }
  }

  const [pushToken, setPushToken] = useRecoilState(fcmToken)
  const [atModemn, setAtModemn] = useRecoilState(modemNumber)
  const [atUserNumber, setatUserNumber] = useRecoilState(userNumber)
  const [atIsCarRace, setatIsCarRace] = useRecoilState(isCarRace)
  const [isAuthorized, setIsAuthorized] = useState(false)


  const [lowVoltValue,setLowVoltValue] = useRecoilState(voltValue)
  const [lowVoltValuesc,setLowVoltValuesc] = useRecoilState(voltValueSC)

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

  useEffect(() => {
    handlePushToken()
    saveDeviceToken()
  }, [])


  useEffect(() => {
    getData().then((res) => {
      if (res != null) {

        getmodem().then(res => setAtModemn(res))
        getuser().then(res => setatUserNumber(res))
        getcar().then(res => setatIsCarRace(res))
        
        getLowVoltValue().then(res => {
          if(res == '11.8'){
            setLowVoltValue('11.8')
            setLowVoltValuesc(5)
          }else if(res == '11.9'){
            setLowVoltValue('11.9')
            setLowVoltValuesc(80)
          }else if(res == '12.0'){
            setLowVoltValue('12.0')
            setLowVoltValuesc(151)
          }else if(res == '12.1'){
            setLowVoltValue('12.1')
            setLowVoltValuesc(220)
          }else if(res == '12.2'){
            setLowVoltValue('12.2')
            setLowVoltValuesc(292)
          }
        })

        setTimeout(() => {
          navigation.navigate('테스트')
          console.log('구사용자 : ' + res)
        }, 1000);
      } else {
        setTimeout(() => {
          navigation.navigate('테스트')
          console.log('첫사용자 : ' + res)
        }, 1000);
      }
    })
  }, [])



  return (
    <SafeAreaView>
      <View style={{ width: chwidth, height: chheight, justifyContent: "center", alignItems: "center" }}>
        <View style={{ flex: 3 }}></View>
        <View style={{ flex: 2 }}>
          <Image source={logo} style={{ maxWidth: chwidth / 1.5, maxHeight: chheight / 8 }}></Image>
        </View>
        <View style={{ flex: 2 }}></View>
        <View style={{ flex: 3 }}></View>
      </View>
    </SafeAreaView>
  )
}

export default Load