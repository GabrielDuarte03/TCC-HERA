import React, {useEffect, useRef} from "react";
import {
  Platform,
  ScrollView,
  Switch,
  Text,
  SafeAreaView,
  View,
  ActivityIndicator,
  Modal,
  BackHandler,

} from "react-native";

import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import Toast from "@remobile/react-native-toast";
import BluetoothSerial, {withSubscription} from "react-native-bluetooth-serial-next";
import {Buffer} from "buffer";
import firestore, {firebase} from '@react-native-firebase/firestore';
import Button from "../../components/ButtonBluetooth";
import DeviceList from "../../components/DeviceList";
import styles from "./styles";
import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
global.Buffer = Buffer;

const iconv = require("iconv-lite");
ReactNativeForegroundService.register();

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(
  'eD7UMdVkUHltyi6ee3JoLnyTShOAhQaAW9uQVKR8',
  'icWdGRfOy8imxHAvP4oh8fTDUdUABLLH9tGUmR8F',
);
Parse.serverURL = 'https://parseapi.back4app.com/';


class App extends React.Component {
  
  
 
  constructor(props) {
    super(props);
    this.events = null;
    this.modalizeRef = React.createRef();
    this.addtask = ReactNativeForegroundService();
    this.EnviarLocal = this.EnviarLocal.bind(this);
    this.EsperarTempo = this.EsperarTempo.bind(this);
    this.mostrarModal = this.mostrarModal.bind(this);
    this.enviarTempoEmTempo = this.enviarTempoEmTempo.bind(this);
    this.cancelarChamado = this.cancelarChamado.bind(this);
    this.obterLocal = this.obterLocal.bind(this);
    this.state = {
      isEnabled: false,
      device: null,
      devices: [],
      scanning: false,
      processing: false,
    };
  }
 
 
  
async EnviarLocal(lat, long, idsTelegram, nome) {
  console.log(lat + ' ' + long);
  const params1 = {
    lat: lat,
    long: long,
    ids: idsTelegram,
    nome: nome,
  };
  let resultObject = await Parse.Cloud.run('enviarMsg', params1)
    .then(function (result) {
      console.log('Foi!');
    })
    .catch(function (error) {
      console.log(error);
    });
}

EsperarTempo(tempo) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, tempo);
  });
}

mostrarModal() {
  modalizeRef.current?.open();
}

