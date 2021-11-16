import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,

} from 'react-native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import Parse from 'parse/react-native.js';
import Local from '@react-native-community/geolocation';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import FastImage from 'react-native-fast-image'


var chamado = false;
var a = 0;

export default function App(props) {

    const navigation = useNavigation();
    const [urlPhoto1, setUrlPhoto1] = useState('');
    const [existe, setExiste] = useState(false);

    useEffect(()=>{
        (async ()=>{

            const user = await auth().currentUser;
            const id = user.uid;
            try{
                const url = await storage().ref(id).getDownloadURL().then(url => {
                setUrlPhoto1(url);
                setExiste(true);
            }).catch(error => {
                console.log(error);
            });
            
            console.log(url);
        }catch(error){
            console.log(error); 
        }

        })()
        
    },[]);

    return (

        <View style={styles.bottomNavigation}>
        
            <TouchableOpacity style={styles.butBottomNav} onPress={() => navigation.navigate('Home')}>
                <Image source={require('../../../assets/home.png')} style={[styles.imgBottomNav, {tintColor: '#FFF'}]} />
                {props.tela == 'home' ? <Text style={{ color: '#fff', fontWeight: '700' }}>Home</Text>
                    :
                    <Text style={styles.screenName}>Home</Text>
                }

            </TouchableOpacity>

            <TouchableOpacity style={[styles.butBottomNav]} onPress={() => navigation.navigate('ChatDashboard')}>
                <Image source={require('../../../assets/falar.png')} style={[styles.imgBottomNav, {tintColor: '#FFF'}]} />
                {props.tela == 'chat' ? <Text style={{ color: '#fff', fontWeight: '700' }}>Chat</Text>
                    :
                    <Text style={styles.screenName}>Chat</Text>
                }
            </TouchableOpacity>

            <TouchableOpacity style={styles.butBottomNav} onPress={() => navigation.navigate('Mapa')}>
                <Image source={require('../../../assets/marcar-no-mapa.png')} style={[styles.imgBottomNav, {tintColor: '#FFF'}]} />
                {props.tela == 'mapa' ? <Text style={{ color: '#fff', fontWeight: '700' }}>Mapa</Text>
                    :
                    <Text style={styles.screenName}>Mapa</Text>
                }

            </TouchableOpacity>

           
            {!existe ?
               
            <TouchableOpacity style={styles.butBottomNav} onPress={() => navigation.navigate('Perfil')}>
                <Image source={require('../../../assets/user.png')} style={[styles.imgBottomNav, {tintColor: '#FFF'}]} />
                {props.tela == 'anjo' ? <Text style={{ color: '#fff', fontWeight: '700' }}>Perfil</Text>
                    :
                    <Text style={styles.screenName}>Perfil</Text>
                }

            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.butBottomNav} onPress={() => navigation.navigate('Perfil')}>
               <FastImage source={{uri: urlPhoto1, priority: FastImage.priority.high}}  style={[styles.imgBottomNav,{borderWidth: 1, borderColor: '#FFF', borderRadius: 100, width: 32, height: 32}]} 
                 resizeMode={FastImage.resizeMode.cover}
                
                 />
               
                {props.tela == 'anjo' ? <Text style={{ color: '#fff', fontWeight: '700' }}>Perfil</Text>
                    :
                    <Text style={styles.screenName}>Perfil</Text>
                }
  
            </TouchableOpacity>}
           
        </View>
    );

}
