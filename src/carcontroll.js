import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
  Platform,
  Modal,
  Vibration
} from 'react-native';

import { useNavigation } from '@react-navigation/native';


import client from './Client.js'

import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler'

import {
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {
  fcmToken,
  isCarRace,
  bootRestTime,
  isBootOn,
  icarSwitch,
  bootTimeValue,
  actionSound,
  modemNumber,
  userNumber,
  stateWaitTime,
  certifyState,
  settingLimit,
  AppLocalClientPort,
  voltValue,
  lastHeatTimeValue,
  startTimeValue,
  idoorSwitch,
  lowvoltBoot,
  lowvoltAlert,
  alertSound,
  AppLocalClientAddress,
  StateCarAlert,
  StateDoorLock,
  StateDoor,
  StateTrunk,
  StateEngineHood,
  StateEngineState,
  StateCarVolt
} from './atom/atoms'

import AutoHeightImage from 'react-native-auto-height-image';

import { Player } from '@react-native-community/audio-toolkit';

import axios from 'axios'

const doorOnSound = () => new Player('dooron.mp3').play(err => console.log(err))
const panicOnSound = () => new Player('panicon.mp3').play(err => console.log(err))
const WarnSound = () => new Player('warn.mp3').play(err => console.log(err))
const TrunkOpenSound = () => new Player('trunkopen.mp3').play(err => console.log(err))
const bootOnSound = () => new Player('booton.mp3').play(err => console.log(err))

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

const sedan1_big = require('../img/sedan1_big.png')
const suv1_big = require('../img/suv1_big.png')

const smallLogo = require('../img/controll/smallLogo.png')
const startbtn = require('../img/controll/startbtn.png')
const startoffbtn = require('../img/controll/startoffbtn.png')

const lockSelect = require('../img/controll/lockSelect.png')
const lockNoSelect = require('../img/controll/lockNoSelect.png')
const lockgray = require('../img/controll/lockgray.png')

const panicSelect = require('../img/controll/panicSelect.png')
const panicNOSelect = require('../img/controll/panicNoSelect.png')
const panicgray = require('../img/controll/panicgray.png')

const warnSelect = require('../img/controll/warnSelect.png')
const warnNoSelect = require('../img/controll/warnNoSelect.png')
const warngray = require('../img/controll/warngray.png')


const trunkSelect = require('../img/controll/trunkSelect.png')
const trunkNoSelect = require('../img/controll/trunkNoSelect.png')
const trunkgray = require('../img/controll/trunkgray.png')

const dooron = require('../img/controll/carstate/dooron.png')
const panicon = require('../img/controll/carstate/panicon.png')
const trunkon = require('../img/controll/carstate/trunkon.png')
const bimon = require('../img/controll/carstate/bimon.png')
const booton = require('../img/controll/carstate/booton.png')

const suvdooron = require('../img/controll/carstate/suvdooron.png')
const suvpanicon = require('../img/controll/carstate/suvpanicon.png')
const suvtrunkon = require('../img/controll/carstate/suvtrunkon.png')
const suvbimon = require('../img/controll/carstate/suvbimon.png')
const suvbooton = require('../img/controll/carstate/suvbooton.png')

var interval;
var rrtime;

const Carcontroll = () => {
  const navigation = useNavigation()

  const [pushToken, setPushToken] = useRecoilState(fcmToken)
  const atmodemN = useRecoilValue(modemNumber)
  const atuserN = useRecoilValue(userNumber)


  const [carRace, setcarRace] = useRecoilState(isCarRace)
  const [bootrest, setBootrest] = useRecoilState(bootRestTime)
  const [atIsboot, setAtIsboot] = useRecoilState(isBootOn)

  const [atModemn, setAtModemn] = useRecoilState(modemNumber)


  const [atCertifyState, setAtCertifyState] = useRecoilState(certifyState)

  const [atStateWaitTime, setAtStateWaitTime] = useRecoilState(stateWaitTime)



  const [loadModal, setLoadModal] = useState(false)
  const [commandtxt, setCommandtxt] = useState('')

  const [completeModal, setCompleteModal] = useState(false)

  const [isRemote, setIsRemote] = useState(false)


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


  const unsubscribe = navigation.addListener('focus', async () => {
    console.log('로컬포트 : ' + atLocalClientPort)
    if (isicarswitch === false) {
      Alert.alert('현재 icar 설정이 꺼져있습니다.', '차량제어 기능을 사용할 수 없습니다.')
    }
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
    return () => { unsubscribe() };
  });


  const loadState = async () => {
    await axios.get('http://175.126.232.72/proc.php', {
      params: {
        type: 'state',
        modem: atModemn,
        token: pushToken
      }
    })
      .then(async (response) => {

        console.log('???  ' + response.data);

        var command = '' + response.data
        console.log(command.split('/')[0])
        console.log(atModemn)
        if ('' + response.data === 'no_certification') {
          setAtCertifyState('no_certification')

          try {
            client.write(JSON.stringify({ type: "R", type_sub: "req_state_certification", data: { modem: atModemn, user: atuserN, token: pushToken } }))

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
            client.write(JSON.stringify({ type: "R", type_sub: "req_state_no", data: { modem: atModemn, user: atuserN, token: pushToken } }))
          } catch (error) {
            console.log(error)
            client.destroy()
            client.connect({ port: 3400, host: '175.126.232.72', localPort: atLocalClientPort })

            setTimeout(() => {
              client.write(JSON.stringify({ type: "R", type_sub: "req_state_certification", data: { modem: atmodemN, user: atuserN, token: pushToken } }))

              console.log('전송 : ' + JSON.stringify({ type: "R", type_sub: "req_state_certification", data: { modem: atmodemN, user: atuserN, token: pushToken } }))
            }, 2000);
          }


        } else if (atModemn == command.split('/')[0]) {
          setAtCertifyState('good')

          try {
            client.write(JSON.stringify({ type: "R", type_sub: "req_state", data: { modem: atModemn, user: atuserN, token: pushToken } }))
          } catch (error) {
            console.log(error)
            client.destroy()
            client.connect({ port: 3400, host: '175.126.232.72', localPort: atLocalClientPort })

            setTimeout(() => {
              client.write(JSON.stringify({ type: "R", type_sub: "req_state_certification", data: { modem: atmodemN, user: atuserN, token: pushToken } }))

              console.log('전송 : ' + JSON.stringify({ type: "R", type_sub: "req_state_certification", data: { modem: atmodemN, user: atuserN, token: pushToken } }))
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

          if (atmodemN == command.split('/')[0] && boot != true) {
            if (command.split('/')[4][3] === 'i') {

              console.log('원격 시동 on 상태 확인')

              setIsRemote(true)
              setAtIsboot(true)
              setBoot(true)

              rrtime = new Date()

              rrtime.setMinutes(rrtime.getMinutes() + parseInt(command.split('/')[4][4] + command.split('/')[4][5]))
              rrtime.setSeconds(rrtime.getSeconds() + parseInt(command.split('/')[4][6] + command.split('/')[4][7]))

              interval = setInterval(() => {
                timecalcul()
              }, 1000);

            }
          }


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

  useEffect(() => {

    if (isRemote === false) {
      client.once('data', (data) => {

        var command = '' + data

        if (atmodemN == command.split('/')[0] && boot != true) {
          if (command.split('/')[4][3] === 'i') {

            console.log('원격 시동 on 상태 확인')

            setIsRemote(true)
            setAtIsboot(true)
            setBoot(true)

            rrtime = new Date()

            rrtime.setMinutes(rrtime.getMinutes() + parseInt(command.split('/')[4][4] + command.split('/')[4][5]))
            rrtime.setSeconds(rrtime.getSeconds() + parseInt(command.split('/')[4][6] + command.split('/')[4][7]))

            interval = setInterval(() => {
              timecalcul()
            }, 1000);

          }//차량 원격 시동 타이머 값 받아와서 설정해야함.
        }

      })
    }

  }, [isRemote])


  function registerClick() {

    console.log('?')

    try {

      client.write(JSON.stringify({ type: "R", type_sub: "req_state", data: { token: pushToken, modem: atModemn } }))
      console.log('전송 : ' + JSON.stringify({ type: "R", type_sub: "req_state", data: { token: pushToken, modem: atModemn } }))

    } catch (e) {
      console.log(e)
      client.destroy()
      console.log(client._destroyed)

      setTimeout(() => {
        client.connect({ port: 3400, host: '175.126.232.72' })
        console.log(client._destroyed)
        setTimeout(() => {
          client.write(JSON.stringify({ type: "R", type_sub: "req_state", data: { token: pushToken } }))
          console.log('전송 : ' + JSON.stringify({ type: "R", type_sub: "req_state", data: { token: pushToken } }))
        }, 1000);
      }, 1000);
    }

  }

  let door_0 = { type: "R", type_sub: "car_controll", data: { command: '+SCMD=' + atmodemN + '/C:du', modem: atmodemN, token: pushToken } }
  let door_1 = { type: "R", type_sub: "car_controll", data: { command: '+SCMD=' + atmodemN + '/C:dl', modem: atmodemN, token: pushToken } }
  let panic_0 = { type: "R", type_sub: "car_controll", data: { command: '+SCMD=' + atmodemN + '/C:pf', modem: atmodemN, token: pushToken } }
  let panic_1 = { type: "R", type_sub: "car_controll", data: { command: '+SCMD=' + atmodemN + '/C:pn', modem: atmodemN, token: pushToken } }
  let warn_0 = { type: "R", type_sub: "car_controll", data: { command: '+SCMD=' + atmodemN + '/C:hf', modem: atmodemN, token: pushToken } }
  let warn_1 = { type: "R", type_sub: "car_controll", data: { command: '+SCMD=' + atmodemN + '/C:hn', modem: atmodemN, token: pushToken } }
  let trunk_1 = { type: "R", type_sub: "car_controll", data: { command: '+SCMD=' + atmodemN + '/C:tu', modem: atmodemN, token: pushToken } }
  let boot_0 = { type: "R", type_sub: "car_controll", data: { command: '+SCMD=' + atmodemN + '/C:ef', modem: atmodemN, token: pushToken } }
  let boot_1 = { type: "R", type_sub: "car_controll", data: { command: '+SCMD=' + atmodemN + '/C:en', modem: atmodemN, token: pushToken } }

  //모뎀 유저 무슨상태 커맨드
  function lomofc(txt) {

    setCommandtxt(txt)
    setLoadModal(true)
    setTimeout(() => {
      setLoadModal(false)
      setCompleteModal(true)
      setTimeout(() => {
        setCompleteModal(false)
      }, 1500);
    }, 1500);
  }


  function timecalcul() {

    if (rrtime - new Date() <= 0) {
      setBoot(false)
      clearInterval(interval)
      setBootrest('00:00')
      setAtIsboot(false)


      try {
        // client.write(JSON.stringify(boot_0))
        // console.log('전송 : ' + JSON.stringify(boot_0))

        if (isRemote == true) {
          setIsRemote(false)
        }

      } catch (error) {
        console.log(error)
        // client.connect({ port: 3400, host: '175.126.232.72' })
        // client.write(JSON.stringify(boot_0))
        // console.log('전송 : ' + JSON.stringify(boot_0))
      }

      lomofc('원격시동 끄기')
    } else {
      let tt = String((rrtime - new Date()) / 1000).split('.')[0];
      // console.log(tt)

      if (tt.length === 1) {
        var time = parseInt(tt[0])
        // console.log(time)
      } else if (tt.length === 2) {
        var time = parseInt(tt[0] + tt[1])
        // console.log(time)
      } else if (tt.length === 3) {
        var time = parseInt(tt[0] + tt[1] + tt[2])
        // console.log(time)
      } else if (tt.length === 4) {
        var time = parseInt(tt[0] + tt[1] + tt[2] + tt[3])
        // console.log(time)
      }

      var min = parseInt((time % 3600) / 60);
      var sec = time % 60;
      if (String(sec).length == 1) {
        console.log(String(sec).length)
        setBootrest(min + ':0' + sec)
      } else {
        console.log(String(sec).length)
        setBootrest(min + ':' + sec)
      }

      console.log(min + ':' + sec)
    }
  }


  const [boot, setBoot] = useState(false)
  const [door, setDoor] = useState('no')
  const [panic, setPanic] = useState('no')
  const [warnbim, setWarnbim] = useState('no')
  const [trunk, setTrunk] = useState(false)


  function doorClick(is) {

    if (atCertifyState === 'good') {

      if (is == 'lock') {

        setDoor('on')
        //Alert.alert('door_0')

        lomofc('도어 LOCK')

        if (atActionSound === false) {
          doorOnSound()
        }


        door_1 = JSON.stringify(door_1)

        console.log(client._state)

        try {
          client.write(door_1)
          console.log('전송 : ' + door_1)
        } catch (error) {
          console.log(error)
          redirect('dl')
        }

        setTimeout(() => {
          setDoor('no')
        }, 4000);

      }


      if (is == 'unlock') {

        setDoor('off')
        // Alert.alert('door_1')

        lomofc('도어 UNLOCK')

        if (atActionSound === false) {
          doorOnSound()
        }

        door_0 = JSON.stringify(door_0)
        try {
          client.write(door_0)
          console.log('전송 : ' + door_0)
        } catch (error) {
          console.log(error)
          redirect('du')
        }


        setTimeout(() => {
          setDoor('no')
        }, 4000);
      }

    } else if (atCertifyState === 'no_certification') {
      Alert.alert('미인증 상태입니다.')
    } else if (atCertifyState === 'no_state') {
      Alert.alert('상태값이 없습니다.')
    } else if (atCertifyState === 'nono') {
      Alert.alert('서버와 연동되지 않았습니다.')
    }



  }//도어 제어

  function panicClick(is) {

    if (atCertifyState === 'good') {

      if (is == 'on') {
        setPanic('on')
        //Alert.alert('panic_0')


        lomofc('패닉 ON')


        panic_1 = JSON.stringify(panic_1)
        try {
          client.write(panic_1)
          console.log('전송 : ' + panic_1)
        } catch (error) {
          console.log(error)
          redirect('pn')
        }

        setTimeout(() => {
          setPanic('no')
        }, 4000);

        if (atActionSound === false) {
          panicOnSound()
        }

      }

      if (is == 'off') {
        setPanic('off')

        lomofc('패닉 OFF')

        panic_0 = JSON.stringify(panic_0)
        try {
          client.write(panic_0)
          console.log('전송 : ' + panic_0)
        } catch (error) {
          console.log(error)
          redirect('pf')
        }

        setTimeout(() => {
          setPanic('no')
        }, 4000);
      }

    } else if (atCertifyState === 'no_certification') {
      Alert.alert('미인증 상태입니다.')
    } else if (atCertifyState === 'no_state') {
      Alert.alert('상태값이 없습니다.')
    } else if (atCertifyState === 'nono') {
      Alert.alert('서버와 연동되지 않았습니다.')
    }


  }

  function warnClick(is) {

    if (atCertifyState === 'good') {

      if (is == 'on') {
        setWarnbim('on')
        //Alert.alert('emergency_0')

        lomofc('비상등 ON')

        warn_1 = JSON.stringify(warn_1)
        try {
          client.write(warn_1)
          console.log('전송 : ' + warn_1)
        } catch (error) {
          console.log(error)

          redirect('hn')
        }


        setTimeout(() => {
          setWarnbim('no')
        }, 4000);
        if (atActionSound === false) {
          WarnSound()
        }
      }

      if (is == 'off') {
        setWarnbim('off')
        // Alert.alert('emergency_1')

        lomofc('비상등 OFF')

        warn_0 = JSON.stringify(warn_0)
        try {
          client.write(warn_0)
          console.log('전송 : ' + warn_0)
        } catch (error) {
          console.log(error)
          redirect('hf')
        }


        setTimeout(() => {
          setWarnbim('no')
        }, 4000);

      }

    } else if (atCertifyState === 'no_certification') {
      Alert.alert('미인증 상태입니다.')
    } else if (atCertifyState === 'no_state') {
      Alert.alert('상태값이 없습니다.')
    } else if (atCertifyState === 'nono') {
      Alert.alert('서버와 연동되지 않았습니다.')
    }


  }

  function trunkClick() {

    if (atCertifyState === 'good') {


      setTrunk(true)

      lomofc('트렁크 OPEN')

      trunk_1 = JSON.stringify(trunk_1)
      try {
        client.write(trunk_1)
        console.log('전송 : ' + trunk_1)
      } catch (error) {
        console.log(error)
        redirect('tu')
      }

      setTimeout(() => {
        setTrunk(false)
      }, 4000);
      if (atActionSound === false) {
        TrunkOpenSound()
      }

    } else if (atCertifyState === 'no_certification') {
      Alert.alert('미인증 상태입니다.')
    } else if (atCertifyState === 'no_state') {
      Alert.alert('상태값이 없습니다.')
    } else if (atCertifyState === 'nono') {
      Alert.alert('서버와 연동되지 않았습니다.')
    }


  }

  function bootClick() {

    if (atCertifyState === 'good') {

      if (boot == false) {

        setBoot(true)
        setAtIsboot(true)

        lomofc('원격시동 켜기')

        boot_1 = JSON.stringify(boot_1)
        try {
          client.write(boot_1)
          console.log('전송 : ' + boot_1)
        } catch (error) {
          console.log(error)
          redirect('en')
        }


        if (atActionSound === false) {
          bootOnSound()
        }

        // let bbtime;
        // if (atBootTime === '3') {
        //   bbtime = 180
        // } else if (atBootTime === '5') {
        //   bbtime = 300
        // } else if (atBootTime === '10') {
        //   bbtime = 600
        // }

        rrtime = new Date()

        rrtime.setMinutes(rrtime.getMinutes() + parseInt(atBootTime))

        interval = setInterval(() => {
          timecalcul()
        }, 1000);

      } else {

        lomofc('원격시동 끄기')

        setBoot(false)
        clearInterval(interval)
        setBootrest('00:00')
        // rrtime = 600
        setAtIsboot(false)

        boot_0 = JSON.stringify(boot_0)
        try {
          client.write(boot_0)
          console.log('전송 : ' + boot_0)
        } catch (error) {
          console.log(error)
          redirect('ef')
        }

        if (isRemote === true) {
          setIsRemote(false)
          client.once('data', (data) => {
            var command = '' + data

            if (atmodemN == command.split('/')[0]) {
              if (command.split('/')[4][3] === 'i') {
                console.log('원격 시동 on 상태 확인')
                setAtIsboot(true)
                setBoot(true)

                rrtime = new Date()

                rrtime.setMinutes(rrtime.getMinutes() + parseInt(command.split('/')[4][4] + command.split('/')[4][5]))
                rrtime.setSeconds(rrtime.getSeconds() + parseInt(command.split('/')[4][6] + command.split('/')[4][7]))

                interval = setInterval(() => {
                  timecalcul()
                }, 1000);

              }//차량 원격 시동 타이머 값 받아와서 설정해야함.
            }
          })
        }

      }

    } else if (atCertifyState === 'no_certification') {
      Alert.alert('미인증 상태입니다.')
    } else if (atCertifyState === 'no_state') {
      Alert.alert('상태값이 없습니다.')
    } else if (atCertifyState === 'nono') {
      Alert.alert('서버와 연동되지 않았습니다.')
    }


  }

  function redirect(ccc) {
    client.destroy()
    console.log(client._destroyed)

    setTimeout(() => {
      client.connect({ port: 3400, host: '175.126.232.72' })
      console.log(client._destroyed)
      setTimeout(() => {
        client.write(JSON.stringify({ type: "R", type_sub: "car_controll", data: { command: '+SCMD=' + atmodemN + '/C:' + ccc, modem: atmodemN, token: pushToken } }))
        console.log('전송 : ' + JSON.stringify(boot_0))
      }, 1000);
    }, 1000);
  }

  function writeData(socket, data) {
    console.log('전송!')
    try {
      socket.write(data);
    } catch (error) {
      (function (socket, data) {
        socket.once('drain', function () {
          writeData(socket, data);
        });
      })(socket, data);

    }
  }



  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <FlingGestureHandler
        direction={Directions.LEFT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            navigation.navigate('설정')
            Vibration.vibrate(50)
          }
        }}>
        <FlingGestureHandler
          direction={Directions.DOWN}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) {
              navigation.navigate('차량상태')
              Vibration.vibrate(50)
            }
          }}>
          <FlingGestureHandler
            direction={Directions.RIGHT}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.ACTIVE) {
                navigation.navigate('차량등록')
                Vibration.vibrate(50)
              }
            }}>


            <View style={{ width: '100%', height: '100%' }}>
              <View style={{ flex: 3 }}>
                <View style={{ flex: 0.2 }}></View>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start" }}>
                  <TouchableWithoutFeedback onPress={() => {
                    loadState()
                  }
                  }>
                    <Image source={smallLogo} style={{ marginLeft: 15 }}></Image>
                  </TouchableWithoutFeedback>
                </View>
                <View style={{ flex: 4 }}>
                  <TouchableWithoutFeedback onPress={() => writeData(client, 'socket Test!')}>
                    <Text style={styles.carnum}>12기 3456</Text>
                  </TouchableWithoutFeedback>
                  {
                    carRace == "SUV1" &&
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                      {(door == 'no' && panic == 'no' && warnbim == 'no' && trunk != true && boot != true) &&
                        <AutoHeightImage source={suv1_big} width={chwidth - 40} style={{ marginTop: -30 }}></AutoHeightImage>
                      }
                      {(door == 'on' || door == 'off') &&
                        <AutoHeightImage source={suvdooron} width={chwidth - 40} style={{ marginTop: -30 }}></AutoHeightImage>
                      }
                      {(panic == 'on' || panic == 'off') &&
                        <AutoHeightImage source={suvpanicon} width={chwidth - 40} style={{ marginTop: -30 }}></AutoHeightImage>
                      }
                      {(warnbim == 'on' || warnbim == 'off') &&
                        <AutoHeightImage source={suvbimon} width={chwidth - 40} style={{ marginTop: -30 }}></AutoHeightImage>
                      }
                      {(trunk == true) &&
                        <AutoHeightImage source={suvtrunkon} width={chwidth - 40} style={{ marginTop: -30 }}></AutoHeightImage>
                      }
                      {(boot == true && door != 'on' && panic != 'on' && warnbim != 'on' && trunk != true) &&
                        <AutoHeightImage source={suvbooton} width={chwidth - 40} style={{ marginTop: -30 }}></AutoHeightImage>
                      }
                    </View>
                  }

                  {
                    carRace == "SEDAN1" &&
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                      {(door == 'no' && panic == 'no' && warnbim == 'no' && trunk != true && boot != true) &&
                        <AutoHeightImage source={sedan1_big} width={chwidth - 40} style={{ marginTop: -30 }}></AutoHeightImage>
                      }
                      {(door == 'on' || door == 'off') &&
                        <AutoHeightImage source={dooron} width={chwidth - 40} style={{ marginTop: -30 }}></AutoHeightImage>
                      }
                      {(panic == 'on' || panic == 'off') &&
                        <AutoHeightImage source={panicon} width={chwidth - 40} style={{ marginTop: -30 }}></AutoHeightImage>
                      }
                      {(warnbim == 'on' || warnbim == 'off') &&
                        <AutoHeightImage source={bimon} width={chwidth - 40} style={{ marginTop: -30 }}></AutoHeightImage>
                      }
                      {trunk == true &&
                        <AutoHeightImage source={trunkon} width={chwidth - 40} style={{ marginTop: -30 }}></AutoHeightImage>
                      }
                      {(boot == true && door == 'no' && panic == 'no' && warnbim == 'no' && trunk == false) &&
                        <AutoHeightImage source={booton} width={chwidth - 40} style={{ marginTop: -30 }}></AutoHeightImage>
                      }
                    </View>
                  }

                  {
                    (carRace !== "SEDAN1" && carRace !== "SUV1") &&
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ marginTop: 50 }}>차량을 등록해주세요</Text>
                    </View>
                  }

                </View>
              </View>


              <TouchableWithoutFeedback onPress={() => { bootClick() }}>
                {
                  boot ?
                    <View style={{ width: chwidth - 32, flex: 0.8, backgroundColor: "#f0f1f5", borderStyle: "solid", borderWidth: 2, borderColor: "#f75929", marginLeft: 16, borderRadius: 10, justifyContent: 'center' }}>
                      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                          <Image source={startoffbtn} style={{ marginLeft: 26, marginRight: 8 }}></Image>
                          <Text style={styles.starttxt}>원격시동 끄기</Text>
                        </View>
                        <Text style={styles.Onclocktxt}>{bootrest}</Text>
                      </View>
                    </View>

                    :
                    <View style={{ width: chwidth - 32, flex: 0.8, backgroundColor: "#f0f1f5", borderStyle: "solid", borderWidth: 2, borderColor: "#f0f1f5", marginLeft: 16, borderRadius: 10, justifyContent: 'center' }}>
                      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                          <Image source={startbtn} style={{ marginLeft: 26, marginRight: 8 }}></Image>
                          <Text style={styles.starttxt}>원격시동 켜기</Text>
                        </View>
                        <Text style={styles.clocktxt}>00:00</Text>
                      </View>
                    </View>

                }
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.2 }}></View>

              <View style={{ flex: 2, flexDirection: 'row', marginLeft: 16 }}>
                <View style={{ width: chwidth / 2 - 21, backgroundColor: "#f0f1f5", borderRadius: 10 }}>
                  <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                    {door == 'no' && <Image source={lockgray}></Image>}
                    {door == 'off' && <Image source={lockNoSelect}></Image>}
                    {door == 'on' && <Image source={lockSelect}></Image>}

                    <Text style={styles.titletxt}>도어</Text>
                  </View>

                  {door == 'no' &&
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                      <TouchableWithoutFeedback onPress={() => doorClick('unlock')}>
                        <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={styles.btntxt}>unlock</Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <View style={{ flex: 0.02 }}></View>
                      <TouchableWithoutFeedback onPress={() => doorClick('lock')}>
                        <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={styles.btntxt}>lock</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  }

                  {door == 'off' &&
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                      <TouchableWithoutFeedback onPress={() => doorClick('unlock')}>
                        <View style={{ flex: 1, backgroundColor: "rgb(68,73,80)", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={styles.btntxt}>unlock</Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <View style={{ flex: 0.02 }}></View>
                      <TouchableWithoutFeedback onPress={() => doorClick('lock')}>
                        <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={styles.btntxt}>lock</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  }
                  {door == 'on' &&
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                      <TouchableWithoutFeedback onPress={() => doorClick('unlock')}>
                        <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={styles.btntxt}>unlock</Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <View style={{ flex: 0.02 }}></View>
                      <TouchableWithoutFeedback onPress={() => doorClick('lock')}>
                        <View style={{ flex: 1, backgroundColor: "#f75929", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={styles.btntxt}>lock</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  }


                </View>

                <View style={{ width: chwidth / 2 - 21, backgroundColor: "#f0f1f5", marginLeft: 10, borderRadius: 10 }}>
                  <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                    {panic == 'no' && <Image source={panicgray}></Image>}
                    {panic == 'off' && <Image source={panicNOSelect}></Image>}
                    {panic == 'on' && <Image source={panicSelect}></Image>}

                    <Text style={styles.titletxt}>패닉</Text>
                  </View>

                  {panic == 'no' &&
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                      <TouchableWithoutFeedback onPress={() => panicClick('off')}>
                        <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={styles.btntxt}>off</Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <View style={{ flex: 0.02 }}></View>
                      <TouchableWithoutFeedback onPress={() => panicClick('on')}>
                        <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={styles.btntxt}>on</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  }

                  {panic == 'off' &&
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                      <TouchableWithoutFeedback onPress={() => panicClick('off')}>
                        <View style={{ flex: 1, backgroundColor: "rgb(68,73,80)", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={styles.btntxt}>off</Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <View style={{ flex: 0.02 }}></View>
                      <TouchableWithoutFeedback onPress={() => panicClick('on')}>
                        <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={styles.btntxt}>on</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  }

                  {panic == 'on' &&
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                      <TouchableWithoutFeedback onPress={() => panicClick('off')}>
                        <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={styles.btntxt}>off</Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <View style={{ flex: 0.02 }}></View>
                      <TouchableWithoutFeedback onPress={() => panicClick('on')}>
                        <View style={{ flex: 1, backgroundColor: "#f75929", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={styles.btntxt}>on</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  }


                </View>
              </View>

              <View style={{ flex: 0.2 }}></View>

              <View style={{ flex: 2, flexDirection: 'row', marginLeft: 16, marginBottom: 40 }}>
                <View style={{ width: chwidth / 2 - 21, backgroundColor: "#f0f1f5", borderRadius: 10 }}>
                  <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                    {warnbim == 'no' && <Image source={warngray}></Image>}
                    {warnbim == 'off' && <Image source={warnNoSelect}></Image>}
                    {warnbim == 'on' && <Image source={warnSelect}></Image>}

                    <Text style={styles.titletxt}>비상등</Text>
                  </View>

                  {warnbim == 'no' &&
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                      <TouchableWithoutFeedback onPress={() => warnClick('off')}>
                        <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={styles.btntxt}>off</Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <View style={{ flex: 0.02 }}></View>
                      <TouchableWithoutFeedback onPress={() => warnClick('on')}>
                        <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={styles.btntxt}>on</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  }

                  {warnbim == 'off' &&
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                      <TouchableWithoutFeedback onPress={() => warnClick('off')}>
                        <View style={{ flex: 1, backgroundColor: "rgb(68,73,80)", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={styles.btntxt}>off</Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <View style={{ flex: 0.02 }}></View>
                      <TouchableWithoutFeedback onPress={() => warnClick('on')}>
                        <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={styles.btntxt}>on</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  }

                  {warnbim == 'on' &&
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                      <TouchableWithoutFeedback onPress={() => warnClick('off')}>
                        <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={styles.btntxt}>off</Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <View style={{ flex: 0.02 }}></View>
                      <TouchableWithoutFeedback onPress={() => warnClick('on')}>
                        <View style={{ flex: 1, backgroundColor: "#f75929", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={styles.btntxt}>on</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  }

                </View>
                <View style={{ width: chwidth / 2 - 21, backgroundColor: "#f0f1f5", marginLeft: 10, borderRadius: 10 }}>
                  <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                    {trunk ?
                      <Image source={trunkSelect}></Image>
                      :
                      <Image source={trunkgray}></Image>
                    }

                    <Text style={styles.titletxt}>트렁크</Text>
                  </View>
                  <View style={{ flex: 2, flexDirection: 'row' }}>

                    {trunk ? <TouchableWithoutFeedback onPress={() => trunkClick()}>
                      <View style={{ flex: 1, backgroundColor: "#f75929", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.btntxt}>open</Text>
                      </View>
                    </TouchableWithoutFeedback>
                      :
                      <TouchableWithoutFeedback onPress={() => trunkClick()}>
                        <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={styles.btntxt}>open</Text>
                        </View>
                      </TouchableWithoutFeedback>}
                  </View>
                </View>
              </View>

            </View>

          </FlingGestureHandler>
        </FlingGestureHandler>
      </FlingGestureHandler>


      <Modal visible={loadModal} transparent={true} animationType={'fade'}>
        <SafeAreaView style={{ width: chwidth, height: chheight, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{
            width: chwidth - 80,
            height: 80,
            backgroundColor: 'white',
            marginTop: -200,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={styles.modaltxt}>{commandtxt} 명령을</Text>
            <Text style={styles.modaltxt}>실행 중 입니다.</Text>
          </View>
        </SafeAreaView>
      </Modal>

      <Modal visible={completeModal} transparent={true} animationType={'fade'}>
        <SafeAreaView style={{ width: chwidth, height: chheight, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{
            width: chwidth - 80,
            height: 80,
            backgroundColor: 'white',
            marginTop: -200,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 14,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,
          }}>
            <Text style={styles.modaltxt}>{commandtxt} 명령을</Text>
            <Text style={styles.modaltxt}>실행하였습니다.</Text>
          </View>
        </SafeAreaView>
      </Modal>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  starttxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#4e535a"
  },
  btntxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    color: "#f8f8f8"
  },
  titletxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#4e535a"
  },
  clocktxt: {
    opacity: 0.3,
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "right",
    color: "#252525",
    marginRight: 24
  },
  carnum: {
    opacity: 0.4,
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#040404",
    marginLeft: 16
  },
  Onclocktxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "right",
    color: "#f75929",
    marginRight: 24
  },
  modaltxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "black",
    width: chwidth - 80,
    textAlign: 'center'
  }
})

export default React.memo(Carcontroll)