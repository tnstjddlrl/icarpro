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
import { bootTimeValue, bootTimeValueLimt, fcmToken,modemNumber,userNumber } from '../atom/atoms';
import client from '../Client';

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height


const RemoteBootTime = () => {
  const navigation = useNavigation()
  const [atBootTime, setAtBootTime] = useRecoilState(bootTimeValue)
  const [atBootTimeLimit, setAtBootTimeLimit] = useRecoilState(bootTimeValueLimt)
  const pushToken = useRecoilValue(fcmToken)
  const atmodemN = useRecoilValue(modemNumber)
  const atuserN = useRecoilValue(userNumber)

  const [saveModal, setSaveModal] = useState(false)

  const [checkitem, setChechkitem] = useState(atBootTime)

  const [isy, setisy] = useState(0)

  const ii = useRef()

  useEffect(() => {
    if (checkitem === '3') {
      setisy(0)
      ii.current.scrollTo({ x: 0, y: 0 })
    } else if (checkitem === '5') {
      setisy(65)
      ii.current.scrollTo({ x: 0, y: 65 })
    } else if (checkitem === '10') {
      setisy(160)
      ii.current.scrollTo({ x: 0, y: 160 })
    }

  }, [])

  useEffect(() => {
    if (isy < 50) {
      setChechkitem('3')
    } else if (50 < isy && isy < 100) {
      setChechkitem('5')
    } else if (100 < isy) {
      setChechkitem('10')
    }
  }, [isy])

  function saveBtnClick() {
    if (atBootTimeLimit === false) {
      try {
        sendCommand()
      } catch (error) {
        console.log(error)
        client.connect({ port: 3400, host: '175.126.232.72' })
        sendCommand()

        return
      }

      setAtBootTimeLimit(true)
      setSaveModal(true)

      setAtBootTime(checkitem)
      AsyncStorage.setItem("@bootTime_Value", checkitem)



      setTimeout(() => {
        setSaveModal(false)
      }, 1500);
      setTimeout(() => {
        setAtBootTimeLimit(false)
      }, 1000);
    } else {
      Alert.alert('?????? ?????? ??????????????? 10????????????.', '10??? ??? ??????????????????')

    }
  }

  function sendCommand() {
    let cc = '0'
    if (checkitem === '3') {
      cc = 're=0'
    } else if (checkitem === '5') {
      cc = 're=1'
    } else if (checkitem === '10') {
      cc = 're=2'
    }
    let comm = { type: "R", type_sub: "settings", data: { command: '+SCMD='+atmodemN+'/S:'+cc, modem: atmodemN } }
    comm = JSON.stringify(comm)

    client.write(comm)
    console.log('?????? : ' + comm)
  }


  return (
    <SafeAreaView>
      <View style={{ width: chwidth, height: '100%' }}>
        {/* ?????? */}
        <View style={{ flex: 0.8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Text style={styles.savetxt}>??????</Text>
          </TouchableWithoutFeedback>
          <Text style={styles.maintxt}>???????????? ??????</Text>
          <TouchableWithoutFeedback onPress={() => saveBtnClick()}>
            <Text style={styles.savetxt}>??????</Text>
          </TouchableWithoutFeedback>
        </View>
        {/* ?????? ??? */}

        {/* ?????? */}
        <View style={{ flex: 10 }}>
          <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.mask}>
                <Text style={styles.topchechktxt}>{checkitem}</Text>
              </View>
              <Text style={styles.masktxt2}>???</Text>
              <Text style={styles.masktxt}>?????? ???????????????.</Text>
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
                  <Text style={isy < 50 ? styles.selecttxt : styles.noselecttxt}>3</Text>
                  <Text style={(50 < isy && isy < 100) ? styles.selecttxt : styles.noselecttxt}>5</Text>
                  <Text style={100 < isy ? styles.selecttxt : styles.noselecttxt}>10</Text>
                  <View style={{ height: 170 }}></View>
                </ScrollView>
              </View>
              <Text style={styles.sec}>min</Text>
              <View style={styles.indicator1}></View>
              <View style={styles.indicator2}></View>
            </View>

            <View style={{ flex: 1 }}></View>


          </View>

        </View>
        {/* ?????? ??? */}


        <Modal visible={saveModal} transparent={true} animationType={'fade'}>
          <SafeAreaView style={{ width: chwidth, height: chheight, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: chwidth - 80, height: 80, backgroundColor: 'white', marginTop: -200, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.maintxt}>????????? ????????? ?????????????????????.</Text>
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
    color: "#393e46"
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

export default RemoteBootTime