import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

// import { Container } from './styles';

export default function AtualizarDadosOpções({ route }) {

  const navigation = useNavigation();

  const opção = route.params?.opção;

  if (opção == 1) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('AtualizarDados', { opçãoAtualizar: 1 })}>
          <View style={styles.option1}>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={styles.title}>Dados Pessoais</Text>
              <Text style={styles.sub}>Nome, Data de Nascimento, ...</Text>
            </View>
            <View>
              <Text style={{ color: "#e0195c", fontSize: 20, fontFamily: "Montserrat-Bold" }}> &gt; </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AtualizarDados', { opçãoAtualizar: 2 })}>
          <View style={styles.option2}>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={styles.title}>Dados de Endereço </Text>
              <Text style={styles.sub}>CEP, Logradouro, Número, ...</Text>
            </View>

            <View>
              <Text style={{ color: "#e0195c", fontSize: 20, fontFamily: "Montserrat-Bold" }}> &gt; </Text>

            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  else {
    return (
      <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('AtualizarDados', { opçãoAtualizar: 3 })}>
        <View style={styles.option1}>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Text style={styles.title}>Segurança e Opções</Text>
            <Text style={styles.sub}>Excluir conta, suporte, ...</Text>
          </View>

          <View>
            <Text style={{ color: "#e0195c", fontSize: 20, fontFamily: "Montserrat-Bold" }}> &gt; </Text>

          </View>

        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('AtualizarDados', { opçãoAtualizar: 4 })}>
        <View style={styles.option2}>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Text style={styles.title}>Informações da conta e app</Text>
            <Text style={styles.sub}>Quando foi criada, termos e políticas, ...</Text>
          </View>

          <View>
            <Text style={{ color: "#e0195c", fontSize: 20, fontFamily: "Montserrat-Bold" }}> &gt; </Text>

          </View>
        </View>
      </TouchableOpacity>
      </SafeAreaView>
    );
  }


}
