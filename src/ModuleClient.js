import TcpSocket from 'react-native-tcp-socket';
import { Alert } from 'react-native';

import RNExitApp from 'react-native-kill-app';



const moduleclient = TcpSocket.createConnection({ port: 6600, host: "172.30.1.49", timeout: 1000 }, () => {
  console.log('모듈연결됨')
  // Alert.alert('서버와 연결되었습니다.')
});



moduleclient.on('error', function (error) {
  Alert.alert('서버와의 통신을 실패하였습니다.', '앱을 종료합니다.')
  console.error(error)
  setTimeout(() => {
    RNExitApp.exitApp()
  }, 1500);
});

moduleclient.on('data', function (data) {
  console.log('묘듈에서 데이터 받기 : ' + data)
})



export default moduleclient;