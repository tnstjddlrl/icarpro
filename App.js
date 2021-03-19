import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Toast from 'react-native-toast-message';

import Carcontroll from './src/carcontroll.js';
import Load from './src/load.js';
import Register from './src/register.js';
import EasyPwd from './src/easyPwd.js';
import CarRegister from './src/carRegister.js';
import Test from './src/test.js';
import Settings from './src/settings.js';
import SomeComponent from './src/some.js';

const Stack = createStackNavigator();




function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home" headerMode={'none'}>
        <Stack.Screen name="인트로" component={Load} />
        <Stack.Screen name="차량제어" component={Carcontroll} />
        <Stack.Screen name="회원가입" component={Register} />
        <Stack.Screen name="간편비밀번호" component={EasyPwd} />
        <Stack.Screen name="차량등록" component={CarRegister} />
        <Stack.Screen name="설정" component={Settings} />
        <Stack.Screen name="테스트" component={Test} />
        <Stack.Screen name="테스트2" component={SomeComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;