import React, {useState, useEffect} from 'react';
import HeraLetra from '../../../assets/heraletra.svg';
import CEP from '../../../assets/cep.svg';
import Pesquisar from '../../../assets/pesquisar.svg';
import Logradouro from '../../../assets/logradouro.svg';
import Numero from '../../../assets/nmr.svg';
import Bairro from '../../../assets/bairro.svg';
import Cidade from '../../../assets/cidade.svg';
import Estado from '../../../assets/estado.svg';
import Complemento from '../../../assets/complemento.svg';
import Linha from '../../../assets/linha.svg';
import Finalizar from '../../../assets/finalizar.svg';
import styles from './styles';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Alert,
    BackHandler
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import Mask from '@buuhv/number-mask';
import {useNavigation} from '@react-navigation/native';
import cepP from 'cep-promise';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faCircle} from '@fortawesome/free-solid-svg-icons'

export default function App({route}) {
    //Recebendo valores de outras telas
    var nome = route.params
        ?.nomepassado;
    var email = route.params
        ?.emailpassado;
    var cpf = route.params
        ?.cpfpassado;
    var datanascimento = route.params
        ?.datapassada;
    var telefone = route.params
        ?.telefonepassado;
    var senha = route.params
        ?.senhapassada;
    var tipousuaria = route.params
        ?.tipousuariapassado;
    var cpfUsuaria = route.params
        ?.cpfUsuaria;
    var tipologin = route.params
        ?.tipologin;

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.navigate('Cadastro-pt2');
            return true;
        });

    }, []);

    const [assinante, setAssinante] = useState(false);
    const [cep,
        setCep] = useState('');
    const [logradouro,
        setLogradouro] = useState('');
    const [numero,
        setNumero] = useState('');
    const [bairro,
        setBairro] = useState('');
    const [complemento,
        setComplemento] = useState('');
    const [cidade,
        setCidade] = useState('');
    const [estado,
        setEstado] = useState('');

    function pesquisar() {

        cepP(cep).then(response => {

            setLogradouro(response.street);
            setBairro(response.neighborhood);
            setCidade(response.city);
            setEstado(response.state);
        }).catch(error => {
            console.log(error.message);
            Alert.alert('CEP Inválido', 'Digite um CEP válido!');
            setLogradouro('');
            setBairro('');
            setCidade('');
            setEstado('');
            setCep('');
        });
    }

    const navigation = useNavigation();

    //função que cadastra os dados e passa para o banco
    function finalizar() {

        if (logradouro.length > 0 && numero.length > 0 && bairro.length > 0 && cidade.length > 0 && estado.length > 0) {

            if (tipousuaria == 'HÍBRIDA') {

                firestore()
                    .collection('Usuarias')
                    .doc(cpf)
                    .set({
                        nome: nome,
                        email: email,
                        cpf: cpf,
                        datanascimento: datanascimento,
                        telefone: telefone,
                        cep: cep,
                        logradouro: logradouro,
                        numero: numero,
                        bairro: bairro,
                        complemento: complemento,
                        cidade: cidade,
                        estado: estado,
                        tipousuaria: tipousuaria,
                        assinante: assinante,
                    })
                    .then(() => {

                        firestore()
                        .collection('Usuarias')
                        .doc(cpfUsuaria)
                        .collection('Anjo')
                        .doc(email)
                        .set({
                            nome: nome,
                            email: email,
                            cpf: cpf,
                            datanascimento: datanascimento,
                            telefone: telefone,
                            cep: cep,
                            logradouro: logradouro,
                            numero: numero,
                            bairro: bairro,
                            complemento: complemento,
                            cidade: cidade,
                            estado: estado,
                            tipousuaria: tipousuaria
                        })
                        .then(() => {
                            alert('Êxito!', 'Dados cadastrados com sucesso', [
                                {
                                    text: 'OK',
                                    onPress: () => navigation.navigate('Login')
                                }
                            ]);
                            navigation.navigate('Login')
                        
                            })
                    });

            } else if (tipousuaria == 'USUÁRIA') {

             
                    firestore()
                        .collection('Usuarias')
                        .doc(cpf)
                        .set({
                            nome: nome,   
                            email: email,
                            cpf: cpf,
                            datanascimento: datanascimento,
                            telefone: telefone,
                            cep: cep,
                            logradouro: logradouro,
                            numero: numero,
                            bairro: bairro,
                            complemento: complemento,
                            cidade: cidade,
                            estado: estado,
                            tipousuaria: tipousuaria,
                            assinante: assinante
                        })
                        .then(() => {
                            alert('Êxito!', 'Dados cadastrados com sucesso', [
                                {
                                    text: 'OK',
                                    onPress: () => navigation.navigate('Login')
                                }
                            ]);
                            navigation.navigate('Login')
                        });
                

            } else {
                firestore()
                    .collection('Usuarias')
                    .doc(cpfUsuaria)
                    .collection('Anjo')
                    .doc(email)
                    .set({
                        nome: nome,
                        email: email,
                        cpf: cpf,
                        datanascimento: datanascimento,
                        telefone: telefone,
                        cep: cep,
                        logradouro: logradouro,
                        numero: numero,
                        bairro: bairro,
                        complemento: complemento,
                        cidade: cidade,
                        estado: estado,
                        tipousuaria: tipousuaria
                    })
                    .then(() => {
                        alert('Êxito!', 'Dados cadastrados com sucesso', [
                            {
                                text: 'OK',
                                onPress: () => navigation.navigate('Login')
                            }
                        ]);
                        navigation.navigate('Login')
                    })

               
            }
            if (tipologin != 'google') {
            firebase
            .auth()
            .createUserWithEmailAndPassword(email, senha)
            .then(() => {
                alert('Usuario Criado Com Sucesso');

                //Navegando pra Home
                navigation.navigate('Home');
            })
            .catch(error => {
                console.log(error.message);
            });
          }
        } else {
            Alert.alert('Campo inválido', 'Preencha todos os campos, por gentileza.');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row"
            }}>
                <FontAwesomeIcon
                    icon={faCircle}
                    style={{
                    margin: 15,
                    color: "#e0195c"
                }}/>
                <FontAwesomeIcon
                    icon={faCircle}
                    style={{
                    margin: 15,
                    color: "#e0195c"
                }}/>
                <FontAwesomeIcon
                    icon={faCircle}
                    style={{
                    margin: 15,
                    color: "#e0195c"
                }}/>
            </View>
            <HeraLetra style={styles.hera}/>

            <Text style={styles.title}>Cadastro</Text>
            <Text style={styles.subtitle}>Endereço</Text>

            <View style={styles.cep}>
                <CEP style={styles.cepCampo}/>
                <TextInput
                    placeholder="CEP"
                    maxLength={9}
                    placeholderTextColor="#C8CCCF"
                    keyboardType="numeric"
                    onChangeText={text => {
                    setCep(Mask.format(text, '00000-000'));
                }}
                    value={cep}
                    style={styles.inputCep}/>

                <TouchableOpacity activeOpacity={0.8} onPress={pesquisar}>
                    <Pesquisar/>
                </TouchableOpacity>
            </View>
            <Linha/>

            <View style={styles.logradouro}>
                <Logradouro/>
                <TextInput
                    placeholderTextColor="#C8CCCF"
                    placeholder="Logradouro"
                    onChangeText={text => {
                    setLogradouro(text);
                }}
                    value={logradouro}
                    style={styles.logInput}/>
            </View>

            <View style={styles.nmrBairro}>
                <Numero style={styles.nmrCampo}/>
                <TextInput
                    placeholderTextColor="#C8CCCF"
                    placeholder="Número"
                    keyboardType="numeric"
                    onChangeText={text => {
                    setNumero(text);
                }}
                    value={numero}
                    style={styles.nmrInput}/>
                <Bairro/>
                <TextInput
                    placeholder="Bairro"
                    placeholderTextColor="#C8CCCF"
                    onChangeText={text => {
                    setBairro(text);
                }}
                    value={bairro}
                    style={styles.bairroInput}/>
            </View>

            <View style={styles.complemento}>
                <Complemento/>
                <TextInput
                    placeholderTextColor="#C8CCCF"
                    placeholder="Complemento (opcional)"
                    onChangeText={text => {
                    setComplemento(text);
                }}
                    style={styles.logInput}/>
            </View>

            <View style={styles.nmrBairro}>
                <Cidade style={styles.cidCampo}/>
                <TextInput
                    placeholder="Cidade"
                    placeholderTextColor="#C8CCCF"
                    onChangeText={text => {
                    setCidade(text);
                }}
                    value={cidade}
                    style={styles.cidInput}/>
                <Estado/>
                <TextInput
                    placeholderTextColor="#C8CCCF"
                    placeholder="Estado"
                    onChangeText={text => {
                    setEstado(text);
                }}
                    value={estado}
                    style={styles.estInput}/>
            </View>
            {tipousuaria != 'ANJO'?
            <>
            <Linha/>
            <View
                    style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <CheckBox
                        value={assinante}
                        onValueChange={(text) => {
                        setAssinante(text)
                    }}
                        style={styles.checkbox}
                        tintColors={{
                        true: '#e0195c'
                    }}/>
                    <Text style={styles.labelCheck}>Assinante?</Text>
                </View>
                </>
                :
                null}
            

            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.finalizar}
                onPress={finalizar}>
                <Finalizar/>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
