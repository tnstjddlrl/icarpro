import React,{useEffect} from 'react';
import {Alert} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import messaging from '@react-native-firebase/messaging';

import Toast from 'react-native-toast-message';

import Carcontroll from './src/carcontroll.js';
import Load from './src/load.js';
import EasyPwd from './src/easyPwd.js';
import CarRegister from './src/carRegister.js';
import Test from './src/test.js';
import Settings from './src/settings.js';
import CarState from './src/carState.js';
import SwipeTest from './src/swipeTest.js';
import ScrollBase from './src/scrollBase.js';

const Stack = createStackNavigator();



function App() {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  
    return unsubscribe;
  }, []);
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home" headerMode={'none'}>
        <Stack.Screen name="인트로" component={Load} />
        <Stack.Screen name="차량제어" component={Carcontroll} />
        <Stack.Screen name="간편비밀번호" component={EasyPwd} />
        <Stack.Screen name="차량등록" component={CarRegister} />
        <Stack.Screen name="설정" component={Settings} />
        <Stack.Screen name="차량상태" component={CarState} />

        <Stack.Screen name="테스트" component={Test} />
        <Stack.Screen name="스와이프테스트" component={SwipeTest} />
        <Stack.Screen name="스크롤베이스" component={ScrollBase} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;