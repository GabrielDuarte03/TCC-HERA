import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

// import { Container } from './styles';

export default function AtualizarDadosOpções({route}) {
  const navigation = useNavigation();

  const opção = route.params?.opçãoAtualizar;

  function atualizar() {}

  if (opção == 1) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Atualizar Dados</Text>
        <View style={styles.insideContainer}>
          <View style={styles.inputChange}>
            <Text style={styles.label}>Nome</Text>
            <TextInput style={styles.input} placeholder="Nome" />
          </View>

          <View style={styles.inputChange}>
            <Text style={styles.label}>Data de nascimento</Text>
            <TextInput style={styles.input} placeholder="Data de nascimento" />
          </View>

          <View style={styles.inputChange}>
            <Text style={styles.label}>CPF</Text>
            <TextInput style={styles.input} placeholder="CPF" />
          </View>

          <View style={styles.inputChange}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="Email" />
          </View>

          <View style={styles.inputChange}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput style={styles.input} placeholder="Telefone" />
          </View>

          <TouchableOpacity style={styles.buttonUpdate} onPress={atualizar}>
            <Text style={styles.buttonUpdateText}>Atualizar</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  } else {
    return <SafeAreaView style={styles.container}></SafeAreaView>;
  }
}
