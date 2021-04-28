/**
 * @format
 */

import {AppRegistry, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  Alert.alert(remoteMessage)
});

AppRegistry.registerComponent(appName, () => App);
