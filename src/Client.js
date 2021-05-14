import TcpSocket from 'react-native-tcp-socket';
import { Alert } from 'react-native';

import RNExitApp from 'react-native-kill-app';

// var net = require('net');

// var nc = new net.Socket({allowHalfOpen:false})

var client = TcpSocket.createConnection(
  { port: 3400, host: '175.126.232.72' },
  () => {

    console.log('연결됨');
    setTimeout(() => {
      Alert.alert('서버와 연결되었습니다.');
    }, 2000);

    // client.write(JSON.stringify({ type: "R", type_sub: "req_state", data: { token: pushToken } }))
    // console.log('전송 : ' + txt)

    // setTimeout(()=>{
    //   client.destroy()
    //   console.log('서버 상황 : ' + client._destroyed)
    // },100)
    
  },
);


client.on('error', function (error) {
  Alert.alert('서버와의 통신을 실패하였습니다.', '앱을 다시 시작해주세요.');
  console.error(error);
  setTimeout(() => {
    RNExitApp.exitApp()
  }, 1500);
});


export default client;