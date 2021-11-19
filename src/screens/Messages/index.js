import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat, Bubble, Time, InputToolbar, Avatar} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Image, Text, View, KeyboardAvoidingView} from 'react-native';
import {Route} from '@react-navigation/native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from 'emoji-mart';
import { Linking } from 'react-native';
import MapView from 'react-native-maps';
import Local from '@react-native-community/geolocation'
export default function Messages({route}) {
  const {thread} = route.params;
  
  const user = auth().currentUser.toJSON();
  const [name, setName] = useState('');
  const [position, setPosition] = useState([]);
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
  

    //console.log('thread');
  },[]);

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
  const LocationView = ({ location, text }) => {
    const openMaps = () => {
      const url = Platform.select({
        ios: `http://maps.apple.com/?ll=${location.latitude},${location.longitude}`,
        android: `http://maps.google.com/?q=${location.latitude},${location.longitude}`,
      });
      Linking.canOpenURL(url)
        .then((supported) => {
          if (supported) {
            return Linking.openURL(url);
          }
        })
        .catch((err) => {
          console.error('An error occurred', err);
        });
    };
    return (
      <TouchableOpacity
        onPress={openMaps}
        style={{ 
          backgroundColor: 'gray',

           width: 250, 
           height: 250,
           marginTop: 10,
           backgroundColor: '#e0195c',
           borderBottomRightRadius: 0,
           borderBottomLeftRadius: 15,
           borderTopRightRadius: 15,
           borderTopLeftRadius: 15,}}>
         
        <MapView
          style={{ height: 230, 
            width: 230, 
            alignSelf: 'center',
          marginTop: 10,
          }}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: location.latitudeDelta,
            longitudeDelta: location.longitudeDelta,
          }}
          
          annotations={[
            {
              latitude: location.latitude,
              longitude: location.longitude,
            },
          ]}
          scrollEnabled={false}
          zoomEnabled={false}
        >
           <MapView.Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          pinColor={'#e0195c'}
          >


          <Image
            style={{width: 50, height: 50, resizeMode: 'contain', margin: 5}}
            source={require('../../../assets/map-marker-icon.png')}
          />



        </MapView.Marker>
        </MapView>
      
      </TouchableOpacity>
    );
  };
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const text = messages[0].text;
    // console.log(thread._id);
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
       }).then(function(docRef) {
         console.log("Document written with ID: ", docRef.id);
       }).catch(function(error) {
         console.error("Error adding document: ", error);
       });
 
      firestore()
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
       )


  }, []);


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
      onSend={(messages) => onSend(messages)}
      multiline={true}
      renderUsernameOnMessage={false}
      placeholder="Digite sua mensagem"
      
    
      renderSend={(props) => {
        const {text,messageIdGenerator,user, onSend} = props
        return (
          <TouchableOpacity 
          activeOpacity={0.8}
          onPress={async () => {
            if (text && onSend) {
              
              onSend({ text: text.trim(), user:user , _id:messageIdGenerator()}, true)
            }
          }}
          style={{
            backgroundColor:'transparent',
            width: 40, 
            height: 40, 
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            margin: 6
            }}>
          <Image style={{width: 25, height: 25, padding: 2, tintColor: '#e0195c'}} source={require('../../../assets/send-message.png')} />
          </TouchableOpacity>
          );
      }}
     
      textInputStyle={{
        backgroundColor: 'transparent',
        borderColor: '#e0195c',
        borderWidth: 2,
        borderRadius: 20,
        paddingLeft: 15,
        fontFamily: 'Montserrat-Regular',
      }}
      renderBubble={props => {
        const { currentMessage } = props;
      
    if (currentMessage.location) {
      return(
    
        
        <LocationView location={currentMessage.location}/>
        
     
        );
    }
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
              marginLeft: -12,
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
      />
        
     

  );
}
