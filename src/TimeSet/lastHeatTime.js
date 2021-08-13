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
  Modal,
  Platform
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useRecoilState,
  useRecoilValue
} from 'recoil';
import { lastHeatTimeValue, lastHeatTimeValueLimit, fcmToken, modemNumber, userNumber } from '../atom/atoms';
import client from '../Client';

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

import RNExitApp from 'react-native-kill-app';

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


const LastHeatTime = () => {
  const navigation = useNavigation()

  const [saveModal, setSaveModal] = useState(false)

  const [lastHeatValue, setLastHeatValue] = useRecoilState(lastHeatTimeValue)
  const [lastHeatValueLimit, setLastHeatValueLimit] = useRecoilState(lastHeatTimeValueLimit)
  const pushToken = useRecoilValue(fcmToken)
  const atmodemN = useRecoilValue(modemNumber)
  const atuserN = useRecoilValue(userNumber)

  const [checkitem, setChechkitem] = useState(lastHeatValue)
  // const [isy, setisy] = useState(lastHeatValueSC) //뭔가 이상함
  const [isy, setisy] = useState(0)

  const ii = useRef()

  useEffect(() => {
    if (checkitem === '1:30') {
      setisy(0)
      ii.current.scrollTo({ x: 0, y: 0 })
    } else if (checkitem === '3:00') {
      setisy(77)
      ii.current.scrollTo({ x: 0, y: 77 })
    } else if (checkitem === '5:00') {
      setisy(150)
      ii.current.scrollTo({ x: 0, y: 150 })
    }


  }, [])

  useEffect(() => {
    if (isy < 50) {
      setChechkitem('1:30')
    } else if (50 < isy && isy < 130) {
      setChechkitem('3:00')
    } else if (130 < isy) {
      setChechkitem('5:00')
    }
  }, [isy])

  function saveBtnClick() {
    if (lastHeatValueLimit === false) {
      try {
        sendCommand()
      } catch (error) {
        console.log(error)
        client.destroy()
        client.connect({ port: 3600, host: '175.126.232.72' })
        sendCommand()
        return
      }

      setLastHeatValueLimit(true)

      setSaveModal(true)

      setLastHeatValue(checkitem)

      AsyncStorage.setItem('@lastHeat_value', checkitem)

      setTimeout(() => {
        setSaveModal(false)
        navigation.goBack()

      }, 1500);

      setTimeout(() => {
        setLastHeatValueLimit(false)
      }, 1000);

    } else {
      Alert.alert('설정 변경 유휴시간은 10초입니다.', '10초 후 시도해주세요')

    }
  }

  function sendCommand() {

    try {
      let cc = '0'
      if (checkitem === '1:30') {
        cc = 'ae=0'
      } else if (checkitem === '3:00') {
        cc = 'ae=1'
      } else if (checkitem === '5:00') {
        cc = 'ae=2'
      }
      let comm = { type: "R", type_sub: "settings", data: { command: '+SCMD=' + atmodemN + '/V:' + cc, modem: atmodemN, token: pushToken } }
      comm = JSON.stringify(comm)

      client.write(comm)
      console.log('전송 : ' + comm)

    } catch (error) {
      exitAppAlert()
    }
  }


  return (
    <SafeAreaView>
      <View style={{ width: chwidth, height: '100%' }}>
        {/* 헤더 */}
        <View style={{ flex: 0.8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Text style={styles.savetxt}>취소</Text>
          </TouchableWithoutFeedback>
          <Text style={styles.maintxt}>후열 시간</Text>
          <TouchableWithoutFeedback onPress={() => saveBtnClick()}>
            <Text style={styles.savetxt}>저장</Text>
          </TouchableWithoutFeedback>
        </View>
        {/* 헤더 끝 */}

        {/* 본문 */}
        <View style={{ flex: 10 }}>
          <View style={{ flex: 4, justifyContent: "center", alignItems: "center", marginBottom: -40 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.mask}>
                <Text style={styles.topchechktxt}>{checkitem}</Text>
              </View>
              <Text style={styles.masktxt2}>초</Text>
              <Text style={styles.masktxt}>로 설정됩니다.</Text>
            </View>
          </View>
          <View style={{ flex: 7 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <View style={{ height: 400, width: '70%' }}>
                <ScrollView ref={ii} onScroll={(res) => { setisy(res.nativeEvent.contentOffset.y), console.log(res.nativeEvent.contentOffset.y) }}
                  showsVerticalScrollIndicator={false}
                  scrollEventThrottle={16}
                >
                  <View style={{ height: 140 }}></View>
                  <Text style={isy < 50 ? styles.selecttxt : styles.noselecttxt}>1:30</Text>
                  <Text style={(50 < isy && isy < 130) ? styles.selecttxt : styles.noselecttxt}>3:00</Text>
                  <Text style={130 < isy ? styles.selecttxt : styles.noselecttxt}>5:00</Text>
                  <View style={{ height: 160 }}></View>
                </ScrollView>
              </View>
              <Text style={styles.sec}>sec</Text>
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
    borderColor: "#bec0c2",
    justifyContent: "center",
    alignItems: "center"
  },
  masktxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 22,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
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
    borderWidth: 1.5,
    borderColor: "#979797",
    position: "absolute",
    top: '33%'
  },
  indicator2: {
    width: 97,
    height: 1,
    opacity: 0.3,
    borderStyle: "solid",
    borderWidth: 1.5,
    borderColor: "#979797",
    position: "absolute",
    top: '52%'
  },
  topchechktxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "normal",
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
    right: '15%',
    bottom: '50%'
  }
})

export default LastHeatTime