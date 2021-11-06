import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {  
    width: '100%',
    height: '100%',
    display: 'flex',  
    flexDirection: 'column',
  },

  option1: {
    borderBottomWidth: 1,
    marginTop: 5,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    borderColor: '#c4c4c4',
    justifyContent: "space-between",
  },
  option2: {
    borderBottomWidth: 1,
    borderColor: '#c4c4c4',
    marginTop: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 17,
    marginBottom: 5,
    fontFamily: 'Montserrat-Bold',
  },
  sub: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Montserrat-Regular',
    letterSpacing: -0.5
  }
});

export default styles;