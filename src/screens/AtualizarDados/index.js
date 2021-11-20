import React, {useEffect, useState, useRef} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import DatePicker from 'react-native-date-picker';
import {Modalize} from 'react-native-modalize';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import firestore, {firebase} from '@react-native-firebase/firestore';
import DataProx from '../../../assets/dataProx.svg';

// import { Container } from './styles';

export default function AtualizarDadosOpções({ route }) {
  const navigation = useNavigation();

  const opção = route.params?.opçãoAtualizar;
  const [nome, setNome] = useState('');
  const [dtNascimento, setDtNascimento] = useState(new Date());
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataFinal, setDataFinal] = useState(
    'Clique aqui para selecionar a data',
  );
  const [tipousuaria, setTipousuaria] = useState('');
  const modalizeRef = useRef(null);
  var data = new Date();
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();
  var dataAtual = dia + '/' + mes + '/' + ano - 10;
  var dataAtual = ano - 10 + '/' + mes + '/' + dia;
  var dataMaxima = new Date(dataAtual);
  var dataAtual = ano - 90 + '/' + mes + '/' + dia;
  var dataMinima = new Date(dataAtual);


  useEffect(() => {
    (async () => {
      const user = firebase.auth().currentUser;
      const useremail = user.email;
    await firestore()
        .collection('Usuarias')
        .where('email', '==', useremail)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
          setNome(doc.data().nome);
          setDataFinal(doc.data().datanascimento);
          setCpf(doc.data().cpf);
          setEmail(doc.data().email);
          setTelefone(doc.data().telefone);
          setTipousuaria('usuária');
        });
        
      });

       await firestore()
        .collectionGroup('Anjo')
        .where('email', '==', user.email)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
          setNome(doc.data().nome);
          setDataFinal(doc.data().datanascimento);
          setCpf(doc.data().cpf);
          setEmail(doc.data().email);
          setTelefone(doc.data().telefone);
          setTipousuaria('anjo');
        });
        
      })
        
    

    })();

  },[]);

  async function atualizar() {

   if(tipousuaria == 'usuária'){
       await firestore()
        .collection('Usuarias')
        .doc(cpf)
        .update({
          nome: nome,
          datanascimento: dataFinal,
          cpf: cpf,
          email: email,
          telefone: telefone,
        }).then(() => {
          Alert.alert('Foi!' , 'Deu certo');
          navigation.navigate('Perfil');
        }).catch(() => {
          Alert.alert('Ops!' , 'Deu errado');
        });

    }else{
      await firestore().collectionGroup('Anjo').doc(email).update({
        nome: nome,
        datanascimento: dataFinal,
        cpf: cpf,
        email: email,
        telefone: telefone,
      });
    }      
    
   }

  
  function confirmar() {
    var dia =
      dtNascimento.getDate() < 10
        ? '0' + dtNascimento.getDate().toString()
        : dtNascimento.getDate().toString();

    var mes =
    dtNascimento.getMonth() + 1 < 10
        ? '0' + (dtNascimento.getMonth() + 1).toString()
        : (dtNascimento.getMonth() + 1).toString();
    var ano = dtNascimento.getFullYear();

    modalizeRef.current?.close();
    setDataFinal('');
    setDataFinal(dia + '/' + mes + '/' + ano);
  }

  if (opção == 1 && nome != '') {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Atualizar Dados</Text>
        <View style={styles.insideContainer}>
          <View style={styles.inputChange}>
            <Text style={styles.label}>Nome</Text>
            <TextInput style={styles.input} onChangeText={(text)=>{
              setNome(text)
            }} value={nome} placeholder="Nome" />
          </View>

          <View style={styles.inputChange}>
            <Text style={styles.label}>Data de nascimento</Text>
            <Text
          style={styles.input}
          onPress={() => {
            modalizeRef.current?.open();
          }}>
          {dataFinal.toString()}
        </Text>
            
          </View>

          <View style={styles.inputChange}>
            <Text style={styles.label}>CPF</Text>
            <TextInput style={styles.input} value={cpf} editable={false} placeholder="CPF" />
          </View>

          <View style={styles.inputChange}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} editable={false} placeholder="Email" />
          </View>

          <View style={styles.inputChange}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput style={styles.input} value={telefone} placeholder="Telefone" />
          </View>

          <TouchableOpacity style={styles.buttonUpdate} onPress={atualizar}>
            <Text style={styles.buttonUpdateText}>Atualizar</Text>
          </TouchableOpacity>

        </View>
        <Modalize
        ref={modalizeRef}
        crollViewProps={{
          showsVerticalScrollIndicator: false,
        }}
        snapPoint={310}
        withHandle={true}
        modalHeight={310}
        HeaderComponent={
          <View
            style={{
              zIndex: 2,
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
            }}>
            
            <DatePicker
              style={{
                marginTop: 15,
                marginLeft: 50,
                color: '#000'
              }}
              date={dtNascimento}
              onDateChange={setDtNascimento}
              minimumDate={dataMinima}
              maximumDate={dataMaxima}
              mode="date"
              locale="pt-BR"
              androidVariant="nativeAndroid"/>
              
            <TouchableOpacity
              activeOpacity={0.8}
              style={{marginLeft: '15%', marginTop: '10%'}}
              onPress={confirmar}>
              
              <DataProx />
            </TouchableOpacity>
          </View>
        }
      />

      </SafeAreaView>

      
    );
  } 
  else if (opção == 2) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Atualizar Dados</Text>
        <ScrollView style={styles.insideContainer}>

          <View style={styles.inputChange}>
            <Text style={styles.label}>Logradouro</Text>
            <TextInput style={styles.input} placeholder="Logradouro" />
          </View>

          <View style={styles.inputChange}>
            <Text style={styles.label}>Estado</Text>
            <TextInput style={styles.input} placeholder="Estado" />
          </View>

          <View style={styles.inputChange}>
            <Text style={styles.label}>Cidade</Text>
            <TextInput style={styles.input} placeholder="Cidade" />
          </View>

          <View style={styles.inputChange}>
            <Text style={styles.label}>CEP</Text>
            <TextInput style={styles.input} placeholder="CEP" />
          </View>

          <View style={styles.inputChange}>
            <Text style={styles.label}>Número</Text>
            <TextInput style={styles.input} placeholder="Número" />
          </View>

          <View style={styles.inputChange}>
            <Text style={styles.label}>Bairro</Text>
            <TextInput style={styles.input} placeholder="Bairro" />
          </View>

          <View style={styles.inputChange}>
            <Text style={styles.label}>Complemento</Text>
            <TextInput style={styles.input} placeholder="Complemento" />
          </View>

          <TouchableOpacity style={styles.buttonUpdate} onPress={atualizar}>
            <Text style={styles.buttonUpdateText}>Atualizar</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    );
  }

  else if (opção == 3) {
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Atualizar Dados</Text>
      <ScrollView style={styles.insideContainer}>

        <View style={styles.inputChange}>
          <Text style={styles.label}>Logradouro</Text>
          <TextInput style={styles.input} placeholder="Logradouro" />
        </View>

        <View style={styles.inputChange}>
          <Text style={styles.label}>Estado</Text>
          <TextInput style={styles.input} placeholder="Estado" />
        </View>

        <View style={styles.inputChange}>
          <Text style={styles.label}>Cidade</Text>
          <TextInput style={styles.input} placeholder="Cidade" />
        </View>

        <View style={styles.inputChange}>
          <Text style={styles.label}>CEP</Text>
          <TextInput style={styles.input} placeholder="CEP" />
        </View>

        <View style={styles.inputChange}>
          <Text style={styles.label}>Número</Text>
          <TextInput style={styles.input} placeholder="Número" />
        </View>

        <View style={styles.inputChange}>
          <Text style={styles.label}>Bairro</Text>
          <TextInput style={styles.input} placeholder="Bairro" />
        </View>

        <View style={styles.inputChange}>
          <Text style={styles.label}>Complemento</Text>
          <TextInput style={styles.input} placeholder="Complemento" />
        </View>

        <TouchableOpacity style={styles.buttonUpdate} onPress={atualizar}>
          <Text style={styles.buttonUpdateText}>Atualizar</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  }

  else if (opção == 4) {
    return (
      <SafeAreaView style={styles.container} />
    )
  }
  else {
    return (
    <View style={styles.container}>
    <Spinner
      visible={true}
      textStyle={styles.spinnerTextStyle}
      color={'#FFF'}
      animation={'slide'}
    />
  </View>
    );
  }


}
