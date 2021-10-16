import React, { useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,

} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function App(props) {
    const navigation = useNavigation();

    return (

        <View style={styles.bottomNavigation}>
            <TouchableOpacity style={styles.butBottomNav} onPress={() => navigation.navigate('Home')}>
                <Image source={require('../../../assets/home.png')} style={styles.imgBottomNav} />
                {props.tela == 'home' ? <Text style={{ color: '#fff', fontWeight: '700' }}>Home</Text>
                    :
                    <Text style={styles.screenName}>Home</Text>
                }

            </TouchableOpacity>

            <TouchableOpacity style={styles.butBottomNav} onPress={() => navigation.navigate('ChatDashboard')}>
                <Image source={require('../../../assets/falar.png')} style={styles.imgBottomNav} />
                {props.tela == 'chat' ? <Text style={{ color: '#fff', fontWeight: '700' }}>Chat</Text>
                    :
                    <Text style={styles.screenName}>Chat</Text>
                }
            </TouchableOpacity>

            <TouchableOpacity style={styles.butBottomNavMore} onPress={() => navigation.navigate('ChatDashboard')}>
                <Image source={require('../../../assets/icone-mais.png')} style={styles.imgBottomNavMore} />
                {props.tela == 'chat' ? <Text style={{ color: '#fff', fontWeight: '700', }}>Chat</Text>
                    :
                    <Text style={styles.screenName}></Text>
                }
            </TouchableOpacity>

            <TouchableOpacity style={styles.butBottomNav} onPress={() => navigation.navigate('Mapa')}>
                <Image source={require('../../../assets/marcar-no-mapa.png')} style={styles.imgBottomNav} />
                {props.tela == 'mapa' ? <Text style={{ color: '#fff', fontWeight: '700' }}>Mapa</Text>
                    :
                    <Text style={styles.screenName}>Mapa</Text>
                }

            </TouchableOpacity>

            <TouchableOpacity style={styles.butBottomNav} onPress={() => navigation.navigate('AdicionarAnjo')}>
                <Image source={require('../../../assets/anjo1.png')} style={styles.imgBottomNav} />
                {props.tela == 'anjo' ? <Text style={{ color: '#fff', fontWeight: '700' }}>Anjo</Text>
                    :
                    <Text style={styles.screenName}>Anjo</Text>
                }

            </TouchableOpacity>

        </View>
    );

}
