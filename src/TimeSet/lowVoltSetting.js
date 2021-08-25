import React, { useState, useEffect, useRef } from 'react';
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
  ScrollView,
  Modal
} from 'react-native';


import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useRecoilState,
  useRecoilValue
} from 'recoil';
import { voltValue, voltValueLimit, fcmToken, modemNumber, userNumber } from '../atom/atoms'
import client from '../Client';

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

import RNRestart from 'react-native-restart';
function exitAppAlert() {
  Alert.alert(
    "서버 오류",
    "서버 오류가 지속되면 고객센터로 문의해주세요.",
    [
      { text: "OK", onPress: () => RNRestart.Restart() }
    ]
  )
}

const LowVoltSetting = () => {
  const navigation = useNavigation()

  const [saveModal, setSaveModal] = useState(false)

  const [lowvoltValue, setLowvoltValue] = useRecoilState(voltValue)
  const [lowvoltValueLimit, setLowvoltValueLimit] = useRecoilState(voltValueLimit)
  const pushToken = useRecoilValue(fcmToken)
  const atmodemN = useRecoilValue(modemNumber)
  const atuserN = useRecoilValue(userNumber)

  const [checkitem, setChechkitem] = useState(lowvoltValue)

  const [isy, setisy] = useState(0)

  const ii = useRef()

  useEffect(() => {
    if (checkitem === '11.8') {
      setisy(0)
      ii.current.scrollTo({ x: 0, y: 0 })
    } else if (checkitem === '11.9') {
      setisy(75)
      ii.current.scrollTo({ x: 0, y: 75 })
    } else if (checkitem === '12.0') {
      setisy(155)
      ii.current.scrollTo({ x: 0, y: 155 })
    } else if (checkitem === '12.1') {
      setisy(235)
      ii.current.scrollTo({ x: 0, y: 235 })
    } else if (checkitem === '12.2') {
      setisy(350)
      ii.current.scrollTo({ x: 0, y: 350 })
    }

  }, [])

  useEffect(() => {
    if (isy < 40) {
      setChechkitem('11.8')
    } else if (40 < isy && isy < 120) {
      setChechkitem('11.9')
    } else if (120 < isy && isy < 195) {
      setChechkitem('12.0')
    } else if (195 < isy && isy < 270) {
      setChechkitem('12.1')
    } else if (270 < isy) {
      setChechkitem('12.2')
    }
  }, [isy])



  function saveBtnClick() {
    if (lowvoltValueLimit === false) {

      try {
        sendCommand()
      } catch (error) {
        console.log(error)
        client.destroy()
        client.connect({ port: 3600, host: '175.126.232.72' })
        sendCommand()
        return
      }

      setLowvoltValueLimit(true)
      AsyncStorage.setItem("@lowvolt_Value", checkitem)

      setLowvoltValue(checkitem)

      setSaveModal(true)
      setTimeout(() => {
        setSaveModal(false)
        navigation.goBack()
      }, 1500);

      setTimeout(() => {
        setLowvoltValueLimit(false)

      }, 1000);
    } else {
      Alert.alert('설정 변경 유휴시간은 10초입니다.', '10초 후 시도해주세요')

    }

  }

  function sendCommand() {
    try {
      let cc = '0'
      if (checkitem === '11.8') {
        cc = 'lb=0'
      } else if (checkitem === '11.9') {
        cc = 'lb=1'
      } else if (checkitem === '12.0') {
        cc = 'lb=2'
      } else if (checkitem === '12.1') {
        cc = 'lb=3'
      } else if (checkitem === '12.2') {
        cc = 'lb=4'
      }
      let comm = { type: "R", type_sub: "car_controll", data: { command: '+SCMD=' + atmodemN + '/V:' + cc, modem: atmodemN, token: pushToken } }
      comm = JSON.stringify(comm)

      client.write(comm)
      console.log('전송 : ' + comm)

    } catch (error) {
      exitAppAlert()
    }
  }

  return (
    <SafeAreaView>
      <View style={{ width: chwidth, height: "100%" }}>
        {/* 헤더 */}
        <View style={{ flex: 0.8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Text style={styles.savetxt}>취소</Text>
          </TouchableWithoutFeedback>
          <Text style={styles.maintxt}>저전압 설정</Text>
          <TouchableWithoutFeedback onPress={() => saveBtnClick()}>
            <Text style={styles.savetxt}>저장</Text>
          </TouchableWithoutFeedback>
        </View>
        {/* 헤더 끝 */}

        {/* 본문 */}
        <View style={{ flex: 10 }}>
          <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.mask}>
                <Text style={styles.topchechktxt}>{checkitem}</Text>
              </View>
              <Text style={styles.masktxt2}>V</Text>
              <Text style={styles.masktxt}>oltage으로 설정됩니다.</Text>
            </View>
          </View>
          <View style={{ flex: 7 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <View style={{ height: 400, width: '70%' }}>
                <ScrollView ref={ii} onScroll={(res) => { setisy(res.nativeEvent.contentOffset.y), console.log(res.nativeEvent.contentOffset.y) }}
                  showsVerticalScrollIndicator={false}
                  scrollEventThrottle={8}
                >
                  <View style={{ height: 140 }}></View>

                  <Text style={isy < 40 ? styles.selecttxt : styles.noselecttxt}>11.8</Text>

                  <Text style={(40 < isy && isy < 120) ? styles.selecttxt : styles.noselecttxt}>11.9</Text>

                  <Text style={(120 < isy && isy < 195) ? styles.selecttxt : styles.noselecttxt}>12.0</Text>

                  <Text style={(195 < isy && isy < 270) ? styles.selecttxt : styles.noselecttxt}>12.1</Text>

                  <Text style={270 < isy ? styles.selecttxt : styles.noselecttxt}>12.2</Text>

                  <View style={{ height: 160 }}></View>
                </ScrollView>
              </View>
              <Text style={styles.sec}>V</Text>
              <View style={styles.indicator1}></View>
              <View style={styles.indicator2}></View>
            </View>

          </View>

          <View style={{ flex: 1 }}></View>

        </View>
        {/* 본문 끝 */}



        <Modal visible={saveModal} transparent={true} animationType={'fade'}>
          <SafeAreaView style={{ width: chwidth, height: chheight, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: chwidth - 80, height: 80, backgroundColor: 'white', marginTop: -200, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.maintxt}>설정한 내용이 저장되었습니다.</Text>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
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
  mask: {
    width: 75,
    height: 36,
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#bec0c2"
  },
  masktxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 22,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
    textAlign: "center",
    color: "#393e46"
  },
  masktxt2: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: 'normal',
    letterSpacing: -0.29,
    textAlign: "center",
    color: "#393e46",
    marginLeft: 5
  },
  selecttxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 50,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.67,
    textAlign: "center",
    color: 'rgb(49,54,61)',
    marginBottom: 30
  },
  noselecttxt: {
    opacity: 0.3,
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 40,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.53,
    textAlign: "center",
    color: 'rgb(49,54,61)',
    marginBottom: 30
  },
  noselecttxt2: {
    opacity: 0.3,
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 40,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.53,
    textAlign: "center",
    color: 'rgb(49,54,61)',
  },
  indicator1: {
    width: 97,
    height: 1,
    opacity: 0.3,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#979797",
    position: "absolute",
    top: '33%'
  },
  indicator2: {
    width: 97,
    height: 1,
    opacity: 0.3,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#979797",
    position: "absolute",
    top: '53%'
  },
  topchechktxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -1,
    textAlign: "center",
    color: 'rgb(49,54,61)',
    marginTop: Platform.OS === 'ios' ? 3 : 0
  },
  sec: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 40,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.53,
    textAlign: "right",
    color: 'rgb(49,54,61)',
    position: "absolute",
    right: '23%',
    bottom: '50%'
  }
})

export default LowVoltSetting