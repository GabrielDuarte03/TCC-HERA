const db = firebase.firestore();
const formulario1 = document.getElementById("campo1");
const formulario2 = document.getElementById("campo2");
const formulario3 = document.getElementById("tbody1");

let editStatus = false;
let id = '';


const saveAdmin = async (nome, email) =>{
  const senha = formulario1["password"].value;
  await firebase.auth().createUserWithEmailAndPassword(email, senha).then(userCredential =>{
    console.log('aqui')
    db.collection("Administrador").doc(email).set({
      nome: nome,
      email: email
    }).then(()=>{
     sucessoCriarConta(nome);
   }).catch(error =>{
    erro(String(error));
  })
 }).catch(error =>{
  erro(String(error));
})
}



const getAdmins = () => db.collection("Administrador").get();
const onGetAdmin= (callback) => db.collection("Administrador").onSnapshot(callback);
const deleteAdmin = (id) => db.collection("Administrador").doc(id).delete();
const getAdmin = (id) => db.collection("Administrador").doc(id).get();
const updateAdmin = (id, updateUser) => db.collection('Administrador').doc(id).update(updateUser);

function pegaOsDados(){
 onGetAdmin((querySnapshot)=>{
  var admins=[];
  querySnapshot.forEach(doc => {
    admins.push(doc.data());
  });
  AddItemsToTheTable(admins);
});  
}

function pegaOsDadosTempoReal(){
 onGetAdmin ((querySnapshot)=>{
  var admins=[];
  querySnapshot.forEach(doc => {
    admins.push(doc.data());
  });
  AddItemsToTheTable(admins)
});
}

var numeroAdmins=0;
var tbody= document.getElementById("tbody1");

function addItem(nome,email){
 onGetAdmin ((querySnapshot)=>{
  var admins=[];
  querySnapshot.forEach(doc => {
    admins.push(doc.data());
  });
});


 var tr = document.createElement("tr");
 var td1 = document.createElement("td");
 var td2 = document.createElement("td");
 var td3 = document.createElement("td");
 var td4 = document.createElement("td");

 onGetAdmin((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const users = doc.data();
    td1.innerHTML = nome;
    td2.innerHTML = email;
    td3.innerHTML =  `
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
      🖉 Editar
      </button>`;
    td4.innerHTML = `
    <button class="btn btn-primary btn-delete" data-id="${doc.id}">
    🗑 Deletar
    </button>`;
  });
});
 tr.appendChild(td1);
 tr.appendChild(td2);
 tr.appendChild(td3);
 tr.appendChild(td4);
 tbody.appendChild(tr);
}

function AddItemsToTheTable(adminsLista){
  tbody.innerHTML="";
  adminsLista.forEach(element =>{
    addItem(element.nome,element.email);
  });
}
window.onload = pegaOsDados();

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetAdmin((querySnapshot) => {
    const btnsDelete = tbody.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
         alert("Rola");
        console.log(e.target.dataset.id);
        try {
          await deleteAdmin(e.target.dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
      );

    const btnsEdit = formulario3.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getAdmin(e.target.dataset.id);
          const ref = doc.data();
          formulario1["nome"].value = ref.nome;
          formulario1["email"].value = ref.email;

          editStatus = true;
          id = doc.id;
          formulario1["botao"].innerText = "Alterar";

        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

formulario1.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = formulario1["nome"].value;

  const email = formulario1["email"].value;

  try {
    if (!editStatus) {

      //await saveAdmin(nome.value, email.value);
      await saveAdmin(nome, email)
      
      
    } else {
      await updateAdmin(id, {
        nome: nome,
        email:email
      })
      editStatus = false;
      id = '';
      formulario1['botao'].innerText = 'Cadastrar';
    }

    formulario1.reset();
  } catch (error) {
    console.log(error);
  }
});
function erroAlert(erro){
  swal({
    title: "Erro",
    text: erro,
    icon: "error",
    button: "OK!",
  });
}









