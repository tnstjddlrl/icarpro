import React, { useState, useEffect,useCallback } from 'react';
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
import { networkState,newState,fcmToken } from './atom/atoms'

import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app'


import {useNavigation} from '@react-navigation/native'

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
    } catch(e) {
      console.log(e)
    }
  }

  const [pushToken, setPushToken] = useRecoilState(fcmToken)
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
  },[])
  

  useEffect(() => {
   getData().then((res)=>{
     if(res!=null){
      setTimeout(() => {
        navigation.navigate('테스트')
        console.log('첫사용자')
      }, 1000);
     }else{
      setTimeout(() => {
        navigation.navigate('테스트')
        console.log('구사용자')
      }, 1000);
     }
   })
  },[])

  

  return(
    <SafeAreaView>
      <View style={{width:chwidth,height:chheight,justifyContent:"center",alignItems:"center"}}>
        <View style={{flex:3}}></View>
        <View style={{flex:2}}>
          <Image source={logo} style={{maxWidth:chwidth/1.5,maxHeight:chheight/8}}></Image>
        </View>
        <View style={{flex:2}}></View>
        <View style={{flex:3}}></View>
      </View>
    </SafeAreaView>
  )
}

export default Load