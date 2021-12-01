const db = firebase.firestore();
const taskForm = document.getElementById("campo1");
const tasksContainer = document.getElementById("campo2");
var usuarios = 0;
var cpf=0;
let editStatus = false;
let id = '';

const getUsers = () => db.collection("Usuarias").get();
const onGetUsers = (callback) => db.collection("Usuarias").orderBy('nome').onSnapshot(callback);
const deleteUser = (id) => db.collection("Usuarias").doc(id).delete();
const getUser = (id) => db.collection("Usuarias").doc(id).get();
const updateUser = (id, updateUser) => db.collection('Usuarias').doc(id).update(updateUser);

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
var modData= document.getElementById('dataMod');
var modTelefone= document.getElementById('telefoneMod');
var modCpf= document.getElementById('cpfMod');

var btnEdit= document.getElementById('upModBtn');
var btnDel= document.getElementById('delModBtn');

function AddItemsToTheTable(usuariasLista){
  tbody.innerHTML="";
  usuariasLista.forEach(element =>{
    addItem(element.nome,element.email,element.datanascimento,element.telefone,element.cpf);
  });

}
function FillTboxes2(index){
 --index;
 modName.value=lista[index][0];
 modEmail.value=lista[index][1];
 modData.value=lista[index][2];
 modTelefone.value=lista[index][3];
 modCpf.value=lista[index][4];
 btnEdit.style.display='none';
  btnDel.style.display='inline-block';
 
}
function FillTboxes1(index){
  --index;
  modName.value=lista[index][0];
  modEmail.value=lista[index][1];
  modData.value=lista[index][2];
  modTelefone.value=lista[index][3];
  modCpf.value=lista[index][4];
  btnEdit.style.display='none';
  btnDel.style.display='inline-block';
  
}
function edit() {
  const id = modCpf.value;
  updateUser(id, {
    nome: modName.value,
    email:modEmail.value,
    datanascimento: modData.value,
    telefone: modTelefone.value
  });
  setTimeout(function(){editadoSucesso(); }, 200);;
}
function del(){
  const id = aux;
  deleteAdmin(id);
  alert("ATÉ AQUI TA INDO");
  setTimeout(function(){exclusaoSucesso();}, 200);;
}
window.onload = pegaOsDados();