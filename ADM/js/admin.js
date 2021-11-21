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

function addItem(nome,email,dataNas,telefone,cpf){
  var tr = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");
  lista.push([nome,email,dataNas,telefone,cpf]);
  ++numeroAdmins;
  td1.innerHTML = nome;
  td2.innerHTML = email;
  td3.innerHTML = dataNas;
  td4.innerHTML = telefone;
  td5.innerHTML = cpf;
  aux = String(cpf);
  var controDiv = document.createElement("td");
  var controDiv2 = document.createElement("td");
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tbody.appendChild(tr);
  controDiv.innerHTML=
  '<button type="button" style="width:2%; padding-right:30%" class="btn btn-primary my-2" data-toggle="modal" data-target="#exampleModal" onclick="FillTboxes1('+numeroAdmins+')">🗑</button>';
  controDiv2.innerHTML +=
  '<button type="button" style="width:2%; padding-right:33%" class="btn btn-primary my-2" data-toggle="modal" data-target="#exampleModal" onclick="FillTboxes2('+numeroAdmins+')">🖉</button>';
  tr.appendChild(controDiv2);
  tr.appendChild(controDiv);
  tbody.appendChild(tr);

}

var modName= document.getElementById('nomeMod');
var modEmail= document.getElementById('emailMod');
var modDataNas= document.getElementById('dataMod');
var modTelefone= document.getElementById('telefoneMod');
var modCpf= document.getElementById('cpfMod');
var btnEdit= document.getElementById('upModBtn');
var btnDel= document.getElementById('delModBtn');

function FillTboxes2(index){
 --index;
 modName.value=lista[index][0];
 modEmail.value=lista[index][1];
 modDataNas.value=lista[index][2];
 modTelefone.value=lista[index][3];
 modCpf.value=lista[index][4];
 btnDel.style.display='none';
 btnEdit.style.display='inline-block';
 
}
function FillTboxes1(index){
  --index;
  modName.value=lista[index][0];
  modEmail.value=lista[index][1];
  modDataNas.value=lista[index][2];
  modTelefone.value=lista[index][3];
  modCpf.value=lista[index][4];
  btnEdit.style.display='none';
  btnDel.style.display='inline-block';
}
function edit() {
  const id = modEmail.value;
  updateAdmin(id, {
    nome: modName.value,
    email:modEmail.value,
    dataNascimento:modDataNas.value,
    telefone:modTelefone.value,
    cpf:modCpf.value
    
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
    addItem(element.nome,element.email,element.dataNascimento,element.telefone,element.cpf);
  });
}


window.onload = pegaOsDados();











