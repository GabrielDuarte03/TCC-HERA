const db = firebase.firestore();
const taskForm = document.getElementById("campo1");
const tasksContainer = document.getElementById("campo2");
var usuarios = 0;

let editStatus = false;
let id = '';

const getUsers = () => db.collection("Usuarias").get();
const onGetUsers = (callback) => db.collection("Usuarias").orderBy('nome').onSnapshot(callback);
const deleteUser = (id) => db.collection("Usuarias").doc(id).delete();
const getUser = (id) => db.collection("Usuarias").doc(id).get();

function pegaOsDados(){
 onGetUsers((querySnapshot)=>{
  var usuarias=[];
  querySnapshot.forEach(doc => {
    usuarias.push(doc.data());
  });
  AddItemsToTheTable(usuarias);
});  
}

function pegaOsDadosTempoReal(){
 onGetUsers ((querySnapshot)=>{
  var usuarias=[];
  querySnapshot.forEach(doc => {
    usuarias.push(doc.data());
  });
  AddItemsToTheTable(usuarias)
});
}

var numeroUsuarios=0;
var tbody= document.getElementById("tbody1");

function addItem(nome,email,dataNas,telefone){
  var tr = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");
  var td6 = document.createElement("td");

  td1.innerHTML = nome;
  td2.innerHTML = email;
  td3.innerHTML = dataNas;
  td4.innerHTML = telefone;
  td5.innerHTML =  `
  <button class="btn btn-secondary btn-edit" data-id="">
  🖉 Editar
  </button>`;
  td6.innerHTML = `
  <button class="btn btn-primary btn-delete" data-id="">
  🗑 Deletar
  </button>`;
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);
  tbody.appendChild(tr);

}

function AddItemsToTheTable(usuariasLista){
  tbody.innerHTML="";
  usuariasLista.forEach(element =>{
    addItem(element.nome,element.email,element.datanascimento,element.telefone);

  });
}
window.onload = pegaOsDados();


window.addEventListener("DOMContentLoaded", async (e) => {
  onGetUsers((querySnapshot)  => {
    querySnapshot.forEach((doc) => {
      const users = doc.data();
      usuarios++;
    });
    alert("Sua Aplicação Tem: "+usuarios+" Usuarios");

    
    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        console.log(e.target.dataset.id);
        try {
          await deleteUser(e.target.dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
      );
  });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = taskForm["nome"];
  const email = taskForm["email"];
  try {
    if (!editStatus) {
      await saveUser(nome.value, email.value);
    } 
    taskForm.reset();
    title.focus();
  } catch (error) {
    console.log(error);
  }
});