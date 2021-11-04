import React, { useEffect } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, BackHandler, Linking  } from 'react-native';
import styles from './styles';
import BleManager from 'react-native-ble-manager';
import app from '../ConexaoBluetooth';
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'
import BluetoothSerial from 'react-native-bluetooth-serial-next';

export default function App() {

  var SendIntentAndroid = require("react-native-send-intent");

  const isConnected = async()=>{

      
  }

  const conectar = ()=>{
    
    BleManager.getBondedPeripherals([]).then((peripherals) => {
      if (peripherals.length === 0) {
        console.log('No peripherals available');
      } else {
        console.log('List of currently bonded devices');
        console.log(peripherals);
        for (var i = 0; i < peripherals.length; i++) {
          var peripheral = peripherals[i];
          console.log('Device = ' + peripheral.id);
          console.log('  Name = ' + peripheral.name);
          console.log('  Is connected = ' + peripheral.connected);
          console.log('  RSSI = ' + peripheral.rssi);
          console.log('  Advertisment = ' + peripheral.advertisement);
          console.log('  Services = ' + peripheral.services);
          console.log('  Is primary = ' + peripheral.isPrimary);
        }
      }
    });

  }

    useEffect(() => {
      
        BleManager.start({showRestartAlert: false, forceLegacy: false});
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
            <TouchableOpacity onPress={isConnected}>
                <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
        
            <TouchableOpacity onPress={conectar}>
                <Text style={styles.buttonText}>conectar</Text>
            </TouchableOpacity>

        </View>
     
           
      </View>
    );
  
}
