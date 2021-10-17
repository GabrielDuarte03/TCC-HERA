const db = firebase.firestore();
const formulario1 = document.getElementById("campo1");
const formulario2 = document.getElementById("campo2");

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
      alert('Conta Criada Com Sucesso');
    }).catch(error =>{
      alert(error);
    })
      }).catch(error =>{
        alert(error);
      })
}



const getAdmins = () => db.collection("Administrador").get();
const onGetAdmin= (callback) => db.collection("Administrador").onSnapshot(callback);
const deleteAdmin = (id) => db.collection("Administrador").doc(id).delete();
const getAdmin = (id) => db.collection("Administrador").doc(id).get();
const updateAdmin = (id, updateUser) => db.collection('Administrador').doc(id).update(updateUser);

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetAdmin((querySnapshot) => {
    formulario2.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const users = doc.data();

      formulario2.innerHTML += `<div class="card card-body mt-2 border-primary">
      <p class="h5">Usuaria: ${users.nome}</p>
      <p>Email: ${users.email}</p>
      </div>
      <button class="btn btn-primary btn-delete" data-id="${doc.id}">
      🗑 Deletar
      </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
      🖉 Editar
      </button>
      </div>
      </div>`;
    });
    

    const btnsDelete = formulario2.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        console.log(e.target.dataset.id);
        try {
          await deleteAdmin(e.target.dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
      );

    const btnsEdit = formulario2.querySelectorAll(".btn-edit");
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









