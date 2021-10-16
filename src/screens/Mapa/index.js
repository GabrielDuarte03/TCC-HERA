import React, { Component, useEffect, useState } from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useAnimatedGestureHandler } from 'react-native-reanimated';
import { Marker } from 'react-native-svg';
import TabNavigator from '../../components/TabNavigator';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

export default function App() {

  const [latitude,
    setLatitude] = React.useState(25);
  const [longitude,
    setLongitude] = React.useState(12);

  const [nomeUsuaria, setNomeUsuaria] = useState('');


 

  const [position, setPosition] = useState({
    latitude: -23.5489,
    longitude: -46.6388,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  var lat = 0;
  var long = 0;
  useEffect( async() => {
    
    const user = auth().currentUser;
    const userJSON = user.toJSON();
    (await firestore().collection('Usuarias').get()).forEach(doc => {
      if(doc.data().email == userJSON.email){
        setNomeUsuaria(doc.data().nome);
          
      }
   
  });
      
    Geolocation.watchPosition((pos) => {

      setPosition({
        ...position,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,

      });

    }, (error) => {
      console.log(error);
    }, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
      distanceFilter: 10
    });
  }, [])

  return (
    <View style={styles.container}>

      <MapView
        style={styles.map}
        region={position}
        onPress={e =>
          setPosition({
            ...position,
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          })}>

        <MapView.Marker
          coordinate={{
            latitude: position.latitude,
            longitude: position.longitude,
          }}
          pinColor={'#e0195c'}
          title={"Posição atual da usuária: "}
          description={nomeUsuaria}

        />

      </MapView>
      <TabNavigator />
    </View>
  );

}
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get("window").height,
  },
  container: {
    display: 'flex',
    flexDirection: 'column-reverse',
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    height: '100%',
    fontFamily: "Bahnscrift",
  },
});