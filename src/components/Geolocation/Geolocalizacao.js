import React, { useState } from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import Local from '@react-native-community/geolocation'


export default function Geolocalizacao(){

  const [lat, SetLatitude]=useState(0)
  const [lon, SetLongitude]=useState(0)

  const obterLocal=()=>{
    Local.getCurrentPosition(
      (pos)=>{
        SetLatitude(pos.coords.latitude)
        SetLongitude(pos.coords.longitude)
      },
      (erro)=>{
        alert('Erro: ' + erro.message)
      },
      {
        enableHighAccuracy:true,timeout:5000, maximumAge:1000
      }
    )
  }
 
  return (
   <View style={{color:"black"}}>
     <Text style = {{color: "red"}}>
       Teste para Geolocalização
     </Text>

     <TouchableHighlight
      onPress={obterLocal}
      >
        
       <Text>Clique aqui para pegar a localização</Text>

     </TouchableHighlight>

     <Text>Latitude: {lat}</Text>

     <Text>Longitude: {lon}</Text>

   </View>
   
  )
}




