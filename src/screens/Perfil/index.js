import React, { useEffect } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, BackHandler, Linking  } from 'react-native';
import styles from './styles';
import BleManager from 'react-native-ble-manager';
import app from '../ConexaoBluetooth';
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'

export default function App() {

  var SendIntentAndroid = require("react-native-send-intent");

  const isConectado = ()=>{
    BleManager.getConnectedPeripherals([]).then(peripheralsArray => {
      console.log('Connected peripherals: ' + peripheralsArray.length);
      if(peripheralsArray.length > 0){
       console.log(peripheralsArray);
      }else{
        console.log(peripheralsArray);
      }
    });
    BleManager.isPeripheralConnected('A5:2A:21:B2:7B:A1').then(isConnected => {
      console.log('Connected: ' + isConnected);
    });
    
  }

    useEffect(() => {
      BleManager.start({showAlert: false});
        BackHandler.addEventListener('hardwareBackPress', () => true);
    }, []);

    return (
      <View style={styles.container}>
        <Text style={styles.headText}>Perfil</Text>
        <View style={styles.imagem}>
            <Image source={require('../../../assets/user.png')} style={styles.img}/>
            <TouchableOpacity onPress={() => {
             IntentLauncher.startActivity({
               action: 'android.settings.BLUETOOTH_SETTINGS',
             })
            }}>
                <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
        </View>
     
           
      </View>
    );
  
}
