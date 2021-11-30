import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './src/screens/Login';
import Home from './src/screens/Home';
import SplashScreen from './src/screens/SplashScreen';
import Cadastro1 from './src/screens/Cadastro-pt1';
import Cadastro2 from './src/screens/Cadastro-pt2';
import Cadastro3 from './src/screens/Cadastro-pt3';
import ChatScreen from './src/screens/ChatScreen';
import ChatDashboard from './src/screens/ChatDashboard';
import Messages from './src/screens/Messages';
import EsqueceuSenha from './src/screens/EsqueceuSenha';
import Mapa from './src/screens/Mapa'
import { State } from 'react-native-gesture-handler';
import ConexaoBluetooth from './src/screens/ConexaoBluetooth';
import AdicionarAnjo from './src/screens/AdicionarAnjo'
import Noticias from './src/screens/Noticias'
import Perfil from './src/screens/Perfil'
import AtualizarDadosOpções from './src/screens/AtualizarDadosOpções'
import AtualizarDados from './src/screens/AtualizarDados'
import Onboarding from './src/screens/Onboarding';
import PlanosHera from './src/screens/PlanosHera';
const Stack = createStackNavigator();
export default function App() {
 
    
   return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" options={{headerShown: false}} component={SplashScreen} />
        <Stack.Screen name="Onboarding" options={{headerShown: false}} component={Onboarding} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={Login}/>
        <Stack.Screen name="Noticias" options={{headerShown: true, headerStyle: { backgroundColor: '#e0195c', height: 30, borderWidth: 0}, headerTitleStyle: { display: 'none'}, headerTintColor: '#fff', }}  component={Noticias}/>
        <Stack.Screen name="Cadastro-pt1" options={{headerShown: false}} component={Cadastro1}/>
        <Stack.Screen name="Cadastro-pt2" options={{headerShown: false}} component={Cadastro2}/>
        <Stack.Screen name="Cadastro-pt3" options={{headerShown: false}} component={Cadastro3}/>
        <Stack.Screen name="EsqueceuSenha" options={{headerShown: false}} component={EsqueceuSenha}/>
        <Stack.Screen name="ChatScreen" options={{headerShown: true}} component={ChatScreen} />
        <Stack.Screen name="ChatDashboard" component={ChatDashboard} options={{headerShown: false}}/>
        <Stack.Screen name="ConexaoBluetooth" component={ConexaoBluetooth} />
        <Stack.Screen name="Mapa" component={Mapa} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="AtualizarDadosOpções" component={AtualizarDadosOpções} options={{headerShown: true, headerStyle: { backgroundColor: '#e0195c', height: 30, borderWidth: 0}, headerTitleStyle: { display: 'none'}, headerTintColor: '#fff', }}/>
        <Stack.Screen name="AtualizarDados" component={AtualizarDados} options={{headerShown: true, headerStyle: { backgroundColor: '#e0195c', height: 30, borderWidth: 0}, headerTitleStyle: { display: 'none'}, headerTintColor: '#fff', }}/>
        <Stack.Screen name="Perfil" component={Perfil} options={{headerShown: true, headerStyle: { backgroundColor: '#e0195c', height: 30, borderWidth: 0}, headerTitleStyle: { display: 'none'}, headerTintColor: '#fff', }} />
        <Stack.Screen name="AdicionarAnjo" component={AdicionarAnjo} options={{headerShown: false}}/>
        <Stack.Screen name="PlanosHera" component={PlanosHera} options={{headerShown: false}}/>
        <Stack.Screen
          name='Messages'
          component={Messages}
          options={({ route }) => ({
            title: route.params.thread.name
          })}
        />
        

      </Stack.Navigator>
    </NavigationContainer>
  
  );
  


}