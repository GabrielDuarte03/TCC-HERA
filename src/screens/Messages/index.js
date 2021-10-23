import React, { useState, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import {Route} from '@react-navigation/native'


export default function Messages({route}) {

    const { thread } = route.params
  
    const user = auth().currentUser.toJSON()
    const [name, setName] = useState('')
  useEffect(() => {
  
    (async () => {

      firestore().collection('Usuarias').where("email", "==", user.email).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          setName(doc.data().nome)
        })
      })
    })()
    console.log('thread')

  })

    const [messages, setMessages] = useState([
      {
        _id: 0,
        text: 'thread created',
        createdAt: new Date().getTime(),
        system: true
      },
      {
        _id: 1,
        text: 'hello!',
        createdAt: new Date().getTime(),
        user: {
          _id: 2,
          name: 'Demo'
        }
      }
    ])

    async function handleSend(messages) {
      console.log(user)
      const text = messages[0].text

      firestore()
      .collection('AllMensages')
      .doc(thread._id)
      .collection('Mensages')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: user.uid,
          displayName: name
        }
      })

      await firestore()
      .collection('AllMensages')
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime()
          }
        },
        { merge: true }
      )


    }


    useEffect(() => {
      const unsubscribeListener = firestore()
        .collection('AllMensages')
        .doc(thread._id)
        .collection('Mensages')
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
          const messages = querySnapshot.docs.map(doc => {
            const firebaseData = doc.data()
            console.log(firebaseData)
            const data = {
              _id: doc.id,
              text: '',
              createdAt: new Date().getTime(),
              ...firebaseData
            }
    
            if (!firebaseData.system) {
              data.user = {
                ...firebaseData.user,
                name: firebaseData.user.displayName
              }
            }
    
            return data
          })
    
          setMessages(messages)
        })
    
      return () => unsubscribeListener()
    }, [])
  

     
  
    return (
      <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{
        _id: user.uid
      }}
    />
      )
  }