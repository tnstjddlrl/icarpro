import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

// const client = TcpSocket.createConnection({port:3400,host:"175.126.232.72",timeout:1000}, () => {
//   // Write on the socket
  
//   console.log('연결됨')
//   //client.write(json);
//   // Close socket
//   //client.destroy();
// });

// client.on('data', function(data) {
//   console.log('message was received', data);
// });

// client.on('error', function(error) {
//   console.error(error);
// });

const Register = () => {
  return (
    <View>
      <Text>회원가입</Text>
      <TextInput style={{ width: chwidth - 20, height: 40, borderWidth: 0.5, marginTop: 10 }} placeholder='아이디'></TextInput>
      <TextInput style={{ width: chwidth - 20, height: 40, borderWidth: 0.5, marginTop: 10 }} placeholder='비밀번호'></TextInput>
      <TextInput style={{ width: chwidth - 20, height: 40, borderWidth: 0.5, marginTop: 10 }} placeholder='전화번호'></TextInput>
      <TextInput style={{ width: chwidth - 20, height: 40, borderWidth: 0.5, marginTop: 10 }} placeholder='간편비밀번호'></TextInput>
      <TouchableOpacity>
        <View style={{ width: 100, height: 50, backgroundColor: 'gray' }}>
          <Text>회원가입</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Register