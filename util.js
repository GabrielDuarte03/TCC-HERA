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