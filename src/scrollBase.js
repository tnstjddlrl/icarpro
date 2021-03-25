import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

// import ScrollPicker from "react-native-wheel-scroll-picker";

const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height


const back = require('../img/backbtn.png')

const ScrollBase = () => {
  const navigation = useNavigation()

  const [selectedItem, setSelectedItem ] = useState(2);
  const [itemList , setItemList ] = useState(['3', '5', '10']);


  return(
    <SafeAreaView>
      <View style={{width:chwidth,height:chheight}}>
        {/* 헤더 */}
          <View style={{ flex: 0.8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
            <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
              <Text style={styles.savetxt}>취소</Text>
            </TouchableWithoutFeedback>
            <Text style={styles.maintxt}>원격시동 시간</Text>
            <Text style={styles.savetxt}>저장</Text>
          </View>
        {/* 헤더 끝 */}

        {/* 본문 */}
        <View style={{flex:10}}>
          <View style={{flex:3,justifyContent:"center",alignItems:"center"}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <View style={styles.mask}>
                <Text>{itemList[selectedItem]}</Text>
              </View>
              <Text style={styles.masktxt2}>분</Text>
              <Text style={styles.masktxt}>으로 설정됩니다.</Text>
            </View>
          </View>
          <View style={{flex:7}}>
          </View>

        </View>
        {/* 본문 끝 */}

      
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  maintxt: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.24,
    color: "#393e46"
  },
  savetxt: {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 17,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "right",
    color: "#f75929"
  },
  mask : {
    width: 75,
  height: 36,
  borderRadius: 8,
  borderStyle: "solid",
  borderWidth: 2,
  borderColor: "#bec0c2"
  },
  masktxt:{
    fontFamily: "AppleSDGothicNeo",
  fontSize: 22,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: -0.29,
  textAlign: "center",
  color: "#393e46"
  },
  masktxt2:{
    fontFamily: "AppleSDGothicNeo",
  fontSize: 22,
  fontWeight: "bold",
  fontStyle: 'normal',
  letterSpacing: -0.29,
  textAlign: "center",
  color: "#393e46"
  },
  selecttxt:{
    fontFamily: "Metropolis-SemiBold",
  fontSize: 50,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: -0.67,
  textAlign: "center",
  color: 'rgb(49,54,61)',
  },
  noselecttxt:{
    opacity: 0.3,
  fontFamily: "Metropolis-SemiBold",
  fontSize: 40,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: -0.53,
  textAlign: "center",
  color: 'rgb(49,54,61)'
  }
})

export default ScrollBase