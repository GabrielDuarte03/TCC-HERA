
firebase.auth().onAuthStateChanged(async (user)=>{
    

    if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    console.log(user.uid);
  
    await db.collection('Administrador').where("email","==",user.email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data().nome)
                nomeAdmin=doc.data().nome
            });
        });
  
    
    
    // ...
  } else {
    // User is signed out
    window.location.href = "index.html";
    // ...
  }

  document.getElementById('email-admin').innerHTML = user.email;
    document.getElementById('nome-admin').innerHTML = nomeAdmin;
    document.getElementById('nome-admin2').innerHTML = nomeAdmin;
  
  
  
  
  
  });