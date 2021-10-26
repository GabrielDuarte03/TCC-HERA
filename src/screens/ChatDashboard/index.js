import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import Separator from '../../components/Separator';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import TabNavigator from '../../components/TabNavigator';
import auth from '@react-native-firebase/auth';

export default function App({navigation}) {
  function passarTela() {
    navigation.navigate('ChatScreen');
  }

  const [threads, setThreads] = useState([]);

  const [loading, setLoading] = useState(true);
  const [cpf, setCpf] = useState('');
  const user = auth().currentUser;
  const userEmail = user.email;
  const [existe, setExiste] = useState(false);

  useEffect(() => {
    (async() => {
        await firestore().collection('Usuarias').where('email', '==', userEmail).get().then(function (querySnapshot) {
             querySnapshot.forEach(function (doc) {
                 setCpf(doc.data().cpf)
             });
         })
     
     })()
     
    const unsubscribe = firestore()
      .collection('AllMensages')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(async querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            name: '',
            latestMessage: {
              text: '',
            },
            emailAnjo: '',
            cpfUsuaria: '',
            ...documentSnapshot.data(),
          };
        });
        var emails = [];

        await firestore()
          .collection('Usuarias')
          .doc(cpf)
          .collection('Anjo')
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              emails.push(doc.data().email);
            });
            setThreads(
              threads.filter(thread => emails.includes(thread.emailAnjo)),
            );
            if (loading) {
              setLoading(false);
            }
          });
        //setThreads(threads)
      });
      
    
    return () => unsubscribe();
  },[loading]);

  if (loading) {
    return <ActivityIndicator size="large" color="#e0195c" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Mensagens</Text>
      <View style={styles.insideContainer}>
        <FlatList
          data={threads}
          keyExtractor={item => item._id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Messages', {thread: item})}>
                <View style={styles.row}>
                  <View style={styles.content}>
                    <View style={styles.header}>
                      <Text style={styles.nameText}>{item.name}</Text>
                    </View>
                    <Text style={styles.contentText}>
                      {item.latestMessage.text.slice(0, 90)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={() => <Separator />}
        />
      </View>

      <TabNavigator tela="chat" />
    </View>
  );
}
