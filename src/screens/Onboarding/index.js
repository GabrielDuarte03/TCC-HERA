import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';

import slides from '../../../slides';

export default function Onboarding({navigation}) {
  const [showHome, setShowHome] = useState(false);
  var RNFS = require('react-native-fs');
  function renderSlides({item}) {
    return (
      <View style={styles.container}>
      
          <Image source={item.image} style={{flex: 1, resizeMode: "center", width: '100%'}} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        
       
      </View>
    );
  }
  
  function saveAndLogin(){
    RNFS.writeFile(RNFS.DocumentDirectoryPath + '/onboarding.json', JSON.stringify(true), 'utf8').then(success => {
      navigation.navigate('Login');
      console.log('FILE WRITTEN! ' + RNFS.DocumentDirectoryPath);
    });
    RNFS.readFile(RNFS.DocumentDirectoryPath + '/onboarding.json', 'utf8').then(success => {
      console.log('FILE READ! ' + success);
    });
   
  }

  if (showHome) {
    navigation.navigate('Login');
  } else {
    return (
      <AppIntroSlider
        renderItem={renderSlides}
        data={slides}
        activeDotStyle={{
          backgroundColor: '#E0195C',
          width: 35,
        }}
      style={{backgroundColor: "#fff"}}
      onDone={saveAndLogin}
      renderDoneButton={() => (
        <View>
          <Text style={{color: "#E0195C", fontFamily: "Montserrat-Bold"}}>Finalizar</Text>
        </View>
      )}

      />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height:"80%",
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 30,
    fontFamily: "Montserrat-Bold",
    marginBottom: 20,
    color: "#E0195C",
    letterSpacing: -0.5
  },
  description:{
    width: "90%",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Montserrat-Regular",
    marginTop: 10,
    color: "#000",
    letterSpacing: -0.5
  }
});