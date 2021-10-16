import React, { useState, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import {Route} from '@react-navigation/native'


export default function Messages({route}) {

    const { thread } = route.params
    const user = auth().currentUser.toJSON()

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
      const text = messages[0].text

      firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: user.uid,
          displayName: user.displayName
        }
      })

      await firestore()
      .collection('MESSAGE_THREADS')
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
        .collection('MESSAGE_THREADS')
        .doc(thread._id)
        .collection('MESSAGES')
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
          const messages = querySnapshot.docs.map(doc => {
            const firebaseData = doc.data()
    
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