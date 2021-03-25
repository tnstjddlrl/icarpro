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

import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler'

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { networkState,newState,fcmToken } from './atom/atoms'

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

const sedan1_big = require('../img/sedan1_big.png')

const smallLogo = require('../img/controll/smallLogo.png')
const startbtn = require('../img/controll/startbtn.png')
const startoffbtn = require('../img/controll/startoffbtn.png')

const lockSelect = require('../img/controll/lockSelect.png')
const lockNoSelect = require('../img/controll/lockNoSelect.png')
const lockgray = require('../img/controll/lockgray.png')

const panicSelect = require('../img/controll/panicSelect.png')
const panicNOSelect = require('../img/controll/panicNoSelect.png')
const panicgray = require('../img/controll/panicgray.png')

const warnSelect = require('../img/controll/warnSelect.png')
const warnNoSelect = require('../img/controll/warnNoSelect.png')
const warngray = require('../img/controll/warngray.png')


const trunkSelect = require('../img/controll/trunkSelect.png')
const trunkNoSelect = require('../img/controll/trunkNoSelect.png')
const trunkgray = require('../img/controll/trunkgray.png')

const dooron = require('../img/controll/carstate/dooron.png')
const panicon = require('../img/controll/carstate/panicon.png')
const trunkon = require('../img/controll/carstate/trunkon.png')
const booton = require('../img/controll/carstate/booton.png')



// var params = { 'userkey': '1234_user1', 'carkey': 'user1_10육1004', 'command': 'door', 'state': '1' }
// var json = JSON.stringify(params)





// 
// panic_1 = JSON.stringify(panic_1)
// warn_0 = JSON.stringify(warn_0)
// warn_1 = JSON.stringify(warn_1)
// trunk_0 = JSON.stringify(trunk_0)




