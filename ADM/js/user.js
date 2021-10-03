const db = firebase.firestore();

const taskForm = document.getElementById("campo1");
const tasksContainer = document.getElementById("campo2");
var usuarios = 0;

let editStatus = false;
let id = '';

const saveUser = (nome, email) =>
db.collection("Usuarias").doc().set({
  nome,
  email,
});

const getUsers = () => db.collection("Usuarias").get();
const onGetUsers = (callback) => db.collection("Usuarias").orderBy('nome').onSnapshot(callback);
const deleteUser = (id) => db.collection("Usuarias").doc(id).delete();
const getUser = (id) => db.collection("Usuarias").doc(id).get();
const updateUser = (id, updateUser) => db.collection('Usuarias').doc(id).update(updateUser);

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetUsers((querySnapshot) => {
    tasksContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const users = doc.data();
      tasksContainer.innerHTML += `<div class="card card-body mt-2 border-primary">
      <h4 class="h5">Dados Pessoais</h4>
      <hr>
      <p class="h5">Usuaria: ${users.nome}</p>
      <p>Email: ${users.email}</p>
      <p> Data De Nascimento: ${users.datanascimento}</p>
      <p>CPF: ${users.cpf}</p>
      <div>
      <h4 class="h5">Endereço</h4>
      <hr>
      <p>Estado: ${users.estado}</p>
      <p>Cidade: ${users.cidade}</p>
      <p>Bairro: ${users.bairro}</p>
      <p>Cep: ${users.cep}</p>
      <p>Logradouro: ${users.logradouro}</p>
      <p>Complemento: ${users.complemento}</p>
      <p>Numero: ${users.numero}</p>
      <p>Telefone: ${users.telefone}</p>

      <button class="btn btn-primary btn-delete" data-id="${doc.id}">
      🗑 Deletar
      </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
      🖉 Editar
      </button>
      </div>
      </div>`;
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

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getUser(e.target.dataset.id);
          const ref = doc.data();
          taskForm["nome"].value = ref.nome;
          taskForm["email"].value = ref.email;

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Update";

        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = taskForm["nome"];
  const email = taskForm["email"];

  try {
    if (!editStatus) {
      await saveUser(nome.value, email.value);
    } else {
      await updateUser(id, {
        nome: nome.value,
        email: email.value,
      })

      editStatus = false;
      id = '';
      taskForm['btn-task-form'].innerText = 'Save';
    }

    taskForm.reset();
    title.focus();
  } catch (error) {
    console.log(error);
  }
});
