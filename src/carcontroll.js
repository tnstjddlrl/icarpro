import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Toast from 'react-native-toast-message';
import axios from 'axios'

import TcpSocket from 'react-native-tcp-socket';

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

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



const client = TcpSocket.createConnection({port:3400,host:"175.126.232.72",timeout:1000}, () => {
  // Write on the socket
  Toast.show({
    type: 'success',
    position: 'top',
    text1: '서버연결',
    text2: '서버와 연결되었습니다..',
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
    onShow: () => { },
    onHide: () => { },
    onPress: () => { }
  });
  
  console.log('연결됨')
  //client.write(json);
  // Close socket
  //client.destroy();
});

client.on('data', function(data) {
  console.log('message was received', data);
});

client.on('error', function(error) {
  console.error(error);
});




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
      Alert.alert('door_0')

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

      client.write(door_0)
    }


    if (is == 'unlock') {
      setDoor(false)
      Alert.alert('door_1')

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

      client.write(door_1)
    }
  }

  function panicClick(is) {
    if (is == 'on') {
      setPanic(true)
      Alert.alert('panic_0')

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

      client.write(panic_0)
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

      client.write(panic_1)
    }
  }

  function warnClick(is) {
    if (is == 'on') {
      setWarnbim(true)
      Alert.alert('emergency_0')

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

      client.write(warn_0)
    }

    if (is == 'off') {
      setWarnbim(false)
      Alert.alert('emergency_1')

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
      client.write(warn_1)
      
    }

    
  }

  function trunkClick() {
    Alert.alert('trunk_0')
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

    client.write(trunk_0)

    setTimeout(() => {
      setTrunk(false)
    }, 1500);
  }

  function bootClick() {
    if (boot == false) {
      setBoot(true)
      Alert.alert(
        "boot_0",
        "",
        [
          { text: "확인" }
        ]
      );

      axios.post('http://175.126.232.72:3400', {
      userkey:'1234_user1',
      carkey:'user1_10육1004',
      command:'boot',
      state: '1'
    })
      .then(function (response) {
        console.log('리스폰스 ', response);
        //Alert.alert(response)
      })
      .catch(function (error) {
        console.log(error);
        //Alert.alert(error)
      });

    } else {
      setBoot(false)
      Alert.alert(
        "boot_1",
        "",
        [
          { text: "확인" }
        ]
      );

      axios.post('http://175.126.232.72:3400', {
      userkey:'1234_user1',
      carkey:'user1_10육1004',
      command:'emergency',
      state: '0'
    })
      .then(function (response) {
        console.log('리스폰스 ', response);
        //Alert.alert(response)
      })
      .catch(function (error) {
        console.log(error);
        //Alert.alert(error)
      });
    }
  }

  function ee(event) {
    console.log(event.nativeEvent)
  }


  return (
    <View>
      <View style={{ width: chwidth, height: chheight - 40 }}>
          <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={(event) => ee(event)}>
              <Text>자동차 이미지</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('회원가입')}>
              <Text>회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('간편비밀번호')}>
              <Text>간편비밀번호</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>client.write(json)}>
              <Text>소켓통신</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{ Toast.show({
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
      });}}>
              <Text>토스트</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('차량등록')}>
              <Text>차량등록</Text>
            </TouchableOpacity>
          </View>


        <TouchableWithoutFeedback onPress={() => { bootClick() }}>
          <View style={{ width: chwidth - 20, flex: 0.8, backgroundColor: '#cccccc', marginLeft: 10, borderRadius: 10, justifyContent: 'center' }}>
            {boot ? <Text style={{ marginLeft: 10, color: '#ff5c33' }}>원격시동 끄기</Text> : <Text style={{ marginLeft: 10, color: 'black' }}>원격시동 켜기</Text>}
          </View>
        </TouchableWithoutFeedback>

        <View style={{ flex: 0.2 }}></View>

        <View style={{ flex: 2, flexDirection: 'row', marginLeft: 10 }}>
          <View style={{ width: chwidth / 2 - 15, backgroundColor: '#cccccc', borderRadius: 10 }}>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
              <Text>도어</Text>
            </View>

            {door ? <View style={{ flex: 2, flexDirection: 'row' }}>
              <TouchableWithoutFeedback onPress={() => doorClick('unlock')}>
                <View style={{ flex: 1, backgroundColor: '#999999', borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>unlock</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={{ flex: 0.02 }}></View>
              <TouchableWithoutFeedback onPress={() => doorClick('lock')}>
                <View style={{ flex: 1, backgroundColor: '#ff5c33', borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>lock</Text>
                </View>
              </TouchableWithoutFeedback>
            </View> : <View style={{ flex: 2, flexDirection: 'row' }}>
                <TouchableWithoutFeedback onPress={() => doorClick('unlock')}>
                  <View style={{ flex: 1, backgroundColor: '#ff5c33', borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>unlock</Text>
                  </View>
                </TouchableWithoutFeedback>
                <View style={{ flex: 0.02 }}></View>
                <TouchableWithoutFeedback onPress={() => doorClick('lock')}>
                  <View style={{ flex: 1, backgroundColor: '#999999', borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>lock</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>}

          </View>
          <View style={{ width: chwidth / 2 - 15, backgroundColor: '#cccccc', marginLeft: 10, borderRadius: 10 }}>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
              <Text>패닉</Text>
            </View>
            <View style={{ flex: 2, flexDirection: 'row' }}>
              <TouchableWithoutFeedback onPress={() => panicClick('off')}>
                <View style={{ flex: 1, backgroundColor: '#999999', borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>off</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={{ flex: 0.02 }}></View>

              {panic ? <TouchableWithoutFeedback onPress={() => panicClick('on')}>
                <View style={{ flex: 1, backgroundColor: '#ff5c33', borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>on</Text>
                </View>
              </TouchableWithoutFeedback> : <TouchableWithoutFeedback onPress={() => panicClick('on')}>
                  <View style={{ flex: 1, backgroundColor: '#999999', borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>on</Text>
                  </View>
                </TouchableWithoutFeedback>}

            </View>
          </View>
        </View>
        <View style={{ flex: 0.2 }}></View>
        <View style={{ flex: 2, flexDirection: 'row', marginLeft: 10 }}>
          <View style={{ width: chwidth / 2 - 15, backgroundColor: '#cccccc', borderRadius: 10 }}>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
              <Text>비상등</Text>
            </View>
            <View style={{ flex: 2, flexDirection: 'row' }}>
              <TouchableWithoutFeedback onPress={() => warnClick('off')}>
                <View style={{ flex: 1, backgroundColor: '#999999', borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>off</Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={{ flex: 0.01 }}></View>

              {warnbim ? <TouchableWithoutFeedback onPress={() => warnClick('on')}>
                <View style={{ flex: 1, backgroundColor: '#ff5c33', borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>on</Text>
                </View>
              </TouchableWithoutFeedback> : <TouchableWithoutFeedback onPress={() => warnClick('on')}>
                  <View style={{ flex: 1, backgroundColor: '#999999', borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>on</Text>
                  </View>
                </TouchableWithoutFeedback>}
            </View>
          </View>
          <View style={{ width: chwidth / 2 - 15, backgroundColor: '#cccccc', marginLeft: 10, borderRadius: 10 }}>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
              <Text>트렁크</Text>
            </View>
            <View style={{ flex: 2, flexDirection: 'row' }}>

              {trunk ? <TouchableWithoutFeedback onPress={() => trunkClick()}>
                <View style={{ flex: 1, backgroundColor: '#ff5c33', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>open</Text>
                </View>
              </TouchableWithoutFeedback> : <TouchableWithoutFeedback onPress={() => trunkClick()}>
                  <View style={{ flex: 1, backgroundColor: '#999999', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>open</Text>
                  </View>
                </TouchableWithoutFeedback>}
            </View>
          </View>
        </View>

      </View>
      <Toast style={{ marginBottom: -50 }} ref={(ref) => Toast.setRef(ref)} />
    </View>
  )
}

export default Carcontroll