import React, { useEffect, useState, useRef } from 'react';
import styles from "./styles";
import { SafeAreaView, Text, TouchableOpacity, FlatList, BackHandler, Alert, View, ActivityIndicator } from 'react-native';
import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore, { firebase } from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import HeraLetra from '../../../assets/heraletra.svg';

import TabNavigator from '../../components/TabNavigator';
export default function App({ route }) {

    const navigation = useNavigation();
    const [tipoUsuaria, setTipoUsuaria] = useState('');
    const [cpf, setCpf] = useState('');


    const [anjos, setAnjos] = useState([]);

    useEffect(async () => {

        BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.navigate('Home');
            return true;
        });

        firestore().collection("Usuarias").doc(cpf).
            collection('Anjo').get().then((doc) => {

                console.log(anjos);
            }
            )



        const user = auth().currentUser;
        const userJSON = user.toJSON();



        (await firestore().collection('Usuarias').get()).forEach(doc => {
            if (doc.data().email == userJSON.email) {
                setTipoUsuaria(doc.data().tipousuaria);
                setCpf(doc.data().cpf);
            }

        });

        return () => subscriber();
    }, []);


    const [emailAnjo,
        setemailAnjo] = useState('');
    const [nomeAnjo,
        setNomeAnjo] = useState('');
    const [email,
        setEmail] = useState('');
    const [cpfUsuaria,
        setCpfUsuaria] = useState('');

    const [refreshPage, setRefreshPage] = useState("");

    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize('Wcq3vd9GbWK5zSizipXUwUvF3hsZIT7NQvX0x9Gz', '1nWgFG26b8YiAzAQEkxnRcRBqApfN4W8cWTieK2h',);
    Parse.serverURL = 'https://parseapi.back4app.com/';
    var anj;


    async function trocarTipoUsuaria(nmr) {
        //identificar a usuaria primeiro
        const user = auth().currentUser;
        const userJSON = user.toJSON();
        var cpf;
        var anjo;

        (await firestore().collection('Usuarias').get()).forEach(doc => {
            if (doc.data().email == userJSON.email) {
                cpf = doc.data().cpf;
            }
        });

        if (nmr == 0) {

            firestore()
                .collection('Usuarias')
                .doc(cpf)
                .update({
                    tipousuaria: 'HÍBRIDA'
                })
                .then(() => {
                    Alert.alert('Sucesso!', 'Você agora é uma usuária híbrida!', [{ text: 'OK', onPress: () => setTipoUsuaria('HÍBRIDA') }]);
                })

        } else {
            //pegar dados do usuario
            (await firestore().collectionGroup('Anjo').get()).forEach(doc => {
                if (doc.data().email == userJSON.email) {
                    anjo = doc.data();

                }
            });

            //identificar a usuaria primeiro    
            firestore()
                .collection('Usuarias')
                .doc(anjo.cpf)
                .set({
                    nome: anjo.nome,
                    email: anjo.email,
                    cpf: anjo.cpf,
                    datanascimento: anjo.datanascimento,
                    telefone: anjo.telefone,
                    cep: anjo.cep,
                    logradouro: anjo.logradouro,
                    numero: anjo.numero,
                    bairro: anjo.bairro,
                    complemento: anjo.complemento,
                    cidade: anjo.cidade,
                    estado: anjo.estado,
                    tipousuaria: 'HÍBRIDA'

                }).then(() => {
                    Alert.alert('Sucesso!', 'Você agora é uma usuária híbrida!')
                }).catch(() => {
                    Alert.alert('Erro ao alterar tipo de usuária!')
                })

        }
    }

    async function salvarAnjo() {

        //identificar a usuaria primeiro
        const user = auth().currentUser;
        const userJSON = user.toJSON();
        const email = userJSON.email;

        //verificar se o anjo já existe
        firestore()
            .collectionGroup('Anjo')
            .get()
            .then(function (querySnapshot) {
                querySnapshot
                    .forEach(function (doc) {

                        if (doc.data().email == emailAnjo) {
                            anj = doc.data();

                        } else {
                            console.log("Anjo não cadastrado");
                        }
                    });
            })
            .then(() => { })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

        const descobrirCPF = await firestore().collection('Usuarias');
        const queryCPF = await descobrirCPF
            .where('email', '==', email)
            .get();
        const cpf = queryCPF
            .docs[0]
            .data()
            .cpf;

        if (anj == undefined) {

            firestore()
                .collection('Usuarias')
                .doc(cpf)
                .collection('Anjo')
                .doc(emailAnjo)
                .set({
                    nome: nomeAnjo,
                    email: emailAnjo,
                })
                .then(() => {
                    alert('Êxito!', 'Dados cadastrados com sucesso', [
                        {
                            text: 'OK'
                        }
                    ]);
                })
                .catch(() => {
                    alert('Erro!', 'Erro ao cadastrar os dados', [
                        {
                            text: 'OK'
                        }
                    ]);
                });
        } else {
            console.log("Anjo já cadastrado");
            console.log(anj)
            firestore()
                .collection('Usuarias')
                .doc(cpf)
                .collection('Anjo')
                .doc(emailAnjo)
                .set({
                    nome: nomeAnjo,
                    email: emailAnjo,
                    bairro: anj.bairro,
                    cep: anj.cep,
                    cidade: anj.cidade,
                    complemento: anj.complemento,
                    cpf: anj.cpf,
                    datanascimento: anj.datanascimento,
                    estado: anj.estado,
                    logradouro: anj.logradouro,
                    numero: anj.numero,
                    telefone: anj.telefone,
                    tipousuaria: anj.tipousuaria,
                })
                .then(() => {
                    alert('Êxito!', 'O Anjo foi adicionado com sucesso!', [
                        {
                            text: 'OK'
                        }
                    ]);
                })
                .catch(() => {
                    alert('Erro!', 'Erro ao cadastrar os dados', [
                        {
                            text: 'OK'
                        }
                    ]);
                });
        }
        setemailAnjo('');
        setNomeAnjo('');

    }
    var cpfNome = '';
    var nomee = '';

    return (
        <SafeAreaView style={styles.container}>
            <HeraLetra style={styles.hera} />
            <View style={styles.part1}>
                <Text style={styles.textDescription}>Preencha os campos para adicionar um anjo!</Text>
                <TextInput
                    onChangeText={(text) => {
                        setNomeAnjo(text)

                    }}
                    style={styles.textInput}
                    value={nomeAnjo}
                    placeholder="Nome" />

                <TextInput
                    onChangeText={(text) => {
                        setemailAnjo(text)
                    }}
                    style={styles.textInput}
                    value={emailAnjo}
                    placeholder="Email" />

                <TouchableOpacity onPress={salvarAnjo} style={styles.buttonSalvar}>
                    <Text style={styles.buttonSalvarText}>Salvar</Text>
                </TouchableOpacity>


                {
                    tipoUsuaria == 'USUÁRIA' ?
                        <SafeAreaView>
                            <Text>Você é apenas Usuária, gostaria de trocar para ser Usuária e Anjo da Guarda?</Text>
                            <Text>Assim você também consegue ajudar suas amigas em situações de risco!</Text>
                            <TouchableOpacity onPress={() => trocarTipoUsuaria(0)} style={{ backgroundColor: "#e0195c", margin: 15, alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>Sim, quero ser Usuária e Anjo da Guarda</Text>
                            </TouchableOpacity>
                        </SafeAreaView>

                        : tipoUsuaria == 'ANJO' ?
                            <SafeAreaView>
                                <Text>Você é apenas Anjo da Guarda, gostaria de trocar para ser Usuária e Anjo da Guarda?</Text>
                                <Text>Assim você consegue continuar ajudando as suas amigas em situações de risco e também pode ser ajudada!</Text>
                                <TouchableOpacity onPress={() => trocarTipoUsuaria(1)}>
                                    <Text>Sim, quero ser Usuária e Anjo da Guarda</Text>
                                </TouchableOpacity>
                            </SafeAreaView>

                            : null
                }
            </View>
            <View style={styles.part2}>
                <Text style={styles.textDescription}>Anjos já cadastrados</Text>

                <FlatList
                    data={anjo}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                />






            </View>
            <TabNavigator tela="anjo" />
        </SafeAreaView>
    );

}