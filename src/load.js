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
  certifyState,
  AppLocalClientPort,
  AppLocalClientAddress,
  AllState_app,
  usercarNum,
  easyPWD,
  easyPWDIsOn,
} from './atom/atoms'

import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app'
import client from './Client'

import AutoHeightImage from 'react-native-auto-height-image';


import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import RNExitApp from 'react-native-kill-app';
import RNRestart from 'react-native-restart';

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

const logo = require('../img/icarlogo.png')

var ispwd = false

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

  const getcarnum = async () => {
    try {
      const value = await AsyncStorage.getItem('@car_Number')
      return value
    } catch (e) {
      console.log(e)
    }
  }

  const geteasyPWD = async () => {
    try {
      const value = await AsyncStorage.getItem('@easy_PWD')
      return value
    } catch (e) {
      console.log(e)
    }
  }

  const geteasyPWDIsOn = async () => {
    try {
      const value = await AsyncStorage.getItem('@easy_PWD_IsOn')
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

  const [atmodemn, setAtModemn] = useRecoilState(modemNumber)
  const [, setatUserNumber] = useRecoilState(userNumber)
  const [, setatIsCarRace] = useRecoilState(isCarRace)

  const [atCertifyState, setAtCertifyState] = useRecoilState(certifyState)



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

  const [atLocalClientPort, setatLocalClientPort] = useRecoilState(AppLocalClientPort)
  const [atLocalClientAddress, setatLocalClientAddress] = useRecoilState(AppLocalClientAddress)

  const [atStateCarAlert, setAtStateCarAlert] = useRecoilState(StateCarAlert)
  const [atStateDoorLock, setAtStateDoorLock] = useRecoilState(StateDoorLock)
  const [atStateDoor, setAtStateDoor] = useRecoilState(StateDoor)
  const [atStateTrunk, setAtStateTrunk] = useRecoilState(StateTrunk)
  const [atStateEngineHood, setAtStateEngineHood] = useRecoilState(StateEngineHood)
  const [atStateEngineState, setAtStateEngineState] = useRecoilState(StateEngineState)
  const [atStateCarVolt, setAtStateCarVolt] = useRecoilState(StateCarVolt)
  const [atUserCarNum, setAtUserCarNum] = useRecoilState(usercarNum)
  const [atEasyPWD, setAtEasyPWD] = useRecoilState(easyPWD)
  const [atEasyPWDIsOn, setAtEasyPWDIsOn] = useRecoilState(easyPWDIsOn)

  const [AllStateApp, setAllStateApp] = useRecoilState(AllState_app)

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
    try {
      handlePushToken()
      saveDeviceToken()
    } catch (error) {
      console.log(error)
      Alert.alert('토큰 받아오기 실패')
    } // 토큰 받아오기

    let modemm
    getmodem().then(res => modemm = res)
    client.on('data', function (data) {


      var command = '' + data
      console.log(command.split('/')[0])
      console.log(modemm)

      setAllStateApp(command)

      if ('' + data === 'no_cer') {
        setAtCertifyState('no_certification')

        Alert.alert('미인증 상태입니다.', '인증을 진행해주세요',
          [{ text: "OK", onPress: () => navigation.navigate('차량등록') }])
      } else if ('' + data === 'no_modem_conn') {

        Alert.alert('모뎀 접속중입니다.', '잠시후 진행해주세요')

      } else if ('' + data === 'no_user') {

        setAtCertifyState('no_user')

      } else if ('' + data === 'no_state') {

        setAtCertifyState('no_state')

      } else if (modemm == command.split('/')[0] || atmodemn == command.split('/')[0] || command.split('/')[0].length === 11) {
        setAtCertifyState('good')

        if (command.split('/')[1][2] === 'i') {
          setAtStateCarAlert('ON')
          console.log('경계온ok')
        } else if (command.split('/')[1][2] === 'o') {
          setAtStateCarAlert('OFF')
          console.log('경계오프ok')
        }

        if (command.split('/')[1][3] === 'i') {
          setAtStateEngineState('ON')
          console.log('엔진온ok')
        } else if (command.split('/')[1][3] === 'o') {
          setAtStateEngineState('OFF')
          console.log('엔진오프ok')
        }

        //차량 전압
        setAtStateCarVolt(command.split('/')[1][7] + command.split('/')[1][8] + '.' + command.split('/')[1][9])

        //도어 열림 상태
        if (command.split('/')[2][2] === 'o' && command.split('/')[2][3] === 'o' && command.split('/')[2][4] === 'o' && command.split('/')[2][5] === 'o') {
          setAtStateDoor('OFF')
          console.log('도어오프ok')
        } else {
          setAtStateDoor('ON')
          console.log('도어온ok')
        }

        //트렁크 상태
        if (command.split('/')[2][6] === 'i') {
          setAtStateTrunk('ON')
          console.log('트렁크온ok')
        } else if (command.split('/')[2][6] === 'o') {
          setAtStateTrunk('OFF')
          console.log('트렁크오프ok')
        }

        //후드 상태
        if (command.split('/')[2][7] === 'i') {
          setAtStateEngineHood('ON')
          console.log('후드온ok')
        } else if (command.split('/')[2][7] === 'o') {
          setAtStateEngineHood('OFF')
          console.log('후드오프ok')
        }

        //도어락 상태
        if (command.split('/')[3][2] === 'i' && command.split('/')[3][3] === 'i' && command.split('/')[3][4] === 'i' && command.split('/')[3][5] === 'i') {
          setAtStateDoorLock('ON')
          console.log('도어락온ok')
        } else {
          setAtStateDoorLock('OFF')
          console.log('도어락오프ok')
        }

        if (command.split('/')[5][2] === 'i') {
          setAticarswitch(true)
          console.log('아이카온ok')
        } else if (command.split('/')[5][2] === 'o') {
          setAticarswitch(false)
          console.log('아이카오프')
        }

        if (command.split('/')[5][3] === 'i') {
          setAtidoorswitch(true)
          console.log('아이도어온')
        } else if (command.split('/')[5][3] === 'o') {
          setAtidoorswitch(false)
          console.log('아이도어오프')
        }

        if (command.split('/')[5][10] === 'i') {
          setAtlowvoltAlert(true)
          console.log('저전압알람온')
        } else if (command.split('/')[5][10] === 'o') {
          setAtlowvoltAlert(false)
          console.log('저전압알람오프')
        }

        if (command.split('/')[5][11] === 'i') {
          setAtlowvoltBoot(true)
          console.log('저전압시동온')
        } else if (command.split('/')[5][11] === 'o') {
          setAtlowvoltBoot(false)
          console.log('저전압시동오프')
        }

        if (command.split('/')[5][8] === 'i') {
          setAtactionSound(true)
          console.log('동작음온')
        } else if (command.split('/')[5][8] === 'o') {
          setAtactionSound(false)
          console.log('동작음오프')
        }

        if (command.split('/')[5][9] === 'i') {
          setAtalertSound(true)
          console.log('경계음온')
        } else if (command.split('/')[5][9] === 'o') {
          setAtalertSound(false)
          console.log('경계음오프')
        }

        if (command.split('/')[5][15] === '0') {
          setatBootTimeValue('3')
          console.log('원격시간0')
        } else if (command.split('/')[5][15] === '1') {
          setatBootTimeValue('5')
          console.log('원격시간1')
        } else if (command.split('/')[5][15] === '2') {
          setatBootTimeValue('10')
          console.log('원격시간2')
        }

        if (command.split('/')[5][16] === '0') {
          setAtLastHeatValue('1')
          console.log('후열시간0')
        } else if (command.split('/')[5][16] === '1') {
          setAtLastHeatValue('3')
          console.log('후열시간1')
        } else if (command.split('/')[5][16] === '2') {
          setAtLastHeatValue('5')
          console.log('후열시간2')
        }

        if (command.split('/')[5][17] === '0') {
          setAtStartTimeValue('1')
          console.log('스타트시간0')
        } else if (command.split('/')[5][17] === '1') {
          setAtStartTimeValue('2')
          console.log('스타트시간1')
        } else if (command.split('/')[5][17] === '2') {
          setAtStartTimeValue('3')
          console.log('스타트시간2')
        }

        setLowVoltValue(command.split('/')[5][12] + command.split('/')[5][13] + '.' + command.split('/')[5][14])


      }
      console.log('로드 상태에서 데이터 받기 :' + data)
    })

  }, [])


  useEffect(() => {
    try {
      getData().then((res) => {
        if (res != null) {

          // getIcarSwitch().then(res => { if (res !== null) setAticarswitch(JSON.parse(res)) })
          // getidoorswitch().then(res => { if (res !== null) setAtidoorswitch(JSON.parse(res)) })
          // getlowboltBoot().then(res => { if (res !== null) setAtlowvoltBoot(JSON.parse(res)) })
          // getlowboltAlert().then(res => { if (res !== null) setAtlowvoltAlert(JSON.parse(res)) })
          // getactionsound().then(res => { if (res !== null) setAtactionSound(JSON.parse(res)) })
          // getalertsound().then(res => { if (res !== null) setAtalertSound(JSON.parse(res)) })


          getmodem().then(res => { setAtModemn(res), console.log('모뎀번호 가져오기:' + atmodemn == null) })
          getuser().then(res => setatUserNumber(res))
          getcar().then(res => setatIsCarRace(res))
          getcarnum().then(res => setAtUserCarNum(res))
          geteasyPWD().then(res => setAtEasyPWD(res))
          geteasyPWDIsOn().then(res => {
            if (res !== null) {
              setAtEasyPWDIsOn(JSON.parse(res));
              ispwd = JSON.parse(res)
            }
            else {
              setAtEasyPWDIsOn(false)
              ispwd = false
            }
          })

          // getLowVoltValue().then(res => {
          //   if (res !== null) {
          //     setLowVoltValue(res)
          //   }
          // })

          // getBootTimeValue().then(res => {
          //   if (res !== null) {
          //     setatBootTimeValue(res)
          //   }
          // })

          // getLastHeatValue().then(res => {
          //   if (res !== null) {
          //     setAtLastHeatValue(res)
          //   }
          // })
          // getStartTimeValue().then(res => {
          //   if (res !== null) {
          //     setAtStartTimeValue(res)
          //   }
          // })

          setTimeout(() => {
            setLoadbarwd(30)
            setTimeout(() => {
              setLoadbarwd(60)
              getmodem().then(res => { setAtModemn(res), console.log('모뎀번호 가져오기:' + atmodemn == null) })
              getuser().then(res => setatUserNumber(res))
              getcar().then(res => setatIsCarRace(res))
              setTimeout(() => {
                setLoadbarwd(90)
                setTimeout(() => {
                  setLoadbarwd(120)
                  setTimeout(() => {
                    setLoadbarwd(160)
                    setTimeout(() => {
                      setatLocalClientPort(client.localPort)
                      console.log('로컬포트 : ' + client.localPort)
                      setatLocalClientAddress(client.localAddress)
                      console.log('로컬어드레스 : ' + client.localAddress)
                      setLoadbarwd(183)
                      setTimeout(() => {
                        console.log('구사용자 : ' + res)

                        if (ispwd === true) {
                          navigation.navigate('비밀번호인증')
                        } else {
                          console.log('?????????? ' + ispwd)
                          navigation.navigate('차량제어')
                        }
                      }, 500);
                    }, 250);
                  }, 250);
                }, 250);
              }, 250);
            }, 250);
          }, 250);


          // setTimeout(() => {
          //   navigation.navigate('테스트')
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
                      setatLocalClientPort(client.localPort)
                      console.log('로컬포트 : ' + client.localPort)
                      setatLocalClientAddress(client.localAddress)
                      console.log('로컬어드레스 : ' + client.localAddress)
                      setLoadbarwd(183)
                      setAtCertifyState('no_user')
                      setTimeout(() => {
                        console.log('첫사용자 : ' + res)
                        navigation.navigate('차량등록')
                      }, 500);
                    }, 250);
                  }, 250);
                }, 250);
              }, 250);
            }, 250);
          }, 250);


          // setTimeout(() => {
          //   navigation.navigate('테스트')
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