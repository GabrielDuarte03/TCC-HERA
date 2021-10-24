import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {  
    width: '100%',
    height: '100%',
    backgroundColor: '#e0195c',
    display: 'flex',  
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  containerNews: {
    width: '100%',  
    height: '90%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 45,  
    borderTopRightRadius: 45,
    padding: 10,  
    elevation: 50,
  },
  headText:{
    padding: 20,
    color: "#fff",
    fontFamily: "Montserrat-Bold",
    fontSize: 30
  },
});


export default styles;  
