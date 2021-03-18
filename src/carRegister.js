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
  StyleSheet
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

const close = require('../img/closebtn.png')
const back = require('../img/backbtn.png')

const CarRegister = () => {
  return(
    <SafeAreaView style={{backgroundColor:'rgb(247,247,247)'}}>
    <View style={{width:chwidth,height:chheight}}>

      {/* 헤더 */}
      <View style={{flex:0.8,flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:chwidth-24,marginLeft:12}}>
        <View><Image source={back}></Image></View>
        <Text style={{fontFamily: "AppleSDGothicNeo",}}>차량 등록</Text>
        <View><Image source={close}></Image></View>
      </View>
      {/* 헤더 */}

      {/* 본문 */}
      <View style={{flex:10,marginLeft:16}}>
        <View style={{width:chwidth-32,height:56,backgroundColor: "#f0f1f5",borderRadius: 6,marginTop:16}}></View>
        <View style={{width:chwidth-32,height:56,backgroundColor: "#f0f1f5",borderRadius: 6,marginTop:16}}></View>
        <View style={{width:chwidth-32,height:56,backgroundColor: "#f0f1f5",borderRadius: 6,marginTop:16}}></View>
        <View style={{flexDirection:"row",width:chwidth-32,marginTop:16}}>
          <View style={{borderStyle: "solid",borderWidth: 1.5,borderColor: "#e3e3e5",height:54,flex:1,borderRadius:6,justifyContent:"center",alignItems:"center"}}>
            <Text style={styles.canceltxt}>삭제</Text>
          </View>
          <View style={{flex:0.05}}></View>
          <View style={{borderRadius: 6,backgroundColor: "#e1e1e3",height:54,flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text style={styles.registertxt}>등록</Text>
          </View>
        </View>
      </View>
      {/* 본문 */}
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  canceltxt : {
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
  registertxt:{
    fontFamily: "AppleSDGothicNeo",
  fontSize: 18,
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "center",
  color: "#ffffff"
  }
})

export default CarRegister