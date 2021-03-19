import TcpSocket from 'react-native-tcp-socket';
const client = TcpSocket.createConnection({port:3400,host:"175.126.232.72",timeout:1000}, () => {
  console.log('연결됨')
});

client.on('data', function(data) {
  console.log('message was received', data);
});

client.on('error', function(error) {
  console.error(error);
});

function socketwrite (str){
  client.write(str);
}

export default socketwrite;