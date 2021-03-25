import TcpSocket from 'react-native-tcp-socket';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { Alert, BackHandler } from 'react-native';



const client = TcpSocket.createConnection({port:3400,host:"175.126.232.72",timeout:1000}, () => {
  console.log('연결됨')
});



client.on('error', function(error) {
  Alert.alert('서버와의 통신을 실패하였습니다.','앱을 종료합니다.')
  console.error(error)
  setTimeout(() => {
    BackHandler.exitApp()
  }, 1500);
});


function socketwrite (str){
  var txt = JSON.stringify(str)

  client.write(txt);
  console.log('전송!' + txt)

}

export default client;