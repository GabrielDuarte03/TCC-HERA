import React, {useEffect, useState} from 'react';

import {StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';

export default function App({navigation}) {

    useEffect(() => {
        
    }, []);

    function handleButtonPress() {
        if (roomName.length > 0) {
            // create new thread using firebase & firestore
            firestore()
                .collection('MESSAGE_THREADS')
                .add({
                    name: roomName,
                    latestMessage: {
                        text: `${roomName} created. Welcome!`,
                        createdAt: new Date().getTime()
                    }
                })
                .then(docRef => {
                    docRef
                        .collection('MESSAGES')
                        .add({
                            text: `${roomName} created. Welcome!`,
                            createdAt: new Date().getTime(),
                            system: true
                        })
                    navigation.navigate('ChatDashboard')
                })
        }
    }

    const [roomName,
        setRoomName] = useState('');

    return (

        <View style={styles.container}>
            <TextInput
                style={styles.inputNameRoom}
                onChangeText={(text) => {
                setRoomName(text)
            }}></TextInput>

            <TouchableOpacity style={styles.createRoomButton} onPress={handleButtonPress}>
                <Text>Criar Sala</Text>
            </TouchableOpacity>
        </View>
    )

}
