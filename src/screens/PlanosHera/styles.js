import {Dimensions, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        fontFamily: "Bahnscrift",
    },
    cabecalho: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 30

    },
    titulo:{
       fontFamily: 'Montserrat-Bold',
       fontSize: 22,
       paddingTop: 30
    },
    naosei:{
        width: Dimensions.get('screen').width,
        display: 'flex',
        alignItems: 'center',
       
    },
    body:{
        display: 'flex',
        height: 400,
        justifyContent: 'space-evenly'
    },  
    card:{
        display: 'flex',
        flexDirection: 'row',
        width: "80%",
        height: 100,
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#e0195c',
        justifyContent: 'flex-start'
    },
    imgCard:{
        display: 'flex',
        alignItems: 'flex-start',
        marginLeft: 10,
        width: 100
    },
    texts:{
        width: 190,
        height: 90,
        marginLeft: -30,
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    titleCard:{
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Montserrat-Bold',
        alignSelf: 'center'
    },
    descCard:{
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Montserrat',
        alignSelf: 'center'
    }
})
export default styles;