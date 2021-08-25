import React, { useEffect } from 'react';
import { Alert, BackHandler } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import messaging from '@react-native-firebase/messaging';

import { Linking } from 'react-native';
import VersionCheck from 'react-native-version-check';

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
import Axiostest from './src/axiostt/axiostest.js';
import Startpwd from './src/startpwd.js';


const Stack = createStackNavigator();


function App() {

  VersionCheck.getCountry()
    .then(country => console.log(country));          // KR
  console.log(VersionCheck.getPackageName());        // com.reactnative.app
  console.log(VersionCheck.getCurrentBuildNumber()); // 10
  console.log(VersionCheck.getCurrentVersion());     // 0.1.1

  VersionCheck.needUpdate()
    .then(async res => {
      console.log(res.isNeeded);    // true
      if (res.isNeeded) {
        Linking.openURL(res.storeUrl);  // open store if update is needed.
      }
    });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home" headerMode={'none'} screenOptions={{ gestureEnabled: false }}>

          <Stack.Screen name="인트로" component={Load} />
          <Stack.Screen name="차량제어" component={Carcontroll} />
          <Stack.Screen name="간편비밀번호" component={EasyPwd} />
          <Stack.Screen name="비밀번호인증" component={Startpwd} />

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

          {/* <Stack.Screen name="악시오스" component={Axiostest} /> */}


        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;