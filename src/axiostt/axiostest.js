// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   Dimensions,
//   TouchableWithoutFeedback,
//   Alert,
//   TouchableOpacity,
//   TextInput,
//   SafeAreaView,
//   Image,
//   StyleSheet,
//   ScrollView,
//   Modal
// } from 'react-native';

// import { useNavigation } from '@react-navigation/native';

// import axios from 'axios';
// let qs = require('qs');

// axios.interceptors.request.use(config => {
//   console.log(config);

//   config.paramsSerializer = params => {
//     // Qs is already included in the Axios package
//     return qs.stringify(params, {
//       arrayFormat: "brackets",
//       encode: false
//     });
//   };

//   return config;
// });

// // axios.get(`https://api.github.com/users/mojombo`,{

// // }).then(res => {
// //   console.log(JSON.stringify(res.data))
// // }).catch((err)=>{
// //   console.log(err)
// // })

// axios.get(`https://jsonplaceholder.typicode.com/users`,{
//   params:{address: {city: "Gwenborough"}}
// }).then(res => {
//   console.log(res.data)
// }).catch((err)=>{
//   console.log(err)
// })


// const Axiostest = () =>{
//   const [test,setTest] =useState('')

//   return(
//     <View>
//       <Text>axios test</Text>
//     </View>
//   )
// }

// export default Axiostest