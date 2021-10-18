import express from 'express'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, verifyPasswordResetCode, confirmPasswordReset  } from "firebase/auth";
import * as EJS from "ejs";

const port = 3000
var novaSenha = '';
const app2 = express()

//app2.use(express.static('./static/views'))


app2.set('view engine','ejs');
app2.set('views','./static');
app2.use(express.static('./static'))

app2.get('/', (req, res) => {
  
    res.render('./views/index.ejs')
})


var resp = ' ';

app2.get('/troca', (req, res) => {

  res.render('./views/index.ejs')

    novaSenha = req.query.newPassword; 
    const auth = getAuth()
    handleResetPassword(auth, req.query.oobCode, null, req.query.lang)
      // Password reset has been confirmed and new password updated.
    

      
  });
 
  
  


const firebaseConfig = {
  apiKey: "AIzaSyDE8-xc2Fe3qkfgKb4IF4DeatamdyywQHo",
  authDomain: "loginfirebase-a94ac.firebaseapp.com",
  databaseURL: "https://loginfirebase-a94ac-default-rtdb.firebaseio.com",
  projectId: "loginfirebase-a94ac",
  storageBucket: "loginfirebase-a94ac.appspot.com",
  messagingSenderId: "557587465657",
  appId: "1:557587465657:web:b40534850461d93a882268",
  measurementId: "G-D2X1BVFYL6"
};   
// Initialize Firebase
const app = initializeApp(firebaseConfig);




function handleResetPassword(auth, actionCode, continueUrl, lang) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  console.log('senha alterada com sucesso')
  // Verify the password reset code is valid.
  verifyPasswordResetCode(auth, actionCode).then((email) => {
    const accountEmail = email;
      const newPassword = novaSenha;

    // Save the new password.
    confirmPasswordReset(auth, actionCode, newPassword).then((res) => {
     resp = res;
     console.log(resp)
    }).catch((error) => {
      // Error occurred during confirmation. The code might have expired or the
      // password is too weak.
      console.log('nao sei ' + error)
    });
  }).catch((error) => {
    console.log(error)
    // Invalid or expi  red action code. Ask user to try to reset the password
    // again.
  });
  
}
app2.listen(port, () => {
    console.log(`Server is running at localhost:${port}`)
   
  })
  