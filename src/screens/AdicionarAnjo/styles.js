import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: 'space-around',
        width: Dimensions.get('window').width,
        height: '100%',
        fontFamily: "Bahnscrift",
    },
    buttonSalvar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0195c",
        width: "80%",
        height: "7%",
        borderRadius: 30,

    },
    textDescription: {
        fontFamily: "Montserrat-Regular",
        color: "#000"
    },
    buttonSalvarText: {
        textAlign: "center",
        color: "#FFF",
        fontSize: 20,
        fontFamily: "Montserrat-Bold"

    },
    hera: {
        marginBottom: 20
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