const db = firebase.firestore();


let editStatus = false;
let id = '';

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
var lista=[];

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
 lista.push([nome,email]);
 ++numeroAdmins;
 td1.innerHTML = nome;
 td2.innerHTML = email;
 tr.appendChild(td1);
 tr.appendChild(td2);

 tbody.appendChild(tr);
 var controDiv = document.createElement("td");
 var controDiv2 = document.createElement("td");
 controDiv.innerHTML=
 '<button type="button" class="btn btn-primary my-2" data-toggle="modal" data-target="#exampleModal" onclick="FillTboxes1('+numeroAdmins+')">🗑 Deletar</button>';
 controDiv2.innerHTML +=
 '<button type="button" class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#exampleModal" onclick="FillTboxes2('+numeroAdmins+')"> 🖉 Editar</button>';
 tr.appendChild(controDiv2);
 tr.appendChild(controDiv);
 
 tbody.appendChild(tr);
}

var modName= document.getElementById('nomeMod');
var modEmail= document.getElementById('emailMod');

var btnEdit= document.getElementById('upModBtn');
var btnDel= document.getElementById('delModBtn');

function FillTboxes2(index){
 --index;
 modName.value=lista[index][0];
 modEmail.value=lista[index][1];
 btnDel.style.display='none';
 btnEdit.style.display='inline-block';
}
function FillTboxes1(index){
  --index;
  modName.value=lista[index][0];
  modEmail.value=lista[index][1];
  btnEdit.style.display='none';
  btnDel.style.display='inline-block';
}
function edit() {
  const id = modEmail.value;
  updateAdmin(id, {
    nome: modName.value,
    email:modEmail.value
  });
  setTimeout(function(){editadoSucesso(); }, 200);;
}
function del(){
 const id = modEmail.value;
 deleteAdmin(id);

const user = firebase.auth().currentUser;

user.delete().then(() => {
  // User deleted.
}).catch((error) => {
  // An error ocurred
  // ...
});

setTimeout(function(){exclusaoSucesso();}, 200);;
}

function AddItemsToTheTable(adminsLista){
  tbody.innerHTML="";
  adminsLista.forEach(element =>{
    addItem(element.nome,element.email);
  });
}


window.onload = pegaOsDados();











