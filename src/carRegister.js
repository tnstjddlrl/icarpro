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

let updateCount = 0


const CarRegister = () => {

  const [loadModal,setLoadModal] = useState(false)

  const [pushToken, setPushToken] = useRecoilState(fcmToken)
  // console.log('차등록 : ' + pushToken)


  const navigation = useNavigation()

  const [atModemn, setAtModemn] = useRecoilState(modemNumber)
  const [atUserNumber, setatUserNumber] = useRecoilState(userNumber)
  const [atIsCarRace, setatIsCarRace] = useRecoilState(isCarRace)

  const [modemN, setModemN] = useState('')
  const [userN, setUserN] = useState('')
  const [carRace, setCarRace] = useState('')
  const [raceModal, setRaceModal] = useState(false)


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

  function registerClick(sub) {
    var txt = { type: "R", type_sub: sub, data: { modem: modemN, user: userN, carRace: carRace, token: pushToken } }
    txt = JSON.stringify(txt)

    client.write(txt)
    console.log('전송 : ' + txt)



    // navigation.navigate('간편비밀번호')

    // AsyncStorage.setItem("@modem_N", modemN)
    // AsyncStorage.setItem("@user_N", userN)
    // AsyncStorage.setItem("@car_Race", carRace)
    // AsyncStorage.setItem("@is_first", 'notfirst')

    // setAtModemn(modemN)
    // setatUserNumber(userN)
    // setatIsCarRace(carRace)
  }

  function registerDel() {
    var txt = { type: "R", type_sub: "register_delete", data: { modem: modemN } }
    txt = JSON.stringify(txt)

    client.write(txt)
    console.log('전송 : ' + txt)

    Alert.alert('삭제')
  }
  console.log('모뎀 : ' +modemN+ '유저:' + userN)

  function registerUpdate(modem,user) {
    var txt = { type: "R", type_sub: "register_update", data: { modem: modemN, user: userN, carRace: carRace, token: pushToken } }
    txt = JSON.stringify(txt)

    client.write(txt)
    console.log('전송 : ' + txt)
  }



  client.on('data', function (data) {
    if ('' + data == 'reg_suc') {
      // Alert.alert('등록이 완료되었습니다')
      navigation.navigate('차량제어')

      AsyncStorage.setItem("@modem_N", modemN)
      AsyncStorage.setItem("@user_N", userN)
      AsyncStorage.setItem("@car_Race", carRace)
      AsyncStorage.setItem("@is_first", 'notfirst')

      setAtModemn(modemN)
      setatUserNumber(userN)
      setatIsCarRace(carRace)
    } else if ('' + data == 'registerDel_suc') {
      delFirst()
      delModem()
      delUser()
      delcarRace()

      setAtModemn('')
      setatUserNumber('')
      setatIsCarRace('')

      setModemN('')
      setUserN('')
      setCarRace('')
    } else if ('' + data == 'reg_fail') {
      if(updateCount === 0){
        updateCount = 1
        setLoadModal(true)
      }else{

      }
    } else {

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
              <TextInput placeholder='모뎀 번호' placeholderTextColor="gray" style={styles.inputtxt} onChangeText={txt => setModemN(txt)} value={modemN} keyboardType={"number-pad"}></TextInput>
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

              <TouchableWithoutFeedback onPress={() => registerClick('register')}>
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

        <Modal visible={loadModal} transparent={true} animationType={'fade'}>
        <SafeAreaView style={{width:chwidth,height:chheight,backgroundColor: 'rgba(0, 0, 0, 0.7)',justifyContent:'center',alignItems:'center'}}>
          <View style={{width:chwidth-80,height:160,backgroundColor:'white',marginTop:-150,borderRadius:10}}>
            <View style={{marginTop:20,alignItems:'center'}}>
            <Text style={styles.modalTitle}>주의!</Text>
            <Text style={styles.modaltxt}>이미 등록된 사용자입니다.</Text>
            <Text style={styles.modaltxt}>계속 진행하시겠습니까?</Text>
            </View>
            <View style={{flex:1,justifyContent:'flex-end'}}>
              <View style={{width:chwidth-80,borderWidth:0.5}}></View>
              <View style={{flexDirection:'row',width:chwidth-80,height:50}}>
                <TouchableWithoutFeedback onPress={()=>{setLoadModal(false),updateCount=0}}>
                  <View style={{flex:1,borderBottomLeftRadius:10,justifyContent:'center',alignItems:'center'}}>
                    <Text>취소</Text>
                  </View>
                  </TouchableWithoutFeedback>
                  <View style={{height:50,borderWidth:0.5}}></View>
                  <TouchableWithoutFeedback onPress={()=>{registerClick('register_update'),setLoadModal(false),navigation.navigate('차량제어'),updateCount=0}}>
                  <View style={{flex:1,borderBottomLeftRadius:10,justifyContent:'center',alignItems:'center'}}>
                    <Text>확인</Text>
                  </View>
                  </TouchableWithoutFeedback>
                  
              </View>
            </View>
          </View>
          
        </SafeAreaView>
      </Modal>

      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  modaltxt:{
    // fontFamily: "AppleSDGothicNeo",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "black",
    width:chwidth-80,
    textAlign:'center'
  },
  modalTitle:{
    // fontFamily: "AppleSDGothicNeo",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "black",
    width:chwidth-80,
    textAlign:'center',
    marginBottom:5
  },
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

export default CarRegister