import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';

import {
  useRecoilState,
} from 'recoil';

import {
  modemNumber,
  userNumber,
  fcmToken,
  isCarRace,
  voltValue,
  bootTimeValue,
  lastHeatTimeValue,
  startTimeValue,
  actionSound, alertSound, icarSwitch, idoorSwitch, lowvoltBoot, lowvoltAlert
} from './atom/atoms'

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

  const getBootTimeValue = async () => {
    try {
      const value = await AsyncStorage.getItem('@bootTime_Value')
      return value
    } catch (e) {
      console.log(e)
    }
  }
  const getLastHeatValue = async () => {
    try {
      const value = await AsyncStorage.getItem('@lastHeat_value')
      return value
    } catch (e) {
      console.log(e)
    }
  }
  const getStartTimeValue = async () => {
    try {
      const value = await AsyncStorage.getItem('@startTime_value')
      return value
    } catch (e) {
      console.log(e)
    }
  }

  const getIcarSwitch = async () => {
    try {
      const value = await AsyncStorage.getItem('@icarswitch')
      return value
    } catch (e) {
      console.log(e)
    }
  }
  const getidoorswitch = async () => {
    try {
      const value = await AsyncStorage.getItem('@idoorswitch')
      return value
    } catch (e) {
      console.log(e)
    }
  }
  const getlowboltBoot = async () => {
    try {
      const value = await AsyncStorage.getItem('@lowboltBoot')
      return value
    } catch (e) {
      console.log(e)
    }
  }
  const getlowboltAlert = async () => {
    try {
      const value = await AsyncStorage.getItem('@lowboltAlert')
      return value
    } catch (e) {
      console.log(e)
    }
  }
  const getactionsound = async () => {
    try {
      const value = await AsyncStorage.getItem('@actionsound')
      return value
    } catch (e) {
      console.log(e)
    }
  }
  const getalertsound = async () => {
    try {
      const value = await AsyncStorage.getItem('@alertsound')
      return value
    } catch (e) {
      console.log(e)
    }
  }


  const [pushToken, setPushToken] = useRecoilState(fcmToken)
  const [, setAtModemn] = useRecoilState(modemNumber)
  const [, setatUserNumber] = useRecoilState(userNumber)
  const [, setatIsCarRace] = useRecoilState(isCarRace)
  const [isAuthorized, setIsAuthorized] = useState(false)


  const [, setLowVoltValue] = useRecoilState(voltValue)
  const [, setatBootTimeValue] = useRecoilState(bootTimeValue)
  const [, setAtLastHeatValue] = useRecoilState(lastHeatTimeValue)
  const [, setAtStartTimeValue] = useRecoilState(startTimeValue)

  const [, setAticarswitch] = useRecoilState(icarSwitch)
  const [, setAtidoorswitch] = useRecoilState(idoorSwitch)
  const [, setAtlowvoltBoot] = useRecoilState(lowvoltBoot)
  const [, setAtlowvoltAlert] = useRecoilState(lowvoltAlert)
  const [, setAtactionSound] = useRecoilState(actionSound)
  const [, setAtalertSound] = useRecoilState(alertSound)

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

        getIcarSwitch().then(res => { if (res !== null) setAticarswitch(JSON.parse(res)) })
        getidoorswitch().then(res => { if (res !== null) setAtidoorswitch(JSON.parse(res)) })
        getlowboltBoot().then(res => { if (res !== null) setAtlowvoltBoot(JSON.parse(res)) })
        getlowboltAlert().then(res => { if (res !== null) setAtlowvoltAlert(JSON.parse(res)) })
        getactionsound().then(res => { if (res !== null) setAtactionSound(JSON.parse(res)) })
        getalertsound().then(res => { if (res !== null) setAtalertSound(JSON.parse(res)) })


        getmodem().then(res => setAtModemn(res))
        getuser().then(res => setatUserNumber(res))
        getcar().then(res => setatIsCarRace(res))

        getLowVoltValue().then(res => {
          if (res !== null) {
            setLowVoltValue(res)
          }
        })

        getBootTimeValue().then(res => {
          if (res !== null) {
            setatBootTimeValue(res)
          }
        })

        getLastHeatValue().then(res => {
          if (res !== null) {
            setAtLastHeatValue(res)
          }
        })
        getStartTimeValue().then(res => {
          if (res !== null) {
            setAtStartTimeValue(res)
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