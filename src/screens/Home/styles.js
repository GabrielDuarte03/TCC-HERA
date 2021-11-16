import {Dimensions, StyleSheet} from "react-native";
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
        padding: 10,
        color: "#fff",
        fontFamily: "Montserrat-Bold",
        fontSize: 20,
        marginLeft: 5
      },
      insideContainer: {
        width: Dimensions.get('window').width,
        height: "80%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 30,
        paddingBottom: 30,
        elevation: 50,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    ladoLogout:{
        display: 'flex',
        flexDirection: 'column',
        alignSelf:'center',
       marginRight: 80
      
      
    },
    logout:{
        width: 35,
        height: 35,
        tintColor:'#e0195c',
        marginRight: 180
    },
  
    headContainer: {
        width: Dimensions.get('window').width,
        fontFamily: "Montserrat-Regular",
        marginBottom: 25,
        paddingLeft: 8
    },
    categoriesContainer: {
        width: Dimensions.get('window').width,
        height: '100%',
       
        flex: 2,
       
    },
    cardContainer: {
        width: '101%',
        display: "flex",
        height: 10,
        flexDirection: "row",
       
        
    },
    butBottomNav:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        
    },
    imgBottomNav:{
        width:25,
        height:25,
        tintColor: '#FFF'
    },
    bottomNavigation: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        alignItems: "center",
        backgroundColor: "#e0195c",
        width: "100%",
        height: 50,
    },


    card: {
        marginLeft: 25,
        backgroundColor: "#FFF",
        width: 130,
        height: 190,
        borderRadius: 20,
        elevation: 20,
        marginBottom: 6,
        display: "flex",
        alignContent: "space-between",
        alignItems: "center",
    },
    cardPrincipal: {
        marginLeft: 25,
        backgroundColor: "#E0195C",
        width: 130,
        height: 190,
        borderRadius: 20,
        elevation: 20,
        display: "flex",
        alignContent: "space-between",
        alignItems: "center",
        
    },
    tituloCardPrincipal: {
       
        fontSize: 18,
        color: "#FFF",
        marginTop:8,
        fontWeight: "700",
        
    },
    tituloCard: {
        fontSize: 18,
        color: "#000",
        marginTop:8,
        fontWeight: "700",
        alignContent: "center",
        alignSelf: "center",
        textAlign: "center",
    },
    imgCardPrin: {
        width: 50,
        height: 50,
        marginTop: 40,
        tintColor: "#FFF",
    },
    imgCard: {
        width: 50,
        height: 50,
        marginTop: 40,
        tintColor: "#000",
    },
    imgProxPrin:{
        width: 30,
        height: 30,
        marginTop: 8,
        tintColor: "#FFF",
    },
    imgProx:{
        width: 30,
        height: 30,
        marginTop: 8,
        tintColor: "#000",
    },

    textContainerTelegramDescription: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF"
    },
    subTextTelegramDescription: {
        fontFamily: "Montserrat-Bold",
        letterSpacing: -0.5,
        fontSize: 18,
        textAlign: "center",
        width: "90%", 
        marginTop: 30
    },
    textTelegramDescription: {
        fontFamily: "Montserrat-Bold",
        letterSpacing: -0.5,
        fontSize: 18,
        textAlign: "center",
        width: "90%", 
        marginTop: 30,
        color: "#e0195c",
    },
    textInputTelegramDescription: {
        backgroundColor: "#FFF",
        width: "90%",
        borderWidth: 1,
        marginTop: 30,
    },
    buttonTelegramDescription: {
        marginTop: 30,
        width: "90%",
        backgroundColor: "#e0195c",
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 30,
        
    }
});
export default styles;