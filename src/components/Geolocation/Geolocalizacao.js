import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import Local from '@react-native-community/geolocation'
import AlertPro from "react-native-alert-pro";

export default function Geolocalizacao(){

  const [lat, SetLatitude]=useState(0)
  const [lon, SetLongitude]=useState(0)
  var referencia = useRef(null);
  const obterLocal=()=>{
    Local.getCurrentPosition(
      (pos)=>{
        SetLatitude(pos.coords.latitude)
        SetLongitude(pos.coords.longitude)
      },
      (erro)=>{
        
       referencia.open();
      },
      {
        enableHighAccuracy:true,timeout:5000, maximumAge:1000
      }
    )
  }
 
  return (
   <View style={{color:"black"}}>
      <AlertPro
              ref={ref => {
                referencia = ref;
              }}
              onConfirm={() => referencia.close()}
              title="Erro"
              message="Um erro inesperado aconteceu!"
              textCancel="NÃO"
              textConfirm="SIM"
              useNativeDriver={true}
              showCancel={false}
              customStyles={{
                mask: {
                  backgroundColor: 'rgba(0,0,0,0.7)',
                },
                container: {
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: '#e0195c',
                  borderWidth: 2,
                  alignItems: 'center',
                  justifyContent: 'center',                  
                },
                buttonCancel: {
                  backgroundColor: '#e0195c',
                  borderRadius: 150,
                },
                buttonConfirm: {
                  backgroundColor: '#e0195c',
                  borderRadius: 150,
                },

              }}
            />
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




