import TcpSocket from 'react-native-tcp-socket';
const client = TcpSocket.createConnection({port:3400,host:"175.126.232.72",timeout:1000}, () => {
  console.log('연결됨')
});

client.on('data', function(data) {
  console.log('message was received');
  console.log(data)
});

client.on('error', function(error) {
  console.error(error);
});

function socketwrite (str){
  var txt = JSON.stringify(str)
  client.write(txt);
  console.log('전송!' + txt)
}

export default socketwrite;