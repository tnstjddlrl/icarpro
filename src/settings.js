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
  Modal
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ToggleSwitch from 'toggle-switch-react-native'


import client from './Client';

import {
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { fcmToken, actionSound, alertSound, icarSwitch, idoorSwitch, lowvoltBoot, lowvoltAlert, settingLimit } from './atom/atoms'

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height


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


const Settings = () => {
  const navigation = useNavigation()

  const [saveModal, setSaveModal] = useState(false)


  const [aticarswitch, setaticarswitch] = useRecoilState(icarSwitch)
  const [atidoorswitch, setatidoorswitch] = useRecoilState(idoorSwitch)
  const [atlowboltBoot, setatlowboltBoot] = useRecoilState(lowvoltBoot)
  const [atlowboltAlert, setatlowboltAlert] = useRecoilState(lowvoltAlert)
  const [atactionsound, setatactionsound] = useRecoilState(actionSound)
  const [atalertsound, setatalertsound] = useRecoilState(alertSound)

  const pushToken = useRecoilValue(fcmToken)

  const [stLimit, setStLimit] = useRecoilState(settingLimit)


  const [icarswitch, seticarswitch] = useState(aticarswitch)
  const [idoorswitch, setidoorswitch] = useState(atidoorswitch)
  const [lowboltBoot, setlowboltBoot] = useState(atlowboltBoot)
  const [lowboltAlert, setlowboltAlert] = useState(atlowboltAlert)
  const [actionsound, setactionsound] = useState(atactionsound)
  const [alertsound, setalertsound] = useState(atalertsound)

  function sendCommand(cc) {

    let comm = { type: "R", type_sub: "settings", data: { command: cc, token: pushToken } }
    comm = JSON.stringify(comm)

    client.write(comm)
    console.log('전송 : ' + comm)
  }



  function savebtnclick() {
    if (stLimit === false) {
      setStLimit(true)
      if (icarswitch !== aticarswitch) {
        if (icarswitch === true) {
          try {
            sendCommand('mn')
          } catch (e) {
            console.log(e)
            client.connect({ port: 3400, host: '175.126.232.72' })
            sendCommand('mn')
            // return
          }
        } else {
          try {
            sendCommand('mf')
          } catch (e) {
            console.log(e)
            client.connect({ port: 3400, host: '175.126.232.72' })

            sendCommand('mf')

            // return
          }
        }
      }
      setTimeout(() => {
        if (idoorswitch !== atidoorswitch) {
          if (idoorswitch === true) {
            try {
              sendCommand('dn')
            } catch (e) {
              client.connect({ port: 3400, host: '175.126.232.72' })
              console.log(e)
              sendCommand('dn')
  
              // return
            }
          } else {
            try {
              sendCommand('df')
            } catch (e) {
              client.connect({ port: 3400, host: '175.126.232.72' })
              console.log(e)
              sendCommand('df')
  
              // return
            }
          }
        }
      }, 100);

      setTimeout(() => {
        if (lowboltBoot !== atlowboltBoot || lowboltAlert !== atlowboltAlert) {
          if (lowboltBoot === true) {
            try {
              sendCommand('le')
            } catch (e) {
              client.connect({ port: 3400, host: '175.126.232.72' })
              console.log(e)
              sendCommand('le')
  
              // return
            }
          } else if (lowboltAlert === true) {
            try {
              sendCommand('la')
            } catch (e) {
              client.connect({ port: 3400, host: '175.126.232.72' })
              console.log(e)
              sendCommand('la')
  
              // return
            }
          } else {
            try {
              sendCommand('lf')
            } catch (e) {
              client.connect({ port: 3400, host: '175.126.232.72' })
              console.log(e)
              sendCommand('lf')
  
              // return
            }
          }
        }
      }, 200);

      setTimeout(() => {
        if (actionsound !== atactionsound) {
          if (actionsound === true) {
            try {
              sendCommand('1n')
            } catch (e) {
              client.connect({ port: 3400, host: '175.126.232.72' })
              console.log(e)
              sendCommand('1n')
  
              // return
            }
          } else {
            try {
              sendCommand('1f')
            } catch (e) {
              client.connect({ port: 3400, host: '175.126.232.72' })
              console.log(e)
              sendCommand('1f')
  
              // return
            }
          }
        }
      }, 300);

      setTimeout(() => {
        if (alertsound !== atalertsound) {
          if (alertsound === true) {
            try {
              sendCommand('2n')
            } catch (e) {
              client.connect({ port: 3400, host: '175.126.232.72' })
              console.log(e)
              sendCommand('2n')
  
              // return
            }
          } else {
            try {
              sendCommand('2f')
            } catch (e) {
              client.connect({ port: 3400, host: '175.126.232.72' })
              console.log(e)
              sendCommand('2f')
              // return
            }
          }
        }
      }, 400);
      

      setSaveModal(true)

      AsyncStorage.setItem("@icarswitch", JSON.stringify(icarswitch))
      AsyncStorage.setItem("@idoorswitch", JSON.stringify(idoorswitch))
      AsyncStorage.setItem("@lowboltBoot", JSON.stringify(lowboltBoot))
      AsyncStorage.setItem("@lowboltAlert", JSON.stringify(lowboltAlert))
      AsyncStorage.setItem("@actionsound", JSON.stringify(actionsound))
      AsyncStorage.setItem("@alertsound", JSON.stringify(alertsound))

      setaticarswitch(icarswitch)
      setatidoorswitch(idoorswitch)
      setatlowboltBoot(lowboltBoot)
      setatlowboltAlert(lowboltAlert)
      setatactionsound(actionsound)
      setatalertsound(alertsound)
      setTimeout(() => {
        setSaveModal(false)
      }, 1500);

      setTimeout(() => {
        setStLimit(false)
      }, 1000);
    }
    else {
      Alert.alert('설정 변경 유휴시간은 10초입니다.', '10초 후 시도해주세요')
    }

  }

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      {/* 헤더 */}
      <View style={{ height: 60, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 32, marginLeft: 16, }}>
        <View><TouchableWithoutFeedback onPress={() => navigation.goBack()}><Image source={back}></Image></TouchableWithoutFeedback></View>
        <Text style={styles.maintxt}>설정</Text>
        <TouchableWithoutFeedback onPress={() => savebtnclick()}>
          <Text style={styles.savetxt}>저장</Text>
        </TouchableWithoutFeedback>
      </View>
      {/* 헤더 끝 */}


      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 0 }}>
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
                  onToggle={isOn => seticarswitch(isOn)}
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
                  onToggle={isOn => setidoorswitch(isOn)}
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
                  onToggle={isOn => { setlowboltAlert(false), setlowboltBoot(isOn) }}
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
                  onToggle={isOn => { setlowboltAlert(isOn), setlowboltBoot(false) }}
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
                  onToggle={isOn => setactionsound(isOn)}
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
                  onToggle={isOn => setalertsound(isOn)}
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


            {/* 예열시동 시간 설정 */}
            <View style={{ marginTop: 8 }}></View>
            <TouchableWithoutFeedback>
              <View style={styles.oneFrame}>
                <View style={{ marginLeft: 11, marginRight: 16, flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Image source={carhitIcon}></Image>
                    <Text style={styles.frameTitle}>예열시동 시간설정-삭제 예정</Text>
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
            <View style={styles.oneFrame}>
              <View style={{ marginLeft: 11, marginRight: 16, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row" }}>
                  <Image source={lockIcon}></Image>
                  <Text style={styles.frameTitle}>i도어 비밀번호설정</Text>
                </View>
                <Image source={rightArr}></Image>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 60, marginBottom: 20 }}></View>


          {/* 본문 끝 */}


        </View>
      </ScrollView>

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