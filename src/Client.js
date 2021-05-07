import TcpSocket from 'react-native-tcp-socket';
import { Alert } from 'react-native';

import RNExitApp from 'react-native-kill-app';

// var net = require('net');

// var nc = new net.Socket({allowHalfOpen:false})

var client = TcpSocket.createConnection(
  { port: 3400, host: '175.126.232.72' },
  () => {

    console.log(client)

    console.log('연결됨');
    setTimeout(() => {
      Alert.alert('서버와 연결되었습니다.');
    }, 2000);

    client.on('end', function() {
      console.log('커넥션이 엔드');
    });
    client.on('error', function(err) {
      console.log('에라쓰 : ', JSON.stringify(err));
    });
    client.on('timeout', function() {
      console.log('소켓 타임아웃');
    })
    client.on('close', function() {
      console.log('소켓 닫힘');
    })
    client.on('connect', function() {
      console.log('소켓 열렸다');
    })
    client.on('data', function(data) {
      console.log('데이터가 왔따! ' + data);
    })

    // console.log('아이디 : ' +client._id)

    console.log('로컬 포트 : ')
    console.log(client.localAddress + ' : ' + client.localPort)
    console.log(client.address())
  },
);

// client.setKeepAlive(true,0)

client.on('error', function (error) {
  Alert.alert('서버와의 통신을 실패하였습니다.', '앱을 다시 시작해주세요.');
  console.error(error);
  setTimeout(() => {
    // client.destroy();
    RNExitApp.exitApp()
  }, 1500);
  // client.connect({port: 3400, host: '175.126.232.72'})
});


// client.on('connect',function(data){
//   console.log('클라 에서 커넥트 감지')
// })

// console.log('읽어들인 양 : ')
// console.log(client.bytesRead)


// client.on('data', function (data) {
//   console.log('묘듈에서 데이터 받기 : ' + data);
// });

export default client;