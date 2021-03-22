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

import { FlingGestureHandler,Directions,State } from 'react-native-gesture-handler'

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height


const back = require('../img/backbtn.png')

const SwipeTest = () => {
  return (
    <SafeAreaView>
      <View style={{ width: chwidth, height: chheight }}>
        {/* 헤더 */}
        <View style={{ flex: 0.8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
          <View><Image source={back}></Image></View>
          <Text style={styles.maintxt}>스와이프 감지 테스트</Text>
          <View style={{ width: 30 }}></View>
        </View>
        {/* 헤더 끝 */}

        {/* 본문 */}
        <FlingGestureHandler
            direction={Directions.LEFT}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.ACTIVE) {
                Alert.alert("I'm flinged!");
              }
            }}>
        <View style={{ flex: 10 }}>
          <TouchableOpacity onPress={()=>{Alert.alert('안녕!')}}>
            <Text>클릭되나?</Text>
          </TouchableOpacity>

        </View>
        </FlingGestureHandler>
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
  }
})

export default SwipeTest