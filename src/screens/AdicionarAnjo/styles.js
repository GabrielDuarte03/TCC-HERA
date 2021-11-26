import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#e0195c',
        justifyContent: 'flex-end',
        width: Dimensions.get('window').width,
        height: '100%',
        fontFamily: "Bahnscrift",
    },
    headText:{
        padding: 20,
        color: "#fff",
        fontFamily: "Montserrat-Bold",
        fontSize: 30,
     
      },
      insideContainer: {
        width: Dimensions.get('window').width,
        height: '80%',
        backgroundColor: "#fff",
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 30,
        paddingBottom: 30,
       
  
      },
    part1:{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: 'space-around',
        width: Dimensions.get('window').width,
        flex: 2,
        marginTop: 15,
        fontFamily: "Bahnscrift",
    },
    part2:{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: "center",
        fontFamily: "Montserrat-Regular",

        padding: 5,
        width: Dimensions.get('window').width,
        flex: 1,
        fontFamily: "Bahnscrift",
    },
    buttonSalvar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0195c",
        width: 315,
        height: 50,
        borderRadius: 30,
        marginTop: 10

    },
    buttonQueroSerHibrido: {
        margin: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0195c",
        width: 350,
        height: 50,
        borderRadius: 30,
        marginTop: 15,
    },
    textDescription: {
        fontFamily: "Montserrat-Bold",
        marginBottom: 5,
        width: "90%",
        color: "#000",
        textAlign: "center",
        display: "flex",
        fontSize: 18,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonSalvarText: {
        textAlign: "center",
        color: "#FFF",
        fontSize: 20,
        fontFamily: "Montserrat-600",
        
    },
    textTornarAnjo: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "85%",
        marginTop: 15
    },  
    hera: {
        marginTop: 10
    },
    textInput: {
        borderRadius: 30,
        marginTop: 5,
        width: "80%",
        borderWidth: 1,
        fontFamily: "Montserrat-Regular",
        paddingLeft: 25,
        color:'#000'
    }
});
export default styles;