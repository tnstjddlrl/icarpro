import React, { useEffect } from 'react';
import { Alert,BackHandler } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import messaging from '@react-native-firebase/messaging';

import {
  RecoilRoot
} from 'recoil';

import RNExitApp from 'react-native-kill-app';

import Carcontroll from './src/carcontroll.js';
import Load from './src/load.js';
import EasyPwd from './src/easyPwd.js';
import CarRegister from './src/carRegister.js';
import Test from './src/test.js';
import Settings from './src/settings.js';
import CarState from './src/carState.js';
import SwipeTest from './src/swipeTest.js';
import ScrollBase from './src/scrollBase.js';
import RemoteBootTime from './src/TimeSet/remoteBootTime.js';
import LastHeatTime from './src/TimeSet/lastHeatTime.js';
import StartTime from './src/TimeSet/startTime.js';
import LowVoltSetting from './src/TimeSet/lowVoltSetting.js';


const Stack = createStackNavigator();


function App() {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("종료", "앱을 종료하시겠습니까?", [
        {
          text: "아니요",
          onPress: () => null,
          style: "cancel"
        },
        { text: "예", onPress: () => {RNExitApp.exitApp()} }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home" headerMode={'none'}>

          <Stack.Screen name="인트로" component={Load} />
          <Stack.Screen name="차량제어" component={Carcontroll} />
          <Stack.Screen name="간편비밀번호" component={EasyPwd} />
          <Stack.Screen name="차량등록" component={CarRegister} />
          <Stack.Screen name="설정" component={Settings} />
          <Stack.Screen name="차량상태" component={CarState} />

          <Stack.Screen name="원격시동시간" component={RemoteBootTime} />
          <Stack.Screen name="후열시간" component={LastHeatTime} />
          <Stack.Screen name="스타트시간" component={StartTime} />
          <Stack.Screen name="저전압설정" component={LowVoltSetting} />

          <Stack.Screen name="테스트" component={Test} />
          <Stack.Screen name="스와이프테스트" component={SwipeTest} />
          <Stack.Screen name="스크롤베이스" component={ScrollBase} />

        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;