function getBotResponse(input) {
    //rock paper scissors
    if (input == "rock") {
        return "paper";
    } else if (input == "paper") {
        return "scissors";
    } else if (input == "scissors") {
        return "rock";
    }

    var inputArrumado = input.toLowerCase();
  
    // Simple responses
    if (inputArrumado.localeCompare('olá') == 0 || inputArrumado.localeCompare('ola')==0 || inputArrumado.localeCompare('oi')==0 || inputArrumado.localeCompare('eae')==0 ) {
       return "Olá!";
    }

    else if (inputArrumado.localeCompare('salve') == 0) {
        return "Salve minha cria";
    } 

    

    else if (inputArrumado.localeCompare('bom dia') == 0) {
      
        return "Bom dia!";
    } 

    else if (inputArrumado.localeCompare('boa tarde') == 0) {
    
        return "Boa tarde!";
    } 

    else if (inputArrumado.localeCompare('boa noite') == 0) {
   
        return "Boa noite!";
        
    } 

    
    else if (inputArrumado.localeCompare('tchau') == 0) {
   
        return "Até uma próxima, sempre que precisar pode entrar em contato comigo!";
    } 
    
    else {
        return "Tente perguntar algo que eu consiga responder. Se não souber o que perguntar digite 'help' para ter acesso aos comandos";
        
    }
}