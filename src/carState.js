import React, { useState, useEffect, useCallback } from 'react';
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
  ImageBackground
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  RecoilRoot,
  atom,
  selector,
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
  StateCarVolt
} from './atom/atoms'

import client from './Client'

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height


const back = require('../img/backbtn.png')

const warnOn = require('../img/topviewstate/warnOn.png')
const bootOn = require('../img/topviewstate/bootOn.png')
const doorlockOn = require('../img/topviewstate/doorlockOn.png')
const doorOn = require('../img/topviewstate/doorOn.png')
const enginestateOn = require('../img/topviewstate/enginestateOn.png')
const enginehoodOn = require('../img/topviewstate/enginehoodOn.png')
const trunkOn = require('../img/topviewstate/trunkOn.png')



const warnIcon = require('../img/state/warnIcon.png')

const lockIcon = require('../img/state/lockIcon.png')
const doorIcon = require('../img/state/doorIcon.png')
const trunkIcon = require('../img/state/trunkIcon.png')
const hoodIcon = require('../img/state/hoodIcon.png')
const stateIcon = require('../img/state/stateIcon.png')
const bootIcon = require('../img/state/bootIcon.png')
const voltIcon = require('../img/state/voltIcon.png')

const CarState = () => {
  const navigation = useNavigation()

  const [atStateCarAlert, setAtStateCarAlert] = useRecoilState(StateCarAlert)
  const [atStateDoorLock, setAtStateDoorLock] = useRecoilState(StateDoorLock)
  const [atStateDoor, setAtStateDoor] = useRecoilState(StateDoor)
  const [atStateTrunk, setAtStateTrunk] = useRecoilState(StateTrunk)
  const [atStateEngineHood, setAtStateEngineHood] = useRecoilState(StateEngineHood)
  const [atStateEngineState, setAtStateEngineState] = useRecoilState(StateEngineState)
  const [atStateCarVolt, setAtStateCarVolt] = useRecoilState(StateCarVolt)

  const [syncCarState, SetSyncCarState] = useState('')

  useEffect(() => {
    if (syncCarState === '') {

    } else {

    }
  }, [syncCarState])


  const [pushToken, setPushToken] = useRecoilState(fcmToken)
  const isbooton = useRecoilValue(isBootOn)
  const boottime = useRecoilValue(bootRestTime)

  function registerClick() {
    var txt = { type: "R", type_sub: "req_state", data: { token: pushToken } }
    txt = JSON.stringify(txt)

    client.write(txt)
    console.log('전송 : ' + txt)
  }

  useEffect(() => {
    client.on('data', function (data) {

    })
  }, [])




  return (
    <SafeAreaView style={{ width: chwidth, height: chheight, backgroundColor: 'white' }}>
      {/* 헤더 */}
      <View style={{ flex: 0.8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View><Image source={back}></Image></View>
        </TouchableWithoutFeedback>
        <Text style={styles.maintxt}>차량 상태</Text>
        <View style={{ width: 30 }}></View>
      </View>
      {/* 헤더 끝 */}

      {/* 본문 */}
      <View style={{ flex: 10 }}>
        {/* 차량 이미지 */}
        <View style={{ justifyContent: "center", alignItems: "center", flex: 5 }}>
          <TouchableOpacity onPress={() => registerClick()}>
            <ImageBackground style={{opacity:0.9}} source={warnOn}>
              <Image style={{opacity:0.5}} source={trunkOn}></Image>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        {/* 차량 이미지 끝 */}



        {/* 상태 부분 */}

        {/* 차량경계 도어락 */}
        <View style={{ flex: 1, width: chwidth - 32, marginLeft: 16, flexDirection: "row" }}>

          <View style={styles.frame}>
            <View style={{ flexDirection: "row", marginLeft: 10, marginRight: 16, justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row" }}>
                <Image source={warnIcon}></Image>
                <Text style={styles.frametxt}>차량 경계</Text>
              </View>
              <View>
                <Text style={styles.ontxt}>ON</Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 0.05 }}></View>

          <View style={styles.frame}>
            <View style={{ flexDirection: "row", marginLeft: 10, marginRight: 16, justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row" }}>
                <Image source={lockIcon}></Image>
                <Text style={styles.frametxt}>도어락</Text>
              </View>
              <View>
                <Text style={styles.offtxt}>OFF</Text>
              </View>
            </View>
          </View>

        </View>

        {/* 차량경계 도어락  끝*/}

        {/* 도어 트렁크 */}
        <View style={{ flex: 1, width: chwidth - 32, marginLeft: 16, flexDirection: "row" }}>

          <View style={styles.frame}>
            <View style={{ flexDirection: "row", marginLeft: 10, marginRight: 16, justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row" }}>
                <Image source={doorIcon}></Image>
                <Text style={styles.frametxt}>도어</Text>
              </View>
              <View>
                <Text style={styles.offtxt}>OFF</Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 0.05 }}></View>

          <View style={styles.frame}>
            <View style={{ flexDirection: "row", marginLeft: 10, marginRight: 16, justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row" }}>
                <Image source={trunkIcon}></Image>
                <Text style={styles.frametxt}>트렁크</Text>
              </View>
              <View>
                <Text style={styles.offtxt}>OFF</Text>
              </View>
            </View>
          </View>

        </View>
        {/* 도어 트렁크 끝 */}


        {/* 엔진후드 엔진상태 */}
        <View style={{ flex: 1, width: chwidth - 32, marginLeft: 16, flexDirection: "row" }}>

          <View style={styles.frame}>
            <View style={{ flexDirection: "row", marginLeft: 10, marginRight: 16, justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row" }}>
                <Image source={hoodIcon}></Image>
                <Text style={styles.frametxt}>엔진 후드</Text>
              </View>
              <View>
                <Text style={styles.offtxt}>OFF</Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 0.05 }}></View>

          <View style={styles.frame}>
            <View style={{ flexDirection: "row", marginLeft: 10, marginRight: 16, justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row" }}>
                <Image source={stateIcon}></Image>
                <Text style={styles.frametxt}>엔진 상태</Text>
              </View>
              <View>
                <Text style={styles.offtxt}>OFF</Text>
              </View>
            </View>
          </View>

        </View>
        {/* 엔진후드 엔진상태 끝*/}



        <View style={{ flex: 1, width: chwidth - 32, marginLeft: 16, flexDirection: "row" }}>
          <View style={styles.frame}>
            <View style={{ flexDirection: "row", marginLeft: 10, marginRight: 16, justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row" }}>
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


        <View style={{ flex: 1, width: chwidth - 32, marginLeft: 16, flexDirection: "row" }}>
          <View style={styles.frame}>
            <View style={{ flexDirection: "row", marginLeft: 10, marginRight: 16, justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row" }}>
                <Image source={voltIcon}></Image>
                <Text style={styles.frametxt}>차량 전압</Text>
              </View>
              <View>
                <Text style={styles.volttxt}>00.0V</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flex: 0.4 }}></View>


        {/* 상태 부분 끝 */}

      </View>
      {/* 본문 끝 */}


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  maintxt: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.24,
    color: "#393e46"
  },
  frame: {
    height: 54,
    borderRadius: 10,
    backgroundColor: "#f0f1f5",
    flex: 1,
    justifyContent: "center",
  },
  frametxt: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#4e535a",
    marginLeft: 6
  },
  ontxt: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "right",
    color: "#f75929"
  },
  offtxt: {
    opacity: 0.5,
    fontFamily: "AppleSDGothicNeo",
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "right",
    color: "#4e535a"
  },
  volttxt: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 15,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "right",
    color: "#4c5158"
  },
  spacetime: {
    opacity: 0.5,
    fontFamily: "AppleSDGothicNeo",
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
    fontFamily: "AppleSDGothicNeo",
    fontSize: 13,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: -0.5,
    textAlign: "right",
    color: "#f75929",
    marginTop: 2
  },
})

export default CarState