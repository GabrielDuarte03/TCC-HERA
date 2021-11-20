import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#e0195c',
    textAlign: 'center',
  },
  insideContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 25,
    textAlign: 'center',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    marginTop: 15,
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'center',
    color: '#fff',
  },
  inputChange: {
    padding: 1
  },
  label:{
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 5, 
  },  
  input: {
    borderWidth: 1,
    borderColor: '#e0195c',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontFamily: 'Montserrat-Regular',
  },
  buttonUpdate: {
    backgroundColor: '#e0195c',
    borderRadius: 30,
    padding: 15,
    marginTop: 10,
    marginBottom: 40,
    alignSelf: 'center',
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonUpdateText: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
  },
});

export default styles;