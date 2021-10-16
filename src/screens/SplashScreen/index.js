import React, { useState, useEffect } from 'react';
import Hera from '../../../assets/heraBranco.svg'
import { SvgUri } from 'react-native-svg';
import Splash from '../../../assets/splash'
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  SafeAreaView,
  Button,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';

export default function App({navigation}) {
 

    //timeout de dois segundos
    StatusBar.setBackgroundColor('#E0195C')
    setTimeout(() => {
      if(auth().currentUser){
        navigation.navigate('Home',{
          email: auth().currentUser.email,
        });
     }else{
      navigation.navigate('Login');
     }
     
    
    },2000);

    const handleDynamicLink = link => {
      
       // Handle dynamic link inside your own application
      if (link.url === 'https://hera.com') {
       console.log(link)
      }else{
        console.log(link)
      }
    };

    useEffect(() => {
      const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
      // When the component is unmounted, remove the listener
      return () => unsubscribe();
    }, []);
  

    const styles = StyleSheet.create({
        container: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:"#E0195C",
          height:"100%"
          
        },
    });

  return (
    
    <View style={styles.container}>
    <Hera/>
    </View>
  )
  


}

