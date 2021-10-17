import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: 'space-between',
        width: Dimensions.get('window').width,
        height: '100%',
        fontFamily: "Bahnscrift",
        textAlign: "center"
    },
    part1:{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: 'space-around',
        width: Dimensions.get('window').width,
        flex: 2,
        fontFamily: "Bahnscrift",
    },
    part2:{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: "flex-start",
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width,
        flex: 1,
        fontFamily: "Bahnscrift",
    },
    buttonSalvar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0195c",
        width: 350,
        height: 50,
        borderRadius: 30,

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
    },
    textDescription: {
        fontFamily: "Montserrat-Regular",
        color: "#000",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonSalvarText: {
        textAlign: "center",
        color: "#FFF",
        fontSize: 20,
        fontFamily: "Montserrat-Bold"

    },
    textTornarAnjo: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
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
        paddingLeft: 25
    }
});
export default styles;