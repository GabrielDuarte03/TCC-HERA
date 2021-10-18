function erroLogar(){
  swal({
    title: "Erro Ao Tentar Entrar!",
    text: "Email ou Senha Inválidos!",
    icon: "error",
    button: "OK!",
  });
}
function erroMandarEmailNaoEncontrado(){
  swal({
    title: "Email Não Encontrado!",
    text: "Verifique seu email novamente",
    icon: "error",
    button: "OK!",
  });
}
function sucessoMandarEmail(){
  swal({
    title: "Email Enviado Com Sucesso!",
    text: "Email Enviado Com Sucesso!",
    icon: "success",
    button: "OK!",
  });
}
function sucessoCriarConta(nome){
  swal({
    title: "Conta Criada Com Sucesso!",
    text: "Agora "+nome+" é um(a) administrador(a) ",
    icon: "success",
    button: "OK!",
  });
}

function editadoSucesso(){
  swal({
    title: "Sucesso!",
    text: "Conta editada com sucesso",
    icon: "success",
    button: "OK!",
  });
}


function exclusaoSucesso(){
  swal({
    title: "Sucesso!",
    text: "Conta excluida com sucesso",
    icon: "success",
    button: "OK!",
  });
}
function erroNome(){
  swal({
    title: "Erro Ao Tentar Criar Administrador!",
    text: "Insira um nome para o administrador",
    icon: "error",
    button: "OK!",
  });
}
function erro(tipoErro){
  if (tipoErro == "Error: The email address is badly formatted."){
    swal({
      title: "Erro Ao Tentar Criar Administrador!",
      text: "Este email não é valido, por favor, insira um email valido",
      icon: "error",
      button: "OK!",
    });
  }
  else if (tipoErro == "Error: The password must be 6 characters long or more."){
   swal({
    title: "Erro Ao Tentar Criar Administrador!",
    text: "A senha precisa ter no minimo 6 caracteres",
    icon: "error",
    button: "OK!",
  });
 }
 else if(tipoErro == "Error: The email address is already in use by another account."){
  swal({
    title: "Erro Ao Tentar Criar Administrador!",
    text: "O email selecionado já está em uso",
    icon: "error",
    button: "OK!",
  });
}
}
