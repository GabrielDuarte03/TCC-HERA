import React, {useEffect, useState, useRef} from 'react';
import {
  //Text,
  View,
  Image,
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import TabNavigator from '../../components/TabNavigator';
import {Modalize} from 'react-native-modalize';
import Parse from 'parse/react-native.js';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocalizacao from '../../components/Geolocation/Geolocalizacao';
import Local from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import Bluetooth, {Device} from 'react-native-ble-plx';
import {isConnected} from 'react-native-bluetooth-serial-next';
import BleManager from 'react-native-ble-manager';
import {NativeModules, NativeEventEmitter} from 'react-native';
import Line from '../../../assets/line.svg';
import BluetoothButtonConnect from '../../../assets/btnConnect.svg';
import {NavigationContainer} from '@react-navigation/native';
// Import the library
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import {AppRegistry} from 'react-native';
import {name as appName} from '../../../app.json';
import {BottomNavigation, Text} from 'react-native-paper';

var chamado = false;
var a = 0;

export default function App({route}) {
  const navigation = useNavigation();
  const modalizeRef = useRef(null);
  const [elevation, setElevation] = useState(20);
  const [assinante, setAssinante] = useState(false);

  ReactNativeForegroundService.register();

  ReactNativeForegroundService.add_task(() => {}, {
    delay: 100,
    onLoop: true,
    taskId: 'taskid',
    onError: e => console.log(`Error logging:`, e),
  });

  useEffect(async () => {
    (await firestore().collectionGroup('Anjo').get()).forEach(doc => {
      console.log('saaaaa');
      if (doc.exists && doc.data().email == emailPassado) {
        setNomeUsuaria(doc.data().nome);
        setTipoUsuaria(doc.data().tipousuaria);
        console.log(nomeUsuaria);
      }
    });

    console.log('nao sei');
    const emailsUsu = firestore().collection('Usuarias');
    const emailAnj = firestore().collection('Anjo');

    if (emailPassado != null) {
      const queryUser = await emailsUsu
        .where('email', '==', emailPassado)
        .get();

      if (!queryUser.empty) {
        setTipoUsuaria(queryUser.docs[0].data().tipousuaria);
        setNomeUsuaria(queryUser.docs[0].data().nome);
        setAssinante(queryUser.docs[0].data().assinante);
        console.log(queryUser.docs[0].data().assinante);
      } else {
        setTipoUsuaria('ANJO');
        //setNomeUsuaria(queryUser.docs[0].data().nome);
      }
    }

    BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert(
        'Alerta!',
        'Deseja sair do aplicativo?',
        [
          {
            text: 'Não',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Sim', onPress: () => BackHandler.exitApp()},
        ],
        {cancelable: false},
      );
      return true;
    });

    BleManager.start({showAlert: false})
      .then(() => {
        BleManager.enableBluetooth();
        BleManager.connect('E8:EC:A3:0B:97:CE')
          .then(() => {
            console.log('Conectado');
          })
          .catch(error => {
            console.log(error);
          });

        const bleManagerEmitter = new NativeEventEmitter(BleManager);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    ReactNativeForegroundService.start({
      id: 144,
      title: 'Hera',
      message: 'Você está protegida!',
      vibration: true,
      smallIcon: 'ic_notification',
      icon: 'ic_notification',
      largeicon: 'ic_notification',
      importance: 'high',
    });
  });

  Parse.setAsyncStorage(AsyncStorage);
  Parse.initialize(
    'Wcq3vd9GbWK5zSizipXUwUvF3hsZIT7NQvX0x9Gz',
    '1nWgFG26b8YiAzAQEkxnRcRBqApfN4W8cWTieK2h',
  );
  Parse.serverURL = 'https://parseapi.back4app.com/';

  const [lat, SetLatitude] = useState(0);
  const [lon, SetLongitude] = useState(0);
  const [email, setEmail] = useState('');
  const [tipoUsuaria, setTipoUsuaria] = useState('');

  const [nomeUsuaria, setNomeUsuaria] = useState('');

  const [conectado, setConectado] = useState(false);

  var emailPassado = route.params?.email;

  function logout() {
    console.log('logout');
    Alert.alert(
      'Alerta!',
      'Deseja desconectar da sua conta?',
      [
        {
          text: 'Não',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            auth()
              .signOut()
              .then(() => {
                setTipoUsuaria('');
                setNomeUsuaria('');
                setEmail('');
                setConectado(false);
                setAssinante(false);
                ReactNativeForegroundService.stop();
                ReactNativeForegroundService.remove_task('taskid');
                navigation.navigate('Login');
              });
          },
        },
      ],
      {cancelable: false},
    );
  }

  if (tipoUsuaria == 'USUÁRIA') {
    console.log(tipoUsuaria);

    return (
      <View style={styles.container}>
        <View style={styles.mae}>
          <View style={styles.headContainer}>
            <Text
              style={{color: 'gray', fontSize: 18, fontFamily: 'Bahnscrift'}}>
              Bem vind@,
            </Text>
            <Text style={{color: 'black', fontSize: 30}}>{nomeUsuaria}</Text>
            <Line />
            {assinante ? (
              <Text style={{color: 'black', fontSize: 25}}>
                Conectar a pulseira
              </Text>
            ) : null}
          </View>
          <View style={styles.ladoLogout}>
            <TouchableOpacity style={styles.btnLogout} onPress={logout}>
              <Image
                source={require('../../../assets/logout.png')}
                style={styles.logout}
              />
            </TouchableOpacity>
          </View>
        </View>
        {assinante ? (
          <>
            <BluetoothButtonConnect />
            <TouchableOpacity onPress={() => console.log('conecta')}>
              <Text> Conectado</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              onPress={() => enviarTempoEmTempo()}>
              <Image
                source={require('../../../assets/alert.png')}
                style={{width: 250, height: 250}}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Montserrat-Bold',
                  color: '#000',
                  marginTop: 20,
                  marginLeft: 30,
                }}>
                ABRIR CHAMADO
              </Text>
            </TouchableOpacity>
          </>
        )}

        <View style={[styles.categoriesContainer]}>
          <Text style={{padding: 15, fontWeight: 'bold', fontSize: 20}}>
            Categorias
          </Text>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.cardContainer}>
            <View style={[styles.cardPrincipal, {elevation: elevation}]}>
              <Image
                source={require('../../../assets/noticia.png')}
                style={styles.imgCardPrin}
              />
              <Text style={styles.tituloCardPrincipal}>Notícias</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Noticias');
                }}>
                <Image
                  source={require('../../../assets/proximo.png')}
                  style={styles.imgProxPrin}
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.card, {elevation: elevation}]}>
              <Image
                source={require('../../../assets/marcar-no-mapa.png')}
                style={styles.imgCard}
              />

              <Text style={styles.tituloCard}>Locais</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Mapa')}>
                <Image
                  source={require('../../../assets/proximo.png')}
                  style={styles.imgProx}
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.card, {elevation: elevation}]}>
              <Image
                source={require('../../../assets/anjo1.png')}
                style={styles.imgCard}
              />

              <Text style={styles.tituloCard}>Anjos da Guarda</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AdicionarAnjo', {
                    tipoUsuaria: tipoUsuaria,
                  });
                }}>
                <Image
                  source={require('../../../assets/proximo.png')}
                  style={styles.imgProx}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <TabNavigator tela="Home" />

        <Modalize
          ref={modalizeRef}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
          withHandle={false}
          snapPoint={Dimensions.get('window').height}
          panGestureEnabled={false}
          rootStyle={{zIndex: 20, elevation: 50}}
          modalHeight={Dimensions.get('window').height}
          HeaderComponent={
            <View
              style={{
                position: 'absolute',
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                height: '100%',
              }}>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: Dimensions.get('window').width - 100,
                  backgroundColor: '#E0195C',
                  borderRadius: 150,
                  margin: 50,
                  height: 50,
                  zIndex: 15,
                  elevation: 20,
                  borderColor: '#000',
                  borderWidth: 1.4,
                }}
                onPress={cancelarChamado}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Roboto',
                    fontWeight: '700',
                  }}>
                  CANCELAR CHAMADO
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  } else if (tipoUsuaria == 'ANJO') {
    console.log(tipoUsuaria);
    return (
      <View style={styles.container}>
        <View style={styles.mae}>
          <View style={styles.headContainer}>
            <Text
              style={{color: 'gray', fontSize: 18, fontFamily: 'Bahnscrift'}}>
              Bem vind@,
            </Text>
            <Text style={{color: 'black', fontSize: 30}}>{nomeUsuaria}</Text>
            <Line />
          </View>
          <View style={styles.ladoLogout}>
            <TouchableOpacity style={styles.btnLogout} onPress={logout}>
              <Image
                source={require('../../../assets/logout.png')}
                style={styles.logout}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.categoriesContainer]}>
          <Text style={{padding: 15, fontWeight: 'bold', fontSize: 20}}>
            Categorias
          </Text>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.cardContainer}>
            <View style={[styles.cardPrincipal, {elevation: elevation}]}>
              <Image
                source={require('../../../assets/noticia.png')}
                style={styles.imgCardPrin}
              />
              <Text style={styles.tituloCardPrincipal}>Notícias</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Noticias');
                }}>
                <Image
                  source={require('../../../assets/proximo.png')}
                  style={styles.imgProxPrin}
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.card, {elevation: elevation}]}>
              <Image
                source={require('../../../assets/marcar-no-mapa.png')}
                style={styles.imgCard}
              />

              <Text style={styles.tituloCard}>Locais</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Mapa')}>
                <Image
                  source={require('../../../assets/proximo.png')}
                  style={styles.imgProx}
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.card, {elevation: elevation}]}>
              <Image
                source={require('../../../assets/anjo1.png')}
                style={styles.imgCard}
              />

              <Text style={styles.tituloCard}>Anjos da Guarda</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AdicionarAnjo', {
                    tipoUsuaria: tipoUsuaria,
                  });
                }}>
                <Image
                  source={require('../../../assets/proximo.png')}
                  style={styles.imgProx}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <TabNavigator tela="Home" />

        <Modalize
          ref={modalizeRef}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
          withHandle={false}
          snapPoint={Dimensions.get('window').height}
          panGestureEnabled={false}
          rootStyle={{zIndex: 20, elevation: 50}}
          modalHeight={Dimensions.get('window').height}
          HeaderComponent={
            <View
              style={{
                position: 'absolute',
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                height: '100%',
              }}>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: Dimensions.get('window').width - 100,
                  backgroundColor: '#E0195C',
                  borderRadius: 150,
                  margin: 50,
                  height: 50,
                  zIndex: 15,
                  elevation: 20,
                  borderColor: '#000',
                  borderWidth: 1.4,
                }}
                onPress={cancelarChamado}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Roboto',
                    fontWeight: '700',
                  }}>
                  CANCELAR CHAMADO
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  } else if (tipoUsuaria == 'HÍBRIDA') {
    console.log(tipoUsuaria);
    return (
      <View style={styles.container}>
        <View style={styles.mae}>
          <View style={styles.headContainer}>
            <Text
              style={{color: 'gray', fontSize: 18, fontFamily: 'Bahnscrift'}}>
              Bem vind@,
            </Text>
            <Text style={{color: 'black', fontSize: 30}}>{nomeUsuaria}</Text>
            <Line />
            {assinante ? (
              <Text style={{color: 'black', fontSize: 25}}>
                Conectar a pulseira
              </Text>
            ) : null}
          </View>
          <View style={styles.ladoLogout}>
            <TouchableOpacity style={styles.btnLogout} onPress={logout}>
              <Image
                source={require('../../../assets/logout.png')}
                style={styles.logout}
              />
            </TouchableOpacity>
          </View>
        </View>
        {assinante ? (
          <>
            <BluetoothButtonConnect />
            <TouchableOpacity onPress={() => console.log('conecta')}>
              <Text> Conectado</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              onPress={() => enviarTempoEmTempo()}>
              <Image
                source={require('../../../assets/alert.png')}
                style={{width: 250, height: 250}}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Montserrat-Bold',
                  color: '#000',
                  marginTop: 20,
                  marginLeft: 30,
                }}>
                ABRIR CHAMADO
              </Text>
            </TouchableOpacity>
          </>
        )}

        <View style={[styles.categoriesContainer]}>
          <Text style={{padding: 15, fontWeight: 'bold', fontSize: 20}}>
            Categorias
          </Text>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.cardContainer}>
            <View style={[styles.cardPrincipal, {elevation: elevation}]}>
              <Image
                source={require('../../../assets/noticia.png')}
                style={styles.imgCardPrin}
              />
              <Text style={styles.tituloCardPrincipal}>Notícias</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Noticias');
                }}>
                <Image
                  source={require('../../../assets/proximo.png')}
                  style={styles.imgProxPrin}
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.card, {elevation: elevation}]}>
              <Image
                source={require('../../../assets/marcar-no-mapa.png')}
                style={styles.imgCard}
              />

              <Text style={styles.tituloCard}>Locais</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Mapa')}>
                <Image
                  source={require('../../../assets/proximo.png')}
                  style={styles.imgProx}
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.card, {elevation: elevation}]}>
              <Image
                source={require('../../../assets/anjo1.png')}
                style={styles.imgCard}
              />

              <Text style={styles.tituloCard}>Anjos da Guarda</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AdicionarAnjo', {
                    tipoUsuaria: tipoUsuaria,
                  });
                }}>
                <Image
                  source={require('../../../assets/proximo.png')}
                  style={styles.imgProx}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <TabNavigator tela="Home" />

        <Modalize
          ref={modalizeRef}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
          withHandle={false}
          snapPoint={Dimensions.get('window').height}
          panGestureEnabled={false}
          rootStyle={{zIndex: 20, elevation: 50}}
          modalHeight={Dimensions.get('window').height}
          HeaderComponent={
            <View
              style={{
                position: 'absolute',
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                height: '100%',
              }}>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                  width: Dimensions.get('window').width - 100,
                  backgroundColor: '#E0195C',
                  borderRadius: 150,
                  margin: 50,
                  height: 50,
                  zIndex: 15,
                  elevation: 20,
                  borderColor: '#000',
                  borderWidth: 1.4,
                }}
                onPress={cancelarChamado}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Roboto',
                    fontWeight: '700',
                  }}>
                  CANCELAR CHAMADO
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Spinner
          visible={true}
          textStyle={styles.spinnerTextStyle}
          color={'#E0195C'}
          animation={'slide'}
        />
      </View>
    );
  }

  async function signOut() {
    await auth().signOut();

    navigation.navigate('Login');
  }

  function EsperarTempo(tempo) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, tempo);
    });
  }

  function mostrarModal() {
    modalizeRef.current?.open();
  }

  async function enviarTempoEmTempo() {
    chamado = true;
    mostrarModal();

    var hora = new Date().getHours();
    hora < 10 ? (hora = '0' + hora) : hora;

    var minuto = new Date().getMinutes();
    minuto < 10 ? (minuto = '0' + minuto) : minuto;

    while (chamado) {
      await obterLocal();
      if (a == 0) {
        const user = auth().currentUser;
        const userJSON = user.toJSON();
        const emailzin = userJSON.email;
        console.log(hora + minuto);
        const descobrirCPF = await firestore().collection('Usuarias');
        const queryCPF = await descobrirCPF
          .where('email', '==', emailzin)
          .get();
        const cpf = queryCPF.docs[0].data().cpf;

        await firestore()
          .collection('Usuarias')
          .doc(cpf)
          .collection('Chamados')
          .doc()
          .set({
            lat: lat,
            long: lon,
            data:
              new Date().getDate() +
              '/' +
              (new Date().getMonth() + 1) +
              '/' +
              new Date().getFullYear(),
            hora: hora + ':' + minuto,
          })
          .then(() => {
            console.log('Chamado salvo');
          })
          .catch(() => {
            console.log('Erro ao salvar chamado');
          });
        a++;
      }
      console.log('chamado -------------------------------------' + chamado);
      const result = await EsperarTempo(5000);
    }
  }

  function cancelarChamado() {
    chamado = false;
    a = 0;
    console.log('chamado -------------------------------------' + chamado);
    modalizeRef.current?.close();
  }
  async function obterLocal() {
    console.log('entrou');
    Local.getCurrentPosition(
      pos => {
        console.log('chegou aqui');
        SetLatitude(pos.coords.latitude);
        SetLongitude(pos.coords.longitude);
        EnviarLocal(pos.coords.latitude, pos.coords.longitude);
      },
      erro => {
        console.log('chegou aqui');
        alert('Erro: ' + erro.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
      },
    );
  }

  async function EnviarLocal(lat, long) {
    console.log(lat + ' ' + long);
    const params1 = {
      lat: lat,
      long: long,
    };
    let resultObject = await Parse.Cloud.run('enviarMsg', params1)
      .then(function (result) {
        console.log('Foi!');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
