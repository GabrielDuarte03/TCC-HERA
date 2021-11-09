import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    bottomNavigation: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        alignItems: "center",
        backgroundColor: "#e0195c",
        height: 60,
        elevation: 100
    }, 
    
    butBottomNav: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "space-around",
        elevation: 15

    },
    imgBottomNav: {
        width: 28,
        height: 25,
        
       
    },
    butBottomNavMore: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        marginBottom: 20,
        borderRadius: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        elevation: 50
    },
    imgBottomNavMore: {
        width: 60,
        height: 60,
        tintColor: '#e0195c',
        marginTop: 20 
    },
    screenName: {
        color: "#FFF",
        fontFamily: "Montserrat-Regular"
    }


});
export default styles;