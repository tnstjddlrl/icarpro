import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  TextInput,
  BackHandler,
  SafeAreaView
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import Toast from 'react-native-toast-message';

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height

const Test = () => {
  const navigation = useNavigation()

  useEffect(() => {
    const backAction = () => {
      Alert.alert("종료", "앱을 종료하시겠습니까?", [
        {
          text: "아니요",
          onPress: () => null,
          style: "cancel"
        },
        { text: "예", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View>
      <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate('간편비밀번호')}>
        <Text>간편비밀번호</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => client.write(json)}>
        <Text>소켓통신</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: '패닉 명령',
          text2: '패닉 명령을 [ON]하였습니다.',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          onShow: () => { },
          onHide: () => { },
          onPress: () => { }
        });
      }}>
        <Text>토스트</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('차량등록')}>
        <Text>차량등록</Text>
      </TouchableOpacity><Text>회원가입</Text>

      <TouchableOpacity onPress={() => navigation.navigate('차량제어')}>
        <Text>차량제어</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('차량상태')}>
        <Text>차량상태</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('스와이프테스트')}>
        <Text>스와이프테스트</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('설정')}>
        <Text>설정</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('스크롤베이스')}>
        <Text>스크롤베이스</Text>
      </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

export default Test