async enviarTempoEmTempo() {
  chamado = true;
  mostrarModal();

  var hora = new Date().getHours();
  hora < 10 ? (hora = '0' + hora) : hora;

  var minuto = new Date().getMinutes();
  minuto < 10 ? (minuto = '0' + minuto) : minuto;

  while (chamado) {
    await obterLocal();

    const user = auth().currentUser;
    const userJSON = user.toJSON();
    const emailzin = userJSON.email;
    console.log(hora + minuto);
    const descobrirCPF = await firestore().collection('Usuarias');
    const queryCPF = await descobrirCPF.where('email', '==', emailzin).get();
    const cpf = queryCPF.docs[0].data().cpf;

    if (a == 0) {
      const user = auth().currentUser;
      const userJSON = user.toJSON();
      const emailzin = userJSON.email;
      //console.log(hora + minuto);
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

cancelarChamado() {
  chamado = false;
  a = 0;
  console.log('chamado -------------------------------------' + chamado);
  modalizeRef.current?.close();
}

async obterLocal() {
  console.log('entrou');
  const user = auth().currentUser;
  const userJSON = user.toJSON();
  const emailzin = userJSON.email;
  const descobrirCPF = await firestore().collection('Usuarias');
  const queryCPF = await descobrirCPF.where('email', '==', emailzin).get();
  const cpf = queryCPF.docs[0].data().cpf;

  await firestore()
    .collection('Usuarias')
    .doc(cpf)
    .collection('Anjo')
    .get()
    .then(data => {
      var ids = [];

      data.forEach(doc => {
        ids.push(doc.data().idtelegram);
      });
      setIdsTelegram(ids);
      console.log(idsTelegram);
    });

  if (permitiu) {
    console.log('entrou');
    Geolocation.getCurrentPosition(pos => {
      console.log(idsChat + ' nennhum');
      console.log('chegou aqui');
      SetLatitude(pos.coords.latitude);
      SetLongitude(pos.coords.longitude);
      EnviarLocal(
        pos.coords.latitude,
        pos.coords.longitude,
        idsTelegram,
        nomeUsuaria,
      );

      idsChat.map(
        async id => {
          console.log(id + '----- medo');
          await firestore()
            .collection('AllMensages')
            .doc(id)
            .collection('Mensages')
            .add({
              text: 'SOCORRO',
              createdAt: new Date().getTime(),
              location: {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              },
              user: {
                _id: user.uid,
                displayName: nomeUsuaria,
              },
            })
            .then(function (docRef) {
              console.log('Document written with ID: ', docRef.id);
            })
            .catch(function (error) {
              console.error('Error adding document: ', error);
            });

          await firestore()
            .collection('AllMensages')
            .doc(id)
            .set(
              {
                latestMessage: {
                  text: 'SOCORRO',
                  createdAt: new Date().getTime(),
                },
              },
              {merge: true},
            );
        },
        erro => {
          console.log('chegou aqui');
          alert('Erro: ' + erro.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          showLocationDialog: true,
        },
      );
    });
  } else {
    Alert.alert('Erro', 'Permita a localização para enviar o local do anjo');
  }
}

async componentDidUpdate(){
  
}
async componentDidMount() {
  (async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Hera',
          message: 'Hera gostaria de utilizar seu GPS',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        setPermitiu(true);
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  })();
  

  this.events = this.props.events;


  try {
    const [isEnabled, devices] = await Promise.all([
      BluetoothSerial.isEnabled(),
      BluetoothSerial.list()
      ]);

    this.setState({
      isEnabled,
      devices: devices.map(device => ({
        ...device,
        paired: true,
        connected: false
      }))
    });
  } catch (e) {
    Toast.showShortBottom(e.message);
  }


}
  async comunicacao() {

     BluetoothSerial
    .available()
    .then((length) => {
      
      BluetoothSerial
      .readFromDevice()
      .then((data) => {
        if(data =='1'){
          Toast.showShortBottom("Socorro Tipo 1");
        }
        if(data =='2'){
          Toast.showShortBottom("Socorro Tipo 2");
        }
     })
    });
  }
  
  async toggleDeviceConnection({ id, connected })  {
    
    if (connected) {
      await this.disconnect(id);
    } else {
      await this.connect(id);
    }
  };
  
  async connect (id) {
    console.log("connect");
    this.setState({ processing: true });

    try {
      const connected = await BluetoothSerial.device('7C:9E:BD:F2:CC:52').connect();
      if (connected) {
        Toast.showShortBottom(
          `Connected to device ${connected.name}<${connected.id}>`
          );

        this.setState(({ devices, device }) => ({
          processing: false,
          device: {
            ...device,
            ...connected,
            connected: true
          },
          devices: devices.map(v => {
            if (v.id === connected.id) {
              return {
                ...v,
                ...connected,
                connected: true
              };
            }

            return v;
          })
        }));
      } else {
        Toast.showShortBottom(`Failed to connect to device <${id}>`);
        this.setState({ processing: false });
      }
    } catch (e) {
      Toast.showShortBottom(e.message);
      this.setState({ processing: false });
    }
  };
  
 async disconnect (id){
    this.setState({ processing: true });

    try {
      await BluetoothSerial.device(id).disconnect();

      this.setState(({ devices, device }) => ({
        processing: false,
        device: {
          ...device,
          connected: false
        },
        devices: devices.map(v => {
          if (v.id === id) {
            return {
              ...v,
              connected: false
            };
          }

          return v;
        })
      }));
    } catch (e) {
      Toast.showShortBottom(e.message);
      this.setState({ processing: false });
    }
  };
  

   renderModal(device, processing){
    if (!device) return null;

    const { id, name, paired, connected } = device;

    return (
      <Modal
      animationType="fade"
      transparent={false}
      visible={true}
      onRequestClose={() => {}}
      >
      {device ? (
        <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
        >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{name}</Text>
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
        {processing && (
          <ActivityIndicator
          style={{ marginTop: 15 }}
          size={Platform.OS === "ios" ? 1 : 60}
          />
          )}

          {!processing && (
            <View style={{ marginTop: 20, width: "50%" }}>
            <Button
            title={connected ? "Desconectar" : "Conectar"}
            style={{
              backgroundColor: "#22509d"
            }}
            textStyle={{ color: "#fff" }}
            onPress={() => this.toggleDeviceConnection(device)}
            />
            {connected && (
              <React.Fragment>
              <Button
              title="Alertar"
              style={{
                backgroundColor: "#22509d"
              }}
              textStyle={{ color: "#fff" }}
              onPress={() =>
               this.comunicacao()
             }
             />

             </React.Fragment>
             )}
             <Button
             title="Fechar"
             onPress={() => this.setState({ device: null })}
             />
             </View>
             )}
             </View>
             ) : null}
      </Modal>
      );
    };

    render() {
      const { isEnabled, device, devices, scanning, processing } = this.state;

      return (
      <SafeAreaView style={{ flex: 1 }}>


      {scanning ? (
        isEnabled && (
        <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
        >
        <ActivityIndicator
        style={{ marginBottom: 15 }}
        size={Platform.OS === "ios" ? 1 : 60}
        />

        </View>
        )
        ) : (
        <React.Fragment>
        {this.renderModal(device, processing)}
        <DeviceList
        devices={devices}
        onDevicePressed={device => this.setState({ device })}
        onRefresh={this.listDevices}
        />
        </React.Fragment>
        )}


        </SafeAreaView>
        );
      }
    }
 
    export default withSubscription({subscriptionName: "events"})(App);
