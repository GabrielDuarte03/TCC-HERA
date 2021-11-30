import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import styles from './styles';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  BackHandler,
  Image,
  Alert,
  View,
  ActivityIndicator,
} from 'react-native';
import AlertPro from 'react-native-alert-pro';
import AwesomeAlert from 'react-native-awesome-alerts';
import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {Modalize} from 'react-native-modalize';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {TextInput, TouchableHighlight} from 'react-native-gesture-handler';
import HeraLetra from '../../../assets/heraletra.svg';
import Spinner from 'react-native-loading-spinner-overlay';
import Line from '../../../assets/line.svg';
import RNSmtpMailer from 'react-native-smtp-mailer';
import TabNavigator from '../../components/TabNavigator';
export default function App({route}) {
  const navigation = useNavigation();
  const [tipoUsuaria, setTipoUsuaria] = useState('');
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [anjos, setAnjos] = useState([]);
  const [valores, setValores] = useState([]);
  const [visible, setVisible] = useState(false);

  return(

    <View style={styles.container}>
        <View style={styles.cabecalho}>
            <HeraLetra/>
            <Text style={styles.titulo}>Qual plano você deseja?</Text>
        </View>
        <View style={styles.body}>


            <TouchableOpacity activeOpacity={0.7} onPress={()=>{console.log('alo')}} style={styles.naosei}>
                <View style={styles.card}>
                    <View style={styles.imgCard}>
                        <Image style={{
                            width: 50,
                            height:50,
                            resizeMode: 'center',
                            tintColor: '#fff',
                            alignSelf: 'flex-start'
            }} source={require('../../../assets/heraletra.png')}/>
                    </View>
                    <View style={styles.texts}>
                        <Text style={styles.titleCard}>Light</Text>
                        <Text style={styles.descCard}>Pulseira HERA, cadastro ilimitado de anjos, acesso às notícias e localização em tempo real</Text>
                    </View>
                </View>
            </TouchableOpacity>


            <TouchableOpacity activeOpacity={0.7} onPress={()=>{console.log('alo')}} style={styles.naosei}>
                <View style={styles.card}>
                    <View style={styles.imgCard}>
                        <Image style={{
                            width: 50,
                            height:50,
                            resizeMode: 'center',
                            tintColor: '#fff',
                            alignSelf: 'flex-start'
            }} source={require('../../../assets/heraletra.png')}/>
                    </View>
                    <View style={styles.texts}>
                        <Text style={styles.titleCard}>Pro</Text>
                        <Text style={styles.descCard}>Pulseira HERA, cadastro ilimitado de anjos, acesso às notícias e localização em tempo real</Text>
                    </View>
                </View>
            </TouchableOpacity>

            
            <TouchableOpacity activeOpacity={0.7}    onPress={()=>{console.log('alo')}} style={styles.naosei}>
                <View style={styles.card}>
                    <View style={styles.imgCard}>
                        <Image style={{
                            width: 50,
                            height:50,
                            resizeMode: 'center',
                            tintColor: '#fff',
                            alignSelf: 'flex-start'
            }} source={require('../../../assets/heraletra.png')}/>
                    </View>
                    <View style={styles.texts}>
                        <Text style={styles.titleCard}>Light</Text>
                        <Text style={styles.descCard}>Pulseira HERA, cadastro ilimitado de anjos, acesso às notícias e localização em tempo real</Text>
                    </View>
                </View>
            </TouchableOpacity>
           

        </View>
    </View>

  );

}