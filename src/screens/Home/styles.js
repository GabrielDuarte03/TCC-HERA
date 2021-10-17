import {Dimensions, StyleSheet} from "react-native";
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: 'space-between',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        fontFamily: "Bahnscrift",
    },
    mae:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: '100%',
        marginLeft: 20,
        marginTop: 5,

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
        width: 330,
        height: "45%",
        fontFamily: "Bahnscrift",
        marginBottom: 25
    },
    categoriesContainer: {
        width: Dimensions.get('window').width,
        marginTop: 10,  
        height: 300
    },
    cardContainer: {
        width: '102%',
        display: "flex",
        flexDirection: "row",
        marginLeft: -10
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
    }
   
});
export default styles;