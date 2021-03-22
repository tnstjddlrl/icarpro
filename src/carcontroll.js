import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Toast from 'react-native-toast-message';

import client from './Client.js'

import { FlingGestureHandler,Directions,State } from 'react-native-gesture-handler'

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

const sedan1_big = require('../img/sedan1_big.png')

const smallLogo = require('../img/smallLogo.png')
const startbtn = require('../img/startbtn.png')

const lockSelect = require('../img/lockSelect.png')
const lockNoSelect = require('../img/lockNoSelect.png')

const panicSelect = require('../img/panicSelect.png')
const panicNOSelect = require('../img/panicNoSelect.png')

const warnSelect = require('../img/warnSelect.png')
const warnNoSelect = require('../img/warnNoSelect.png')


const trunkSelect = require('../img/trunkSelect.png')
const trunkNoSelect = require('../img/trunkNoSelect.png')



var params = {'userkey':'1234_user1','carkey':'user1_10육1004','command':'door','state': '1'}
var json = JSON.stringify(params)

var door_0 = {'userkey':'1234_user1','carkey':'user1_10육1004','command':'door','state': '0'}
var door_1 = {'userkey':'1234_user1','carkey':'user1_10육1004','command':'door','state': '1'}
var panic_0 = {'userkey':'1234_user1','carkey':'user1_10육1004','command':'panic','state': '0'}
var panic_1 = {'userkey':'1234_user1','carkey':'user1_10육1004','command':'panic','state': '1'}
var warn_0 = {'userkey':'1234_user1','carkey':'user1_10육1004','command':'warn','state': '0'}
var warn_1 = {'userkey':'1234_user1','carkey':'user1_10육1004','command':'warn','state': '1'}
var trunk_0 = {'userkey':'1234_user1','carkey':'user1_10육1004','command':'trunk','state': '0'}

door_0 =JSON.stringify(door_0)
door_1=JSON.stringify(door_1)
panic_0=JSON.stringify(panic_0)
panic_1=JSON.stringify(panic_1)
warn_0=JSON.stringify(warn_0)
warn_1=JSON.stringify(warn_1)
trunk_0=JSON.stringify(trunk_0)