const Carcontroll = () => {
  const [pushToken, setPushToken] = useRecoilState(fcmToken)

  //console.log('제어 : '+pushToken)

  var door_0 = {type:"R",type_sub:"car_controll", data : {command : 'door', state: '0' , token : pushToken}}
  var door_1 = {type:"R",type_sub:"car_controll", data : {command : 'door', state: '1' , token : pushToken}}
  var panic_0 = {type:"R",type_sub:"car_controll", data : {command : 'panic', state: '0' , token : pushToken}}
  var panic_1 = {type:"R",type_sub:"car_controll", data : {command : 'panic', state: '1' , token : pushToken}}
  var warn_0 = {type:"R",type_sub:"car_controll", data : {command : 'warn', state: '0' , token : pushToken}}
  var warn_1 = {type:"R",type_sub:"car_controll", data : {command : 'warn', state: '1' , token : pushToken}}
  var trunk_0 = {type:"R",type_sub:"car_controll", data : {command : 'trunk', state: '1' , token : pushToken}}

  
  const navigation = useNavigation()


  const [boot, setBoot] = useState(false)
  const [door, setDoor] = useState('no')
  const [panic, setPanic] = useState('no')
  const [warnbim, setWarnbim] = useState('no')
  const [trunk, setTrunk] = useState(false)


  function doorClick(is) {
    if (is == 'lock') {
      setDoor('on')
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
      
      door_0 = JSON.stringify(door_0)
      client.write(door_0)
      console.log('전송 : ' + door_0)

      setTimeout(() => {
        setDoor('no')
      }, 1500);

    }


    if (is == 'unlock') {
      setDoor('off')
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

      door_1 = JSON.stringify(door_1)
      client.write(door_1)
      console.log('전송 : ' + door_1)

      setTimeout(() => {
        setDoor('no')
      }, 1500);
    }
  }

  function panicClick(is) {
    if (is == 'on') {
      setPanic('on')
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

      panic_0 = JSON.stringify(panic_0)
      client.write(panic_0)
      console.log('전송 : ' +panic_0)

      setTimeout(() => {
        setPanic('no')
      }, 1500);
    }

    if (is == 'off') {
      setPanic('off')

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

      panic_1 = JSON.stringify(panic_1)
      client.write(panic_1)
      console.log('전송 : ' +panic_1)

      setTimeout(() => {
        setPanic('no')
      }, 1500);
    }
  }

  function warnClick(is) {
    if (is == 'on') {
      setWarnbim('on')
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

      warn_0 = JSON.stringify(warn_0)
      client.write(warn_0)
      console.log('전송 : ' +warn_0)

      setTimeout(() => {
        setWarnbim('no')
      }, 1500);
    }

    if (is == 'off') {
      setWarnbim('off')
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
      
      warn_1 = JSON.stringify(warn_1)
      client.write(warn_1)
      console.log('전송 : ' +warn_1)

      setTimeout(() => {
        setWarnbim('no')
      }, 1500);

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

      trunk_0 = JSON.stringify(trunk_0)
      client.write(trunk_0)
      console.log('전송 : ' +trunk_0)

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
    <View style={{ backgroundColor: 'white' }}>
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
        <FlingGestureHandler
          direction={Directions.RIGHT}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) {
              navigation.navigate('차량등록')
            }
          }}>
          <View style={{ width: chwidth, height: chheight }}>
            <View style={{ flex: 3 }}>
              <View style={{ flex: 0.8 }}></View>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start" }}>
                <Image source={smallLogo} style={{ marginLeft: 15 }}></Image>
              </View>
              <View style={{ flex: 4 }}>
                <Text style={styles.carnum}>12기 3456</Text>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  {(door != 'on' && panic != 'on' && warnbim != 'on' && trunk != true && boot !=true) &&
                    <Image source={sedan1_big} style={{ marginTop: -30 }}></Image>  
                  }
                  {door == 'on' &&
                    <Image source={dooron} style={{ marginTop: -30 }}></Image>  
                  }
                  {(panic == 'on' || warnbim == 'on') &&
                    <Image source={panicon} style={{ marginTop: -30 }}></Image>  
                  }
                  {trunk== true &&
                    <Image source={trunkon} style={{ marginTop: -30 }}></Image>  
                  }
                  {boot== true &&
                    <Image source={booton} style={{ marginTop: -30 }}></Image>  
                  }
                  
                </View>
              </View>
            </View>


            <TouchableWithoutFeedback onPress={() => { bootClick() }}>
              {
                boot ? 
                <View style={{ width: chwidth - 32, flex: 0.8, backgroundColor: "#f0f1f5",borderStyle: "solid",borderWidth: 2,borderColor: "#f75929", marginLeft: 16, borderRadius: 10, justifyContent: 'center' }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                  <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <Image source={startoffbtn} style={{ marginLeft: 26, marginRight: 8 }}></Image>
                    <Text style={styles.starttxt}>원격시동 끄기</Text>
                  </View>
                  <Text style={styles.Onclocktxt}>00:00</Text>
                </View>
              </View>

                :
                <View style={{ width: chwidth - 32, flex: 0.8, backgroundColor: "#f0f1f5",borderStyle: "solid",borderWidth: 2,borderColor: "#f0f1f5", marginLeft: 16, borderRadius: 10, justifyContent: 'center' }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                  <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <Image source={startbtn} style={{ marginLeft: 26, marginRight: 8 }}></Image>
                    <Text style={styles.starttxt}>원격시동 켜기</Text>
                  </View>
                  <Text style={styles.clocktxt}>00:00</Text>
                </View>
              </View>

              }
            </TouchableWithoutFeedback>

            <View style={{ flex: 0.2 }}></View>

            <View style={{ flex: 2, flexDirection: 'row', marginLeft: 16 }}>
              <View style={{ width: chwidth / 2 - 21, backgroundColor: "#f0f1f5", borderRadius: 10 }}>
                <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                  {door == 'no' && <Image source={lockgray}></Image>}
                  {door == 'off' && <Image source={lockNoSelect}></Image>}
                  {door == 'on' && <Image source={lockSelect}></Image>}

                  <Text style={styles.titletxt}>도어</Text>
                </View>

                {door == 'no' &&
                  <View style={{ flex: 2, flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={() => doorClick('unlock')}>
                      <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.btntxt}>unlock</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <View style={{ flex: 0.02 }}></View>
                    <TouchableWithoutFeedback onPress={() => doorClick('lock')}>
                      <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.btntxt}>lock</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                }

                {door == 'off' &&
                  <View style={{ flex: 2, flexDirection: 'row' }}>
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
                  </View>
                }
                {door == 'on' &&
                  <View style={{ flex: 2, flexDirection: 'row' }}>
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
                  </View>
                }


              </View>

              <View style={{ width: chwidth / 2 - 21, backgroundColor: "#f0f1f5", marginLeft: 10, borderRadius: 10 }}>
                <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                  {panic == 'no' && <Image source={panicgray}></Image>}
                  {panic == 'off' && <Image source={panicNOSelect}></Image>}
                  {panic == 'on' && <Image source={panicSelect}></Image>}

                  <Text style={styles.titletxt}>패닉</Text>
                </View>

                {panic == 'no' &&
                  <View style={{ flex: 2, flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={() => panicClick('off')}>
                      <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.btntxt}>off</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <View style={{ flex: 0.02 }}></View>
                    <TouchableWithoutFeedback onPress={() => panicClick('on')}>
                      <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.btntxt}>on</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                }

                {panic == 'off' &&
                  <View style={{ flex: 2, flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={() => panicClick('off')}>
                      <View style={{ flex: 1, backgroundColor: "rgb(68,73,80)", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.btntxt}>off</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <View style={{ flex: 0.02 }}></View>
                    <TouchableWithoutFeedback onPress={() => panicClick('on')}>
                      <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.btntxt}>on</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                }

                {panic == 'on' &&
                  <View style={{ flex: 2, flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={() => panicClick('off')}>
                      <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.btntxt}>off</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <View style={{ flex: 0.02 }}></View>
                    <TouchableWithoutFeedback onPress={() => panicClick('on')}>
                      <View style={{ flex: 1, backgroundColor: "#f75929", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.btntxt}>on</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                }


              </View>
            </View>

            <View style={{ flex: 0.2 }}></View>

            <View style={{ flex: 2, flexDirection: 'row', marginLeft: 16,marginBottom:40 }}>
              <View style={{ width: chwidth / 2 - 21, backgroundColor: "#f0f1f5", borderRadius: 10 }}>
                <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                  {warnbim == 'no' && <Image source={warngray}></Image>}
                  {warnbim == 'off' && <Image source={warnNoSelect}></Image>}
                  {warnbim == 'on' && <Image source={warnSelect}></Image>}

                  <Text style={styles.titletxt}>비상등</Text>
                </View>

                {warnbim == 'no' &&
                  <View style={{ flex: 2, flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={() => warnClick('off')}>
                      <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.btntxt}>off</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <View style={{ flex: 0.02 }}></View>
                    <TouchableWithoutFeedback onPress={() => warnClick('on')}>
                      <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.btntxt}>on</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                }

                {warnbim == 'off' &&
                  <View style={{ flex: 2, flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={() => warnClick('off')}>
                      <View style={{ flex: 1, backgroundColor: "rgb(68,73,80)", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.btntxt}>off</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <View style={{ flex: 0.02 }}></View>
                    <TouchableWithoutFeedback onPress={() => warnClick('on')}>
                      <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.btntxt}>on</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                }

                {warnbim == 'on' &&
                  <View style={{ flex: 2, flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={() => warnClick('off')}>
                      <View style={{ flex: 1, backgroundColor: "#d1d2d6", borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.btntxt}>off</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <View style={{ flex: 0.02 }}></View>
                    <TouchableWithoutFeedback onPress={() => warnClick('on')}>
                      <View style={{ flex: 1, backgroundColor: "#f75929", borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.btntxt}>on</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                }

              </View>
              <View style={{ width: chwidth / 2 - 21, backgroundColor: "#f0f1f5", marginLeft: 10, borderRadius: 10 }}>
                <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                  {trunk ?
                    <Image source={trunkSelect}></Image>
                    :
                    <Image source={trunkgray}></Image>
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
      </FlingGestureHandler>

      <Toast style={{ marginBottom: -50 }} ref={(ref) => Toast.setRef(ref)} />

    </View>
  )
}

const styles = StyleSheet.create({
  starttxt: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#4e535a"
  },
  btntxt: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    color: "#f8f8f8"
  },
  titletxt: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#4e535a"
  },
  clocktxt: {
    opacity: 0.3,
    fontFamily: "AppleSDGothicNeo",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "right",
    color: "#252525",
    marginRight: 24
  },
  carnum: {
    opacity: 0.4,
    fontFamily: "AppleSDGothicNeo",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#040404",
    marginLeft: 16
  },
  Onclocktxt : {
    fontFamily: "AppleSDGothicNeo",
  fontSize: 14,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "right",
  color: "#f75929",
  marginRight:24
  }
})

export default Carcontroll