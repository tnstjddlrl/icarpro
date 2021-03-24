import TcpSocket from 'react-native-tcp-socket';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


import { networkState,newState } from './atom/atoms'



const client = TcpSocket.createConnection({port:3400,host:"175.126.232.72",timeout:1000}, () => {
  console.log('연결됨')
});

// client.on('data', function(data) {
//   //const nstate = useRecoilValue(newState)
//   //console.log(nstate)
//   console.log('message was received' + data);
// });

client.on('error', function(error) {
  console.error(error);
});


function socketwrite (str){
  var txt = JSON.stringify(str)

  client.write(txt);
  console.log('전송!' + txt)

}

export default client;