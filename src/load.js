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

import {
  modemNumber,
  userNumber,
  fcmToken,
  isCarRace,
  voltValue,
  voltValueSC,
  bootTimeValue,
  bootTimeValueSC,
  lastHeatTimeValue,
  lastHeatTimeValueSC,
  startTimeValue,
  startTimeValueSC,
  actionSound, alertSound, icarSwitch, idoorSwitch, lowvoltBoot, lowvoltAlert
} from './atom/atoms'

import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app'


import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import LastHeatTime from './TimeSet/lastHeatTime';

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
  const [atModemn, setAtModemn] = useRecoilState(modemNumber)
  const [atUserNumber, setatUserNumber] = useRecoilState(userNumber)
  const [atIsCarRace, setatIsCarRace] = useRecoilState(isCarRace)
  const [isAuthorized, setIsAuthorized] = useState(false)


  const [lowVoltValue, setLowVoltValue] = useRecoilState(voltValue)
  const [lowVoltValuesc, setLowVoltValuesc] = useRecoilState(voltValueSC)
  const [atbootTimeValue, setatBootTimeValue] = useRecoilState(bootTimeValue)
  const [atbootTimeValueSC, setatBootTimeValueSC] = useRecoilState(bootTimeValueSC)
  const [atLastHeatvalue, setAtLastHeatValue] = useRecoilState(lastHeatTimeValue)
  const [atLastHeatvalueSC, setAtLastHeatValueSC] = useRecoilState(lastHeatTimeValueSC)
  const [atStartTimeValue, setAtStartTimeValue] = useRecoilState(startTimeValue)
  const [atStartTimeValueSC, setAtStartTimeValueSC] = useRecoilState(startTimeValueSC)

  const [atIcarSwitch, setAticarswitch] = useRecoilState(icarSwitch)
  const [atidoorswitch, setAtidoorswitch] = useRecoilState(idoorSwitch)
  const [atlowvoltBoot, setAtlowvoltBoot] = useRecoilState(lowvoltBoot)
  const [atlowvoltAlert, setAtlowvoltAlert] = useRecoilState(lowvoltAlert)
  const [atactionSound, setAtactionSound] = useRecoilState(actionSound)
  const [atalertSound, setAtalertSound] = useRecoilState(alertSound)

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
          if (res == '11.8') {
            setLowVoltValue('11.8')
            setLowVoltValuesc(5)
          } else if (res == '11.9') {
            setLowVoltValue('11.9')
            setLowVoltValuesc(80)
          } else if (res == '12.0') {
            setLowVoltValue('12.0')
            setLowVoltValuesc(151)
          } else if (res == '12.1') {
            setLowVoltValue('12.1')
            setLowVoltValuesc(220)
          } else if (res == '12.2') {
            setLowVoltValue('12.2')
            setLowVoltValuesc(292)
          }
        })

        getBootTimeValue().then(res => {
          if (res == '3') {
            setatBootTimeValue('3')
            setatBootTimeValueSC(5)
          } else if (res == '5') {
            setatBootTimeValue('5')
            setatBootTimeValueSC(73)
          } else if (res == '10') {
            setatBootTimeValue('10')
            setatBootTimeValueSC(150)
          }
        })

        getLastHeatValue().then(res => {
          if (res == '1:30') {
            setAtLastHeatValue('1:30')
            setAtLastHeatValueSC(10)
          } else if (res == '3:00') {
            setAtLastHeatValue('3:00')
            setAtLastHeatValueSC(74)
          } else if (res == '5:00') {
            setAtLastHeatValue('5:00')
            setAtLastHeatValueSC(144)
          }
        })
        getStartTimeValue().then(res => {
          if (res == '1') {
            setAtStartTimeValue('1')
            setAtStartTimeValueSC(0)
          } else if (res == '2') {
            setAtStartTimeValue('2')
            setAtStartTimeValueSC(73)
          } else if (res == '3') {
            setAtStartTimeValue('3')
            setAtStartTimeValueSC(148)
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