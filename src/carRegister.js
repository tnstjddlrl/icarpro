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
  Modal,
  ScrollView
} from 'react-native';

import client from './Client'

import { useNavigation } from '@react-navigation/native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

const close = require('../img/closebtn.png')
const back = require('../img/backbtn.png')
const inputcls = require('../img/inputClose.png')
const rightArr = require('../img/rightArrow.png')
const radioSelect = require('../img/radioSelect.png')



const sedan1img = require('../img/sedan1.png')
const suv1img = require('../img/suv1.png')


const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};

const CarRegister = () => {
  const navigation = useNavigation()

  const [modemN, setModemN] = useState('')
  const [userN, setUserN] = useState('')
  const [carRace, setCarRace] = useState('')
  const [raceModal, setRaceModal] = useState(false)


  const [sedan1, setSedan1] = useState(false)
  const [suv1, setSuv1] = useState(false)

  function iscar() {
    if (sedan1 == true) {
      Alert.alert('차량이 변경되었습니다.')
      setCarRace('SEDAN')
    } else if (suv1 == true) {
      Alert.alert('차량이 변경되었습니다.')
      setCarRace('SUV')
    }
  }

  function registerClick() {
    var txt = {"type":"R","type_sub":"register","data" : {"modem" : modemN , "user" : userN}}
    
    txt=JSON.stringify(txt)


    var res = client(txt)
    
    console.log(res)


    if(res == 'okay'){
      Alert.alert('등록되었습니다.')
    }else{
      Alert.alert('등록에 실패하였습니다.')
    }
    
  }

  function onSwipeUp() {
    console.log('위로 스와이프');
  }

  function onSwipeDown() {
    console.log('아래로 스와이프');
  }

  function onSwipeLeft() {
    console.log('왼쪽으로 스와이프');
  }

  function onSwipeRight() {
    console.log('오른쪽으로 스와이프');
  }



  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <GestureRecognizer
        onSwipeUp={(state) => onSwipeUp()}
        onSwipeDown={(state) => onSwipeDown()}
        onSwipeLeft={(state) => onSwipeLeft()}
        onSwipeRight={(state) => onSwipeRight()}
        config={config}
        style={{flex:1}}
        >
      <View style={{ width: chwidth, height: chheight }}>

        {/* 헤더 */}
        <View style={{ flex: 0.8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
          <View><Image source={back}></Image></View>
          <Text style={styles.maintxt}>차량 등록</Text>
          <View><Image source={close}></Image></View>
        </View>
        {/* 헤더 */}

        {/* 본문 */}
        <View style={{ flex: 10, marginLeft: 16 }}>
          <View style={{ width: chwidth - 32, height: 56, backgroundColor: "#f0f1f5", borderRadius: 6, marginTop: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput placeholder='모뎀 번호' placeholderTextColor="gray" style={{ width: chwidth - 80, marginLeft: 16 }} onChangeText={txt => setModemN(txt)} value={modemN} keyboardType={"number-pad"}></TextInput>
              {modemN != '' &&
                <TouchableOpacity onPress={() => setModemN('')}>
                  <Image source={inputcls}></Image>
                </TouchableOpacity>
              }
            </View>
          </View>
          <View style={{ width: chwidth - 32, height: 56, backgroundColor: "#f0f1f5", borderRadius: 6, marginTop: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput placeholder='휴대폰 번호' placeholderTextColor="gray" style={{ width: chwidth - 80, marginLeft: 16 }} onChangeText={txt => setUserN(txt)} value={userN} keyboardType={"number-pad"}></TextInput>
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
              
              <TouchableWithoutFeedback>
              <View style={{ borderStyle: "solid", borderWidth: 1.5, borderColor: "#a6a9ac", height: 54, flex: 1, borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.canceltxt2}>삭제</Text>
              </View>
              </TouchableWithoutFeedback>

              <View style={{ flex: 0.05 }}></View>

              <TouchableWithoutFeedback onPress={()=>registerClick()}>
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
        <Modal visible={raceModal}>
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
      </GestureRecognizer>
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
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: "#4e535a",
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
  }
})

export default CarRegister