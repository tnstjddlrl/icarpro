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
  voltValue
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


let command = '123123/E:iiooo119o/D:ioooiio/L:iiiio/F:oo0000oooo/S:iiiioooooo120000oo'


const CarState = () => {
  const navigation = useNavigation()

  const [atStateCarAlert, setAtStateCarAlert] = useRecoilState(StateCarAlert)
  const [atStateDoorLock, setAtStateDoorLock] = useRecoilState(StateDoorLock)
  const [atStateDoor, setAtStateDoor] = useRecoilState(StateDoor)
  const [atStateTrunk, setAtStateTrunk] = useRecoilState(StateTrunk)
  const [atStateEngineHood, setAtStateEngineHood] = useRecoilState(StateEngineHood)
  const [atStateEngineState, setAtStateEngineState] = useRecoilState(StateEngineState)
  const [atStateCarVolt, setAtStateCarVolt] = useRecoilState(StateCarVolt)


  const pushToken = useRecoilValue(fcmToken)
  const isbooton = useRecoilValue(isBootOn)
  const boottime = useRecoilValue(bootRestTime)

  function registerClick() {
    try {
      var txt = { type: "R", type_sub: "req_state", data: { token: pushToken } }
      txt = JSON.stringify(txt)

      client.write(txt)
      console.log('전송 : ' + txt)

    } catch (e) {
      console.log(e)
      client.connect({ port: 3400, host: '175.126.232.72' })
      registerClick()
    }
  }

  useEffect(() => {
    // client.on('data', function (data) {

    // })

    //차량 경계 상태
    if (command.split('/')[1][2] === 'i') {
      setAtStateCarAlert('ON')
    } else if (command.split('/')[1][2] === 'o') {
      setAtStateCarAlert('OFF')
    }

    //엔진 상태
    if (command.split('/')[1][3] === 'i') {
      setAtStateEngineState('ON')
    } else if (command.split('/')[1][2] === 'o') {
      setAtStateEngineState('OFF')
    }

    //차량 전압
    setAtStateCarVolt(command.split('/')[1][7] + command.split('/')[1][8] + '.' + command.split('/')[1][9])

    //도어 열림 상태
    if (command.split('/')[2][2] === 'o' && command.split('/')[2][3] === 'o' && command.split('/')[2][4] === 'o' && command.split('/')[2][5] === 'o') {
      setAtStateDoor('OFF')
    } else {
      setAtStateDoor('ON')
    }

    //트렁크 상태
    if (command.split('/')[2][6] === 'i') {
      setAtStateTrunk('ON')
    } else if (command.split('/')[2][6] === 'o') {
      setAtStateTrunk('OFF')
    }

    //후드 상태
    if (command.split('/')[2][7] === 'i') {
      setAtStateEngineHood('ON')
    } else if (command.split('/')[2][7] === 'o') {
      setAtStateEngineHood('OFF')
    }

    //도어락 상태
    if (command.split('/')[3][2] === 'i' && command.split('/')[3][3] === 'i' && command.split('/')[3][4] === 'i' && command.split('/')[3][5] === 'i') {
      setAtStateDoorLock('ON')
    } else {
      setAtStateDoorLock('OFF')
    }

  }, [])




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
        <TouchableWithoutFeedback onPress={() => registerClick()}>
          <View style={{ justifyContent: "center", alignItems: "center", flex: 5 }}>
            <Image style={{ position: "absolute" }} source={mainframe}></Image>
            {(atStateDoorLock === 'OFF' && atStateDoor == 'OFF') &&
              <Image style={{ position: "absolute" }} source={doorcloseblack}></Image>
            }
            {(atStateDoorLock === 'ON' && atStateDoor === 'OFF') &&
              <Image style={{ position: "absolute" }} source={doorcloseorange}></Image>
            }
            {atStateDoor === 'ON' &&
              <Image style={{ position: "absolute" }} source={dooropen}></Image>
            }

            {(atStateEngineHood === 'ON' || atStateEngineState === 'ON') &&
              <Image style={{ position: "absolute" }} source={hoodorange}></Image>
            }
            {atStateTrunk === 'ON' &&
              <Image style={{ position: "absolute" }} source={trunkorange}></Image>
            }
            {atStateCarAlert === 'ON' &&
              <Image style={{ position: "absolute" }} source={lightorange}></Image>
            }
            {isbooton &&
              <Image style={{ position: "absolute" }} source={bootorange}></Image>
            }

            {atStateEngineHood === 'ON' &&
              <Image style={{ position: "absolute" }} source={hoodsticon}></Image>
            }
            {atStateEngineState === 'ON' &&
              <Image style={{ position: "absolute" }} source={enginesticon}></Image>
            }
            {atStateTrunk === 'ON' &&
              <Image style={{ position: "absolute" }} source={trunksticon}></Image>
            }

            {atStateDoorLock === 'ON' &&
              <Image style={{ position: "absolute" }} source={doorlocksticon}></Image>
            }
            {(atStateDoor === 'ON') &&
              <Image style={{ position: "absolute" }} source={dooropensticon}></Image>
            }
            {atStateCarAlert === 'ON' &&
              <Image style={{ position: "absolute" }} source={lightsticon}></Image>
            }
            {isbooton &&
              <Image style={{ position: "absolute" }} source={bootsticon}></Image>
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