import React, {useState, useEffect} from 'react';
import HeraLetra from '../../../assets/heraletra.svg';
import Email from '../../../assets/email.svg';
import Nome from '../../../assets/nome.svg';
import Proximo from '../../../assets/prox.svg';
import CPF from '../../../assets/cpf.svg';
import firestore from '@react-native-firebase/firestore';
import {cpfMask} from '../../components/CpfMask';
import AwesomeAlert from 'react-native-awesome-alerts';
import {RadioButton} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  AccessibilityPropsIOS,
  BackHandler,
} from 'react-native';
import Mask from '@buuhv/number-mask';
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import Dialog from 'react-native-dialog';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {color} from 'react-native-reanimated';

export default function App({route}) {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [checked, setChecked] = useState(false);
  const [usuaria, setUsuaria] = useState(false);
  const [anjoGuarda, setAnjoGuarda] = useState(false);
  const [tipoUsuaria, setTipoUsuaria] = useState(0);
  const [cpfUsuaria, setCpfUsuaria] = useState('');
  const [nomeCpf, setNomeCpf] = useState('nulo');
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  var typelogin = route.params?.typeLogin;

  var tipoUsuariaD = 'null';

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Login');
      return true;
    });
    (async()=>{
    await setEmail(route.params?.email);
    await setNome(route.params?.name);
  })();
  }, []);

  const handleCancel = () => {
    setVisible(false);
    setVisible2(false);
  };

  const [alertErro, setAlertErro] = useState(false);
  const [alertSucesso, setAlertSucesso] = useState(false);
  const [alertAviso, setAlertAviso] = useState(false);
  const [alertAviso2, setAlertAviso2] = useState(false);
  const [alertTipoPerfil, setAlertTipoPerfil] = useState(false);
  const [alertCamposInvalidos, setAlertCamposInvalidos] = useState(false);
  const [nomeUsuaria, setNomeUsuaria] = useState('');

  const showAlert = x => {
    if (x == 1) setAlertSucesso(true);
    if (x == 2) setAlertAviso(true);
    if (x == 3) setAlertErro(true);
    if (x == 4) setAlertTipoPerfil(true);
    if (x == 5) setAlertCamposInvalidos(true);
    if (x == 6) setAlertAviso2(true);
  };
  const hideAlert = (x) => {
    if (x == 1) setAlertSucesso(false);
    if (x == 2) setAlertAviso(false);
    if (x == 3) setAlertErro(false);
    if (x == 4) setAlertTipoPerfil(false);
    if (x == 5) setAlertCamposInvalidos(false);
    if (x == 6) setAlertAviso2(false);
  };
