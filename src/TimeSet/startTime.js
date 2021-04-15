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
  useRecoilState, useRecoilValue,
} from 'recoil';
import { startTimeValue, startTimeValueLimit, fcmToken, } from '../atom/atoms';
import client from '../Client';

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height


const StartTime = () => {
  const navigation = useNavigation()

  const [saveModal, setSaveModal] = useState(false)

  const [startTime, setStartTime] = useRecoilState(startTimeValue)
  const [startTimeLimit, setStartTimeLimit] = useRecoilState(startTimeValueLimit)
  const pushToken = useRecoilValue(fcmToken)
  
  const [checkitem, setChechkitem] = useState(startTime)
  const [isy, setisy] = useState(0)

  const ii = useRef()

  useEffect(() => {
    if (checkitem === '1') {
      setisy(0)
      ii.current.scrollTo({ x: 0, y: 0 })
    } else if (checkitem === '2') {
      setisy(65)
      ii.current.scrollTo({ x: 0, y: 65 })
    } else if (checkitem === '3') {
      setisy(160)
      ii.current.scrollTo({ x: 0, y: 160 })
    }
  }, [])

  useEffect(() => {
    if (isy < 50) {
      setChechkitem('1')
    } else if (50 < isy && isy < 100) {
      setChechkitem('2')
    } else if (100 < isy) {
      setChechkitem('3')
    }
  }, [isy])

  function saveBtnClick() {
    if (startTimeLimit === false) {
      try {
        sendCommand()  
      } catch (error) {
        console.log(error)
        Alert.alert('서버와의 통신에서 오류가 발생하였습니다.','앱을 종료합니다.')

        return
      }

      setStartTimeLimit(true)

      setStartTime(checkitem)
      setSaveModal(true)

      AsyncStorage.setItem('@startTime_value', checkitem)


      setTimeout(() => {
        setSaveModal(false)
      }, 1500);
      setTimeout(() => {
        setStartTimeLimit(false)
      }, 10000);
    } else {
      Alert.alert('설정 변경 유휴시간은 10초입니다.', '10초 후 시도해주세요')
    }
  }

  function sendCommand (){
    let cc = '0'
    if (checkitem === '1') {
      cc = 'st=0'
    } else if (checkitem === '2') {
      cc = 'st=1'
    } else if (checkitem === '3') {
      cc = 'st=2'
    }
    let comm = { type: "R", type_sub: "settings", data: { command: cc, token: pushToken } }
    comm = JSON.stringify(comm)

    client.write(comm)
    console.log('전송 : ' + comm)
  }


  return (
    <SafeAreaView>
      <View style={{ width: chwidth, height: '100%' }}>
        {/* 헤더 */}
        <View style={{ flex: 0.8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Text style={styles.savetxt}>취소</Text>
          </TouchableWithoutFeedback>
          <Text style={styles.maintxt}>스타트 시간</Text>
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
              <Text style={styles.masktxt2}>초</Text>
              <Text style={styles.masktxt}>로 설정됩니다.</Text>
            </View>
          </View>
          <View style={{ flex: 7 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <View style={{ height: 400, width: 97 }}>
                <ScrollView ref={ii} onScroll={(res) => { setisy(res.nativeEvent.contentOffset.y), console.log(res.nativeEvent.contentOffset.y) }}
                  showsVerticalScrollIndicator={false}
                  scrollEventThrottle={16}
                >
                  <View style={{ height: 140 }}></View>
                  <Text style={isy < 50 ? styles.selecttxt : styles.noselecttxt}>1</Text>
                  <Text style={(50 < isy && isy < 100) ? styles.selecttxt : styles.noselecttxt}>2</Text>
                  <Text style={100 < isy ? styles.selecttxt : styles.noselecttxt}>3</Text>
                  <View style={{ height: 170 }}></View>
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
    top: '52%'
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
    right: '15%',
    bottom: '50%'
  }
})

export default StartTime