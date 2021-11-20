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
    if (inputArrumado.localeCompare('olá') == 0 || inputArrumado.localeCompare('ola')==0  || inputArrumado.localeCompare('oi')==0 || inputArrumado.localeCompare('eae')==0 ) {
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

    else if (inputArrumado.localeCompare('help') == 0 || inputArrumado.match("ajuda") || inputArrumado.match("help")) {

        return "Você pode me perguntar: <br> --> O que é a HERA? <br> --> Como faço para ter a HERA? <br> --> Qual o valor da HERA? <br> --> Quem são os criadores da HERA?";

    } 

    else if (inputArrumado.localeCompare('o que é a hera?') == 0) {

        return "A HERA é a pulseira que juntamente com o aplicativo tem o intuito de diminuir os casos de violência contra a mulher";

    } 

    else if (inputArrumado.localeCompare('como faço para ter a hera?') == 0) {

        return "Primeiramente, você deve instalar o nosso app pela Play Store, e logo após, realizar seu cadastro. Assim que isso for feito você seleciona o plano que deseja e poderá começar a usar nossa aplicação.";

    } 


    else if (inputArrumado.localeCompare('qual o valor da hera?') == 0) {

        return "Hoje a Hera possui 2 tipos de pacote: <br><br> --> <strong>HERA Free: Gratuito </strong> <br> Como o próprio nome diz, o plano é gratuito e você terá acesso ao nosso app, porém não receberá a pulseira e terá seu número de anjos cadastrados limitados <br><br> --> <strong>HERA Prime: R$ 59,99 </strong> <br> Nesse plano você receberá a nossa pulseira que funcionará em conjunto ao aplicativo para te garantir ainda mais segurança no seu dia-a-dia, além disso o seu cadastro de anjos da guarda serão ilimitados. Para este pacote temos 3 subdivisões, onde você vai escolher o tempo da sua assinatura, são elas: <br>HERA Light: 8,99 (mensal) <br> HERA Pro: 19,99  (trimestral) <br> HERA Premium: 59,99 (anual) ";

    }

    else if (inputArrumado.localeCompare('quem são os criadores da hera?') == 0) {

    return "A HERA foi criada pela empresa de soluções tecnológicas INSIGHT, você pode visitar o site da empresa através do link: <a href='../insight' style='color: #e0195c' > INSIGHT </a>";
    } 

    else if (inputArrumado.localeCompare('obrigado') == 0 ||inputArrumado.localeCompare('muito obrigado')== 0 || inputArrumado.localeCompare('obrigada') == 0 ||inputArrumado.localeCompare('muito obrigada')== 0 ) {

        return "Por nada, é sempre um prazer atender você!";
    } 



    else if (inputArrumado.localeCompare('eu amo a hera!') == 0) {

        return "💗";
    } 


    else if (inputArrumado.localeCompare('tchau') == 0) {

        return "Até uma próxima, sempre que precisar pode entrar em contato comigo!";
    } 

    else if(inputArrumado.match("valor") || inputArrumado.match("preço")|| inputArrumado.match("custo") || inputArrumado.match("quanto")){                 
        return "Hoje a Hera possui 2 tipos de pacote: <br><br> --> <strong>HERA Free: Gratuito </strong> <br> Como o próprio nome diz, o plano é gratuito e você terá acesso ao nosso app, porém não receberá a pulseira e terá seu número de anjos cadastrados limitados <br><br> --> <strong>HERA Prime: R$ 59,99 </strong> <br> Nesse plano você receberá a nossa pulseira que funcionará em conjunto ao aplicativo para te garantir ainda mais segurança no seu dia-a-dia, além disso o seu cadastro de anjos da guarda serão ilimitados. Para este pacote temos 3 subdivisões, onde você vai escolher o tempo da sua assinatura, são elas: <br>HERA Light: 8,99 (mensal) <br> HERA Pro: 19,99  (trimestral) <br> HERA Premium: 59,99 (anual) ";            
    }

    else if(inputArrumado.match("criadores") || inputArrumado.match("inventores")|| inputArrumado.match("inventou") || inputArrumado.match("desenvolveu") || inputArrumado.match("desenvolvedores")){                 
        return "A HERA foi criada pela empresa de soluções tecnológicas INSIGHT, você pode visitar o site da empresa através do link: <a href='../insight' style='color: #e0195c' > INSIGHT </a>";            
    }

    else if(inputArrumado.match("valeu") || inputArrumado.match("vlw")|| inputArrumado.match("obg") || inputArrumado.match("tmj") || inputArrumado.match("tamo junto")){                 
        return "Por nada, é sempre um prazer atender você!";            
    }

    else if(inputArrumado.match("como") || inputArrumado.match("baixar")|| inputArrumado.match("ter") || inputArrumado.match("comprar") || inputArrumado.match("obter")){                 
        return "Primeiramente, você deve instalar o nosso app pela Play Store, e logo após, realizar seu cadastro. Assim que isso for feito você seleciona o plano que deseja e poderá começar a usar nossa aplicação.";          
    }

    else if(inputArrumado.match("o que é") || inputArrumado.match("definição")|| inputArrumado.match("defina") ){                 
        return "A HERA é a pulseira que juntamente com o aplicativo tem o intuito de diminuir os casos de violência contra a mulher";          
    }

    else {
        return "Tente perguntar algo que eu consiga responder. Se não souber o que perguntar digite 'help' para ter acesso aos comandos";

    }
}

