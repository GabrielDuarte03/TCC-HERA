import React, { useEffect } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, BackHandler} from 'react-native';
import styles from './styles';

export default function App() {

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true);
    }, []);

    return (
      <View style={styles.container}>
        <Text style={styles.headText}>Perfil</Text>
        <View style={styles.imagem}>
            <Image source={require('../../../assets/user.png')} style={styles.img}/>
        </View>
     
           
      </View>
    );
  
}
