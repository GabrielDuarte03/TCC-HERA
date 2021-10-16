import React, {useState, useEffect} from 'react';
import HeraLetra from '../../../assets/heraletra.svg';
import Email from '../../../assets/email.svg';
import Nome from '../../../assets/nome.svg';
import Proximo from '../../../assets/prox.svg';
import Finalizar from '../../../assets/finalizar.svg';
import CPF from '../../../assets/cpf.svg';
import styles from './styles';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Alert,
    BackHandler,
} from 'react-native';
import Mask from '@buuhv/number-mask';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';
import Firebase from '@react-native-firebase/app';

export default function App({navigation}) {

    //Função que verifica dados e passa eles para a próxima tela

    const [email,
        setEmail] = useState('');

        useEffect(()=>{
            BackHandler.addEventListener('hardwareBackPress', () => { navigation.navigate('Login'); return true; });
            
          },[]);
          

    async function validaEmail() {

        // Create a reference to the cities collection
        const emails = firestore().collection('Usuarias');

        // Create a query against the collection
        const queryRef = await emails
            .where('email', '==', email)
            .get();
        if (queryRef.empty) {
            //console.log('Email não cadastrado');
            Alert.alert('Email não cadastrado', 'Esse email não existe. Certifique-se que escreveu corretamente.', [
                {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed')
                }
            ], {cancelable: false});

        } else {
            firebase
                .auth()
                .sendPasswordResetEmail(email)
                .then(function () {
                    Alert.alert('Email enviado com sucesso', 'Um email foi enviado para o email cadastrado. Verifique sua caixa de entrada.', [
                        {
                            text: 'Obrigado!',
                            onPress: () => navigation.navigate('Login')
                        }
                    ], {cancelable: false});

                })
                .catch(function (error) {
                    console.log('Erro ao enviar email' + error.toString());
                    Alert.alert('Erro ao enviar email.', error.toString(), [
                        {
                            text: 'OK',
                            onPress: () => console.log('OK Pressed')
                        }
                    ], {cancelable: false});

                });

        }
    }

    return (

        <SafeAreaView style={styles.container}>
            <HeraLetra style={styles.hera}/>

            <Text style={styles.title}>Esqueci a senha</Text>
            <Text style={styles.subtitle}>Insira o seu email abaixo e enviaremos um email para redefinição da sua senha.</Text>

            <View style={styles.input}>
                <Email/>
                <TextInput
                    style={styles.login}
                    onChangeText={(text) => {
                    setEmail(text)
                }}
                    placeholder="Email"></TextInput>
            </View>

            <TouchableOpacity
                activeOpacity={.8}
                style={styles.btnlogin}
                placeholderTextColor="#C8CCCF"
                onPress={validaEmail}>
                <Finalizar/>
            </TouchableOpacity>

        </SafeAreaView>

    )

}
