import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Dimensions,
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  Alert
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
  actionSound, alertSound, icarSwitch, idoorSwitch, lowvoltBoot, lowvoltAlert,
  StateCarAlert,
  StateDoorLock,
  StateDoor,
  StateTrunk,
  StateEngineHood,
  StateEngineState,
  StateCarVolt,
} from './atom/atoms'

import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app'
import client from './Client'

import AutoHeightImage from 'react-native-auto-height-image';


import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import RNExitApp from 'react-native-kill-app';

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

  const [loadbarwd, setLoadbarwd] = useState(10)


  const [pushToken, setPushToken] = useRecoilState(fcmToken)
  const [isAuthorized, setIsAuthorized] = useState(false)


  const [, setAtModemn] = useRecoilState(modemNumber)
  const [, setatUserNumber] = useRecoilState(userNumber)
  const [, setatIsCarRace] = useRecoilState(isCarRace)
  


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

  const [atStateCarAlert, setAtStateCarAlert] = useRecoilState(StateCarAlert)
  const [atStateDoorLock, setAtStateDoorLock] = useRecoilState(StateDoorLock)
  const [atStateDoor, setAtStateDoor] = useRecoilState(StateDoor)
  const [atStateTrunk, setAtStateTrunk] = useRecoilState(StateTrunk)
  const [atStateEngineHood, setAtStateEngineHood] = useRecoilState(StateEngineHood)
  const [atStateEngineState, setAtStateEngineState] = useRecoilState(StateEngineState)
  const [atStateCarVolt, setAtStateCarVolt] = useRecoilState(StateCarVolt)

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

  function registerClick() {
    try {
      var txt = { type: "R", type_sub: "req_state", data: { token: pushToken } }
      txt = JSON.stringify(txt)

      client.write(txt)
      console.log('?????? : ' + txt)

    } catch (e) {
      console.log(e)
      client.destroy()
      client.connect({ port: 3400, host: '175.126.232.72' })
      // registerClick()
    }
  }


  useEffect(() => {
    try {
      handlePushToken()
      saveDeviceToken()
      console.log('?????? ????????????')
    } catch (error) {
      console.log(error)
      Alert.alert('?????? ???????????? ??????')
    } // ?????? ????????????


    client.on('data', function (data) {
      if(''+data === 'no_certification'){
        Alert.alert('????????? ???????????????.','????????? ??????????????????')
      }else if(''+data === 'no_state'){
        Alert.alert('???????????? ????????????.','????????? ??????????????????')
      }else{
        var command = ''+data

        if (command.split('/')[1][3] === 'i') {
          setAtStateCarAlert('ON')
          console.log('?????????ok')
        } else if (command.split('/')[1][3] === 'o') {
          setAtStateCarAlert('OFF')
          console.log('????????????ok')
        }

        if (command.split('/')[1][2] === 'i') {
          setAtStateEngineState('ON')
          console.log('?????????ok')
        } else if (command.split('/')[1][2] === 'o') {
          setAtStateEngineState('OFF')
          console.log('????????????ok')
        }
    
        //?????? ??????
        setAtStateCarVolt(command.split('/')[1][7] + command.split('/')[1][8] + '.' + command.split('/')[1][9])
    
        //?????? ?????? ??????
        if (command.split('/')[2][2] === 'o' && command.split('/')[2][3] === 'o' && command.split('/')[2][4] === 'o' && command.split('/')[2][5] === 'o') {
          setAtStateDoor('OFF')
          console.log('????????????ok')
        } else {
          setAtStateDoor('ON')
          console.log('?????????ok')
        }
    
        //????????? ??????
        if (command.split('/')[2][6] === 'i') {
          setAtStateTrunk('ON')
          console.log('????????????ok')
        } else if (command.split('/')[2][6] === 'o') {
          setAtStateTrunk('OFF')
          console.log('???????????????ok')
        }
    
        //?????? ??????
        if (command.split('/')[2][7] === 'i') {
          setAtStateEngineHood('ON')
          console.log('?????????ok')
        } else if (command.split('/')[2][7] === 'o') {
          setAtStateEngineHood('OFF')
          console.log('????????????ok')
        }
    
        //????????? ??????
        if (command.split('/')[3][2] === 'i' && command.split('/')[3][3] === 'i' && command.split('/')[3][4] === 'i' && command.split('/')[3][5] === 'i') {
          setAtStateDoorLock('ON')
          console.log('????????????ok')
        } else {
          setAtStateDoorLock('OFF')
          console.log('???????????????ok')
        }

        if (command.split('/')[5][2] === 'i') {
          setAticarswitch(true)
          console.log('????????????ok')
        } else if (command.split('/')[5][2] === 'o') {
          setAticarswitch(false)
          console.log('???????????????')
        }

        if (command.split('/')[5][3] === 'i') {
          setAtidoorswitch(true)
          console.log('???????????????')
        } else if (command.split('/')[5][3] === 'o') {
          setAtidoorswitch(false)
          console.log('??????????????????')
        }

        if (command.split('/')[5][10] === 'i') {
          setAtlowvoltAlert(true)
          console.log('??????????????????')
        } else if (command.split('/')[5][10] === 'o') {
          setAtlowvoltAlert(false)
          console.log('?????????????????????')
        }

        if (command.split('/')[5][11] === 'i') {
          setAtlowvoltBoot(true)
          console.log('??????????????????')
        } else if (command.split('/')[5][11] === 'o') {
          setAtlowvoltBoot(false)
          console.log('?????????????????????')
        }

        if (command.split('/')[5][8] === 'i') {
          setAtactionSound(true)
          console.log('????????????')
        } else if (command.split('/')[5][8] === 'o') {
          setAtactionSound(false)
          console.log('???????????????')
        }

        if (command.split('/')[5][9] === 'i') {
          setAtalertSound(true)
          console.log('????????????')
        } else if (command.split('/')[5][9] === 'o') {
          setAtalertSound(false)
          console.log('???????????????')
        }

        if (command.split('/')[5][15] === '0') {
          setatBootTimeValue('3')
          console.log('????????????0')
        } else if (command.split('/')[5][15] === '1') {
          setatBootTimeValue('5')
          console.log('????????????1')
        } else if (command.split('/')[5][15] === '2') {
          setatBootTimeValue('10')
          console.log('????????????2')
        }

        if (command.split('/')[5][16] === '0') {
          setAtLastHeatValue('1')
          console.log('????????????0')
        } else if (command.split('/')[5][16] === '1') {
          setAtLastHeatValue('3')
          console.log('????????????1')
        } else if (command.split('/')[5][16] === '2') {
          setAtLastHeatValue('5')
          console.log('????????????2')
        }

        if (command.split('/')[5][17] === '0') {
          setAtStartTimeValue('1')
          console.log('???????????????0')
        } else if (command.split('/')[5][17] === '1') {
          setAtStartTimeValue('2')
          console.log('???????????????1')
        } else if (command.split('/')[5][17] === '2') {
          setAtStartTimeValue('3')
          console.log('???????????????2')
        }

        setLowVoltValue(command.split('/')[5][12]+command.split('/')[5][13]+'.'+command.split('/')[5][14])
        

      }
      console.log('?????? ???????????? ????????? ?????? :'+data)
    })


    try {
      getData().then((res) => {
        if (res != null) {

          getmodem().then(res => setAtModemn(res))
          getuser().then(res => setatUserNumber(res))
          getcar().then(res => setatIsCarRace(res))


          setTimeout(() => {
            setLoadbarwd(30)
            registerClick()
            setTimeout(() => {
              setLoadbarwd(60)
              setTimeout(() => {
                setLoadbarwd(90)
                setTimeout(() => {
                  setLoadbarwd(120)
                  setTimeout(() => {
                    setLoadbarwd(160)
                    setTimeout(() => {
                      setLoadbarwd(183)
                      setTimeout(() => {
                        console.log('???????????? : ' + res)
                        navigation.navigate('????????????')
                      }, 500);
                    }, 250);
                  }, 250);
                }, 250);
              }, 250);
            }, 250);
          }, 250);


          // setTimeout(() => {
          //   navigation.navigate('?????????')
          //   
          // }, 1000);
        } else {
          setTimeout(() => {
            setLoadbarwd(30)
            setTimeout(() => {
              setLoadbarwd(60)
              setTimeout(() => {
                setLoadbarwd(90)
                setTimeout(() => {
                  setLoadbarwd(120)
                  setTimeout(() => {
                    setLoadbarwd(160)
                    setTimeout(() => {
                      setLoadbarwd(183)
                      setTimeout(() => {
                        console.log('???????????? : ' + res)
                        navigation.navigate('????????????')
                      }, 500);
                    }, 250);
                  }, 250);
                }, 250);
              }, 250);
            }, 250);
          }, 250);


          // setTimeout(() => {
          //   navigation.navigate('?????????')
          //   
          // }, 1000);
        }
      })
    } catch (error) {
      console.log(error)
      Alert.alert('async stroage error')
      RNExitApp()
    }


  }, [])




  return (
    <SafeAreaView>
      <View style={{ width: chwidth, height: chheight, justifyContent: "center", alignItems: "center" }}>
        <View style={{ flex: 3 }}></View>
        <View style={{ flex: 3, justifyContent: "space-between", alignItems: "center" }}>
          <AutoHeightImage source={logo} width={chwidth / 1.7}></AutoHeightImage>
          <View>
            <View style={styles.loding}>
              <View style={{
                width: loadbarwd,
                height: 8,
                borderRadius: 6,
                backgroundColor: 'rgb(78,83,90)'
              }}></View>
            </View>
            <Text style={styles.lodingtxt}>Loading...</Text>
          </View>
        </View>
        <View style={{ flex: 2 }}></View>
        <View style={{ flex: 3 }}></View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loding: {
    width: 184,
    height: 8,
    borderRadius: 6,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: 'rgb(78,83,90)'
  },
  lodingtxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: 'rgb(78,83,90)',
    marginTop: 10
  }
})

export default Load