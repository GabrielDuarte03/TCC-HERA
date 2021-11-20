import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

// import { Container } from './styles';

export default function AtualizarDadosOpções({ route }) {

  const navigation = useNavigation();

  const opção = route.params?.opçãoAtualizar;

  if (opção == 1) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          
        </View>
      </SafeAreaView>
    );
  }
  else {
    return (
      <SafeAreaView style={styles.container}>
      
      </SafeAreaView>
    );
  }


}
