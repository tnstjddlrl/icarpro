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
  Modal,
  BackHandler
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ToggleSwitch from 'toggle-switch-react-native'

import RNExitApp from 'react-native-kill-app';
import RNRestart from 'react-native-restart';


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
  StateCarVolt,
  easyPWDIsOn
} from './atom/atoms'

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

import axios from 'axios';
import AutoHeightImage from 'react-native-auto-height-image';


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

//푸터 아이콘
const bb1 = require('../bottombtn/bb1.png')
const bb2 = require('../bottombtn/bb2.png')
const bb3 = require('../bottombtn/bb3.png')
const bb4 = require('../bottombtn/bb4.png')
const bb1r = require('../bottombtn/bb1r.png')
const bb2r = require('../bottombtn/bb2r.png')
const bb3r = require('../bottombtn/bb3r.png')
const bb4r = require('../bottombtn/bb4r.png')


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

  const [atEasyPWDIsOn, setAtEasyPWDIsOn] = useRecoilState(easyPWDIsOn)

  // 

  function exitAppAlert() {
    Alert.alert(
      "서버 오류",
      "서버 오류가 지속되면 고객센터로 문의해주세요.",
      [
        { text: "OK", onPress: () => RNRestart.Restart() }
      ]
    )
  }

  useEffect(() => {
    const backAction = () => {

      navigation.goBack()

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  const [icarswitch, seticarswitch] = useState(aticarswitch)
  const [idoorswitch, setidoorswitch] = useState(atidoorswitch)
  const [lowboltBoot, setlowboltBoot] = useState(atlowboltBoot)
  const [lowboltAlert, setlowboltAlert] = useState(atlowboltAlert)
  const [actionsound, setactionsound] = useState(atactionsound)
  const [alertsound, setalertsound] = useState(atalertsound)

  const [easyPwdIson, seteasyPwdIson] = useState(atEasyPWDIsOn)

  useEffect(() => {
    seticarswitch(aticarswitch)
    setidoorswitch(atidoorswitch)
    setlowboltBoot(atlowboltBoot)
    setlowboltAlert(atlowboltAlert)
    setactionsound(atactionsound)
    setalertsound(atalertsound)
  }, [aticarswitch, atidoorswitch, atlowboltBoot, atlowboltAlert, atactionsound, atalertsound])

  function sendCommand(cc) {
    try {
      let comm = { type: "R", type_sub: "car_controll", data: { command: '+SCMD=' + atmodemN + '/S:' + cc, modem: atmodemN, token: pushToken } }

      comm = JSON.stringify(comm)

      client.write(comm)
      console.log('전송 : ' + comm)

    } catch (error) {
      exitAppAlert()
    }
  }

  function lowbat() {
    if (lowboltBoot == true) {
      console.log('완료')
      return 'l1'
    } else if (lowboltAlert == true) {
      console.log('완료')

      return 'l2'
    } else {
      console.log('완료')

      return 'l0'
    }
  }

  function sendAllCommand() {
    let cc = (icarswitch == true ? 'mi' : 'mo') + (idoorswitch == true ? 'di' : 'do') + 'tihisiri' + lowbat() + (actionsound == true ? '1i' : '1o') + (alertsound == true ? '2i' : '2o')


    try {
      let comm = {
        type: "R", type_sub: "car_controll", data: {
          command: '+SCMD=' + atmodemN + '/S:' + cc, modem: atmodemN, token: pushToken
        }
      }

      comm = JSON.stringify(comm)

      client.write(comm)
      console.log('전송 : ' + comm)

      // Alert.alert('설정', '저장이 완료되었습니다!')
    } catch (error) {
      exitAppAlert()
    }
  }


  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (atStateWaitTime === false) {
        loadState()
        setAtStateWaitTime(true)
        setTimeout(() => {
          setAtStateWaitTime(false)
        }, 1000);
      }
    });

    return unsubscribe;
  }, [navigation]);


  const loadState = async () => {
    try {
      client.write(JSON.stringify({ type: "R", type_sub: "car_controll", data: { command: '+SCMD=' + atmodemN + '/C:st', modem: atmodemN, user: atuserN, token: pushToken } }))
      console.log('전송 ' + JSON.stringify({ type: "R", type_sub: "car_controll", data: { command: '+SCMD=' + atmodemN + '/C:st', modem: atmodemN, user: atuserN, token: pushToken } }))
    } catch (error) {
      console.log(error)

      exitAppAlert()
    }
  }


  function savebtnclick() {
    if (stLimit === false) {
      sendAllCommand()

      setStLimit(true)

      setSaveModal(true)

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
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      {/* 헤더 */}
      <View style={{ height: 60, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 32, marginLeft: 16, }}>
        <View><TouchableWithoutFeedback onPress={() => navigation.goBack()}><Image source={back}></Image></TouchableWithoutFeedback></View>
        <Text style={styles.maintxt}>설정</Text>
        <TouchableWithoutFeedback onPress={() => savebtnclick()}>
          <Text style={styles.savetxt}>저장</Text>
        </TouchableWithoutFeedback>
      </View>
      {/* 헤더 끝 */}

      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 0, }}>
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
                      if (isOn === true) {
                        // sendCommand('mn')
                      } else {
                        // sendCommand('mf')
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
                    onToggle={isOn => {
                      setidoorswitch(isOn)
                      if (isOn === true) {
                        // sendCommand('dn')
                      } else {
                        // sendCommand('df')
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
                    onToggle={isOn => {
                      setlowboltAlert(false)
                      setlowboltBoot(isOn)
                      if (isOn === true) {
                        // sendCommand('le')
                      } else {
                        if (lowboltAlert === isOn) {
                          // sendCommand('lf')
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
                    onToggle={isOn => {
                      setlowboltAlert(isOn)
                      setlowboltBoot(false)
                      if (isOn === true) {
                        // sendCommand('la')
                      } else {
                        if (lowboltBoot === false) {
                          // sendCommand('lf')
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
                    onToggle={isOn => {
                      setactionsound(isOn)
                      if (isOn === true) {
                        // sendCommand('1n')
                      } else {
                        // sendCommand('1f')
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
                    onToggle={isOn => {
                      setalertsound(isOn)
                      if (isOn === true) {
                        // sendCommand('2n')
                      } else {
                        // sendCommand('2f')
                      }
                    }}
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


              <View style={{
                width: chwidth - 32,
                height: 110,
                borderRadius: 6,
                backgroundColor: "#f0f1f5",
                justifyContent: "center",
                marginBottom: 15
              }}>
                <View style={{ marginLeft: 11, marginRight: 16, flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Image source={lockIcon}></Image>
                    <Text style={styles.frameTitle}>i도어 비밀번호</Text>
                  </View>
                  <ToggleSwitch
                    isOn={easyPwdIson}
                    onColor="#f75929"
                    offColor="#d1d2d6"
                    onToggle={isOn => {
                      seteasyPwdIson(isOn)
                      AsyncStorage.setItem("@easy_PWD_IsOn", JSON.stringify(isOn))
                      setAtEasyPWDIsOn(isOn)
                      console.log('저장완료 ' + isOn)
                    }}
                  />
                </View>

                <View style={{ width: chwidth - 32, flexDirection: "row", justifyContent: 'flex-end' }}>
                  <View style={{ height: 1, backgroundColor: "#e1e1e3", width: chwidth - 80, marginTop: 17 }}></View>
                </View>

                <TouchableWithoutFeedback onPress={() => navigation.navigate('간편비밀번호', { whocall: 'setting' })}>
                  <View style={{ marginLeft: 11, marginRight: 16, marginTop: 19, flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: 24, height: 24 }}></View>
                      <Text style={styles.framecon}>비밀번호 설정</Text>
                    </View>
                    <Image source={rightArr}></Image>
                  </View>
                </TouchableWithoutFeedback>

              </View>

            </View>

            <View style={{ marginTop: 60, marginBottom: 1 }}></View>


            {/* 본문 끝 */}


          </View>
        </ScrollView>
      </View>

      {/* 푸터 시작 */}
      <View style={{ width: '100%' }}>
        <View style={{ width: chwidth - 30, marginLeft: 15, marginBottom: 10, borderRadius: 10, backgroundColor: 'rgb(237,239,243)', }}>

          <View style={{ width: chwidth - 100, marginLeft: 30, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8, marginBottom: 6 }}>

            <TouchableWithoutFeedback onPress={() => { navigation.navigate('차량등록') }}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <AutoHeightImage source={bb1} width={30}></AutoHeightImage>
                <Text style={{ fontSize: 11.5, color: 'rgb( 78, 83, 90)', letterSpacing: -1.38, }}>인증</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => { navigation.navigate('차량제어') }}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <AutoHeightImage source={bb2} width={30}></AutoHeightImage>
                <Text style={{ fontSize: 11.5, color: 'rgb( 78, 83, 90)', letterSpacing: -1.38, }}>제어</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => { navigation.navigate('차량상태') }}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <AutoHeightImage source={bb3} width={30}></AutoHeightImage>
                <Text style={{ fontSize: 11.5, color: 'rgb( 78, 83, 90)', letterSpacing: -1.38, }}>상태</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => { navigation.navigate('설정') }}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <AutoHeightImage source={bb4r} width={30}></AutoHeightImage>
                <Text style={{ fontSize: 11.5, color: 'rgb(247, 89, 41)', letterSpacing: -1.38, }}>설정</Text>
              </View>
            </TouchableWithoutFeedback>

          </View>
        </View>
      </View>
      {/* 푸터 끝 */}



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