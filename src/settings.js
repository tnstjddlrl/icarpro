import React, { useState, useEffect } from 'react';
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
  Switch,
  ScrollView,
  Modal
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ToggleSwitch from 'toggle-switch-react-native'


import client from './Client';

import {
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {
  fcmToken,
  actionSound,
  alertSound,
  icarSwitch,
  idoorSwitch,
  lowvoltBoot,
  lowvoltAlert,
  settingLimit,
  modemNumber,
  userNumber,
  stateWaitTime,
  certifyState,
  isBootOn,
  bootRestTime,
  voltValue,
  bootTimeValue,
  lastHeatTimeValue,
  startTimeValue,
  AppLocalClientPort,
  AppLocalClientAddress,
  StateCarAlert,
  StateDoorLock,
  StateDoor,
  StateTrunk,
  StateEngineHood,
  StateEngineState,
  StateCarVolt
} from './atom/atoms'

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

import axios from 'axios';



const back = require('../img/backbtn.png')
const icarIcon = require('../img/setImg/icarIcon.png')
const carhitIcon = require('../img/setImg/carhitIcon.png')
const coliIcon = require('../img/setImg/coliIcon.png')
const idoorIcon = require('../img/setImg/idoorIcon.png')
const lockIcon = require('../img/setImg/lockIcon.png')
const powerIcon = require('../img/setImg/powerIcon.png')
const soundIcon = require('../img/setImg/soundIcon.png')
const voltIcon = require('../img/setImg/voltIcon.png')
const startIcon = require('../img/setImg/startIcon.png')

const rightArr = require('../img/setImg/rightArr.png')


const Settings = () => {
  const navigation = useNavigation()

  const [saveModal, setSaveModal] = useState(false)

  const [aticarswitch, setAticarswitch] = useRecoilState(icarSwitch)
  const [atidoorswitch, setAtidoorswitch] = useRecoilState(idoorSwitch)
  const [atlowboltBoot, setAtlowvoltBoot] = useRecoilState(lowvoltBoot)
  const [atlowboltAlert, setAtlowvoltAlert] = useRecoilState(lowvoltAlert)
  const [atactionsound, setAtactionSound] = useRecoilState(actionSound)
  const [atalertsound, setAtalertSound] = useRecoilState(alertSound)

  const pushToken = useRecoilValue(fcmToken)
  const atmodemN = useRecoilValue(modemNumber)
  const atuserN = useRecoilValue(userNumber)

  const [stLimit, setStLimit] = useRecoilState(settingLimit)

  // 

  const [atCertifyState, setAtCertifyState] = useRecoilState(certifyState)

  const [atStateWaitTime, setAtStateWaitTime] = useRecoilState(stateWaitTime)


  const [, setLowVoltValue] = useRecoilState(voltValue)
  const [atBootTime, setatBootTimeValue] = useRecoilState(bootTimeValue)
  const [, setAtLastHeatValue] = useRecoilState(lastHeatTimeValue)
  const [, setAtStartTimeValue] = useRecoilState(startTimeValue)


  const [atLocalClientPort, setatLocalClientPort] = useRecoilState(AppLocalClientPort)
  const [atLocalClientAddress, setatLocalClientAddress] = useRecoilState(AppLocalClientAddress)

  const [atStateCarAlert, setAtStateCarAlert] = useRecoilState(StateCarAlert)
  const [atStateDoorLock, setAtStateDoorLock] = useRecoilState(StateDoorLock)
  const [atStateDoor, setAtStateDoor] = useRecoilState(StateDoor)
  const [atStateTrunk, setAtStateTrunk] = useRecoilState(StateTrunk)
  const [atStateEngineHood, setAtStateEngineHood] = useRecoilState(StateEngineHood)
  const [atStateEngineState, setAtStateEngineState] = useRecoilState(StateEngineState)
  const [atStateCarVolt, setAtStateCarVolt] = useRecoilState(StateCarVolt)

  // 

  


  const [icarswitch, seticarswitch] = useState(aticarswitch)
  const [idoorswitch, setidoorswitch] = useState(atidoorswitch)
  const [lowboltBoot, setlowboltBoot] = useState(atlowboltBoot)
  const [lowboltAlert, setlowboltAlert] = useState(atlowboltAlert)
  const [actionsound, setactionsound] = useState(atactionsound)
  const [alertsound, setalertsound] = useState(atalertsound)

  useEffect(()=>{
    seticarswitch(aticarswitch)
    setidoorswitch(atidoorswitch)
    setlowboltBoot(atlowboltBoot)
    setlowboltAlert(atlowboltAlert)
    setactionsound(atactionsound)
    setalertsound(atalertsound)
  },[aticarswitch,atidoorswitch,atlowboltBoot,atlowboltAlert,atactionsound,atalertsound])

  function sendCommand(cc) {

    let comm = { type: "R", type_sub: "car_controll", data: { command: '+SCMD=' + atmodemN + '/S:' + cc, modem: atmodemN, token: pushToken } }
    
    comm = JSON.stringify(comm)

    client.write(comm)
    console.log('전송 : ' + comm)
  }

  function registerClick() {
    try {
      var txt = { type: "R", type_sub: "req_state", data: { token: pushToken, modem: atmodemN } }

      client.write(JSON.stringify(txt))
      console.log('전송 : ' + JSON.stringify(txt))

    } catch (e) {
      console.log(e)
      client.destroy()
      console.log(client._destroyed)
  
      setTimeout(() => {
        client.connect({ port: 3600, host: '175.126.232.72' })
        console.log(client._destroyed)
        setTimeout(() => {
          client.write(JSON.stringify(txt))
          console.log('전송 : ' + JSON.stringify(txt))
        }, 1000);
      }, 1000);
    }
  }

  const reqState = navigation.addListener('focus', async() => {
    if(atStateWaitTime === false){
      // registerClick()
      await loadState()
      setAtStateWaitTime(true)
      setTimeout(() => {
        setAtStateWaitTime(false)
      }, 1000);
    }
  });

  useEffect(() => {
    return () => reqState();
  });


  const loadState = async () => {
    await axios.get('http://175.126.232.72/proc.php', {
      params: {
        type: 'state',
        modem: atmodemN,
        token: pushToken
      }
    })
      .then(async (response) => {

        console.log('???  ' + response.data);

        var command = '' + response.data
        console.log(command.split('/')[0])
        console.log(atmodemN)
        if ('' + response.data === 'no_cer') {
          setAtCertifyState('no_certification')

          try {
            client.write(JSON.stringify({ type: "R", type_sub: "req_state_certification", data: { modem: atmodemN, user: atuserN, token: pushToken } }))

          } catch (error) {
            console.log(error)
            client.destroy()
            client.connect({ port: 3600, host: '175.126.232.72', localPort: atLocalClientPort })

            setTimeout(() => {
              client.write(JSON.stringify({ type: "R", type_sub: "req_state_certification", data: { modem: atmodemN, user: atuserN, token: pushToken } }))

              console.log('전송 : ' + JSON.stringify({ type: "R", type_sub: "req_state_certification", data: { modem: atmodemN, user: atuserN, token: pushToken } }))
            }, 2000);
          }

          Alert.alert('미인증 상태입니다.', '인증을 진행해주세요',
            [{ text: "OK", onPress: () => navigation.navigate('차량등록') }])

        } else if ('' + response.data === 'no_state') {
          setAtCertifyState('no_state')
          Alert.alert('상태값이 없습니다.', '잠시후 진행해주세요')

          try {
            client.write(JSON.stringify({ type: "R", type_sub: "req_state_no", data: { modem: atmodemN, user: atuserN, token: pushToken } }))
          } catch (error) {
            console.log(error)
            client.destroy()
            client.connect({ port: 3600, host: '175.126.232.72', localPort: atLocalClientPort })

            setTimeout(() => {
              client.write(JSON.stringify({ type: "R", type_sub: "req_state_no", data: { modem: atmodemN, user: atuserN, token: pushToken } }))

              console.log('전송 : ' + JSON.stringify({ type: "R", type_sub: "req_state_no", data: { modem: atmodemN, user: atuserN, token: pushToken } }))
            }, 2000);
          }


        } else if (atmodemN == command.split('/')[0]) {
          setAtCertifyState('good')

          try {
            client.write(JSON.stringify({ type: "R", type_sub: "req_state", data: { modem: atmodemN, user: atuserN, token: pushToken } }))
          } catch (error) {
            console.log(error)
            client.destroy()
            client.connect({ port: 3600, host: '175.126.232.72', localPort: atLocalClientPort })

            setTimeout(() => {
              client.write(JSON.stringify({ type: "R", type_sub: "req_state", data: { modem: atmodemN, user: atuserN, token: pushToken } }))

              console.log('전송 : ' + JSON.stringify({ type: "R", type_sub: "req_state", data: { modem: atmodemN, user: atuserN, token: pushToken } }))
            }, 2000);
          }

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

          // if(atmodemN == command.split('/')[0] && boot != true){
          //   if(command.split('/')[4][3] === 'i'){

          //     console.log('원격 시동 on 상태 확인')

          //     setIsRemote(true)
          //     setAtIsboot(true)
          //     setBoot(true)

          //     rrtime = new Date()

          //     rrtime.setMinutes(rrtime.getMinutes() + parseInt(command.split('/')[4][4]+command.split('/')[4][5]))
          //     rrtime.setSeconds(rrtime.getSeconds() + parseInt(command.split('/')[4][6]+command.split('/')[4][7]))

          //     interval = setInterval(() => {
          //       timecalcul()
          //     }, 1000);

          //   }
          // }


        }
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('서버오류! 나중에 시도해주세요!')
      })
      .then(function () {
        // Alert.alert('서버오류! 나중에 시도해주세요!')
      });
  }



  function savebtnclick() {
    if (stLimit === false) {
      setStLimit(true)


      // //아이카 스위치
      // if (icarswitch !== aticarswitch) {
      //   if (icarswitch === true) {
      //     try {
      //       sendCommand('mn')
      //     } catch (e) {
      //       console.log(e)
      //       client.connect({ port: 3600, host: '175.126.232.72' })
      //       sendCommand('mn')

      //     }
      //   } else {
      //     try {
      //       sendCommand('mf')
      //     } catch (e) {
      //       console.log(e)
      //       client.connect({ port: 3600, host: '175.126.232.72' })

      //       sendCommand('mf')


      //     }
      //   }
      // }

      // //아이도어 스위치
      // setTimeout(() => {
      //   if (idoorswitch !== atidoorswitch) {
      //     if (idoorswitch === true) {
      //       try {
      //         sendCommand('dn')
      //       } catch (e) {
      //         client.connect({ port: 3600, host: '175.126.232.72' })
      //         console.log(e)
      //         sendCommand('dn')


      //       }
      //     } else {
      //       try {
      //         sendCommand('df')
      //       } catch (e) {
      //         client.connect({ port: 3600, host: '175.126.232.72' })
      //         console.log(e)
      //         sendCommand('df')


      //       }
      //     }
      //   }
      // }, 300);

      // //저전압 기능
      // setTimeout(() => {
      //   if (lowboltBoot !== atlowboltBoot || lowboltAlert !== atlowboltAlert) {
      //     if (lowboltBoot === true) {
      //       try {
      //         sendCommand('le')
      //       } catch (e) {
      //         client.connect({ port: 3600, host: '175.126.232.72' })
      //         console.log(e)
      //         sendCommand('le')


      //       }
      //     } else if (lowboltAlert === true) {
      //       try {
      //         sendCommand('la')
      //       } catch (e) {
      //         client.connect({ port: 3600, host: '175.126.232.72' })
      //         console.log(e)
      //         sendCommand('la')


      //       }
      //     } else {
      //       try {
      //         sendCommand('lf')
      //       } catch (e) {
      //         client.connect({ port: 3600, host: '175.126.232.72' })
      //         console.log(e)
      //         sendCommand('lf')

      //       }
      //     }
      //   }
      // }, 600);


      // //동작음 무음 기능
      // setTimeout(() => {
      //   if (actionsound !== atactionsound) {
      //     if (actionsound === true) {
      //       try {
      //         sendCommand('1n')
      //       } catch (e) {

      //         client.connect({ port: 3600, host: '175.126.232.72' })
      //         console.log(e)
      //         sendCommand('1n')

      //       }
      //     } else {
      //       try {
      //         sendCommand('1f')
      //       } catch (e) {

      //         client.connect({ port: 3600, host: '175.126.232.72' })
      //         console.log(e)
      //         sendCommand('1f')

      //       }
      //     }
      //   }
      // }, 800);


      // //경계음 무음 기능
      // setTimeout(() => {
      //   if (alertsound !== atalertsound) {
      //     if (alertsound === true) {
      //       try {
      //         sendCommand('2n')
      //       } catch (e) {
      //         client.connect({ port: 3600, host: '175.126.232.72' })
      //         console.log(e)
      //         sendCommand('2n')

      //       }
      //     } else {
      //       try {
      //         sendCommand('2f')
      //       } catch (e) {
      //         client.connect({ port: 3600, host: '175.126.232.72' })
      //         console.log(e)
      //         sendCommand('2f')

      //       }
      //     }
      //   }
      // }, 900);


      setSaveModal(true)

      // AsyncStorage.setItem("@icarswitch", JSON.stringify(icarswitch))
      // AsyncStorage.setItem("@idoorswitch", JSON.stringify(idoorswitch))
      // AsyncStorage.setItem("@lowboltBoot", JSON.stringify(lowboltBoot))
      // AsyncStorage.setItem("@lowboltAlert", JSON.stringify(lowboltAlert))
      // AsyncStorage.setItem("@actionsound", JSON.stringify(actionsound))
      // AsyncStorage.setItem("@alertsound", JSON.stringify(alertsound))

      setAticarswitch(icarswitch)
      setAtidoorswitch(idoorswitch)
      setAtlowvoltBoot(lowboltBoot)
      setAtlowvoltAlert(lowboltAlert)
      setAtactionSound(actionsound)
      setAtalertSound(alertsound)
      setTimeout(() => {
        setSaveModal(false)
      }, 2000);

      setTimeout(() => {
        setStLimit(false)
      }, 1000);
    }
    else {
      Alert.alert('설정 변경 유휴시간은 10초입니다.', '10초 후 시도해주세요')
    }

  }


  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      {/* 헤더 */}
      <View style={{ height: 60, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 32, marginLeft: 16, }}>
        <View><TouchableWithoutFeedback onPress={() => navigation.goBack()}><Image source={back}></Image></TouchableWithoutFeedback></View>
        <Text style={styles.maintxt}>설정</Text>
        <TouchableWithoutFeedback onPress={() => savebtnclick()}>
          <Text style={styles.savetxt}>저장</Text>
        </TouchableWithoutFeedback>
      </View>
      {/* 헤더 끝 */}


      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 0 }}>
        <View style={{ width: chwidth }}>


          {/* 본문 */}
          <View style={{ marginLeft: 16 }}>

            <View style={{ marginTop: 10 }}></View>

            {/* 아이카 설정 */}
            <View style={styles.oneFrame}>
              <View style={{ marginLeft: 11, marginRight: 16, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row" }}>
                  <Image source={icarIcon}></Image>
                  <Text style={styles.frameTitle}>iCar</Text>
                </View>
                <ToggleSwitch
                  isOn={icarswitch}
                  onColor="#f75929"
                  offColor="#d1d2d6"
                  onToggle={isOn => {
                    seticarswitch(isOn)
                    if(isOn === true){
                      sendCommand('mn')
                    }else{
                      sendCommand('mf')
                    }
                    }}
                />
              </View>
            </View>
            <Text style={styles.infotxt}>iCar를 끄면 모든 기능이 정지 됩니다.</Text>
            {/* 아이카 설정 끝 */}

            <View style={{ marginTop: 24 }}></View>

            {/* 아이도어 설정 */}
            <View style={styles.oneFrame}>
              <View style={{ marginLeft: 11, marginRight: 16, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row" }}>
                  <Image source={idoorIcon}></Image>
                  <Text style={styles.frameTitle}>i 도어</Text>
                </View>
                <ToggleSwitch
                  isOn={idoorswitch}
                  onColor="#f75929"
                  offColor="#d1d2d6"
                  onToggle={isOn => {setidoorswitch(isOn)
                    if(isOn === true){
                      sendCommand('dn')
                    }else{
                      sendCommand('df')
                    }
                  
                  }}
                />
              </View>
            </View>
            <Text style={styles.infotxt}>i도어를 끄면 모든 기능이 정지 됩니다.</Text>
            {/* 아이도어 설정 끝 */}

            <View style={{ marginTop: 24 }}></View>

            {/* 저전압 설정 */}
            <View style={styles.frame3}>
              <View style={{ marginLeft: 11, marginRight: 16, marginTop: 19, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row" }}>
                  <Image source={voltIcon}></Image>
                  <Text style={styles.frameTitle}>저전압 기능</Text>
                </View>
              </View>
              <View style={{ width: chwidth - 32, flexDirection: "row", justifyContent: 'flex-end' }}>
                <View style={{ height: 1, backgroundColor: "#e1e1e3", width: chwidth - 80, marginTop: 17 }}></View>
              </View>

              <View style={{ marginLeft: 11, marginRight: 16, marginTop: 19, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: 24, height: 24 }}></View>
                  <Text style={styles.framecon}>저전압 시동</Text>
                </View>
                <ToggleSwitch
                  isOn={lowboltBoot}
                  onColor="#f75929"
                  offColor="#d1d2d6"
                  onToggle={isOn => { setlowboltAlert(false)
                    setlowboltBoot(isOn)
                    if(isOn === true){
                      sendCommand('le')
                    }else{
                      if(lowboltAlert === isOn){
                        sendCommand('lf')
                      }
                    }
                   }}
                />
              </View>
              <View style={{ width: chwidth - 32, flexDirection: "row", justifyContent: 'flex-end' }}>
                <View style={{ height: 1, backgroundColor: "#e1e1e3", width: chwidth - 80, marginTop: 17 }}></View>
              </View>

              <View style={{ marginLeft: 11, marginRight: 16, marginTop: 19, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: 24, height: 24 }}></View>
                  <Text style={styles.framecon}>저전압 알림</Text>
                </View>
                <ToggleSwitch
                  isOn={lowboltAlert}
                  onColor="#f75929"
                  offColor="#d1d2d6"
                  onToggle={isOn => { setlowboltAlert(isOn)
                    setlowboltBoot(false)
                    if(isOn === true){
                      sendCommand('la')
                    }else{
                      if(lowboltBoot === false){
                        sendCommand('lf')
                      }
                    }
                   }}
                />
              </View>
              <View style={{ width: chwidth - 32, flexDirection: "row", justifyContent: 'flex-end' }}>
                <View style={{ height: 1, backgroundColor: "#e1e1e3", width: chwidth - 80, marginTop: 17 }}></View>
              </View>

              <TouchableWithoutFeedback onPress={() => navigation.navigate('저전압설정')}>
                <View style={{ marginLeft: 11, marginRight: 16, marginTop: 19, flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: 24, height: 24 }}></View>
                    <Text style={styles.framecon}>저전압 설정</Text>
                  </View>
                  <Image source={rightArr}></Image>
                </View>
              </TouchableWithoutFeedback>


            </View>
            <Text style={styles.infotxt}>저전압 관련 설정이 가능합니다.</Text>
            {/* 저전압 설정 끝 */}

            <View style={{ marginTop: 24 }}></View>

            {/*  무음 기능  */}
            <View style={styles.frame2}>
              <View style={{ marginLeft: 11, marginRight: 16, marginTop: 19, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row" }}>
                  <Image source={soundIcon}></Image>
                  <Text style={styles.frameTitle}>무음 기능</Text>
                </View>
              </View>
              <View style={{ width: chwidth - 32, flexDirection: "row", justifyContent: 'flex-end' }}>
                <View style={{ height: 1, backgroundColor: "#e1e1e3", width: chwidth - 80, marginTop: 17 }}></View>
              </View>

              <View style={{ marginLeft: 11, marginRight: 16, marginTop: 19, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: 24, height: 24 }}></View>
                  <Text style={styles.framecon}>동작음 무음</Text>
                </View>
                <ToggleSwitch
                  isOn={actionsound}
                  onColor="#f75929"
                  offColor="#d1d2d6"
                  onToggle={isOn => {setactionsound(isOn)
                    if(isOn === true){
                      sendCommand('1n')
                    }else{
                      sendCommand('1f')
                    }
                  }}
                />
              </View>
              <View style={{ width: chwidth - 32, flexDirection: "row", justifyContent: 'flex-end' }}>
                <View style={{ height: 1, backgroundColor: "#e1e1e3", width: chwidth - 80, marginTop: 17 }}></View>
              </View>

              <View style={{ marginLeft: 11, marginRight: 16, marginTop: 19, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: 24, height: 24 }}></View>
                  <Text style={styles.framecon}>경계음 무음</Text>
                </View>
                <ToggleSwitch
                  isOn={alertsound}
                  onColor="#f75929"
                  offColor="#d1d2d6"
                  onToggle={isOn => {setalertsound(isOn)
                    if(isOn === true){
                      sendCommand('2n')
                    }else{
                      sendCommand('2f')
                    }}}
                />
              </View>

            </View>
            <Text style={styles.infotxt}>무음 관련 설정이 가능합니다.</Text>
            {/* 무음 기능 끝 */}

            {/* 원격시동 시간설정 */}
            <View style={{ marginTop: 24 }}></View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('원격시동시간')}>
              <View style={styles.oneFrame}>
                <View style={{ marginLeft: 11, marginRight: 16, flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Image source={powerIcon}></Image>
                    <Text style={styles.frameTitle}>원격시동 시간설정</Text>
                  </View>
                  <Image source={rightArr}></Image>
                </View>
              </View>
            </TouchableWithoutFeedback>


            {/* 후열시간 설정 */}
            <View style={{ marginTop: 8 }}></View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('후열시간')}>
              <View style={styles.oneFrame}>
                <View style={{ marginLeft: 11, marginRight: 16, flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Image source={coliIcon}></Image>
                    <Text style={styles.frameTitle}>후열시간 설정</Text>
                  </View>
                  <Image source={rightArr}></Image>
                </View>
              </View>
            </TouchableWithoutFeedback>


            {/*
            <View style={{ marginTop: 8 }}></View>
            <TouchableWithoutFeedback>
              <View style={styles.oneFrame}>
                <View style={{ marginLeft: 11, marginRight: 16, flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Image source={carhitIcon}></Image>
                    <Text style={styles.frameTitle}>예열시동 시간설정-삭제 예정</Text>
                  </View>
                  <Image source={rightArr}></Image>
                </View>
              </View>
            </TouchableWithoutFeedback> */}


            {/* 스타트 시간설정 */}
            <View style={{ marginTop: 8 }}></View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('스타트시간')}>
              <View style={styles.oneFrame}>
                <View style={{ marginLeft: 11, marginRight: 16, flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Image source={startIcon}></Image>
                    <Text style={styles.frameTitle}>스타트 시간설정</Text>
                  </View>
                  <Image source={rightArr}></Image>
                </View>
              </View>
            </TouchableWithoutFeedback>


            {/* i도어 비밀번호설정 */}
            <View style={{ marginTop: 8 }}></View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('간편비밀번호',{whocall:'setting'})}>
              <View style={styles.oneFrame}>
                <View style={{ marginLeft: 11, marginRight: 16, flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Image source={lockIcon}></Image>
                    <Text style={styles.frameTitle}>i도어 비밀번호설정</Text>
                  </View>
                  <Image source={rightArr}></Image>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={{ marginTop: 60, marginBottom: 20 }}></View>


          {/* 본문 끝 */}


        </View>
      </ScrollView>

      <Modal visible={saveModal} transparent={true} animationType={'fade'}>
        <SafeAreaView style={{ width: chwidth, height: chheight, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: chwidth - 80, height: 80, backgroundColor: 'white', marginTop: -200, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.maintxt}>설정한 내용이 저장되었습니다.</Text>
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
  oneFrame: {
    width: chwidth - 32,
    height: 56,
    borderRadius: 6,
    backgroundColor: "#f0f1f5",
    justifyContent: "center"
  },
  frameTitle: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#4e535a",
    marginLeft: 11
  },
  infotxt: {
    opacity: 0.5,
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 13,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: -0.5,
    color: 'rgb(68,73,80)',
    marginTop: 5
  },
  frame3: {
    width: chwidth - 32,
    height: 244,
    borderRadius: 6,
    backgroundColor: "#f0f1f5"
  },
  frame2: {
    width: chwidth - 32,
    height: 188,
    borderRadius: 6,
    backgroundColor: "#f0f1f5"
  },
  framecon: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: 'rgb(68,73,80)',
    marginLeft: 11
  }
})

export default React.memo(Settings)