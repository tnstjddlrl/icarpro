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
  Alert.alert('서버와 연결되었습니다.')
});



client.on('error', function(error) {
  Alert.alert('서버와의 통신을 실패하였습니다.','앱을 종료합니다.')
  console.error(error)
  setTimeout(() => {
    BackHandler.exitApp()
  }, 1500);
});

client.on('data',function(data){
  console.log('묘듈에서 데이터 받기 : ' + data)
})



export default client;