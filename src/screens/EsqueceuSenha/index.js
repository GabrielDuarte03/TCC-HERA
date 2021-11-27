import React, {useState, useEffect} from 'react';
import HeraLetra from '../../../assets/heraletra.svg';
import Email from '../../../assets/email.svg';
import Nome from '../../../assets/nome.svg';
import Proximo from '../../../assets/prox.svg';
import Finalizar from '../../../assets/finalizar.svg';
import CPF from '../../../assets/cpf.svg';
import styles from './styles';
import AwesomeAlert from 'react-native-awesome-alerts';
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
           showAlert(3)

        } else {
            firebase
                .auth()
                .sendPasswordResetEmail(email)
                .then(function () {
                    showAlert(1)

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
    const [alertErro, setAlertErro] = useState(false);
    const [alertSucesso, setAlertSucesso] = useState(false);
    const showAlert = x => {
        if (x == 1) setAlertSucesso(true);
        if (x == 2) setLoading(true);
        if (x == 3) setAlertErro(true);
      };
      const hideAlert = x => {
        if (x == 1) setAlertSucesso(false);
        if (x == 2) setLoading(false);
        if (x == 3) setAlertErro(false);
      };
    return (

        <SafeAreaView style={styles.container}>
        
        <AwesomeAlert
            show={alertSucesso}
            title="Sucesso"
            message='Um email foi enviado para o email cadastrado. Verifique sua caixa de entrada.'
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Obrigado!"
            confirmButtonColor="#e0195c"
            cancelButtonColor="#e0195c"
            contentContainerStyle={{
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 10,
              borderColor: '#e0195c',
              borderWidth: 1.5,
            }}
            contentStyle={{
              padding: 15,
            }}
            titleStyle={{
              fontSize: 20,
              fontFamily: 'Montserrat-Bold',
              color: '#000',
            }}
            messageStyle={{
              fontSize: 15,
              fontFamily: 'Montserrat-Regular',
              color: '#282828',
            }}
            confirmButtonStyle={{
              borderRadius: 20,
              padding: 5,
              width: 100,
            }}
            cancelButtonStyle={{
              borderRadius: 20,
              padding: 5,
            }}
            confirmButtonTextStyle={{
              fontSize: 15,
              textAlign: 'center',
              fontFamily: 'Montserrat-Regular',
            }}
            cancelButtonTextStyle={{
              fontSize: 15,
              textAlign: 'center',
              fontFamily: 'Montserrat-Regular',
            }}
            onCancelPressed={() => hideAlert(1)}
            onConfirmPressed={() => {
                hideAlert(1)
                navigation.navigate('Login')
            }}
          />


        <AwesomeAlert
            show={alertErro}
            title='Erro'
            message='O Email digitado não está cadastrado em nosso sistema.'
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Ok"
            confirmButtonColor="#e0195c"
            cancelButtonColor="#e0195c"
            contentContainerStyle={{
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 10,
              borderColor: '#e0195c',
              borderWidth: 1.5,
            }}
            contentStyle={{
              padding: 15,
            }}
            titleStyle={{
              fontSize: 20,
              fontFamily: 'Montserrat-Bold',
              color: '#000',
            }}
            messageStyle={{
              fontSize: 15,
              fontFamily: 'Montserrat-Regular',
              color: '#282828',
            }}
            confirmButtonStyle={{
              borderRadius: 20,
              padding: 5,
              width: 100,
            }}
            cancelButtonStyle={{
              borderRadius: 20,
              padding: 5,
            }}
            confirmButtonTextStyle={{
              fontSize: 15,
              textAlign: 'center',
              fontFamily: 'Montserrat-Regular',
            }}
            cancelButtonTextStyle={{
              fontSize: 15,
              textAlign: 'center',
              fontFamily: 'Montserrat-Regular',
            }}
            onCancelPressed={() => hideAlert(3)}
            onConfirmPressed={() => hideAlert(3)}
          />



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
