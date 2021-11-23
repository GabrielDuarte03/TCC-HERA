import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  Linking,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import ModalDropdown from 'react-native-modal-dropdown';
import Spinner from 'react-native-loading-spinner-overlay';
import app from '../ConexaoBluetooth';
import IntentLauncher, {IntentConstant} from 'react-native-intent-launcher';
import BluetoothSerial from 'react-native-bluetooth-serial-next';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

export default function App({route}) {
  const [resourcePath, setResourcePath] = useState('');
  const [urlPhoto, setUrlPhoto] = useState('');
  const [nome, setNome] = useState('');
  const [existe, setExiste] = useState('');
  const [tipoUsuaria, setTipoUsuaria] = useState('');
  const [erro, setErro] = useState('');
  
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    
    BackHandler.addEventListener('hardwareBackPress', () => true);
    var userr = auth().currentUser;
    var user = userr.uid;
    (async () => {
      const url = await storage()
        .ref(user)
        .getDownloadURL()
        .then(url => {
          setUrlPhoto(url);
          setExiste('true');
        })
        .catch(error => {
          setExiste('false');
          console.log(error);
        });
      console.log(userr.email);
      await firestore()
        .collection('Usuarias')
        .where('email', '==', userr.email)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            setNome(doc.data().nome);
            setTipoUsuaria(doc.data().tipousuaria);
            console.log(doc.data().nome);
          });
        });
      if (tipoUsuaria == '') {
        await firestore()
          .collectionGroup('Anjo')
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              if (doc.data().email == userr.email) {
                setNome(doc.data().nome);
                setTipoUsuaria(doc.data().tipousuaria);
                console.log(doc.data().nome);
              }
            });
          });
      }
    })();
  });
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(100).then(() => setRefreshing(false));
  }, []);

  if (existe === '' && nome === '' && tipoUsuaria === '') {
    return (
      <View style={styles.container}>
        <Spinner
          visible={true}
          textStyle={styles.spinnerTextStyle}
          color={'#FFF'}
          animation={'slide'}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.headText}>Perfil</Text>
        <View style={styles.imagem}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
            <ModalDropdown
              options={['Escolher da Galeria', 'Tirar foto agora']}
              dropdownTextStyle={{
                fontSize: 18,
                fontFamily: 'Montserrat-Bold',
                color: '#000',
              }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0,
                shadowRadius: 0,
              }}
              animated={true}
              onSelect={(index, value) => {
                if (index == 0) {
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
                    response => {
                      if (response.didCancel) {
                        console.log('User cancelled image picker');
                      } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                      } else if (response.customButton) {
                        console.log(
                          'User tapped custom button: ',
                          response.customButton,
                        );
                      } else {
                        const source = {uri: response.uri};
                        setResourcePath(response);
                        var user = auth().currentUser;
                        var uid = user.uid;

                        response.assets.map(async ({fileName, uri}) => {
                          console.log(fileName + ' ' + uri);
                          const reference = storage().ref(uid);
                          const pathToFile = uri;
                          await reference.putFile(pathToFile);
                        });
                        onRefresh();
                      }
                    },
                  );
                } else {
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

                    response => {
                      console.log(response);
                      if (response.didCancel) {
                        console.log('User cancelled image picker');
                      } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                      } else if (response.customButton) {
                        console.log(
                          'User tapped custom button: ',
                          response.customButton,
                        );
                      } else {
                        const source = {uri: response.uri};
                        setResourcePath(response);
                        var user = auth().currentUser;
                        var uid = user.uid;

                        response.assets.map(async ({fileName, uri}) => {
                          console.log(fileName + ' ' + uri);
                          const reference = storage().ref(uid);
                          const pathToFile = uri;
                          await reference.putFile(pathToFile);
                        });
                        onRefresh();
                      }
                    },
                  );
                }
              }}
              dropdownStyle={{
                width: 120,
                height: 140,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                elevation: 0,
                marginLeft: 160,
                marginTop: -40,
                borderWidth: 2,
                borderColor: '#000',
                borderTopRightRadius: 10,

                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0,
                shadowRadius: 0,
              }}>
              {urlPhoto === '' ? (
                <FastImage
                  source={require('../../../assets/user.png')}
                  style={styles.img}
                  resizeMode="cover"
                  resizeMethod="auto"
                />
              ) : (
                <FastImage
                  source={{uri: urlPhoto}}
                  style={styles.img}
                  resizeMode="cover"
                  resizeMethod="auto"
                />
              )}
            </ModalDropdown>
          </TouchableOpacity>

          <View style={styles.dadosContainer}>
            <Text style={styles.name}>{nome}</Text>
            {tipoUsuaria == 'ANJO' ? 
            <>
              <Text style={styles.userTipo}>Você é anjo</Text>
              </>
             : 
              <>
                <Text style={styles.userTipo}>Você é usuária</Text>
                <Text style={styles.statusBT}>
                  O seu bluetooth está desconectado!
                </Text>
              </>
            }

            <TouchableOpacity
              style={styles.botaoAtualizarDados}
              onPress={() =>
                navigation.navigate('AtualizarDadosOpções', {opção: 1})
              }>
              <Text style={styles.textoBotaoAtualizarDados}>
                Atualizar perfil
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.botaoDadosDaConta}>
              <Text style={styles.textoBotaoDadosDaConta}>
                Configurações do aplicativo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoDadosDaConta}
              onPress={() => {
                navigation.navigate('ConexaoBluetooth');
              }}>
              <Text style={styles.textoBotaoDadosDaConta}>Bluetooth</Text>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity
            onPress={() => {
              IntentLauncher.startActivity({
                action: 'android.settings.BLUETOOTH_SETTINGS',
              });
            }}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={isConnected}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={conectar}>
            <Text style={styles.buttonText}>conectar</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            onPress={() => {
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

                response => {
                  console.log(response);
                  if (response.didCancel) {
                    console.log('User cancelled image picker');
                  } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                  } else if (response.customButton) {
                    console.log(
                      'User tapped custom button: ',
                      response.customButton,
                    );
                  } else {
                    const source = {uri: response.uri};
                    setResourcePath(response);
                    console.log(response.uri);
                  }
                },
              );
            }}>
            <Text> Tirar agora </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
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
                response => {
                  if (response.didCancel) {
                    console.log('User cancelled image picker');
                  } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                  } else if (response.customButton) {
                    console.log(
                      'User tapped custom button: ',
                      response.customButton,
                    );
                  } else {
                    const source = {uri: response.uri};
                    setResourcePath(response);
                  }
                },
              );
            }}>
            <Text> Escolher da galeria </Text>
          </TouchableOpacity>

          {erro == ''
            ? resourcePath?.assets &&
              resourcePath?.assets.map(({uri}) => (
                <View key={uri} style={styles.image}>
                  <Image
                    resizeMode="contain"
                    resizeMethod="auto"
                    style={{width: 300, height: 300}}
                    source={{uri: uri}}
                  />
                </View>
              ))
            : null}
          <TouchableOpacity
            onPress={() => {
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
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}
