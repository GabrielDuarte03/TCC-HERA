import React, { useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,

} from 'react-native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import Parse from 'parse/react-native.js';
import Local from '@react-native-community/geolocation';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';



var chamado = false;
var a = 0;

export default function App(props) {

    const navigation = useNavigation();

    async function obterLocal() {
        console.log('entrou');
        Local.getCurrentPosition(pos => {
            console.log('chegou aqui');
            SetLatitude(pos.coords.latitude);
            SetLongitude(pos.coords.longitude);
            EnviarLocal(pos.coords.latitude, pos.coords.longitude);
        }, erro => {
            console.log('chegou aqui');
            alert('Erro: ' + erro.message);
        }, {
            enableHighAccuracy: true,
            timeout: 5000
        });
    }

    async function EnviarLocal(lat, long) {
        console.log(lat + ' ' + long);
        const params1 = {
            lat: lat,
            long: long
        };
        let resultObject = await Parse
            .Cloud
            .run('enviarMsg', params1)
            .then(function (result) {
                console.log('Foi!');
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    function EsperarTempo(tempo) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, tempo);
        });
    }
    function cancelarChamado() {
        chamado = false;
        a = 0;
        console.log('chamado -------------------------------------' + chamado);
        modalizeRef.current?.close();
    }
    async function enviarTempoEmTempo() {
        
        chamado = true;
        mostrarModal();
        var hora = new Date().getHours();
        hora<10? hora = '0'+hora: hora;

        var minuto = new Date().getMinutes();
        minuto<10? minuto = '0'+minuto: minuto;

        while (chamado) {

            await obterLocal();
            if(a == 0){
                const user = auth().currentUser;
                const userJSON = user.toJSON();
                const emailzin = userJSON.email;
           
                console.log(hora + minuto)
                const descobrirCPF = await firestore().collection('Usuarias');
                const queryCPF = await descobrirCPF
                    .where('email', '==', emailzin)
                    .get();
                const cpf = queryCPF
                    .docs[0]
                    .data()
                    .cpf;

                   await firestore()
                    .collection('Usuarias')
                    .doc(cpf)
                    .collection('Chamados')
                    .doc()
                    .set({
                        lat: lat,
                        long: lon,
                        data: new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
                        hora: hora+ ':' +minuto,
                    })
                    .then(() => {
                    console.log('Chamado salvo');
                    })
                    .catch(() => {
                       console.log('Erro ao salvar chamado');
                    });
                    a++;
                }
            console.log('chamado -------------------------------------' + chamado)
            const result = await EsperarTempo(5000);

        }
    }

    return (

        <View style={styles.bottomNavigation}>
            <TouchableOpacity style={styles.butBottomNav} onPress={() => navigation.navigate('Home')}>
                <Image source={require('../../../assets/home.png')} style={styles.imgBottomNav} />
                {props.tela == 'home' ? <Text style={{ color: '#fff', fontWeight: '700' }}>Home</Text>
                    :
                    <Text style={styles.screenName}>Home</Text>
                }

            </TouchableOpacity>

            <TouchableOpacity style={styles.butBottomNav} onPress={() => navigation.navigate('ChatDashboard')}>
                <Image source={require('../../../assets/falar.png')} style={styles.imgBottomNav} />
                {props.tela == 'chat' ? <Text style={{ color: '#fff', fontWeight: '700' }}>Chat</Text>
                    :
                    <Text style={styles.screenName}>Chat</Text>
                }
            </TouchableOpacity>

            <TouchableOpacity style={styles.butBottomNav} onPress={() => navigation.navigate('Mapa')}>
                <Image source={require('../../../assets/marcar-no-mapa.png')} style={styles.imgBottomNav} />
                {props.tela == 'mapa' ? <Text style={{ color: '#fff', fontWeight: '700' }}>Mapa</Text>
                    :
                    <Text style={styles.screenName}>Mapa</Text>
                }

            </TouchableOpacity>

            <TouchableOpacity style={styles.butBottomNav} onPress={() => navigation.navigate('AdicionarAnjo')}>
                <Image source={require('../../../assets/anjo1.png')} style={styles.imgBottomNav} />
                {props.tela == 'anjo' ? <Text style={{ color: '#fff', fontWeight: '700' }}>Anjo</Text>
                    :
                    <Text style={styles.screenName}>Anjo</Text>
                }

            </TouchableOpacity>

        </View>
    );

}
