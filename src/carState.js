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

//푸터 아이콘
const bb1 = require('../bottombtn/bb1.png')
const bb2 = require('../bottombtn/bb2.png')
const bb3 = require('../bottombtn/bb3.png')
const bb4 = require('../bottombtn/bb4.png')
const bb1r = require('../bottombtn/bb1r.png')
const bb2r = require('../bottombtn/bb2r.png')
const bb3r = require('../bottombtn/bb3r.png')
const bb4r = require('../bottombtn/bb4r.png')

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



  // function registerClick() {
  //   try {
  //     var txt = { type: "R", type_sub: "req_state", data: { token: pushToken, modem: atmodemN } }

  //     client.write(JSON.stringify(txt))
  //     console.log('전송 : ' + JSON.stringify(txt))

  //   } catch (e) {
  //     console.log(e)
  //     client.destroy()
  //     console.log(client._destroyed)

  //     setTimeout(() => {
  //       client.connect({ port: 3600, host: '175.126.232.72' })
  //       console.log(client._destroyed)
  //       setTimeout(() => {
  //         client.write(JSON.stringify(txt))
  //         console.log('전송 : ' + JSON.stringify(txt))
  //       }, 1000);
  //     }, 1000);
  //   }
  // }

  const reqState = navigation.addListener('focus', async () => {
    if (atStateWaitTime === false) {
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
    try {
      client.write(JSON.stringify({ type: "R", type_sub: "start_state", data: { modem: atmodemN, user: atuserN, token: pushToken } }))
      console.log('전송 ' + JSON.stringify({ type: "R", type_sub: "start_state", data: { modem: atmodemN, user: atuserN, token: pushToken } }))
    } catch (error) {
      console.log(error)

      exitAppAlert()
    }
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
                  <AutoHeightImage source={bb3r} width={30}></AutoHeightImage>
                  <Text style={{ fontSize: 11.5, color: 'rgb(247, 89, 41)', letterSpacing: -1.38, }}>상태</Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => { navigation.navigate('설정') }}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <AutoHeightImage source={bb4} width={30}></AutoHeightImage>
                  <Text style={{ fontSize: 11.5, color: 'rgb( 78, 83, 90)', letterSpacing: -1.38, }}>설정</Text>
                </View>
              </TouchableWithoutFeedback>

            </View>
          </View>
        </View>
        {/* 푸터 끝 */}

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