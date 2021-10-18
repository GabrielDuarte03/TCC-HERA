import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: "100%"

    },
    labelCheck:{
        fontFamily: "Roboto",
        fontSize: 16,
      },
    hera: {
        marginTop: "5%"
    },
    title: {
        fontFamily: "Bahnscrift",
        fontWeight: "700",
        fontSize: 30,
        marginTop: 13.5
    },
    subtitle: {
        fontFamily: "Roboto",
        fontSize: 16,
        marginTop: 15,
        width: 272,
        textAlign: 'center',
        color: "#6A6767",
        marginLeft: 52,
        marginRight: 51
    },

    //daqui para baixo é o CEP
    cep: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "flex-start",
        alignContent: "space-between",
        backgroundColor: '#FFF',
        marginTop: 40,
        paddingBottom: 12.5
    },
    inputCep: {
        position: "absolute",
        marginTop: -2,
        marginLeft: 30,
        width: 135,
        height: 40,
        color:'#000'
    },
    cepCampo: {
        marginRight: 11
    },
    logradouro: {
        marginTop: 16.5,
        
    },
    logInput: {
        position: "absolute",
        marginTop: -11,
        marginLeft: 7,
        width: 289,
        color:'#000'
    },
    nmrBairro: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "flex-start",
        alignContent: "space-between",
        backgroundColor: '#FFF',
        paddingBottom: 12.5,
        marginTop: 15,
        paddingBottom: 15,
        
    },
    bairroInput: {
        position: "absolute",
        marginLeft: 145,
        marginTop: -11,
        width: 155,
        color:'#000'
    },
    nmrInput: {
        position: "absolute",
        marginTop: -11,
        marginLeft: 7,
        width: 110,
        color:'#000'
    },
    nmrCampo: {
        marginRight: 11
    },
    cidInput: {
        position: "absolute",
        marginLeft: 6,
        marginTop: -11,
        width: 130,
        color:'#000'
    },
    estInput: {
        position: "absolute",
        marginLeft: 160,
        marginTop: -11,
        color:'#000'
    },
    cidCampo: {
        marginRight: 11
    },
    finalizar: {
        marginTop: 30
    }

});
export default styles;