const Carcontroll = () => {
  const navigation = useNavigation()


  const [boot, setBoot] = useState(false)
  const [door, setDoor] = useState(true)
  const [panic, setPanic] = useState(false)
  const [warnbim, setWarnbim] = useState(false)
  const [trunk, setTrunk] = useState(false)


  function doorClick(is) {
    if (is == 'lock') {
      setDoor(true)
      //Alert.alert('door_0')

      Toast.show({
        type: 'success',
        position: 'top',
        text1: '도어 명령',
        text2: '도어 명령을 [LOCK]하였습니다.',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => { },
        onHide: () => { },
        onPress: () => { }
      });

      client(door_0)
    }


    if (is == 'unlock') {
      setDoor(false)
     // Alert.alert('door_1')

      Toast.show({
        type: 'success',
        position: 'top',
        text1: '도어 명령',
        text2: '도어 명령을 [UNLOCK]하였습니다.',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => { },
        onHide: () => { },
        onPress: () => { }
      });

      client(door_1)
    }
  }

  function panicClick(is) {
    if (is == 'on') {
      setPanic(true)
      //Alert.alert('panic_0')

      Toast.show({
        type: 'success',
        position: 'top',
        text1: '패닉 명령',
        text2: '패닉 명령을 [ON]하였습니다.',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => { },
        onHide: () => { },
        onPress: () => { }
      });

      client(panic_0)
    }

    if (is == 'off') {
      setPanic(false)
      Alert.alert('panic_1')

      Toast.show({
        type: 'success',
        position: 'top',
        text1: '패닉 명령',
        text2: '패닉 명령을 [OFF]하였습니다.',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => { },
        onHide: () => { },
        onPress: () => { }
      });

      client(panic_1)
    }
  }

  function warnClick(is) {
    if (is == 'on') {
      setWarnbim(true)
      //Alert.alert('emergency_0')

      Toast.show({
        type: 'success',
        position: 'top',
        text1: '비상등 명령',
        text2: '비상등 명령을 [ON]하였습니다.',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => { },
        onHide: () => { },
        onPress: () => { }
      });

      client(warn_0)
    }

    if (is == 'off') {
      setWarnbim(false)
     // Alert.alert('emergency_1')

      Toast.show({
        type: 'success',
        position: 'top',
        text1: '비상등 명령',
        text2: '비상등 명령을 [OFF]하였습니다.',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => { },
        onHide: () => { },
        onPress: () => { }
      });
      client(warn_1)
      
    }

    
  }

  function trunkClick() {
    //Alert.alert('trunk_0')
    setTrunk(true)

    Toast.show({
      type: 'success',
      position: 'top',
      text1: '트렁크 명령',
      text2: '트렁크 명령을 [OPEN]하였습니다.',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
      onShow: () => { },
      onHide: () => { },
      onPress: () => { }
    });

    client(trunk_0)

    setTimeout(() => {
      setTrunk(false)
    }, 1500);
  }

  function bootClick() {
    if (boot == false) {
      setBoot(true)
      // Alert.alert(
      //   "boot_0",
      //   "",
      //   [
      //     { text: "확인" }
      //   ]
      // );

    } else {
      setBoot(false)
      // Alert.alert(
      //   "boot_1",
      //   "",
      //   [
      //     { text: "확인" }
      //   ]
      // );
    }
  }
  
  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
      <FlingGestureHandler
            direction={Directions.LEFT}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.ACTIVE) {
                navigation.navigate('설정')
              }
            }}>
      <FlingGestureHandler
            direction={Directions.DOWN}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.ACTIVE) {
                navigation.navigate('차량상태')
              }
            }}>
      <View style={{ width: chwidth, height: chheight - 40 }}>
          <View style={{ flex: 3 }}>
            <View style={{flex:0.8}}></View>
            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start"}}>
              <Image source={smallLogo} style={{marginLeft:15}}></Image>
            </View>
            <View style={{flex:4}}>
              <Text style={styles.carnum}>12기 3456</Text>
              <View style={{justifyContent:"center",alignItems:"center"}}>
              <Image source={sedan1_big} style={{marginTop:-30}}></Image>
              </View>
            </View>
          </View>


        <TouchableWithoutFeedback onPress={() => { bootClick() }}>
          <View style={{ width: chwidth - 32, flex: 0.8, backgroundColor: "#f0f1f5", marginLeft: 16, borderRadius: 10, justifyContent: 'center' }}>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>

              <View style={{flexDirection:"row",alignItems:'center'}}>
                <Image source={startbtn} style={{marginLeft:26,marginRight:8}}></Image>
                <Text style={styles.starttxt}>원격시동 켜기</Text>
              </View>

              <Text style={styles.clocktxt}>00:00</Text>

            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={{ flex: 0.2 }}></View>

        <View style={{ flex: 2, flexDirection: 'row', marginLeft: 16 }}>
          <View style={{ width: chwidth / 2 - 21, backgroundColor: "#f0f1f5", borderRadius: 10 }}>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
              {door ? 
               <Image source={lockSelect}></Image>
              : 
                <Image source={lockNoSelect}></Image>
              }
              
              <Text style={styles.titletxt}>도어</Text>
            </View>

            {door ? <View style={{ flex: 2, flexDirection: 'row' }}>
              <TouchableWithoutFeedback onPress={() => doorClick('unlock')}>
                <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.btntxt}>unlock</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={{ flex: 0.02 }}></View>
              <TouchableWithoutFeedback onPress={() => doorClick('lock')}>
                <View style={{ flex: 1, backgroundColor: "#f75929", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.btntxt}>lock</Text>
                </View>
              </TouchableWithoutFeedback>
            </View> : <View style={{ flex: 2, flexDirection: 'row' }}>
                <TouchableWithoutFeedback onPress={() => doorClick('unlock')}>
                  <View style={{ flex: 1, backgroundColor: "rgb(68,73,80)", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.btntxt}>unlock</Text>
                  </View>
                </TouchableWithoutFeedback>
                <View style={{ flex: 0.02 }}></View>
                <TouchableWithoutFeedback onPress={() => doorClick('lock')}>
                  <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.btntxt}>lock</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>}

          </View>

          <View style={{ width: chwidth / 2 - 21, backgroundColor: "#f0f1f5", marginLeft: 10, borderRadius: 10 }}>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
              {
                panic ? 
                <Image source={panicSelect}></Image>
                :
<Image source={panicNOSelect}></Image>
              }
              
              <Text style={styles.titletxt}>패닉</Text>
            </View>
            <View style={{ flex: 2, flexDirection: 'row' }}>
              <TouchableWithoutFeedback onPress={() => panicClick('off')}>
                <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.btntxt}>off</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={{ flex: 0.02 }}></View>

              {panic ? <TouchableWithoutFeedback onPress={() => panicClick('on')}>
                <View style={{ flex: 1, backgroundColor: "#f75929", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.btntxt}>on</Text>
                </View>
              </TouchableWithoutFeedback> : <TouchableWithoutFeedback onPress={() => panicClick('on')}>
                  <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.btntxt}>on</Text>
                  </View>
                </TouchableWithoutFeedback>}

            </View>
          </View>
        </View>

        <View style={{ flex: 0.2 }}></View>

        <View style={{ flex: 2, flexDirection: 'row', marginLeft: 16 }}>
          <View style={{ width: chwidth / 2 - 21, backgroundColor: "#f0f1f5", borderRadius: 10 }}>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
              {
                warnbim ?
<Image source={warnSelect}></Image>
                :
<Image source={warnNoSelect}></Image>
              }
              
              <Text style={styles.titletxt}>비상등</Text>
            </View>
            <View style={{ flex: 2, flexDirection: 'row' }}>
              <TouchableWithoutFeedback onPress={() => warnClick('off')}>
                <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.btntxt}>off</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={{ flex: 0.01 }}></View>

              {warnbim ? <TouchableWithoutFeedback onPress={() => warnClick('on')}>
                <View style={{ flex: 1, backgroundColor: "#f75929", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.btntxt}>on</Text>
                </View>
              </TouchableWithoutFeedback> : <TouchableWithoutFeedback onPress={() => warnClick('on')}>
                  <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.btntxt}>on</Text>
                  </View>
                </TouchableWithoutFeedback>}
            </View>
          </View>
          <View style={{ width: chwidth / 2 - 21, backgroundColor: "#f0f1f5", marginLeft: 10, borderRadius: 10 }}>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
              { trunk ? 
              <Image source={trunkSelect}></Image>
            :
            <Image source={trunkNoSelect}></Image>
            }
              
              <Text style={styles.titletxt}>트렁크</Text>
            </View>
            <View style={{ flex: 2, flexDirection: 'row' }}>

              {trunk ? <TouchableWithoutFeedback onPress={() => trunkClick()}>
                <View style={{ flex: 1, backgroundColor: "#f75929", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.btntxt}>open</Text>
                </View>
              </TouchableWithoutFeedback> : <TouchableWithoutFeedback onPress={() => trunkClick()}>
                  <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.btntxt}>open</Text>
                  </View>
                </TouchableWithoutFeedback>}
            </View>
          </View>
        </View>

      </View>

      </FlingGestureHandler>
      </FlingGestureHandler>

      <Toast style={{ marginBottom: -50 }} ref={(ref) => Toast.setRef(ref)} />
     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  starttxt : {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#4e535a"
  },
  btntxt : {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    color: "#f8f8f8"
  },
  titletxt : {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#4e535a"
  },
  clocktxt:{
    opacity: 0.3,
  fontFamily: "AppleSDGothicNeo",
  fontSize: 14,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "right",
  color: "#252525",
  marginRight:24
  },
  carnum : {
    opacity: 0.4,
  fontFamily: "AppleSDGothicNeo",
  fontSize: 18,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#040404",
  marginLeft:16
  }
})

export default Carcontroll