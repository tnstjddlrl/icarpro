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

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

const vwwidth = Dimensions.get('screen').width
const vwheight = Dimensions.get('screen').height


const back = require('../img/backbtn.png')

const warnOn = require('../img/state/warnOn.png')
const warnIcon = require('../img/state/warnIcon.png')

const lockIcon = require('../img/state/lockIcon.png')
const doorIcon = require('../img/state/doorIcon.png')
const hoodIcon = require('../img/state/hoodIcon.png')
const stateIcon = require('../img/state/stateIcon.png')
const bootIcon = require('../img/state/bootIcon.png')
const voltIcon = require('../img/state/voltIcon.png')

const CarState = () => {
  return(
    <SafeAreaView style={{backgroundColor:'white'}}>
      <View style={{width:chwidth,height:chheight}}>
        {/* 헤더 */}
          <View style={{ flex: 0.8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
            <View><Image source={back}></Image></View>
            <Text style={styles.maintxt}>차량 상태</Text>
            <View style={{width:30}}></View>
          </View>
        {/* 헤더 끝 */}

        {/* 본문 */}
        <View style={{flex:10}}>
          {/* 차량 이미지 */}
          <View style={{justifyContent:"center", alignItems:"center",flex:5.5}}>
            <Image source={warnOn}></Image>
          </View>
          {/* 차량 이미지 끝 */}

          {/* 상태 부분 */}
          

            <View style={{flex:1,width:chwidth-32,marginLeft:16,flexDirection:"row"}}>

                <View style={styles.frame}>
                  <View style={{flexDirection:"row",marginLeft:10,marginRight:16,justifyContent:"space-between",alignItems:"center"}}>
                    <View style={{flexDirection:"row"}}>
                      <Image source={warnIcon}></Image>
                      <Text style={styles.frametxt}>차량 경계</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                      <Text style={styles.ontxt}>ON</Text>
                    </View>
                  </View>
                </View>

                <View style={{flex:0.05}}></View>

                <View style={styles.frame}>
                  
                </View>

            </View>

            <View style={{flex:4}}>

            </View>

         
          {/* 상태 부분 끝 */}

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
  frame : {
    height: 54,
    borderRadius: 10,
    backgroundColor: "#f0f1f5",
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  frametxt:{
    fontFamily: "AppleSDGothicNeo",
  fontSize: 15,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#4e535a",
  marginLeft:6
  },
  ontxt:{
    fontFamily: "AppleSDGothicNeo",
  fontSize: 15,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "right",
  color: "#f75929"
  },
  offtxt:{
    opacity: 0.5,
  fontFamily: "AppleSDGothicNeo",
  fontSize: 15,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "right",
  color: "#4e535a"
  }
})

export default CarState