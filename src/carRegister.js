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
  Modal,
  ScrollView
} from 'react-native';

import client from './Client'

import { useNavigation } from '@react-navigation/native';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { modemNumber, userNumber, fcmToken, isCarRace } from './atom/atoms'

import AsyncStorage from '@react-native-async-storage/async-storage';


const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

const close = require('../img/closebtn.png')
const back = require('../img/backbtn.png')
const inputcls = require('../img/inputClose.png')
const rightArr = require('../img/rightArrow.png')
const radioSelect = require('../img/radioSelect.png')



const sedan1img = require('../img/sedan1.png')
const suv1img = require('../img/suv1.png')




const CarRegister = () => {

  const [pushToken, setPushToken] = useRecoilState(fcmToken)
  // console.log('차등록 : ' + pushToken)


  const navigation = useNavigation()

  const [modemN, setModemN] = useState('')
  const [userN, setUserN] = useState('')
  const [carRace, setCarRace] = useState('')
  const [raceModal, setRaceModal] = useState(false)

  const [atModemn, setAtModemn] = useRecoilState(modemNumber)
  const [atUserNumber, setatUserNumber] = useRecoilState(userNumber)
  const [atIsCarRace, setatIsCarRace] = useRecoilState(isCarRace)

  useEffect(() => {
    setModemN(atModemn)
    setUserN(atUserNumber)
    setCarRace(atIsCarRace)
    if (atIsCarRace == 'SEDAN1') {
      setSedan1(true)
    } else if (atIsCarRace == 'SUV1') {
      setSuv1(true)
    } else {

    }
  }, [])


  const [sedan1, setSedan1] = useState(false)
  const [suv1, setSuv1] = useState(false)

  function iscar() {
    if (sedan1 == true) {
      Alert.alert('차량이 변경되었습니다.')
      setCarRace('SEDAN1')
      setRaceModal(false)
      setatIsCarRace('SEDAN1')
    } else if (suv1 == true) {
      Alert.alert('차량이 변경되었습니다.')
      setCarRace('SUV1')
      setRaceModal(false)
      setatIsCarRace('SUV1')
    }
  }



  const delModem = async () => {
    try {
      await AsyncStorage.removeItem('@modem_N')
    } catch (e) {
      console.error(e)
    }
  }

  const delUser = async () => {
    try {
      await AsyncStorage.removeItem('@user_N')
    } catch (e) {
      console.error(e)
    }
  }

  const delcarRace = async () => {
    try {
      await AsyncStorage.removeItem('@car_Race')
    } catch (e) {
      console.error(e)
    }
  }

  const delFirst = async () => {
    try {
      await AsyncStorage.removeItem('@is_first')
    } catch (e) {
      console.error(e)
    }
  }

  var times
  function registerClick() {
    var txt = { type: "R", type_sub: "register", data: { modem: modemN, user: userN, carRace: carRace, token: pushToken } }
    txt = JSON.stringify(txt)

    client.write(txt)
    console.log('전송 : ' + txt)

    times = setTimeout(() => {
      Alert.alert('서버와 통신을 실패하였습니다.')
    }, 2000);

    // navigation.navigate('간편비밀번호')

    // AsyncStorage.setItem("@modem_N", modemN)
    // AsyncStorage.setItem("@user_N", userN)
    // AsyncStorage.setItem("@car_Race", carRace)
    // AsyncStorage.setItem("@is_first", 'notfirst')

    // setAtModemn(modemN)
    // setatUserNumber(userN)
    // setatIsCarRace(carRace)
  }

  var times2
  function registerDel() {
    var txt = { type: "R", type_sub: "register_delete", data: { modem: modemN } }
    txt = JSON.stringify(txt)

    client.write(txt)
    console.log('전송 : ' + txt)

    times2 = setTimeout(() => {
      Alert.alert('서버와 통신을 실패하였습니다.')
    }, 2000);

    Alert.alert('삭제')
  }

  var times3
  function registerUpdate() {
    var txt = { type: "R", type_sub: "register", data: { modem: modemN, user: userN, carRace: carRace, token: pushToken } }
    txt = JSON.stringify(txt)

    client.write(txt)
    console.log('전송 : ' + txt)

    times3 = setTimeout(() => {
      Alert.alert('서버와 통신을 실패하였습니다.')
    }, 2000);
  }



  client.on('data', function (data) {
    if ('' + data == 'reg_suc') {
      clearTimeout(times)
      Alert.alert('등록이 완료되었습니다')
      navigation.navigate('차량제어')

      AsyncStorage.setItem("@modem_N", modemN)
      AsyncStorage.setItem("@user_N", userN)
      AsyncStorage.setItem("@car_Race", carRace)
      AsyncStorage.setItem("@is_first", 'notfirst')

      setAtModemn(modemN)
      setatUserNumber(userN)
      setatIsCarRace(carRace)
    } else if ('' + data == 'registerDel_suc') {
      clearTimeout(times2)
      delFirst()
      delModem()
      delUser()
      delcarRace()

      setAtModemn('')
      setatUserNumber('')
      setatIsCarRace('')
    } else if ('' + data == 'reg_fail') {
      Alert.alert("이미 등록된 사용자입니다.", "계속 진행 하시겠습니까?", [
        {
          text: "아니요",
          onPress: () => Alert.alert('등록을 취소합니다.'),
          style: "cancel"
        },
        { text: "예", onPress: () => { registerUpdate(), Alert.alert('등록이 완료되었습니다.') } }
      ]);

    } else {
      clearTimeout(times)
      clearTimeout(times2)
    }
    console.log('차량 등록 내에서 받기 ' + data);
  });

  function searchUser() {
    var txt = { type: "R", type_sub: "user_search", data: { modem: modemN } }
    txt = JSON.stringify(txt)
    client.write(txt)
  }






  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>

      <View style={{ width: chwidth, height: chheight }}>

        {/* 헤더 */}
        <View style={{ flex: 0.8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View><Image source={back}></Image></View>
          </TouchableWithoutFeedback>
          <Text style={styles.maintxt}>차량 등록</Text>
          <View><Image source={close}></Image></View>
        </View>
        {/* 헤더 */}

        {/* 본문 */}
        <View style={{ flex: 10, marginLeft: 16 }}>
          <View style={{ width: chwidth - 32, height: 56, backgroundColor: "#f0f1f5", borderRadius: 6, marginTop: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput onBlur={() => Alert.alert('사용자 검색')} placeholder='모뎀 번호' placeholderTextColor="gray" style={styles.inputtxt} onChangeText={txt => setModemN(txt)} value={modemN} keyboardType={"number-pad"}></TextInput>
              {modemN != '' &&
                <TouchableOpacity onPress={() => setModemN('')}>
                  <Image source={inputcls}></Image>
                </TouchableOpacity>
              }
            </View>
          </View>
          <View style={{ width: chwidth - 32, height: 56, backgroundColor: "#f0f1f5", borderRadius: 6, marginTop: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput placeholder='휴대폰 번호' placeholderTextColor="gray" style={styles.inputtxt} onChangeText={txt => setUserN(txt)} value={userN} keyboardType={"number-pad"}></TextInput>
              {userN != '' &&
                <TouchableOpacity onPress={() => setUserN('')}>
                  <Image source={inputcls}></Image>
                </TouchableOpacity>
              }
            </View>
          </View>
          <TouchableWithoutFeedback onPress={() => setRaceModal(true)}>
            <View style={{ width: chwidth - 32, height: 56, backgroundColor: "#f0f1f5", borderRadius: 6, marginTop: 16, justifyContent: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: chwidth - 48 }}>
                <Text style={styles.carResist}>차량 선택</Text>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                  <Text style={styles.race}>{carRace}</Text>
                  <Image source={rightArr}></Image>
                </View>

              </View>
            </View>
          </TouchableWithoutFeedback>



          {(modemN != '' && userN != '' && carRace != '') ?
            <View style={{ flexDirection: "row", width: chwidth - 32, marginTop: 16 }}>

              <TouchableWithoutFeedback onPress={() => registerDel()}>
                <View style={{ borderStyle: "solid", borderWidth: 1.5, borderColor: "#a6a9ac", height: 54, flex: 1, borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
                  <Text style={styles.canceltxt2}>삭제</Text>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.05 }}></View>

              <TouchableWithoutFeedback onPress={() => registerClick()}>
                <View style={{ borderRadius: 6, backgroundColor: "#f75929", height: 54, flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <Text style={styles.registertxt}>등록</Text>
                </View>
              </TouchableWithoutFeedback>

            </View>

            :
            <View style={{ flexDirection: "row", width: chwidth - 32, marginTop: 16 }}>

              <View style={{ borderStyle: "solid", borderWidth: 1.5, borderColor: "#e3e3e5", height: 54, flex: 1, borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.canceltxt}>삭제</Text>
              </View>

              <View style={{ flex: 0.05 }}></View>

              <View style={{ borderRadius: 6, backgroundColor: "#e1e1e3", height: 54, flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.registertxt}>등록</Text>
              </View>

            </View>
          }


        </View>
        {/* 본문 */}

        {/* 차량선택 모달 */}
        <Modal visible={raceModal} transparent={true}>
          <SafeAreaView style={{ backgroundColor: 'rgb(247,247,247)' }}>
            <View style={{ width: chwidth, height: chheight }}>
              {/* 모달헤더 */}
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
                <TouchableWithoutFeedback onPress={() => setRaceModal(false)}>
                  <View><Image source={back}></Image></View>
                </TouchableWithoutFeedback>
                <Text style={styles.maintxt}>차량 선택</Text>
                <View style={{ width: 30 }}></View>
              </View>
              {/*  */}

              {/* 본문 */}
              <View style={{ flex: 10 }}>
                {/* 차량부분 */}
                <View style={{ flex: 8 }}>
                  <ScrollView>
                    <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 16, width: chwidth - 32 }}>

                      {sedan1 ?
                        <TouchableWithoutFeedback onPress={() => setSedan1(false)}>
                          <View style={{ height: 128, flex: 1, backgroundColor: "#f0f1f5", borderRadius: 6, borderWidth: 1, borderColor: "#f75929", borderStyle: 'solid' }}>
                            <View style={{ flex: 2, justifyContent: "flex-end" }}>
                              <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image source={radioSelect} style={{ marginLeft: 17, marginRight: 8 }}></Image>
                                <Text style={styles.cartext}>SEDAN 1</Text>
                              </View>
                            </View>
                            <View style={{ flex: 4, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                              <Image source={sedan1img} style={{ marginRight: 13 }}></Image>
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                        :
                        <TouchableWithoutFeedback onPress={() => { setSedan1(true), setSuv1(false) }}>
                          <View style={{ height: 128, flex: 1, backgroundColor: "#f0f1f5", borderRadius: 6, }}>
                            <View style={{ flex: 2, justifyContent: "flex-end" }}>
                              <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: 20, height: 20, borderStyle: 'solid', borderWidth: 1, borderColor: "#bababa", borderRadius: 20, marginLeft: 17, marginRight: 8 }}></View>
                                <Text style={styles.cartext}>SEDAN 1</Text>
                              </View>
                            </View>
                            <View style={{ flex: 4, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                              <Image source={sedan1img} style={{ marginRight: 13 }}></Image>
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      }

                      <View style={{ flex: 0.1 }}></View>


                      {suv1 ?
                        <TouchableWithoutFeedback onPress={() => { setSuv1(false) }}>
                          <View style={{ height: 128, flex: 1, backgroundColor: "#f0f1f5", borderRadius: 6, borderWidth: 1, borderColor: "#f75929", borderStyle: 'solid' }}>
                            <View style={{ flex: 2, justifyContent: "flex-end" }}>
                              <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image source={radioSelect} style={{ marginLeft: 17, marginRight: 8 }}></Image>
                                <Text style={styles.cartext}>SUV 1</Text>
                              </View>
                            </View>
                            <View style={{ flex: 4, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                              <Image source={suv1img} style={{ marginRight: 13 }}></Image>
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                        :
                        <TouchableWithoutFeedback onPress={() => { setSuv1(true), setSedan1(false) }}>
                          <View style={{ height: 128, flex: 1, backgroundColor: "#f0f1f5", borderRadius: 6, }}>
                            <View style={{ flex: 2, justifyContent: "flex-end" }}>
                              <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: 20, height: 20, borderStyle: 'solid', borderWidth: 1, borderColor: "#bababa", borderRadius: 20, marginLeft: 17, marginRight: 8 }}></View>
                                <Text style={styles.cartext}>SUV 1</Text>
                              </View>
                            </View>
                            <View style={{ flex: 4, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                              <Image source={suv1img} style={{ marginRight: 13 }}></Image>
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      }



                    </View>
                  </ScrollView>
                </View>
                {/*  */}

                {/* 저장버튼 */}
                <View style={{ flex: 1.5 }}>
                  {(sedan1 == true || suv1 == true) ?
                    <TouchableWithoutFeedback onPress={() => iscar()}>
                      <View style={styles.saveBtn2}>
                        <Text style={styles.savetxt}>저장</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    :
                    <View style={styles.saveBtn}>
                      <Text style={styles.savetxt}>저장</Text>
                    </View>
                  }
                </View>
                {/*  */}
              </View>
              {/*  */}

            </View>
          </SafeAreaView>
        </Modal>
        {/* 차량선택 모달 끝*/}

      </View>
    </SafeAreaView>
  )
}

const CarItem = (prop) => {
  const [isClick, setIsClick] = useState(false)
  return (
    <View>
      {isClick ?
        <TouchableWithoutFeedback onPress={() => setIsClick(true)}>
          <View style={{ height: 128, flex: 1, backgroundColor: "#f0f1f5", borderRadius: 6, }}>
            <View style={{ flex: 2, justifyContent: "flex-end" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ width: 20, height: 20, borderStyle: 'solid', borderWidth: 1, borderColor: "red", borderRadius: 20, marginLeft: 17, marginRight: 8 }}></View>
                <Text style={styles.cartext}>{prop.nn} {prop.num}</Text>
              </View>
            </View>
            <View style={{ flex: 4, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
              <Image source={prop.img} style={{ marginRight: 13 }}></Image>
            </View>
          </View>
        </TouchableWithoutFeedback>
        :
        <TouchableWithoutFeedback onPress={() => setIsClick(false)}>
          <View style={{ height: 128, flex: 1, backgroundColor: "#f0f1f5", borderRadius: 6, }}>
            <View style={{ flex: 2, justifyContent: "flex-end" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ width: 20, height: 20, borderStyle: 'solid', borderWidth: 1, borderColor: "#bababa", borderRadius: 20, marginLeft: 17, marginRight: 8 }}></View>
                <Text style={styles.cartext}>{prop.nn} {prop.num}</Text>
              </View>
            </View>
            <View style={{ flex: 4, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
              <Image source={prop.img} style={{ marginRight: 13 }}></Image>
            </View>
          </View>
        </TouchableWithoutFeedback>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  canceltxt: {
    opacity: 0.3,
    fontFamily: "AppleSDGothicNeo",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    color: "#4e535a"
  },
  canceltxt2: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    color: "#4e535a"
  },
  registertxt: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff"
  },
  carResist: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 17,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: 'rgb(68,73,80)',
    marginLeft: 16
  },
  race: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 17,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "right",
    color: "#f75929",
    marginRight: 9
  },
  saveBtn: {
    height: 54,
    borderRadius: 6,
    backgroundColor: "#e1e1e3",
    width: chwidth - 32,
    marginLeft: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  saveBtn2: {
    height: 54,
    borderRadius: 6,
    backgroundColor: "#f75929",
    width: chwidth - 32,
    marginLeft: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  savetxt: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff",
  },
  cartext: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#4e535a"
  },
  maintxt: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.24,
    color: "#393e46"
  },
  inputtxt: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 17,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: 'rgb(68,73,80)',
    width: chwidth - 80,
    marginLeft: 16,
  }
})

export default React.memo(CarRegister)