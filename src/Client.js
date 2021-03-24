import TcpSocket from 'react-native-tcp-socket';

const client = TcpSocket.createConnection({port:3400,host:"175.126.232.72",timeout:1000}, () => {
  console.log('연결됨')
});

// client.on('data', function(data) {
//   pwdstate = ''+data
//   console.log('message was received' + pwdstate);
//   console.log(pwdstate)
// });

client.on('error', function(error) {
  console.error(error);
});

function socketwrite (str){
  var txt = JSON.stringify(str)
  var state = 'nostate'

  client.write(txt);
  console.log('전송!' + txt)

  client.on('data', function(data) {
    state = ''+data
    console.log('message was received' + state);
    console.log(state)
  });


  return state
}

export default socketwrite;