import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Carcontroll from './src/carcontroll.js';
import Load from './src/load.js';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home" headerMode={'none'}>
        <Stack.Screen name="인트로" component={Load} />
        <Stack.Screen name="차량제어" component={Carcontroll} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;