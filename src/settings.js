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
  Switch
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

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


const Settings = () => {
  return(
    <SafeAreaView style={{backgroundColor:'white'}}>
      <View style={{width:chwidth,height:chheight}}>
        {/* 헤더 */}
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
            <View><Image source={back}></Image></View>
            <Text style={styles.maintxt}>설정</Text>
              <Text style={styles.savetxt}>저장</Text>
          </View>
        {/* 헤더 끝 */}

        {/* 본문 */}
        <View style={{flex:10,marginLeft:16}}>
          <View style={{marginTop:10}}></View>
          <View style={styles.oneFrame}>
            <View style={{marginLeft:11,marginRight:16,flexDirection:"row",justifyContent:"space-between"}}>
              <View style={{flexDirection:"row"}}>
              <Image source={icarIcon}></Image>
              <Text style={styles.frameTitle}>iCar</Text>
              </View>
              <Switch></Switch>
            </View>
          </View>
          

        </View>
        {/* 본문 끝 */}

      
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  maintxt: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.24,
    color: "#393e46"
  },
  savetxt:{
    fontFamily: "AppleSDGothicNeo",
  fontSize: 17,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "right",
  color: "#f75929"
  },
  oneFrame : {
    width:chwidth-32,
    height: 56,
    borderRadius: 6,
    backgroundColor: "#f0f1f5",
    justifyContent:"center"
  },
  frameTitle : {
    fontFamily: "AppleSDGothicNeo",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#4e535a",
  marginLeft:8
  }
})

export default Settings