var tipo = '';
  function confirmar() {
    proximo();

    setVisible(false);
    setVisible2(false);
  }
  async function proximo() {
    if (
      nome == '' ||
      cpf.length == '' ||
      email.length == '' ||
      (!anjoGuarda && !usuaria)
    ) {
      showAlert(5);
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
        console.log(typelogin);
        if (nome.length > 2 && email.length > 8) {
          if (
            email.includes('@') &&
            email.includes('.com') &&
            email.includes('.')
          ) {
           
           if (anjoGuarda) {
              tipoUsuariaD = 'ANJO';
              firestore()
                .collectionGroup('Anjo')
                .get()
                .then(function (querySnapshot) {
                  querySnapshot.forEach(function (doc) {
                    if (doc.data().email == email) {
                      cpfNome = doc.ref.path.split('/')[1];
                      setCpfUsuaria(cpfNome);
                      console.log(cpfNome);
                    }
                  });
                })
                .then(() => {
                  firestore()
                    .collection('Usuarias')
                    .doc(cpfNome)
                    .get()
                    .then(function (doc) {
                      if (doc.exists) {
                        console.log('Document data:', doc.data());
                        nomeUser = doc.data().nome;
                        showAlert(2)
                        console.log(doc.data().nome);
                      } else {
                        showAlert(6)
                      }
                    });
                });
            } else if (usuaria) {
              tipoUsuariaD = 'USUÁRIA';
              navigation.navigate('PlanosHera', {
                cpfpassado: cpf,
                nomepassado: nome,
                emailpassado: email,
                tipousuariapassado: tipoUsuariaD,
                tipologin: typelogin,
              });
            } else {
              showAlert(3);
            }
          } else {
            showAlert(3);
          }
        } else {
          showAlert(3);
        }
      } else {
        showAlert(3);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>

          <AwesomeAlert
            show={alertCamposInvalidos}
            title="Erro"
            message='Preencha todos os campos.'
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
            onCancelPressed={() => hideAlert(5)}
            onConfirmPressed={() => hideAlert(5)}
          />
          
          <AwesomeAlert
            show={alertAviso}
            title='Aviso'
            message= {`Você está sendo cadastrado como Anjo da Guarda de: ${nomeUsuaria}`}
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
            onCancelPressed={() => hideAlert(2)}
            onConfirmPressed={() => {
              hideAlert(2)
              navigation.navigate('Cadastro-pt2', {
                cpfpassado: cpf,
                nomepassado: nome,
                emailpassado: email,
                tipousuariapassado: 'ANJO',
                tipologin: typelogin,
                cpfUsuaria: cpfUsuaria,
              });
            }}
          />

        <AwesomeAlert
            show={alertAviso2}
            title='Aviso'
            message= 'Você não foi pré cadastrado por nenhum usuário, peça à usuária que te cadastre previamente!'
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
            onCancelPressed={() => hideAlert(6)}
            onConfirmPressed={() => {
              hideAlert(6)
            }}
          />


      <AwesomeAlert
            show={alertErro}
            title='Erro'
            message= 'Existem campos vazios/inválidos! Por favor, confira e tente novamente.'
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
            onConfirmPressed={() => {
              hideAlert(3)
            }}
          />



      <View
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <FontAwesomeIcon
          icon={faCircle}
          style={{
            margin: 15,
            color: '#e0195c',
          }}
        />
        <FontAwesomeIcon
          icon={faCircle}
          style={{
            margin: 15,
            color: 'gray',
          }}
        />
        <FontAwesomeIcon
          icon={faCircle}
          style={{
            margin: 15,
            color: 'gray',
          }}
        />
      </View>

      <HeraLetra style={styles.hera} />

      <Text style={styles.title}>Cadastro</Text>
      <Text style={styles.subtitle}>Dados da conta</Text>

      <View style={styles.input}>
        <Nome />
        <TextInput
          style={styles.login}
          placeholderTextColor="#C8CCCF"
          value={route.params?.name}
          onChangeText={text => {
            setNome(text);
          }}
          placeholder="Nome"
        />
      </View>

      <View style={styles.input}>
        <CPF />
        <TextInput
          style={styles.login}
          keyboardType="numeric"
          placeholderTextColor="#C8CCCF"
          maxLength={14}
          onChangeText={text => {
            setCpf(cpfMask(text));
          }}
          value={cpf}
          placeholder="CPF"
        />
      </View>

      <View style={styles.input}>
        <Email />
        <TextInput
          value={route.params?.email}
          style={styles.login}
          placeholderTextColor="#C8CCCF"
          onChangeText={text => {
            setEmail(text);
          }}
          autoCapitalize="none"
          placeholder="Email"
        />
      </View>
      <Text style={styles.subtitle}>Selecione o tipo de perfil:</Text>
      <View style={styles.check1}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <RadioButton
            value="usuaria"
            color="#e0195c"
            uncheckedColor="#e0195c"
            status={usuaria ? 'checked' : 'unchecked'}
            onPress={() => {
              setUsuaria(true);
              setAnjoGuarda(false);
            }}
          />

          <Text style={styles.labelCheck}>Usuária</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <RadioButton
            value="anjo"
            color="#e0195c"
            uncheckedColor="#e0195c"
            status={anjoGuarda ? 'checked' : 'unchecked'}
            onPress={() => {
              setAnjoGuarda(true);
              setUsuaria(false);
            }}
          />
          <Text style={styles.labelCheck}>Anjo da Guarda</Text>
        </View>
      </View>

      {usuaria && !anjoGuarda ? (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btnlogin}
          onPress={proximo}>
          <Proximo />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btnlogin}
          onPress={proximo}>
          <Proximo />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
  var cpfNome = '';
  var nomeUser = '';
  //Função que verifica dados e passa eles para a próxima tela
  
}
