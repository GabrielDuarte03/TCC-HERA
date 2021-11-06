import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, BackHandler, Linking  } from 'react-native';
import styles from './styles';
import BleManager from 'react-native-ble-manager';
import app from '../ConexaoBluetooth';
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'
import BluetoothSerial from 'react-native-bluetooth-serial-next';
import  { launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from "react-native-image-picker"
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

export default function App() {

  var SendIntentAndroid = require("react-native-send-intent");
  const [resourcePath, setResourcePath] = useState('');
  const [urlPhoto, setUrlPhoto] = useState('');
  const [erro, setErro] = useState('');
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
        var userr = auth().currentUser;
        var user = userr.uid;
        (async()=>{
        const url = await storage().ref(user).getDownloadURL().then(url=>{
          setUrlPhoto(url);
        }).catch(error=>{
          console.log(error);
          setErro(error);
        })
       
      })()
    }, []);

    if(urlPhoto === '' && erro === ''){
      return(
        <View style={styles.container}>
          <Text style={styles.text}>Carregando...</Text>
        </View>
      )
    }else{
    return (
      <View style={styles.container}>
        <Text style={styles.headText}>Perfil</Text>
        <View style={styles.imagem}>
          {erro!=''?
            <Image 
            source={{uri: urlPhoto}} 
            style={styles.img}
            resizeMode ="cover"
            resizeMethod="auto"
            />
            :
            <Image 
            source={require('../../../assets/user.png')} 
            style={styles.img}
            resizeMode ="cover"
            resizeMethod="auto"
            />
          }
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

           <TouchableOpacity onPress={()=>{
             ImagePicker.launchCamera(
               {
                 mediaType: 'photo',
                 cameraType: 'front',
                 durationLimit: 10,
                 includeBase64: true,
                 maxHeight: 300,
                 maxWidth: 300,
                 quality: 0.5,
                 saveToPhotos: true,
              
              }, 
               
               (response) => {
                console.log(response);
               if (response.didCancel) {
                 console.log('User cancelled image picker');
               } else if (response.error) {
                 console.log('ImagePicker Error: ', response.error);
               } else if (response.customButton) {
                 console.log('User tapped custom button: ', response.customButton);
               } else {
                 const source = { uri: response.uri };
                 setResourcePath(response);
                 console.log(response.uri);
               }
              });
           }}>
             <Text> Tirar agora </Text>
           </TouchableOpacity>

           <TouchableOpacity onPress={()=>{
             ImagePicker.launchImageLibrary(
               {
                 mediaType: 'photo',
                  cameraType: 'front',
                  durationLimit: 10,
                  includeBase64: true,
                  maxHeight: 300,
                  maxWidth: 300,
                  quality: 1,
                  saveToPhotos: true,
               },
                (response) => {
                  if (response.didCancel) {
                    console.log('User cancelled image picker');
                  } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                  } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                  } else {
                    const source = { uri: response.uri };
                    setResourcePath(response);
                  }
                }
           )}}>
             <Text> Escolher da galeria </Text>
           </TouchableOpacity>

           {
           erro == ''?
           resourcePath?.assets  &&
          resourcePath?.assets.map(({uri}) => (
            <View key={uri} style={styles.image}>
              <Image
                resizeMode="contain"
                resizeMethod="auto"
                style={{width: 300, height: 300}}
                source={{uri: uri}}
              />
            </View>
          )):null}
          <TouchableOpacity onPress={()=>{
         var user = auth().currentUser;
         var uid = user.uid;
           resourcePath?.assets.map(async ({fileName, uri}) => {
              console.log(fileName + ' ' + uri);
              const reference = storage().ref(uid);
              const pathToFile = uri;
              await reference.putFile(pathToFile);
            });

         
            
          }}>
            <Text> Upload </Text>
            </TouchableOpacity>
        </View>
     
           
      </View>
    );
  
}
}
