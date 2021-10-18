import React, {useEffect} from "react";
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

import Toast from "@remobile/react-native-toast";
import BluetoothSerial, {withSubscription} from "react-native-bluetooth-serial-next";
import {Buffer} from "buffer";

import Button from "../../components/ButtonBluetooth";
import DeviceList from "../../components/DeviceList";
import styles from "./styles";

global.Buffer = Buffer;

const iconv = require("iconv-lite");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.events = null;
    this.state = {
      isEnabled: false,
      device: null,
      devices: [],
      scanning: false,
      processing: false,
      navigator: props.navigator
    };
  }

  
  async componentDidMount() {
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
    await BluetoothSerial
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
  
  requestEnable = () => async () => {
    try {
      await BluetoothSerial.requestEnable();
      this.setState({ isEnabled: true });
    } catch (e) {
      Toast.showShortBottom(e.message);
    }
  };
  
  toggleBluetooth = async value => {
    try {
      if (value) {
        await BluetoothSerial.enable();
      } else {
        await BluetoothSerial.disable();
      }
    } catch (e) {
      Toast.showShortBottom(e.message);
    }
  };
  
  listDevices = async () => {
    try {
      const list = await BluetoothSerial.list();

      this.setState(({ devices }) => ({
        devices: devices.map(device => {
          const found = list.find(v => v.id === device.id);

          if (found) {
            return {
              ...found,
              paired: true,
              connected: false,

            };
          }

          return device;
        })
      }));
    } catch (e) {
      Toast.showShortBottom(e.message);
    }
  };
  
  discoverUnpairedDevices = async () => {
    this.setState({ scanning: true });
    console.log("Discovering unpaired devices...");

    try {
      console.log("Discovering  devices...");
      const unpairedDevices = await BluetoothSerial.listUnpaired();

      this.setState(({ devices }) => ({
        scanning: false,
        devices: devices
        .map(device => {
          const found = unpairedDevices.find(d => d.id === device.id);
          console.log("Discovering...");
          if (found) {
            return {
              ...device,
              ...found,
              connected: false,
              paired: false
            };
          }

          return device.paired || device.connected ? device : null;
        })
        .map(v => v)
      }));
    } catch (e) {
      Toast.showShortBottom(e.message);

      this.setState(({ devices }) => ({
        scanning: false,
        devices: devices.filter(device => device.paired || device.connected)
      }));
    }
  };
  

  
  toggleDevicePairing = async ({ id, paired }) => {
    if (paired) {
      await this.unpairDevice(id);
    } else {
      await this.pairDevice(id);
    }
  };
  
  pairDevice = async id => {
    this.setState({ processing: true });

    try {
      const paired = await BluetoothSerial.pairDevice(id);

      if (paired) {
        Toast.showShortBottom(
          `Device ${paired.name}<${paired.id}> paired successfully`
          );

        this.setState(({ devices, device }) => ({
          processing: false,
          device: {
            ...device,
            ...paired,
            paired: true
          },
          devices: devices.map(v => {
            if (v.id === paired.id) {
              return {
                ...v,
                ...paired,
                paired: true
              };
            }

            return v;
          })
        }));
      } else {
        Toast.showShortBottom(`Device <${id}> pairing failed`);
        this.setState({ processing: false });
      }
    } catch (e) {
      Toast.showShortBottom(e.message);
      this.setState({ processing: false });
    }
  };
  
  unpairDevice = async id => {
    this.setState({ processing: true });

    try {
      const unpaired = await BluetoothSerial.unpairDevice(id);

      if (unpaired) {
        Toast.showShortBottom(
          `Device ${unpaired.name}<${unpaired.id}> unpaired successfully`
          );

        this.setState(({ devices, device }) => ({
          processing: false,
          device: {
            ...device,
            ...unpaired,
            connected: false,
            paired: false
          },
          devices: devices.map(v => {
            if (v.id === unpaired.id) {
              return {
                ...v,
                ...unpaired,
                connected: false,
                paired: false
              };
            }

            return v;
          })
        }));
      } else {
        Toast.showShortBottom(`Device <${id}> unpairing failed`);
        this.setState({ processing: false });
      }
    } catch (e) {
      Toast.showShortBottom(e.message);
      this.setState({ processing: false });
    }
  };
  
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
