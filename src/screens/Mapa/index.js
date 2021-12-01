import React, {Component, useEffect, useState} from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Spinner from 'react-native-loading-spinner-overlay';
import {useAnimatedGestureHandler} from 'react-native-reanimated';
import {Marker} from 'react-native-svg';
import TabNavigator from '../../components/TabNavigator';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

var locaisPerigosos = [];
var count = 0;
export default function App() {
  const [latitude, setLatitude] = React.useState(25);
  const [longitude, setLongitude] = React.useState(12);
  const [tipoUsuaria, setTipoUsuaria] = React.useState('');
  const [nomeUsuaria, setNomeUsuaria] = useState('');
  const [locais, setLocais] = useState([]);
  const [position, setPosition] = useState({
    latitude: -23.5489,
    longitude: -46.6388,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  var lat = 0;
  var long = 0;
  useEffect(() => {
    (async () => {
      const user = auth().currentUser;
      const userJSON = user.toJSON();
      (await firestore().collection('Usuarias').get()).forEach(doc => {
        if (doc.data().email == userJSON.email) {
          setNomeUsuaria(doc.data().nome);
          setTipoUsuaria(doc.data().tipousuaria);
        }
      });
      (await firestore().collection('Anjo').get()).forEach(doc => {
        if (doc.data().email == userJSON.email) {
          setNomeUsuaria(doc.data().nome);
          setTipoUsuaria(doc.data().tipousuaria);
        }
      });

      (await firestore().collectionGroup('Chamados').get()).forEach(doc => {
        lat = doc.data().lat;
        long = doc.data().long;
        if (lat != 0 && long != 0) {
          locaisPerigosos.push({
            latitude: lat,
            longitude: long,
          });
        }
      });
      setLocais(locaisPerigosos);

      // console.log(locaisPerigosos);
    })();

    Geolocation.watchPosition(
      pos => {
        console.log(pos);
        setPosition({
          ...position,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        accuracy: 10,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }, [null]);

  if (locaisPerigosos.length != 0) {
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
            })
          }>
          <MapView.Marker
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
            pinColor={'#e0195c'}
            title={nomeUsuaria}
            center={position}
            description={'Você está aqui'}>
            <Image
              style={{width: 50, height: 50, resizeMode: 'contain', margin: 5}}
              source={require('../../../assets/map-marker-icon.png')}
            />
          </MapView.Marker>

          {console.log(locaisPerigosos)}
          {locaisPerigosos.map(function (item) {
            count++;
            return (
              <MapView.Circle
                key={(item.latitude + count + item.longitude).toString()}
                center={item}
                radius={500}
                title={'Área perigosa'}
                description={'Esta é uma área perigosa, evite-a.'}
                strokeWidth={5}
                strokeColor={'#e0195c'}
                fillColor={'rgba(224, 25, 92, 0.1)'}
              />
            );
          })}
        </MapView>
        <TabNavigator tela="mapa" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Spinner
          visible={true}
          textStyle={styles.spinnerTextStyle}
          color={'#e0195c'}
          animation={'slide'}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },

  container: {
    display: 'flex',

    height: Dimensions.get('window').height,
    flexDirection: 'column-reverse',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    justifyContent: 'space-between',
    fontFamily: 'Bahnscrift',
  },
  markerDangerousArea: {
    backgroundColor: 'red',
    width: 60,
    opacity: 0.5,
    height: 60,
    borderRadius: 35,
  },
});
