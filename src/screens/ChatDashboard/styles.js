import { StyleSheet, Dimensions} from "react-native";

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
      fontSize: 30
    },
    insideContainer: {
      width: Dimensions.get('window').width,
      height: '80%',
      backgroundColor: "#fff",
      borderTopLeftRadius: 45,
      borderTopRightRadius: 45,
      padding: 30,
      elevation: 50,

    },
    butBottomNav:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: "center",
      justifyContent: "center",
      
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
  imgBottomNav:{
      width:25,
      height:25,
      tintColor: '#FFF'
  },
    title: {
      marginTop: 20,
      marginBottom: 30,
      fontSize: 28,
      fontWeight: '500'
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
    row: {
      paddingRight: 10,
      paddingLeft: 5,
      paddingVertical: 5,
      flexDirection: 'row',
      alignItems: 'center'
    },
    content: {
      flexShrink: 1
    },
    header: {
      flexDirection: 'row'
    },
    nameText: {
      fontWeight: '600',
      fontSize: 18,
      color: 'gray',
      fontFamily: "Montserrat-Bold",
    },
    dateText: {},
    contentText: {
      color: '#949494',
      fontSize: 16,
      marginTop: 2,
      fontFamily: "Montserrat-Regular",
      letterSpacing: -0.5
    }
  })
  export default styles;