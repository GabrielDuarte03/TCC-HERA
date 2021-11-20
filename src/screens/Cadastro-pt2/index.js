import React, {useState, useRef, useEffect} from 'react';
import HeraLetra from '../../../assets/heraletra.svg';
import Telefone from '../../../assets/telefone.svg';
import DataNascimento from '../../../assets/dtNasc.svg';
import Proximo from '../../../assets/prox.svg';
import CPF from '../../../assets/cpf.svg';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  Pressable,
  Dimensions,
  BackHandler
} from 'react-native';
import Mask from '@buuhv/number-mask';
import {useNavigation} from '@react-navigation/native';
import Senha from '../../../assets/senha.svg';
import DatePicker from 'react-native-date-picker';
import {Modalize} from 'react-native-modalize';
import DataProx from '../../../assets/dataProx.svg';
import validator from 'validar-telefone';
import {celularMask} from 'masks-br';
import {set} from 'lodash';
import styles from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

export default function App({route}) {  
  const navigation = useNavigation();
  var nome = route.params?.nomepassado;
  var email = route.params?.emailpassado;
  var cpf = route.params?.cpfpassado;
  var tipousuaria = route.params?.tipousuariapassado;

  var tipologin = route.params?.tipologin;
  console.log(tipologin);
  var cpfUsuaria = route.params?.cpfUsuaria;
 

  useEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress', () => { navigation.navigate('Cadastro-pt1'); return true; });
    
  },[]);
  
  //Criação e Contas em relação a data
  var data = new Date();
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();
  var dataAtual = dia + '/' + mes + '/' + ano - 10;
  var dataAtual = ano - 10 + '/' + mes + '/' + dia;
  var dataMaxima = new Date(dataAtual);
  var dataAtual = ano - 90 + '/' + mes + '/' + dia;
  var dataMinima = new Date(dataAtual);

  const [dtNasc, setDtNasc] = useState(new Date());
  const [telefone, setTelefone] = useState('');
  const [dataFinal, setDataFinal] = useState(
    'Clique aqui para selecionar a data',
  );
  const modalizeRef = useRef(null);
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');


  //Formatando e Valindando se o Telefone está nos padrões!
  var telefonefinal = celularMask(telefone).replace('-', '');
  var resultadovalidaTelefone = validator(telefonefinal);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: "100%", display: "flex", justifyContent: "center", flexDirection: "row" }}>
        <FontAwesomeIcon icon={faCircle} style={{margin: 15, color: "#e0195c"}}/>
        <FontAwesomeIcon icon={faCircle} style={{margin: 15, color: "#e0195c"}}/>
        <FontAwesomeIcon icon={faCircle} style={{margin: 15, color: "gray"}}/>
      </View>
      <HeraLetra style={styles.hera} />

      <Text />

      <Text style={styles.title}>Cadastro</Text>
      <Text style={styles.subtitle}>Dados da conta</Text>

      <View style={styles.input}>
        <DataNascimento />
        <Text
          style={styles.dtF}
          onPress={() => {
            modalizeRef.current?.open();
          }}>
          {dataFinal.toString()}
        </Text>
      </View>

      <Modalize
        ref={modalizeRef}
        scrollViewProps={{
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
              date={dtNasc}
              onDateChange={setDtNasc}
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

      <View style={styles.input}>
        <Telefone />
        <TextInput
          placeholderTextColor="#C8CCCF"
          style={[styles.login, {color: '#000', fontStyle: 'italic'}]}
          keyboardType="numeric"
          textContentType="telephoneNumber"
          
          onChangeText={text => {
            setTelefone(Mask.format(text, '(##)#####-####'));
          }}
          value={telefone}
          maxLength={14}
          placeholder="Telefone"
        />
      </View>
      {(tipologin == "normal")? 
      <><View style={styles.input}>
          <Senha />
          <TextInput
            placeholderTextColor="#C8CCCF"
          
            style={styles.login}
            secureTextEntry={true}
            onChangeText={text => {
              setSenha(text);
            } }
            placeholder="Senha"
            value={senha} />
        </View>
        
        <View style={styles.input}>
            <Senha />
            <TextInput
              placeholderTextColor="#C8CCCF"
              style={styles.login}
              secureTextEntry={true}
              onChangeText={text => {
                setConfirmaSenha(text);
              } }
              placeholder="Confirme a senha"
              value={confirmaSenha} />
          </View></> : null}


       

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btnlogin}
        onPress={proximo}>
        <Proximo />
      </TouchableOpacity>
    </SafeAreaView>
  );

  function confirmar() {
    var dia =
      dtNasc.getDate() < 10
        ? '0' + dtNasc.getDate().toString()
        : dtNasc.getDate().toString();

    var mes =
      dtNasc.getMonth() + 1 < 10
        ? '0' + (dtNasc.getMonth() + 1).toString()
        : (dtNasc.getMonth() + 1).toString();
    var ano = dtNasc.getFullYear();

    modalizeRef.current?.close();
    setDataFinal('');
    setDataFinal(dia + '/' + mes + '/' + ano);
  }

  //Função que verifica dados e passa eles para a próxima tela
  function proximo() {
    //IF de Validação de Campos Vazios

    console.log("dt " + dtNasc);
    console.log("dt " + telefone);
    console.log("dt " + tipologin);
    if(tipologin == 'google'){
      setSenha('google');
      setConfirmaSenha('google')
  }
    if (
     (dtNasc != 0 &&
      telefone.length > 0 &&
      tipologin == "google") ||
      dtNasc != 0 &&
      telefone.length > 0 &&
      senha.length > 0 && confirmaSenha.length > 0)  
     {
      //IF de Validação de Telefone Celular
      if (resultadovalidaTelefone == true) {
        console.log(telefone)
        console.log(telefonefinal)
        //IF de Validação de Senhas Iguais
        if (senha === confirmaSenha) {
          navigation.navigate('Cadastro-pt3', {
            cpfpassado: cpf,
            nomepassado: nome,
            emailpassado: email,
            datapassada: dataFinal,
            telefonepassado: telefone,
            senhapassada: senha,
            tipousuariapassado: tipousuaria,
            cpfUsuaria: cpfUsuaria,
            tipologin: tipologin,
          });
        } else {
          alert('Senhas diferentes, digite novamente!');
        }
      } else {
        Alert.alert('Numero de Telefone Inválido', 'Digite um número válido!');
      }
    } else {
      Alert.alert('Preencha todos os campos', 'Preencha todos os campos');
    }
  }
}
