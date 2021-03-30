import React, { useState, useEffect, useRef } from 'react';
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
import Toast from 'react-native-toast-message';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { voltValue,voltValueSC } from '../atom/atoms'


const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height


const LowVoltSetting = () => {
  const navigation = useNavigation()
  const [lowvoltValue,setLowvoltValue] = useRecoilState(voltValue)
  const [lowvoltSCValue,setLowvoltSCValue] = useRecoilState(voltValueSC)
  console.log(lowvoltValue)
  console.log(lowvoltSCValue)


  const [checkitem, setChechkitem] = useState(lowvoltValue)

  const [isy,setisy] = useState(lowvoltSCValue)

  const ii = useRef()

  useEffect(()=>{
    ii.current.scrollTo({x:0,y:isy,animated:true})
  },[])

  useEffect(()=>{
    if(isy < 60){
      setChechkitem('11.8')
    }else if(60 < isy  && isy < 110){
      setChechkitem('11.9')
    }else if(110 < isy  && isy < 170){
      setChechkitem('12.0')
    }else if(170 < isy  && isy < 250){
      setChechkitem('12.1')
    }else if(250 < isy){
      setChechkitem('12.2')
    }
  },[isy])



  function saveBtnClick(){
    AsyncStorage.setItem("@lowvolt_Value", checkitem)

    setLowvoltValue(checkitem)
    setLowvoltSCValue(isy)

    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: '설정',
      text2: '설정한 내용이 저장되었습니다.',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 60,
      bottomOffset: 150,
      onShow: () => { },
      onHide: () => { },
      onPress: () => { }
    });
  }

  

  return(
    <SafeAreaView>
      <View style={{width:chwidth,height:chheight}}>
        {/* 헤더 */}
          <View style={{ flex: 0.8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: chwidth - 24, marginLeft: 12 }}>
            <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
              <Text style={styles.savetxt}>취소</Text>
            </TouchableWithoutFeedback>
            <Text style={styles.maintxt}>저전압 설정</Text>
            <TouchableWithoutFeedback onPress={()=>saveBtnClick()}>
            <Text style={styles.savetxt}>저장</Text>
            </TouchableWithoutFeedback>
          </View>
        {/* 헤더 끝 */}

        {/* 본문 */}
        <View style={{flex:10}}>
          <View style={{flex:3,justifyContent:"center",alignItems:"center"}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <View style={styles.mask}>
                <Text style={styles.topchechktxt}>{checkitem}</Text>
              </View>
              <Text style={styles.masktxt2}>V</Text>
              <Text style={styles.masktxt}>oltage으로 설정됩니다.</Text>
            </View>
          </View>
          <View style={{flex:7}}>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
            <View style={{height:200,width:100}}>
            <ScrollView ref={ii} onScroll={(res)=>{setisy(res.nativeEvent.contentOffset.y),console.log(res.nativeEvent.contentOffset.y)}} showsVerticalScrollIndicator={false}>
              <Text style={styles.noselecttxt2}> </Text>
              <Text style={isy < 60 ? styles.selecttxt : styles.noselecttxt}>11.8</Text>
              <Text style={(60 < isy  && isy < 110) ? styles.selecttxt : styles.noselecttxt}>11.9</Text>
              <Text style={(110 < isy  && isy < 170) ? styles.selecttxt : styles.noselecttxt}>12.0</Text>
              <Text style={(170 < isy  && isy < 250) ? styles.selecttxt : styles.noselecttxt}>12.1</Text>
              <Text style={250 < isy ? styles.selecttxt : styles.noselecttxt}>12.2</Text>
              <Text style={styles.noselecttxt}> </Text>
            </ScrollView>
            </View>
            <Text style={styles.sec}>V</Text>
            <View style={styles.indicator1}></View>
            <View style={styles.indicator2}></View>
            </View>

          </View>

        </View>
        {/* 본문 끝 */}



        <Toast ref={(ref) => Toast.setRef(ref)} />
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
  color: "#393e46",
  marginLeft:5
  },
  selecttxt:{
    fontFamily: "Metropolis-SemiBold",
  fontSize: 50,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: -0.67,
  textAlign: "center",
  color: 'rgb(49,54,61)',
  marginBottom:20
  },
  noselecttxt:{
    opacity: 0.3,
  fontFamily: "Metropolis-SemiBold",
  fontSize: 40,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: -0.53,
  textAlign: "center",
  color: 'rgb(49,54,61)',
  marginBottom:20
  },
  noselecttxt2:{
    opacity: 0.3,
  fontFamily: "Metropolis-SemiBold",
  fontSize: 40,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: -0.53,
  textAlign: "center",
  color: 'rgb(49,54,61)',
  },
  indicator1 : {
    width: 97,
  height: 1,
  opacity: 0.3,
  borderStyle: "solid",
  borderWidth: 2,
  borderColor: "#979797",
  position:"absolute",
  top:'18%'
  },
  indicator2 : {
    width: 97,
  height: 1,
  opacity: 0.3,
  borderStyle: "solid",
  borderWidth: 2,
  borderColor: "#979797",
  position:"absolute",
  top:'60%'
  },
  topchechktxt:{
    fontFamily: "AppleSDGothicNeo",
  fontSize: 22,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: -1,
  textAlign: "center",
  color: 'rgb(49,54,61)'
  },
  sec : {
    fontFamily: "AppleSDGothicNeo",
    fontSize: 40,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.53,
    textAlign: "right",
    color: 'rgb(49,54,61)',
    position:"absolute",
    right:'23%',
    bottom:'48%'
  }
})

export default LowVoltSetting