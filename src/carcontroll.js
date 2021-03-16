import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,

} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Toast from 'react-native-toast-message';
import { event } from 'react-native-reanimated';

import axios from 'axios'

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

const socket = new WebSocket('ws://175.126.232.72','5000');

const Carcontroll = () => {

  useEffect(() => {
    const socket = new WebSocket('ws://175.126.232.72','5000');

    socket.onopen = () => {
      // connection opened
      socket.send('something'); // send a message
      Alert.alert('전송')
    };

    socket.addEventListener('open', function (event) {
      socket.send('Hello Server!');
    });

    socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
      Alert.alert('전송' + event.data)
    });

    socket.onerror = (e) => {
      // an error occurred
      console.log('에러 : ' + e.message);
    };
  }, [])

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

      socket.onopen = () => {
        // connection opened
        socket.send('something'); // send a message
        Alert.alert('전송')
      };

      socket.addEventListener('open', function (event) {
        socket.send('Hello Server!');
      });

      socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
        Alert.alert('전송' + event.data)
      });

      socket.onerror = (e) => {
        // an error occurred
        console.log('에러 : ' + e.message);
      };

      axios.post('http://175.126.232.72:5000', {
        command: 'panic_0'
      })
        .then(function (response) {
          console.log('리스폰스 ', response);
        })
        .catch(function (error) {
          console.log(error);
        });


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
    } else {
      setBoot(false)
      Alert.alert(
        "boot_1",
        "",
        [
          { text: "확인" }
        ]
      );
    }
  }

  function ee(event) {
    console.log(event.nativeEvent)
  }


  return (
    <View>
      <View style={{ width: chwidth, height: chheight - 40 }}>
        <TouchableWithoutFeedback >
          <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={(event) => ee(event)}>
              <Text>자동차 이미지</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>


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