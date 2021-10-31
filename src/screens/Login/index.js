import React, {useState, useEffect} from 'react';
import Login from '../../../assets/login.svg';
import HeraLetra from '../../../assets/heraletra.svg';
import Google from '../../../assets/google.svg';
import Facebook from '../../../assets/fb.svg';
import Twitter from '../../../assets/twitter.svg';
import Email from '../../../assets/email.svg';
import Senha from '../../../assets/senha.svg';
import Linha from '../../../assets/linhaOu.svg';
import Cadastre from '../../../assets/cadastre.svg';
import LoginT from '../../../assets/btnLoginT.svg';
import OlhoAberto from '../../../assets/olhoaberto.svg';
import OlhoFechado from '../../../assets/olhofechado.svg';
import CPF from '../../../assets/cpf.svg';
import Dialog from 'react-native-dialog';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Touchable,
  BackHandler,
  StatusBar,
} from 'react-native';
import {Background} from '@react-navigation/elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AwesomeAlert from 'react-native-awesome-alerts';

GoogleSignin.configure({
  webClientId:
    '557587465657-c20shkiq0agk72ikuo2824pms7qtq2qt.apps.googleusercontent.com',
});

signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    this.setState({userInfo});
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
    }
  }
};

export default function App({navigation}) {
  var btnLog, refEmail, refSenha;
  /*
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', () => { return true; });
  }
  */

  btnLog = React.createRef();
  refEmail = React.createRef();
  refSenha = React.createRef();
  const [tipoUsuaria, setTipoUsuaria] = useState('');
  const [nomeUsuaria, setNomeUsuaria] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  showAlert = () => {
    setShowAlert(true);
  };

  hideAlert = () => {
    setShowAlert(false);
  };

  // função login
  function login() {
    if (email.includes('@') && email.includes('.com') && email.includes('.')) {
      if (senha.length > 5) {
        auth()
          .signInWithEmailAndPassword(email, senha)
          .then(async () => {
            navigation.navigate('Home', {
              email: email,
            });
            setEmail('');
            setSenha('');
          })
          .catch(error => {
            Alert.alert('Senha incorreta!', 'Email ou senha inválido.' + error);
          });
      } else {
        Alert.alert(
          'Senha inválida!',
          'A senha deve conter, no mínimo, 6 caracteres.',
        );
      }
    } else {
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="AwesomeAlert"
        message="I have a message for you!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, delete it"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          this.hideAlert();
        }}
        onConfirmPressed={() => {
          this.hideAlert();
        }}
      />;
    }
  }

  function mostra() {
    setSecure(false);
    setApareceA('none');
    setApareceF('flex');
  }
  function some() {
    setSecure(true);
    setApareceA('flex');
    setApareceF('none');
  }

  function cadastro() {
    navigation.navigate('Cadastro-pt1', {
      typeLogin: 'normal',
    });
  }

  //função esqueceu
  function esqueci() {
    navigation.navigate('EsqueceuSenha');
  }

  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    navigation.navigate('Home');
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  function logaComEmail() {
    onGoogleButtonPress().then(() => console.log('Signed in with Google!'));
  }

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#FFF',
      height: '100%',
    },
    hera: {
      marginTop: '12%',
    },
    title: {
      fontFamily: 'Bahnscrift',
      fontWeight: '700',
      fontSize: 30,
      marginTop: 13.5,
    },
    subtitle: {
      fontFamily: 'Roboto',
      fontSize: 16,
      marginTop: 15,
      width: 272,
      textAlign: 'center',
      color: '#6A6767',
      marginLeft: 52,
      marginRight: 51,
    },
    login: {
      position: 'absolute',
      marginLeft: 40,
      marginTop: 4,
      width: 210,
      color: 'black',
      zIndex: 1,
    },
    cadastre: {
      marginTop: 18,
    },
    redes: {
      marginTop: 16,
      fontFamily: 'Roboto',
      fontSize: 20,
      color: '#6A6767',
    },
    botoesRedes: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 201,
      marginBottom: 33,
    },
    input: {
      marginTop: 16,
    },
    linha: {
      marginTop: -15,
      marginBottom: -15,
    },
    esqueceu: {
      width: 264,
      marginTop: 10,
      marginBottom: -8,
      color: '#6A6767',
    },

    btnlogin: {
      marginTop: 15,
      marginBottom: 15,
    },
    olhoAberto: {
      position: 'absolute',
      marginLeft: 245,
      marginTop: 20,
    },
    olhoFechado: {
      position: 'absolute',
      marginLeft: 245,
      marginTop: 20,
      display: 'flex',
    },
  });

  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  function onAuthStateChanged(user) {
    if (user) {
      setUserEmail(user.email);
      setUserId(user.id);
      setUserName(user.displayName);
    } else {
      setUserEmail('');
      setUserId('');
      setUserName('');
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Login');
    });

    return subscriber;
  });

  async function signInWithGoogle() {
    const {idToken} = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const emailsUsu = firestore().collection('Usuarias');
    const emailAnj = firestore().collection('Anjos');

    GoogleSignin.getCurrentUser().then(async user => {
      const queryUser = await emailsUsu
        .where('email', '==', user.user.email)
        .get();

      const queryAnj = await emailAnj
        .where('email', '==', user.user.email)
        .get();

      if (queryUser.empty && queryAnj.empty) {
        navigation.navigate('Cadastro-pt1', {
          email: user.user.email,
          name: user.user.name,
          typeLogin: 'google',
        });
      } else {
        navigation.navigate('Home', {
          email: user.user.email,
        });
      }
    });

    return auth().signInWithCredential(googleCredential);
  }

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [clicavel, setClicavel] = useState(false);
  const [btnfoi, setFoi] = useState('flex');
  const [btnpen, setPendente] = useState('none');
  const [apareceF, setApareceF] = useState('none');
  const [apareceA, setApareceA] = useState('flex');
  const [secure, setSecure] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <HeraLetra style={styles.hera} />

      <Text style={styles.title}>Bem vind@!</Text>
      <Text style={styles.subtitle}>
        Faça login ou crie sua conta agora mesmo com a gente!
      </Text>

      <View style={styles.input}>
        <Email />

        <TextInput
          style={styles.login}
          placeholder="Email"
          placeholderTextColor="#C8CCCF"
          blurOnSubmit={false}
          onSubmitEditing={() => {
            refSenha.focus();
          }}
          ref={refEmail}
          value={email}
          autoCapitalize="none"
          value={email}
          onChangeText={text => {
            var email = text.replace(/[^a-zA-Z0-9 ]+@+. /gm, '');
            setEmail(email.replace(' ', ''));
          }}
        />
      </View>

      <View style={styles.input}>
        <Senha />

        <TextInput
          style={styles.login}
          ref={input => {
            refSenha = input;
          }}
          placeholder="Senha"
          placeholderTextColor="#C8CCCF"
          value={senha}
          secureTextEntry={secure}
          onChangeText={text => {
            setSenha(text.replace(' ', ''));
          }}
        />

        {secure ? (
          <TouchableOpacity style={styles.olhoAberto} onPress={mostra}>
            <OlhoAberto />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.olhoFechado} onPress={some}>
            <OlhoFechado />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.btnEsqueceu}
        onFocus={false}
        onPress={esqueci}>
        <Text style={styles.esqueceu}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btnlogin}
        disabled={clicavel}
        ref={input => {
          btnLog = input;
        }}
        onPress={login}>
        <Login style={{display: btnfoi.toString()}} />
        <LoginT style={{display: btnpen.toString()}} />
      </TouchableOpacity>

      <View style={styles.linha}>
        <Linha />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.cadastre}
        onPress={cadastro}>
        <Cadastre />
      </TouchableOpacity>
      <Text style={styles.redes}>Ou use o Google</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        style={{marginTop: 10}}
        onPress={signInWithGoogle}>
        <Google />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
