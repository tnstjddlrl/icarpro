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
  ScrollView,
  Keyboard
} from 'react-native';

import client from './Client'

import { useNavigation } from '@react-navigation/native';

import {
  useRecoilState,
} from 'recoil';

import RNExitApp from 'react-native-kill-app';
import RNRestart from 'react-native-restart';


import { modemNumber, userNumber, fcmToken, isCarRace, AppLocalClientPort, AppLocalClientAddress, certifyState, AllState_app, usercarNum } from './atom/atoms'

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios'

import Spinner from 'react-native-loading-spinner-overlay';

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


  const [loadModal, setLoadModal] = useState(false)
  const [delModal, setDelModal] = useState(false)

  const [idoorModal, setIdoorModal] = useState(false)

  const [userCancelModal, setUserCancelModal] = useState(false)
  const [DeleteFirstModal, setDeleteFirstModal] = useState(false)
  const [cancelMss, setCancelMss] = useState('')

  const [spinner, setSpinner] = useState(false)

  const [pushToken, setPushToken] = useRecoilState(fcmToken)

  const [atUserCarNum, setAtUserCarNum] = useRecoilState(usercarNum)

  const [atLocalClientPort, setatLocalClientPort] = useRecoilState(AppLocalClientPort)
  const [atLocalClientAddress, setatLocalClientAddress] = useRecoilState(AppLocalClientAddress)

  function exitAppAlert() {
    Alert.alert(
      "서버 오류",
      "서버 오류가 지속되면 고객센터로 문의해주세요.",
      [
        { text: "OK", onPress: () => RNRestart.Restart() }
      ]
    )
  }



  const navigation = useNavigation()

  const [atModemn, setAtModemn] = useRecoilState(modemNumber)
  const [atUserNumber, setatUserNumber] = useRecoilState(userNumber)
  const [atIsCarRace, setatIsCarRace] = useRecoilState(isCarRace)

  const [modemN, setModemN] = useState('')
  const [userN, setUserN] = useState('')
  const [carnum, setCarnum] = useState('')

  const [carRace, setCarRace] = useState('')
  const [raceModal, setRaceModal] = useState(false)

  const [isRegister, setIsRegister] = useState(false)

  const [axiReturn, setAxiReturn] = useState('nononono');

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@is_first')
      return value
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    setModemN(atModemn)
    setUserN(atUserNumber)
    setCarRace(atIsCarRace)
    setCarnum(atUserCarNum)

    if (atIsCarRace == 'SEDAN1') {
      setSedan1(true)
    } else if (atIsCarRace == 'SUV1') {
      setSuv1(true)
    } else {

    }

    getData().then(res => { if (res != null) setIsRegister(true) })
    setTimeout(() => {
      console.log('등록 현황 : ' + isRegister)
    }, 200);


  }, [])


  const [sedan1, setSedan1] = useState(false)
  const [suv1, setSuv1] = useState(false)

  function iscar() {
    if (sedan1 == true) {
      usercancelff('차량이 변경되었습니다.')
      setCarRace('SEDAN1')
      setRaceModal(false)
      setatIsCarRace('SEDAN1')
    } else if (suv1 == true) {
      usercancelff('차량이 변경되었습니다.')
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

  //01227094107

  const [AllStateApp, setAllStateApp] = useRecoilState(AllState_app)

  useEffect(() => {
    console.log('현재 상태 : ' + AllStateApp)

    if (spinner == true) {
      setSpinner(false)
      console.log('로딩 끝!')


      if (AllStateApp == 'no_modem_conn') {
        usercancelff('모뎀 연결중입니다. 잠시후 시도해주세요.')
      }

      if (AllStateApp == 'no_modem') {
        // Alert.alert('인증에 실패하였습니다!')
        usercancelff('모뎀 번호를 확인해주세요.')
      }

      if (AllStateApp == 'certification_fail') {
        // Alert.alert('인증에 실패하였습니다!')
        usercancelff('인증에 실패하였습니다!')
      }

      if (AllStateApp == 'certification_suc') {
        // Alert.alert('인증에 성공하였습니다!')

        asyncSave()
        usercancelff('등록이 완료되었습니다.')


        setTimeout(() => {

          navigation.navigate('차량제어')
        }, 1500);
      }

      if (AllStateApp == 'certification_del_suc') {
        // Alert.alert('인증에 성공하였습니다!')
        usercancelff('삭제에 성공하였습니다!')
        setAtCertifyState('no_user')
      }

      if (AllStateApp == 'certification_del_fail') {
        // Alert.alert('인증에 성공하였습니다!')
        usercancelff('삭제에 실패하였습니다.')
      }

      if (AllStateApp == 'overlap_user') {
        // Alert.alert('인증에 성공하였습니다!')
        usercancelff('이미 등록되어있습니다.{"\n"}먼저 삭제를 진행해주세요.')
      }



    } else {

    }

  }, [AllStateApp])

  //certification_fail

  const loadState = () => {
    try {
      client.write(JSON.stringify({ type: "R", type_sub: "start_state", data: { modem: modemN, user: userN, token: pushToken } }))
      console.log('전송 ' + JSON.stringify({ type: "R", type_sub: "start_state", data: { modem: modemN, user: userN, token: pushToken } }))
    } catch (error) {
      console.log(error)

      exitAppAlert()
    }
  }


  async function registerClick(sub) {
    // loadState()

    if (atCertifyState == 'no_certification') {
      setSpinner(true)

      try {
        client.write(JSON.stringify({ type: "R", type_sub: "register", data: { modem: modemN, user: userN, carRace: carRace, token: pushToken } }))
        console.log('전송 : ' + JSON.stringify({ type: "R", type_sub: "register", data: { modem: modemN, user: userN, carRace: carRace, token: pushToken } }))
      } catch (error) {
        console.log(error)
        RNRestart.Restart()
      }

      return
    } else if (atCertifyState == 'no_user') {
      setSpinner(true)

      try {
        client.write(JSON.stringify({ type: "R", type_sub: "register", data: { modem: modemN, user: userN, carRace: carRace, token: pushToken } }))
        console.log('전송 : ' + JSON.stringify({ type: "R", type_sub: "register", data: { modem: modemN, user: userN, carRace: carRace, token: pushToken } }))
      } catch (error) {
        console.log(error)
        RNRestart.Restart()
      }
    } else if (atCertifyState == 'good' || atCertifyState == 'no_state') {
      userCancelModal('삭제를 먼저 진행해주세요!')
    }




    // else{
    //   usercancelff('삭제를 먼저 진행해주세요!')
    // }

  }



  const asyncSave = async () => {
    try {
      await AsyncStorage.setItem("@modem_N", modemN)
      await AsyncStorage.setItem("@user_N", userN)
      await AsyncStorage.setItem("@car_Race", carRace)
      await AsyncStorage.setItem("@car_Number", carnum)
      await AsyncStorage.setItem("@is_first", 'notfirst')

      setAtModemn(modemN)
      setatUserNumber(userN)
      setatIsCarRace(carRace)
      setAtUserCarNum(carnum)
      console.log('어싱크 세이브 완료')
    } catch (error) {
      console.error(error)
    }


  }

  function registerDel() {

    try {

      setSpinner(true)

      client.write(JSON.stringify({ type: "R", type_sub: "register_delete", data: { modem: modemN, token: pushToken } }))
      console.log('전송 : ' + JSON.stringify({ type: "R", type_sub: "register_delete", data: { modem: modemN, token: pushToken } }))

      // usercancelff('삭제가 완료되었습니다.')

      setUserN('')
      setCarRace('')
      setSedan1(false)
      setSuv1(false)

      delFirst()
      delUser()
      delcarRace()

      setatUserNumber('')
      setatIsCarRace('')

      setUserN('')
      setCarRace('')

      setIsRegister(false)

    } catch (error) {

      console.log(error)

      exitAppAlert()
    }


  }


  console.log('모뎀 : ' + modemN + '유저:' + userN)


  function usercancelff(mss) {

    setUserCancelModal(true)
    setCancelMss(mss),
      setTimeout(() => {
        setUserCancelModal(false)
        console.log(cancelMss)
        // if (mss == '등록이 완료되었습니다.') {
        //   // navigation.navigate('차량제어')
        //   setIdoorModal(true)
        // }
      }, 1500);
  }

  const [atCertifyState, setAtCertifyState] = useRecoilState(certifyState)

  const unsubscribe = navigation.addListener('focus', async () => {

    getData().then(res => { if (res != null) setIsRegister(true) })

    console.log(atCertifyState)
    if (atCertifyState == 'no_certification') {
      // Alert.alert('재인증 유저.')
    }
  });
  useEffect(() => {
    return () => { unsubscribe() };
  });



  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>

      <View style={{ width: '100%', height: '100%' }}>

        {/* 헤더 */}
        <View style={{ height: 60, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
          <TouchableWithoutFeedback onPress={() => {
            if (AllStateApp === 'no_user' || AllStateApp === 'no_cer')
              Alert.alert('먼저 등록 및 인증을 해주세요')
            else
              navigation.navigate('차량제어');
          }}>
            <View><Image source={back}></Image></View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { }}>
            <Text style={styles.maintxt}>차량 등록</Text>
          </TouchableWithoutFeedback>
          <View style={{ width: 20 }}></View>
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

          <View style={{ width: chwidth - 32, height: 56, backgroundColor: "#f0f1f5", borderRadius: 6, marginTop: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput placeholder='차량 번호' placeholderTextColor="gray" style={styles.inputtxt} onChangeText={txt => setCarnum(txt)} value={carnum} keyboardType={"number-pad"}></TextInput>
              {carnum != '' &&
                <TouchableOpacity onPress={() => setCarnum('')}>
                  <Image source={inputcls}></Image>
                </TouchableOpacity>
              }
            </View>
          </View>

          <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(), setRaceModal(true) }}>
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

              <TouchableWithoutFeedback onPress={() => setDelModal(true)}>
                <View style={{ borderStyle: "solid", borderWidth: 1.5, borderColor: "#a6a9ac", height: 54, flex: 1, borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
                  <Text style={styles.canceltxt2}>삭제</Text>
                </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.05 }}></View>

              <TouchableWithoutFeedback onPress={() => registerClick('register')}>
                <View style={{ borderRadius: 6, backgroundColor: "#f75929", height: 54, flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <Text style={styles.registertxt}>{atCertifyState == 'no_certification' ? '재인증' : '등록'}</Text>
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
                <Text style={styles.registertxt}>{atCertifyState == 'no_certification' ? '재인증' : '등록'}</Text>
              </View>

            </View>
          }


        </View>
        {/* 본문 */}

        {/* 차량선택 모달 */}
        <Modal visible={raceModal} transparent={true} animationType={'slide'}>
          <SafeAreaView style={{ backgroundColor: 'rgb(247,247,247)' }}>
            <View style={{ width: chwidth, height: '100%' }}>
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
                          <View style={styles.carselectbtn}>
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
                          <View style={styles.carbtn}>
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
                          <View style={styles.carselectbtn}>
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
                          <View style={styles.carbtn}>
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
                <View style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}>
                  {(sedan1 == true || suv1 == true) ?
                    <TouchableWithoutFeedback onPress={() => { iscar() }}>
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


        {/*  */}
        <Modal visible={loadModal} transparent={true} animationType={'fade'}>
          <SafeAreaView style={{ width: chwidth, height: chheight, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: chwidth - 80, height: 160, backgroundColor: 'white', marginTop: -150, borderRadius: 10 }}>
              <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Text style={styles.modalTitle}>주의!</Text>
                <Text style={styles.modaltxt}>이미 등록된 사용자입니다.</Text>
                <Text style={styles.modaltxt}>계속 진행하시겠습니까?</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={{ width: chwidth - 80, borderWidth: 0.5 }}></View>
                <View style={{ flexDirection: 'row', width: chwidth - 80, height: 50 }}>
                  <TouchableWithoutFeedback onPress={() => { setLoadModal(false), usercancelff('등록을 취소합니다.') }}>
                    <View style={{ flex: 1, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                      <Text>취소</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <View style={{ height: 50, borderWidth: 0.5 }}></View>
                  <TouchableWithoutFeedback onPress={() => { registerClick('register_update'), setLoadModal(false) }}>
                    <View style={{ flex: 1, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                      <Text>확인</Text>
                    </View>
                  </TouchableWithoutFeedback>

                </View>
              </View>
            </View>

          </SafeAreaView>
        </Modal>
        {/*  */}

        {/*  */}
        <Modal visible={DeleteFirstModal} transparent={true} animationType={'fade'}>
          <SafeAreaView style={{ width: chwidth, height: chheight, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: chwidth - 80, height: 160, backgroundColor: 'white', marginTop: -150, borderRadius: 10 }}>
              <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Text style={styles.modalTitle}>주의!</Text>
                <Text style={styles.modaltxt}>이미 등록된 사용자입니다.</Text>
                <Text style={styles.modaltxt}>삭제를 먼저 진행해주세요!</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={{ width: chwidth - 80, borderWidth: 0.5 }}></View>
                <View style={{ flexDirection: 'row', width: chwidth - 80, height: 50 }}>
                  <TouchableWithoutFeedback onPress={() => { setDeleteFirstModal(false) }}>
                    <View style={{ flex: 1, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                      <Text>확인</Text>
                    </View>
                  </TouchableWithoutFeedback>

                </View>
              </View>
            </View>

          </SafeAreaView>
        </Modal>
        {/*  */}

        {/*  */}
        <Modal visible={delModal} transparent={true} animationType={'fade'}>
          <SafeAreaView style={{ width: chwidth, height: chheight, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: chwidth - 80, height: 160, backgroundColor: 'white', marginTop: -150, borderRadius: 10 }}>
              <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Text style={styles.modalTitle}>주의!</Text>
                <Text style={styles.modaltxt}>등록된 사용자를 삭제합니다.</Text>
                <Text style={styles.modaltxt}>계속 진행하시겠습니까?</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={{ width: chwidth - 80, borderWidth: 0.5 }}></View>
                <View style={{ flexDirection: 'row', width: chwidth - 80, height: 50 }}>
                  <TouchableWithoutFeedback onPress={() => { setDelModal(false), usercancelff('삭제를 취소합니다.') }}>
                    <View style={{ flex: 1, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                      <Text>취소</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <View style={{ height: 50, borderWidth: 0.5 }}></View>
                  <TouchableWithoutFeedback onPress={() => { registerDel(), setDelModal(false) }}>
                    <View style={{ flex: 1, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                      <Text>확인</Text>
                    </View>
                  </TouchableWithoutFeedback>

                </View>
              </View>
            </View>

          </SafeAreaView>
        </Modal>
        {/*  */}


        <Modal visible={userCancelModal} transparent={true} animationType={'fade'}>
          <SafeAreaView style={{ width: chwidth, height: chheight, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: chwidth - 80, height: 80, backgroundColor: 'white', marginTop: -300, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.modaltxt}>{cancelMss}</Text>
            </View>
          </SafeAreaView>
        </Modal>

        {/*  */}
        <Modal visible={idoorModal} transparent={true} animationType={'fade'}>
          <SafeAreaView style={{ width: chwidth, height: chheight, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: chwidth - 80, height: 160, backgroundColor: 'white', marginTop: -150, borderRadius: 10 }}>
              <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Text style={styles.modalTitle}>i도어 비밀번호</Text>
                <Text style={styles.modaltxt}>i도어 비밀번호를 설정하시겠습니까?</Text>
                <Text style={styles.modaltxt}></Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={{ width: chwidth - 80, borderWidth: 0.5 }}></View>
                <View style={{ flexDirection: 'row', width: chwidth - 80, height: 50 }}>
                  <TouchableWithoutFeedback onPress={() => { setIdoorModal(false), navigation.navigate('차량제어') }}>
                    <View style={{ flex: 1, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                      <Text>취소</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <View style={{ height: 50, borderWidth: 0.5 }}></View>
                  <TouchableWithoutFeedback onPress={() => { setIdoorModal(false), navigation.navigate('간편비밀번호', { whocall: 'register' }) }}>
                    <View style={{ flex: 1, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                      <Text>확인</Text>
                    </View>
                  </TouchableWithoutFeedback>

                </View>
              </View>
            </View>

          </SafeAreaView>
        </Modal>
        {/*  */}

        <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: 'white' }}
        />

      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  modaltxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "black",
    width: chwidth - 80,
    textAlign: 'center'
  },
  modalTitle: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "black",
    width: chwidth - 80,
    textAlign: 'center',
    marginBottom: 5
  },
  canceltxt: {
    opacity: 0.3,
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    color: "#4e535a"
  },
  canceltxt2: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    color: "#4e535a"
  },
  registertxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff"
  },
  carResist: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 17,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: 'rgb(68,73,80)',
    marginLeft: 16
  },
  race: {
    fontFamily: "AppleSDGothicNeo-Medium",
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
    justifyContent: "center",
    alignItems: "center"
  },
  saveBtn2: {
    height: 54,
    borderRadius: 6,
    backgroundColor: "#f75929",
    width: chwidth - 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  savetxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff",
  },
  cartext: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#4e535a"
  },
  maintxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.24,
    color: "#393e46"
  },
  inputtxt: {
    fontFamily: "AppleSDGothicNeo-Medium",
    fontSize: 17,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: 'rgb(68,73,80)',
    width: chwidth - 80,
    marginLeft: 16,
    height: 56
  },
  carbtn: {
    height: 128,
    flex: 1,
    backgroundColor: "#f0f1f5",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#f0f1f5",
    borderStyle: 'solid',
  },
  carselectbtn: {
    height: 128,
    flex: 1,
    backgroundColor: "#f0f1f5",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#f75929",
    borderStyle: 'solid',
  }
})

export default React.memo(CarRegister)