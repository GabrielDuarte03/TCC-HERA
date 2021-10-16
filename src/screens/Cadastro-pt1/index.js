import React, {useState, useEffect} from 'react';
import HeraLetra from '../../../assets/heraletra.svg';
import Email from '../../../assets/email.svg';
import Nome from '../../../assets/nome.svg';
import Proximo from '../../../assets/prox.svg';
import CPF from '../../../assets/cpf.svg';
import firestore from '@react-native-firebase/firestore';
import {cpfMask} from '../../components/CpfMask';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Alert,
    AccessibilityPropsIOS,
    BackHandler
} from 'react-native';
import Mask from '@buuhv/number-mask';
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import Dialog from "react-native-dialog";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faCircle} from '@fortawesome/free-solid-svg-icons'
import { color } from 'react-native-reanimated';

export default function App({route}) {
    const navigation = useNavigation();
    const [nome,
        setNome] = useState('');
    const [email,
        setEmail] = useState('');
    const [cpf,
        setCpf] = useState('');

    
    const [usuaria,
        setUsuaria] = useState(false);
    const [anjoGuarda,
        setAnjoGuarda] = useState(false);
    const [tipoUsuaria,
        setTipoUsuaria] = useState(0);
    const [cpfUsuaria,
        setCpfUsuaria] = useState('');
    const [nomeCpf,
        setNomeCpf] = useState('nulo');
    const [visible,
        setVisible] = useState(false);
    const [visible2,
        setVisible2] = useState(false);
    var typelogin = route.params
        ?.typeLogin;

    var tipoUsuariaD = 'null';

    useEffect(async() => {

        BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.navigate('Login');
            return true;
        });
        
        await setEmail(route.params
            ?.email);
        await setNome(route.params
            ?.name);

    }, []);

    const handleCancel = () => {
        setVisible(false);
        setVisible2(false);
    };

    function confirmar() {

        proximo();

        setVisible(false);
        setVisible2(false);
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
                    color: "gray"
                }}/>
                <FontAwesomeIcon
                    icon={faCircle}
                    style={{
                    margin: 15,
                    color: "gray"
                }}/>
            </View>

            <HeraLetra style={styles.hera}/>

            <Text style={styles.title}>Cadastro</Text>
            <Text style={styles.subtitle}>Dados da conta</Text>

            <View style={styles.input}>
                <Nome/>
                <TextInput
                    style={styles.login}
                    placeholderTextColor="#C8CCCF"
                    value={route.params
                    ?.name}
                    onChangeText={text => {
                    setNome(text);
                }}
                    placeholder="Nome"/>
            </View>

            <View style={styles.input}>
                <CPF/>
                <TextInput
                    style={styles.login}
                    keyboardType="numeric"
                    placeholderTextColor="#C8CCCF"
                    maxLength={14}
                    onChangeText={text => {
                    setCpf(cpfMask(text));
                }}
                    value={cpf}
                    placeholder="CPF"/>
            </View>

            <View style={styles.input}>
                <Email/>
                <TextInput
                    value={route.params
                    ?.email}
                    style={styles.login}
                    placeholderTextColor="#C8CCCF"
                    onChangeText={text => {
                    setEmail(text);
                }}
                    autoCapitalize="none"
                    placeholder="Email"/>
            </View>
            <Text style={styles.subtitle}>Selecione o tipo de perfil:</Text>
            <View style={styles.check1}>
                <View
                    style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>

                    <CheckBox
                        value={usuaria}
                        onValueChange={(text) => {
                        setUsuaria(text)
                    }}
                        style={styles.checkbox}
                        tintColors={{
                        true: '#e0195c'
                    }}/>
                    <Text style={styles.labelCheck}>Usuária</Text>
                </View>
                <View
                    style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <CheckBox
                        value={anjoGuarda}
                        onValueChange={(text) => {
                        setAnjoGuarda(text)
                    }}
                        style={styles.checkbox}
                        tintColors={{
                        true: '#e0195c'
                    }}/>
                    <Text style={styles.labelCheck}>Anjo da Guarda</Text>
                </View>

            </View>

            {(usuaria && !anjoGuarda)
                ? <TouchableOpacity activeOpacity={0.8} style={styles.btnlogin} onPress={proximo}>
                        <Proximo/>
                    </TouchableOpacity>
                : <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btnlogin}
                    onPress={proximo}>
                    <Proximo/>
                </TouchableOpacity>
}

        </SafeAreaView>
    );
    var cpfNome = '';
    var nomeUser = '';
    //Função que verifica dados e passa eles para a próxima tela
    async function proximo() {

        if (nome == '' || cpf.length == '' || email.length == '' || (!anjoGuarda && !usuaria)) {
            Alert.alert('Erro', 'Preencha todos os campos.');
        } else {
            const validacpf = require('cpf-valid');
            var cpfstring = cpf.toString();
            var cpfsempontos = cpfstring
                .split('.')
                .join('')
                .replace('-', '')
                .replace(' ', '');
            const cpfFinal = parseFloat(cpfsempontos);

            //IF de Validação de CPF
            if (validacpf(cpfFinal)) {

                console.log(typelogin)
                if (nome.length > 2 && email.length > 8) {
                    if (email.includes('@') && email.includes('.com') && email.includes('.')) {
                        
                        if (anjoGuarda && usuaria) {
                            tipoUsuariaD = 'HÍBRIDA';
                            firestore().collectionGroup('Anjo').get().then(function(querySnapshot) {
                                querySnapshot.forEach(function(doc) {
                    
                                    if(doc.data().email == email){
                                    cpfNome = doc.ref.path.split('/')[1];
                                    setCpfUsuaria(cpfNome)
                                    console.log(cpfNome)
                                   
                                    }
                                });
                            }).then(() => {
                                firestore().collection('Usuarias').doc(cpfNome).get().then(function(doc) {
                                    if (doc.exists) {
                                        console.log("Document data:", doc.data());
                                        nomeUser = doc.data().nome;
                                        Alert.alert('Aviso', 'Você está sendo cadastrado como Anjo da Guarda de: ' + nomeUser,
                                            
                                            [{
                                                text: 'OK',
                                                onPress: () => {
                                                    navigation.navigate('Cadastro-pt2', {
                                                        cpfpassado: cpf,
                                                        nomepassado: nome,
                                                        emailpassado: email,
                                                        tipousuariapassado: tipoUsuariaD,
                                                        tipologin: typelogin,
                                                        cpfUsuaria: cpfNome
                                                    });
                                                }}],);
                                        console.log(doc.data().nome)
                                       
                                       
                                    } else {
                                        Alert.alert('Aviso', 'Você não foi pré cadastrado por nenhum usuário, peça à usuária que te cadastre previamente!')
                                        
                                    }
                                    
                                });
                                   
                            });

                    
                        } else if (anjoGuarda) {

                            tipoUsuariaD = 'ANJO';
                            firestore().collectionGroup('Anjo').get().then(function(querySnapshot) {
                                querySnapshot.forEach(function(doc) {
                    
                                    if(doc.data().email == email){
                                    cpfNome = doc.ref.path.split('/')[1];
                                    setCpfUsuaria(cpfNome)
                                    console.log(cpfNome)
                                   
                                    }
                                });
                            }).then(() => {
                                firestore().collection('Usuarias').doc(cpfNome).get().then(function(doc) {
                                    if (doc.exists) {
                                        console.log("Document data:", doc.data());
                                        nomeUser = doc.data().nome;
                                        Alert.alert('Aviso', 'Você está sendo cadastrado como Anjo da Guarda de: ' + nomeUser,
                                            
                                            [{
                                                text: 'OK',
                                                onPress: () => {
                                                    navigation.navigate('Cadastro-pt2', {
                                                        cpfpassado: cpf,
                                                        nomepassado: nome,
                                                        emailpassado: email,
                                                        tipousuariapassado: tipoUsuariaD,
                                                        tipologin: typelogin,
                                                        cpfUsuaria: cpfNome
                                                    });
                                                }}],);
                                        console.log(doc.data().nome)
                                       
                                       
                                    } else {
                                        Alert.alert('Aviso', 'Você não foi pré cadastrado por nenhum usuário, peça à usuária que te cadastre previamente!')
                                       
                                    }
                                });
                            });
                    
                           
                        } else if(usuaria){
                            tipoUsuariaD = 'USUÁRIA';
                            
                            navigation.navigate('Cadastro-pt2', {
                                cpfpassado: cpf,
                                nomepassado: nome,
                                emailpassado: email,
                                tipousuariapassado: tipoUsuariaD,
                                tipologin: typelogin,
                              
                            });
                        
                        }
                        
                        else {
                            Alert.alert('Erro', 'Selecione o tipo de perfil');
                        }
                    } else {
                        Alert.alert('Erro', 'Email inválido');
                    }
                } else {
                    Alert.alert('Erro', 'Preencha todos os campos corretamente.');
                }

            }
        }
    }
}
