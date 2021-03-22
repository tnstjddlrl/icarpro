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


const back = require('../img/backbtn.png')

const on = require('../img/pwd/on.png')
const ready = require('../img/pwd/ready.png')
const off = require('../img/pwd/off.png')

const CarState = () => {
  const [pwd,setpwd] = useState('')
  return(
    <SafeAreaView style={{backgroundColor:'white'}}>
      <View style={{width:chwidth,height:chheight}}>
        {/* 헤더 */}
          <View style={{ flex: 0.8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
            <View><Image source={back}></Image></View>
            <Text style={styles.maintxt}>i도어 비밀번호</Text>
            <Text style={styles.savetxt}>저장</Text>
          </View>
        {/* 헤더 끝 */}

        {/* 본문 */}
        <View style={{flex:10}}>
          
          <View style={{flex:2.5,justifyContent:'flex-end',alignItems:"center"}}>
            <Text style={styles.title}>비밀번호 등록</Text>
            <Text style={styles.sub}>비밀번호 네자리를 입력하세요</Text>
          </View>

          <View style={{flex:2,alignItems:"center"}}>
            <View style={{flexDirection:'row',alignItems:'flex-end',marginTop:80,height:50}}>
              {(pwd.length != 0) ? <Image source={on} style={{marginRight:12}}></Image> : <Image source={ready} style={{marginRight:12}}></Image>}
              
              {pwd.length == 0 && <Image source={off} style={{marginRight:12}}></Image> }
              {(pwd.length== 1) && <Image source={ready} style={{marginRight:12}}></Image>}
              {(pwd.length>= 2) && <Image source={on} style={{marginRight:12}}></Image>}

              {pwd.length < 2 && <Image source={off} style={{marginRight:12}}></Image> }
              {(pwd.length== 2) && <Image source={ready} style={{marginRight:12}}></Image>}
              {(pwd.length>= 3) && <Image source={on} style={{marginRight:12}}></Image>}

              {pwd.length < 3 && <Image source={off}></Image> }
              {(pwd.length== 3) && <Image source={ready}></Image>}
              {(pwd.length>= 4) && <Image source={on}></Image>}
            </View>
          </View>

          <View style={{flex:4}}>

          </View>
          

        </View>
        {/* 본문 끝 */}
      </View>
      <TextInput style={{position:'absolute',width:chwidth,height:chheight*4}} keyboardType={'number-pad'}
                onChangeText={(txt)=>setpwd(txt)} value={pwd}
      ></TextInput>
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
  savetxt: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 17,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "right",
    color: "#f75929"
  },
  title:{
    fontFamily: "AppleSDGothicNeo",
  fontSize: 22,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: -0.29,
  textAlign: "center",
  color: "#393e46"
  },
  sub:{
    fontFamily: "AppleSDGothicNeo",
  fontSize: 15,
  fontWeight: "500",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "center",
  color: 'rgb(68,73,80)',
  marginTop:16
  }
})

export default CarState