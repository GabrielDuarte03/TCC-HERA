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
  img:{
    alignSelf: 'center',
    width: 200,  
    height: 200,
    borderRadius: 1000,
  },

  imagem: {
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



  dadosContainer:{
    width: '100%',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center'

  },
  name: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Montserrat-Bold',
  },
  userTipo: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    marginTop: 10
  },
  statusBT: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    marginTop: 10,
    color: "#e0195c"
  },
  botaoAtualizarDados: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0195c",
    width: 315,
    height: 50,
    borderRadius: 30,
    marginTop: 30
  },
  textoBotaoAtualizarDados:{
    fontSize: 18,
    color: "#fff",
    fontFamily: "Montserrat-Bold",
  },
  botaoDadosDaConta: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0195c",
    width: 315,
    height: 50,
    borderRadius: 30,
    marginTop: 25
  },
  textoBotaoDadosDaConta:{
    fontSize: 18,
    color: "#fff",
    fontFamily: "Montserrat-Bold",
  }
});


export default styles;  
