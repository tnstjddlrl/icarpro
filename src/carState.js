import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AutoHeightImage from 'react-native-auto-height-image';
import axios from 'axios';

import {
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {
  fcmToken,
  bootRestTime,
  isBootOn,
  StateCarAlert,
  StateDoorLock,
  StateDoor,
  StateTrunk,
  StateEngineHood,
  StateEngineState,
  StateCarVolt,
  voltValue,
  stateWaitTime,
  modemNumber,
  bootTimeValue,
  lastHeatTimeValue,
  startTimeValue,
  icarSwitch,
  idoorSwitch,
  lowvoltBoot,
  lowvoltAlert,
  actionSound,
  alertSound,
  AppLocalClientPort,
  AppLocalClientAddress,
  certifyState,
  userNumber
} from './atom/atoms'

import client from './Client'

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height


const back = require('../img/backbtn.png')

// const warnOn = require('../img/topviewstate/warnOn.png')
// const bootOn = require('../img/topviewstate/bootOn.png')
// const doorlockOn = require('../img/topviewstate/doorlockOn.png')
// const doorOn = require('../img/topviewstate/doorOn.png')
// const enginestateOn = require('../img/topviewstate/enginestateOn.png')
// const enginehoodOn = require('../img/topviewstate/enginehoodOn.png')
// const trunkOn = require('../img/topviewstate/trunkOn.png')

///////////////
const mainframe = require('../img/cutimg/icarmain.png')

const doorcloseblack = require('../img/cutimg/doorcloseblack.png')
const doorcloseorange = require('../img/cutimg/doorcloseorange.png')
const dooropen = require('../img/cutimg/dooropen.png')

const hoodorange = require('../img/cutimg/hoodorange.png')
const trunkorange = require('../img/cutimg/trunkorange.png')
const bootorange = require('../img/cutimg/bootorange.png')
const lightorange = require('../img/cutimg/lightorange.png')

const doorlocksticon = require('../img/cutimg/doorlocksticon.png')
const lightsticon = require('../img/cutimg/lightsticon.png')
const enginesticon = require('../img/cutimg/enginesticon.png')
const hoodsticon = require('../img/cutimg/hoodsticon.png')
const trunksticon = require('../img/cutimg/trunksticon.png')
const dooropensticon = require('../img/cutimg/dooropensticon.png')
const bootsticon = require('../img/cutimg/bootsticon.png')



//////////////////

const warnIcon = require('../img/state/warnIcon.png')

const lockIcon = require('../img/state/lockIcon.png')
const doorIcon = require('../img/state/doorIcon.png')
const trunkIcon = require('../img/state/trunkIcon.png')
const hoodIcon = require('../img/state/hoodIcon.png')
const stateIcon = require('../img/state/stateIcon.png')
const bootIcon = require('../img/state/bootIcon.png')
const voltIcon = require('../img/state/voltIcon.png')


// let command = '123123/E:iiooo119o/D:ioooiio/L:iiiio/F:oo0000oooo/S:iiiioooooo110000oo'


const CarState = () => {
  const navigation = useNavigation()


  const [atCertifyState, setAtCertifyState] = useRecoilState(certifyState)

  const [atStateWaitTime, setAtStateWaitTime] = useRecoilState(stateWaitTime)


  const pushToken = useRecoilValue(fcmToken)
  const isbooton = useRecoilValue(isBootOn)
  const boottime = useRecoilValue(bootRestTime)

  const atmodemN = useRecoilValue(modemNumber)
  const atuserN = useRecoilValue(userNumber)

  const [, setLowVoltValue] = useRecoilState(voltValue)
  const [atBootTime, setatBootTimeValue] = useRecoilState(bootTimeValue)
  const [, setAtLastHeatValue] = useRecoilState(lastHeatTimeValue)
  const [, setAtStartTimeValue] = useRecoilState(startTimeValue)

  const [isicarswitch, setAticarswitch] = useRecoilState(icarSwitch)
  const [, setAtidoorswitch] = useRecoilState(idoorSwitch)
  const [, setAtlowvoltBoot] = useRecoilState(lowvoltBoot)
  const [, setAtlowvoltAlert] = useRecoilState(lowvoltAlert)
  const [atActionSound, setAtactionSound] = useRecoilState(actionSound)
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
        client.connect({ port: 3400, host: '175.126.232.72' })
        console.log(client._destroyed)
        setTimeout(() => {
          client.write(JSON.stringify(txt))
          console.log('전송 : ' + JSON.stringify(txt))
        }, 1000);
      }, 1000);
    }
  }

  const reqState = navigation.addListener('focus', async () => {
    if (atStateWaitTime === false) {
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
            client.connect({ port: 3400, host: '175.126.232.72', localPort: atLocalClientPort })

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
            client.connect({ port: 3400, host: '175.126.232.72', localPort: atLocalClientPort })

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
            client.connect({ port: 3400, host: '175.126.232.72', localPort: atLocalClientPort })

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


  return (
    <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
      {/* 헤더 */}
      <View style={{ flex: 0.8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View><Image source={back}></Image></View>
        </TouchableWithoutFeedback>
        <Text style={styles.maintxt}>차량 상태</Text>
        <View style={{ width: 30 }}></View>
      </View>
      {/* 헤더 끝 */}

      <View style={{ flex: 0.4 }}></View>


      {/* 본문 */}
      <View style={{ flex: 10 }}>
        {/* 차량 이미지 */}


        <TouchableWithoutFeedback onPress={() => { }}>
          <View style={{ justifyContent: "center", alignItems: "center", flex: 5 }}>
            {/* <Image style={{ position: "absolute" }} source={mainframe}></Image> */}
            <AutoHeightImage source={mainframe} width={chwidth - 110} style={{ position: "absolute" }}></AutoHeightImage>
            {(atStateDoorLock === 'OFF' && atStateDoor == 'OFF') &&
              // <Image style={{ position: "absolute" }} source={doorcloseblack}></Image>
              <AutoHeightImage source={doorcloseblack} width={chwidth - 110} style={{ position: "absolute" }}></AutoHeightImage>

            }
            {(atStateDoorLock === 'ON' && atStateDoor === 'OFF') &&
              // <Image style={{ position: "absolute" }} source={doorcloseorange}></Image>
              <AutoHeightImage source={doorcloseorange} width={chwidth - 110} style={{ position: "absolute" }}></AutoHeightImage>

            }
            {atStateDoor === 'ON' &&
              // <Image style={{ position: "absolute" }} source={dooropen}></Image>
              <AutoHeightImage source={dooropen} width={chwidth - 110} style={{ position: "absolute" }}></AutoHeightImage>

            }

            {(atStateEngineHood === 'ON' || atStateEngineState === 'ON') &&
              // <Image style={{ position: "absolute" }} source={hoodorange}></Image>
              <AutoHeightImage source={hoodorange} width={chwidth - 110} style={{ position: "absolute" }}></AutoHeightImage>

            }
            {atStateTrunk === 'ON' &&
              // <Image style={{ position: "absolute" }} source={trunkorange}></Image>
              <AutoHeightImage source={trunkorange} width={chwidth - 110} style={{ position: "absolute" }}></AutoHeightImage>

            }
            {atStateCarAlert === 'ON' &&
              // <Image style={{ position: "absolute" }} source={lightorange}></Image>
              <AutoHeightImage source={lightorange} width={chwidth - 110} style={{ position: "absolute" }}></AutoHeightImage>

            }
            {isbooton &&
              // <Image style={{ position: "absolute" }} source={bootorange}></Image>
              <AutoHeightImage source={bootorange} width={chwidth - 110} style={{ position: "absolute" }}></AutoHeightImage>

            }

            {atStateEngineHood === 'ON' &&
              // <Image style={{ position: "absolute" }} source={hoodsticon}></Image>
              <AutoHeightImage source={hoodsticon} width={chwidth - 110} style={{ position: "absolute" }}></AutoHeightImage>

            }
            {atStateEngineState === 'ON' &&
              // <Image style={{ position: "absolute" }} source={enginesticon}></Image>
              <AutoHeightImage source={enginesticon} width={chwidth - 110} style={{ position: "absolute" }}></AutoHeightImage>
            }
            {atStateTrunk === 'ON' &&
              // <Image style={{ position: "absolute" }} source={trunksticon}></Image>
              <AutoHeightImage source={trunksticon} width={chwidth - 110} style={{ position: "absolute" }}></AutoHeightImage>

            }

            {atStateDoorLock === 'ON' &&
              // <Image style={{ position: "absolute" }} source={doorlocksticon}></Image>
              <AutoHeightImage source={doorlocksticon} width={chwidth - 110} style={{ position: "absolute" }}></AutoHeightImage>

            }
            {(atStateDoor === 'ON') &&
              // <Image style={{ position: "absolute" }} source={dooropensticon}></Image>
              <AutoHeightImage source={dooropensticon} width={chwidth - 110} style={{ position: "absolute" }}></AutoHeightImage>

            }
            {atStateCarAlert === 'ON' &&
              // <Image style={{ position: "absolute" }} source={lightsticon}></Image>
              <AutoHeightImage source={lightsticon} width={chwidth - 110} style={{ position: "absolute" }}></AutoHeightImage>

            }
            {isbooton &&
              // <Image style={{ position: "absolute" }} source={bootsticon}></Image>
              <AutoHeightImage source={bootsticon} width={chwidth - 110} style={{ position: "absolute" }}></AutoHeightImage>

            }
          </View>
        </TouchableWithoutFeedback>
        {/* 차량 이미지 끝 */}

        <View style={{ flex: 0.6 }}></View>




        {/* 상태 부분 */}

        {/* 차량경계 도어락 */}
        <View style={{ flex: 1, width: chwidth - 32, marginLeft: 16, flexDirection: "row" }}>

          <View style={styles.frame}>
            <View style={{ flexDirection: "row", marginLeft: 10, marginRight: 16, justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={warnIcon}></Image>
                <Text style={styles.frametxt}>차량 경계</Text>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={() => { if (atStateCarAlert === 'ON') setAtStateCarAlert('OFF'); else setAtStateCarAlert('ON'); }}>
                  <Text style={atStateCarAlert === 'ON' ? styles.ontxt : styles.offtxt}>{atStateCarAlert}</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>

          <View style={{ flex: 0.05 }}></View>

          <View style={styles.frame}>
            <View style={{ flexDirection: "row", marginLeft: 10, marginRight: 16, justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={lockIcon}></Image>
                <Text style={styles.frametxt}>도어락</Text>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={() => { if (atStateDoorLock === 'OFF') setAtStateDoorLock('ON'); else setAtStateDoorLock('OFF') }}>
                  <Text style={atStateDoorLock === 'ON' ? styles.ontxt : styles.offtxt}>{atStateDoorLock}</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>

        {/* 차량경계 도어락  끝*/}

        <View style={{ flex: 0.1 }}></View>

        {/* 도어 트렁크 */}
        <View style={{ flex: 1, width: chwidth - 32, marginLeft: 16, flexDirection: "row" }}>

          <View style={styles.frame}>
            <View style={{ flexDirection: "row", marginLeft: 10, marginRight: 16, justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={doorIcon}></Image>
                <Text style={styles.frametxt}>도어</Text>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={() => { if (atStateDoor === 'ON') setAtStateDoor('OFF'); else setAtStateDoor('ON'); }}>
                  <Text style={atStateDoor === 'ON' ? styles.ontxt : styles.offtxt}>{atStateDoor}</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>

          <View style={{ flex: 0.05 }}></View>

          <View style={styles.frame}>
            <View style={{ flexDirection: "row", marginLeft: 10, marginRight: 16, justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={trunkIcon}></Image>
                <Text style={styles.frametxt}>트렁크</Text>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={() => { if (atStateTrunk === 'ON') setAtStateTrunk('OFF'); else setAtStateTrunk('ON'); }}>
                  <Text style={atStateTrunk === 'ON' ? styles.ontxt : styles.offtxt}>{atStateTrunk}</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>

        </View>
        {/* 도어 트렁크 끝 */}

        <View style={{ flex: 0.1 }}></View>


        {/* 엔진후드 엔진상태 */}
        <View style={{ flex: 1, width: chwidth - 32, marginLeft: 16, flexDirection: "row" }}>

          <View style={styles.frame}>
            <View style={{ flexDirection: "row", marginLeft: 10, marginRight: 16, justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={hoodIcon}></Image>
                <Text style={styles.frametxt}>엔진 후드</Text>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={() => { if (atStateEngineHood === 'ON') setAtStateEngineHood('OFF'); else setAtStateEngineHood('ON'); }}>
                  <Text style={atStateEngineHood === 'ON' ? styles.ontxt : styles.offtxt}>{atStateEngineHood}</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>

          <View style={{ flex: 0.05 }}></View>

          <View style={styles.frame}>
            <View style={{ flexDirection: "row", marginLeft: 10, marginRight: 16, justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={stateIcon}></Image>
                <Text style={styles.frametxt}>엔진 상태</Text>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={() => { if (atStateEngineState === 'ON') setAtStateEngineState('OFF'); else setAtStateEngineState('ON'); }}>
                  <Text style={atStateEngineState === 'ON' ? styles.ontxt : styles.offtxt}>{atStateEngineState}</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>

        </View>
        {/* 엔진후드 엔진상태 끝*/}


        <View style={{ flex: 0.1 }}></View>

        <View style={{ flex: 1, width: chwidth - 32, marginLeft: 16, flexDirection: "row" }}>
          <View style={styles.frame}>
            <View style={{ flexDirection: "row", marginLeft: 10, marginRight: 16, justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={bootIcon}></Image>
                <Text style={styles.frametxt}>원격 시동</Text>
                <Text style={styles.spacetime}>남은 시간 : </Text>
                {isbooton && <Text style={styles.spacetime2}>{boottime}</Text>}

              </View>
              <View>
                {isbooton ?
                  <Text style={styles.ontxt}>ON</Text>
                  :
                  <Text style={styles.offtxt}>OFF</Text>
                }

              </View>
            </View>
          </View>
        </View>

        <View style={{ flex: 0.1 }}></View>



        <View style={{ flex: 1, width: chwidth - 32, marginLeft: 16, flexDirection: "row" }}>
          <View style={styles.frame}>
            <View style={{ flexDirection: "row", marginLeft: 10, marginRight: 16, justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={voltIcon}></Image>
                <Text style={styles.frametxt}>차량 전압</Text>
              </View>
              <View>
                <Text style={styles.volttxt}>{atStateCarVolt}V</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flex: 0.4 }}></View>

        <View style={{ flex: 0.1 }}></View>



        {/* 상태 부분 끝 */}

      </View>
      {/* 본문 끝 */}


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
  frame: {
    // height: 58,
    borderRadius: 10,
    backgroundColor: "#f0f1f5",
    flex: 1,
    justifyContent: "center",
  },
  frametxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#4e535a",
    marginLeft: 6
  },
  ontxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "right",
    color: "#f75929"
  },
  offtxt: {
    opacity: 0.5,
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "right",
    color: "#4e535a"
  },
  volttxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 15,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "right",
    color: "#4c5158"
  },
  spacetime: {
    opacity: 0.5,
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 13,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: -0.5,
    textAlign: "right",
    color: "#4e535a",
    marginLeft: 8,
    marginTop: 2
  },
  spacetime2: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 13,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: -0.5,
    textAlign: "right",
    color: "#f75929",
    marginTop: 2
  },
})

export default React.memo(CarState)