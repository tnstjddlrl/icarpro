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

import { useNavigation } from '@react-navigation/native';


const chwidth = Dimensions.get('window').width
const chheight = Dimensions.get('window').height


const back = require('../img/backbtn.png')



const ScrollBase = () => {
  const navigation = useNavigation()

  const [selectedItem, setSelectedItem ] = useState(2);
  const [itemList , setItemList ] = useState(['3', '5', '10']);
  const [checkitem, setChechkitem] = useState('3')
  var ii = useRef()

  const [isy,setisy] = useState(0)

  useEffect(()=>{
    if(isy < 70){
      setChechkitem('3')
    }else if(70 < isy  && isy < 130){
      setChechkitem('5')
    }else if(130 < isy){
      setChechkitem('10')
    }
  },[isy])

  

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
                <Text>{checkitem}</Text>
              </View>
              <Text style={styles.masktxt2}>분</Text>
              <Text style={styles.masktxt}>으로 설정됩니다.</Text>
            </View>
          </View>
          <View style={{flex:7}}>

            <View style={{height:200,width:97}}>
            <ScrollView onScroll={(res)=>{setisy(res.nativeEvent.contentOffset.y)}} showsVerticalScrollIndicator={false}>
              <Text style={styles.noselecttxt}> </Text>
              <Text style={isy < 70 ? styles.selecttxt : styles.noselecttxt}>3</Text>
              <Text style={(70 < isy  && isy < 130) ? styles.selecttxt : styles.noselecttxt}>5</Text>
              <Text style={130 < isy ? styles.selecttxt : styles.noselecttxt}>10</Text>
              <Text style={styles.noselecttxt}> </Text>
            </ScrollView>
            <View style={styles.indicator1}></View>
            <View style={styles.indicator2}></View>
            </View>
            
            
            {/* <View style={{height:60}}>
            <ScrollView ref={ii} onScroll={(res)=>console.log(res.nativeEvent.contentOffset)} scrollEnabled={false}>
            <Text style={styles.selecttxt}>3</Text>
              <Text style={styles.selecttxt}>5</Text>
              <Text style={styles.selecttxt}>10</Text>
            </ScrollView>
            </View> */}

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
  indicator1 : {
    width: 97,
  height: 1,
  opacity: 0.3,
  borderStyle: "solid",
  borderWidth: 2,
  borderColor: "#979797",
  position:"absolute",
  top:'20%'
  },
  indicator2 : {
    width: 97,
  height: 1,
  opacity: 0.3,
  borderStyle: "solid",
  borderWidth: 2,
  borderColor: "#979797",
  position:"absolute",
  top:'50%'
  }
})

export default ScrollBase