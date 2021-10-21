import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Image
} from 'react-native'
import Separator from '../../components/Separator'
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import TabNavigator from '../../components/TabNavigator';

export default function App({ navigation }) {

    function passarTela() {
        navigation.navigate('ChatScreen');

    }

    const [threads,
        setThreads] = useState([])
    const [loading,
        setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('MESSAGE_THREADS')
            .orderBy('latestMessage.createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const threads = querySnapshot
                    .docs
                    .map(documentSnapshot => {
                        return {
                            _id: documentSnapshot.id,
                            name: '',
                            latestMessage: {
                                text: ''
                            },
                            ...documentSnapshot.data()
                        }
                    })

                setThreads(threads)
                console.log(threads)
                if (loading) {
                    setLoading(false)
                }
            })

        return () => unsubscribe()
    }, [])

    if (loading) {
        return <ActivityIndicator size='large' color='#555' />
    }

    return (
        <View style={styles.container}>

            <View style={styles.insideContainer}>


                <FlatList
                    data={threads}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Messages', { thread: item })}>
                            <View style={styles.row}>
                                <View style={styles.content}>
                                    <View style={styles.header}>
                                        <Text style={styles.nameText}>{item.name}</Text>
                                    </View>
                                    <Text style={styles.contentText}>
                                        {item
                                            .latestMessage
                                            .text
                                            .slice(0, 90)}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <Separator />} />

            </View>
            {/* 
            <TouchableOpacity onPress={passarTela}>
                <Text>Inserir nova sala</Text>
            </TouchableOpacity> */}

            <TabNavigator tela="chat" />
        </View>
    )

}