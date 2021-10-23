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
                .collection('AllMensages')
                .add({
                    name: roomName,
                    latestMessage: {
                        text: `Bem vindo!`,
                        createdAt: new Date().getTime()
                    }
                })
                .then(docRef => {
                    docRef
                        .collection('Mensages')
                        .add({
                            text: `Bem vindo!`,
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
    <TouchableOpacity onPress={handleButtonPress}>
        <Text>Aqui</Text>
    </TouchableOpacity>
         
        </View>
    )

}
