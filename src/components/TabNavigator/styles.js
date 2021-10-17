import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    bottomNavigation: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        alignItems: "center",
        backgroundColor: "#e0195c",
        height: 50,
        elevation: 15
    }, 
    
    butBottomNav: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        elevation: 15

    },
    imgBottomNav: {
        width: 25,
        height: 25,
        tintColor: '#FFF'
    },
    butBottomNavMore: {
        width: 55,
        height: 55,
        backgroundColor: '#FFF',
        marginBottom: 20,
        borderRadius: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        elevation: 50
    },
    imgBottomNavMore: {
        width: 40,
        height: 40,
        tintColor: '#E0195C',
        marginTop: 20 
    },
    screenName: {
        color: "#FFF",
        fontFamily: "Montserrat-Regular"
    }


});
export default styles;