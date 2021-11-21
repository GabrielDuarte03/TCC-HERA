const formulario1 = document.getElementById("campo1");
const formulario2 = document.getElementById("campo2");
const formulario3 = document.getElementById("tbody1");

const saveAdmin = async (nome, email, cpf, datansc, telefone) =>{
  const senha = formulario1["password"].value;
  await firebase.auth().createUserWithEmailAndPassword(email, senha).then(userCredential =>{
    db.collection("Administrador").doc(email).set({
      nome: nome,
      email: email,
      cpf: cpf,
      dataNascimento: datansc,
      telefone: telefone,
    }).then(()=>{
     sucessoCriarConta(nome);
   }).catch(error =>{
    erro(String(error));
  })
 }).catch(error =>{
  erro(String(error));
})
}


formulario1.addEventListener("submit", async (e) => {
  e.preventDefault();
  if(nome.value ==""){
    erroNome();
  }
  else{
    try {
      await saveAdmin(nome.value, email.value, cpf.value, datansc.value, telefone.value);
      
      formulario1.reset();
    } catch (error) {
      erro(String(error));
    }
  }
});

