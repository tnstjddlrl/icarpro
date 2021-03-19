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

import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

const close = require('../img/closebtn.png')
const back = require('../img/backbtn.png')
const inputcls = require('../img/inputClose.png')
const rightArr = require('../img/rightArrow.png')

const CarRegister = () => {

  const [modemN, setModemN] = useState('')
  const [userN, setUserN] = useState('')
  const [carRace, setCarRace] = useState('')
  const [raceModal, setRaceModal] = useState(false)

  return (
    <SafeAreaView style={{ backgroundColor: 'rgb(247,247,247)' }}>
      <View style={{ width: chwidth, height: chheight }}>

        {/* 헤더 */}
        <View style={{ flex: 0.8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
          <View><Image source={back}></Image></View>
          <Text style={{ fontFamily: "AppleSDGothicNeo", }}>차량 등록</Text>
          <View><Image source={close}></Image></View>
        </View>
        {/* 헤더 */}

        {/* 본문 */}
        <View style={{ flex: 10, marginLeft: 16 }}>
          <View style={{ width: chwidth - 32, height: 56, backgroundColor: "#f0f1f5", borderRadius: 6, marginTop: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput placeholder='Modem Number' placeholderTextColor="gray" style={{ width: chwidth - 80, marginLeft: 16 }} onChangeText={txt => setModemN(txt)} value={modemN} keyboardType={"number-pad"}></TextInput>
              {modemN != '' &&
                <TouchableOpacity onPress={() => setModemN('')}>
                  <Image source={inputcls}></Image>
                </TouchableOpacity>
              }
            </View>
          </View>
          <View style={{ width: chwidth - 32, height: 56, backgroundColor: "#f0f1f5", borderRadius: 6, marginTop: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput placeholder='User Number' placeholderTextColor="gray" style={{ width: chwidth - 80, marginLeft: 16 }} onChangeText={txt => setUserN(txt)} value={userN} keyboardType={"number-pad"}></TextInput>
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

                <View style={{ flexDirection: "row", alignItems: "center",justifyContent:"flex-end" }}>
                  <Text style={styles.race}>{carRace}</Text>
                  <Image source={rightArr}></Image>
                </View>

              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={{ flexDirection: "row", width: chwidth - 32, marginTop: 16 }}>
            <View style={{ borderStyle: "solid", borderWidth: 1.5, borderColor: "#e3e3e5", height: 54, flex: 1, borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.canceltxt}>삭제</Text>
            </View>
            <View style={{ flex: 0.05 }}></View>
            <View style={{ borderRadius: 6, backgroundColor: "#e1e1e3", height: 54, flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.registertxt}>등록</Text>
            </View>
          </View>
        </View>
        {/* 본문 */}

        {/* 차량선택 모달 */}
        <Modal visible={raceModal}>
          <SafeAreaView style={{ backgroundColor: 'rgb(247,247,247)' }}>
            <View style={{ width: chwidth, height: chheight }}>
              {/* 모달헤더 */}
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
                <TouchableWithoutFeedback onPress={()=>setRaceModal(false)}>
                <View><Image source={back}></Image></View>
                </TouchableWithoutFeedback>
                <Text style={{ fontFamily: "AppleSDGothicNeo", }}>차량 선택</Text>
                <View style={{width:30}}></View>
              </View>
              {/*  */}

              {/* 본문 */}
                <View style={{flex:10}}>
                  {/* 차량부분 */}
                  <View style={{flex:8}}>
                    <ScrollView>
                  <View style={{flexDirection:"row",alignItems:"center",marginLeft:16,width:chwidth-32}}>
                    <View style={{height:128,flex:1,backgroundColor: "#f0f1f5",borderRadius: 6,}}>

                    </View>
                    <View style={{flex:0.1}}></View>
                    <View style={{height:128,flex:1,backgroundColor: "#f0f1f5",borderRadius: 6,}}>

                    </View>
                  </View>
                  </ScrollView>
                  </View>
                  {/*  */}

                  {/* 저장버튼 */}
                  <View style={{flex:1.5}}>
                  <View style={styles.saveBtn}>
                    <Text style={styles.savetxt}>저장</Text>
                  </View>
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
  saveBtn : {
    height: 54,
    borderRadius: 6,
    backgroundColor: "#e1e1e3",
    width:chwidth-32,
    marginLeft:16,
    justifyContent:"center",
    alignItems:"center"
  },
  savetxt:{
    fontFamily: "AppleSDGothicNeo",
  fontSize: 18,
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: "#ffffff",
  }
})

export default CarRegister