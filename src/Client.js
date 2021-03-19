import TcpSocket from 'react-native-tcp-socket';
import {Buffer} from 'buffer'

const client = TcpSocket.createConnection({port:3400,host:"175.126.232.72",timeout:1000}, () => {
  console.log('연결됨')
});

client.on('data', function(data) {
  console.log('message was received');
  console.log(data)
  //console.log(Buffer.from(data.data,'base64').toString('utf-8'))
});

client.on('error', function(error) {
  console.error(error);
});

function socketwrite (str){
  var txt = JSON.stringify(str)

  client.write(txt);
  console.log('전송!' + txt)

  var res = 'no'
  client.on('data', function(data) {
    res = 'okay'
  });

  return res
}

export default socketwrite;