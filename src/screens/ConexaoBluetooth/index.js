import React, {useEffect} from "react";
import {Platform,ScrollView,Switch,Text,SafeAreaView,View,ActivityIndicator,Modal,BackHandler,Linking} from "react-native";
import Toast from "@remobile/react-native-toast";
import Bluetooth, { Device } from 'react-native-ble-plx';
import BluetoothSerial, {withSubscription} from "react-native-bluetooth-serial-next";
import {Buffer} from "buffer";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import Button from "../../components/ButtonBluetooth";
import DeviceList from "../../components/DeviceList";
import styles from "./styles";
import BleManager from 'react-native-ble-manager';
global.Buffer = Buffer;

const iconv = require("iconv-lite");
class App extends React.Component {
  constructor(props) {
    super(props);
    this.events = null;
    this.state = {
      isEnabled: false,
      isScanning: false,
      device: null,
      devices: [],
      scanning: false,
      processing: false,
      navigator: props.navigator
    };


    ReactNativeForegroundService.register();
    ReactNativeForegroundService.add_task(() => {


     BluetoothSerial.available().then((length) => {
      BluetoothSerial.readFromDevice().then((data) => {
        if(String(data)=="1"){
          Toast.showShortBottom("Socorro Tipo 1");
        }
        if(String(data)=="2"){
          Toast.showShortBottom("Socorro Tipo 2");
        }
      })
    });

   }, {
    delay: 100,
    onLoop: true,
    taskId: "taskid",
    onError: (e) => console.log(`Error logging:`, e),
  });
  }

  async componentDidMount() {
    this.events = this.props.events;
    ReactNativeForegroundService.start({
      id: 144,
      title: "Hera",
      message: "Você está protegida!",
      vibration: true,
      smallIcon: "ic_notification",
      icon: "ic_notification",
      largeicon: "ic_notification",
      importance: "high",
    });

     BleManager.start({ showAlert: false })
      .then(() => {
        BleManager.enableBluetooth();
        BleManager.connect('3C:61:05:14:DC:B6').then(() => {
          console.log('Conectado');
      }
      ).catch((error) => {
          console.log(error);
      }
      )

  }).catch((error) => {
    console.log(error)
});
    
    try {
      const [devices] = await Promise.all([
        BluetoothSerial.list()]
        );
      this.setState({
        devices: devices.map(device => ({
          ...device,
          paired: true,
          connected: false,
        })),
      });

      
    } catch (e) {
      Toast.showShortBottom(e.message);
    }
  }

  toggleDeviceConnection = async ({ id, connected }) => {
    if (connected) {
      await this.disconnect(id);
    } else {
      await this.connect(id);
    }
  };

  connect = async id => {
    this.setState({ processing: true });
    try {
      const connected = await BluetoothSerial.device(id).connect();

      if (connected) {

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
      } 
    } catch (e) {
      Toast.showShortBottom(e.message);
      this.setState({ processing: false });
    }
  };


  disconnect = async id => {
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

  renderModal = (device, processing) => {
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
