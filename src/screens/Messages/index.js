import React, {useState, useEffect} from 'react';
import {GiftedChat, Bubble, Time} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Image, Text, View, KeyboardAvoidingView} from 'react-native';
import {Route} from '@react-navigation/native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export default function Messages({route}) {
  const {thread} = route.params;
  
  const user = auth().currentUser.toJSON();
  const [name, setName] = useState('');
  useEffect(() => {
    (async () => {
      firestore()
        .collection('Usuarias')
        .where('email', '==', user.email)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            if (doc.exists) {
              setName(doc.data().nome);
            } else {
              firestore()
                .collectionGroup('Anjo')
                .where('email', '==', user.email)
                .get()
                .then(function (querySnapshot) {
                  querySnapshot.forEach(function (doc) {
                    if (doc.exists) {
                      setName(doc.data().nome);
                    }
                  });
                });
            }
          });
        });
    })();
    console.log('thread');
  });

  const [messages, setMessages] = useState([
    {
      _id: 0,
      text: 'thread created',
      createdAt: new Date().getTime(),
      system: true,
    },
    {
      _id: 1,
      text: 'hello!',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Demo',
      },
    },
  ]);

  async function handleSend(messages) {
    console.log(user);
    const text = messages[0].text;

    firestore()
      .collection('AllMensages')
      .doc(thread._id)
      .collection('Mensages')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: user.uid,
          displayName: name,
        },
      });

    await firestore()
      .collection('AllMensages')
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        {merge: true},
      );
  }

  useEffect(() => {
    const unsubscribeListener = firestore()
      .collection('AllMensages')
      .doc(thread._id)
      .collection('Mensages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();
          console.log(firebaseData);
          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName,
            };
          }

          return data;
        });

        setMessages(messages);
      });

    return () => unsubscribeListener();
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      multiline={true}
      
      placeholder="Digite sua mensagem"
      renderSend={(props) => {
        const {text,messageIdGenerator,user, onSend} = props
           
        return (
          <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => {
            if (text && onSend) {
              onSend({ text: text.trim(), user:user,_id:messageIdGenerator()}, true);
        }
          }}
          style={{
            backgroundColor: '#e0195c', 
            width: 40, 
            height: 40,
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            margin: 6
            }}>
          <Image style={{width: 25, height: 25, padding: 2}} source={require('../../../assets/send-message.png')} />
          </TouchableOpacity>
          );
      }}
     
      textInputStyle={{
        height: 100,
        marginTop: 5,
        marginBottom: 5,
        fontFamily: 'Montserrat-Regular',
      }}
      renderBubble={props => {
        return (
          <Bubble
            {...props}

            textStyle={{
              
              right: {
                color: '#fff',
                fontFamily: 'Montserrat-Regular',
              },
              left: {
                color: '#fff',
                fontFamily: 'Montserrat-Regular',
              },
            }}
            renderTime={(props) => {
              return (
                <Time
                  {...props}
                  textStyle={{
                    right: {
                      color: '#fff',
                      fontFamily: 'Montserrat-Bold',
                    },
                    left: {
                      color: '#fff',
                      fontFamily: 'Montserrat-Bold',
                    },
                  }}
                />
              );
            }}
            optionTitles={['Delete', 'Editar']}
            wrapperStyle={{
              left: {
                backgroundColor: '#fa6f9e',
                borderBottomRightRadius: 15,
                borderBottomLeftRadius: 15,
                borderTopRightRadius: 15,
                borderTopLeftRadius: 0,
              },
              right: {
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 15,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              marginLeft: 12,
              backgroundColor: '#e0195c',
               
              },
            }}
           
            
          />
        );
      }}
      user={{
        _id: user.uid,
        name: name,
      }}
      
      renderAvatar={() => null}
     renderUsernameOnMessage={true}
  
    />
  );
}
