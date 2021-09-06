<?php

    $nome = $_POST['txName'];
    $email = $_POST['txEmail'];
    $conteudo = $_POST['txMsg'];


    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require '../vendor/autoload.php';

    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->Charset = 'UTF-8';
    $mail->SMTPAuth = true;

    $mail->Username = 'tccinsight@gmail.com';
    $mail->Password = 'tcc@2021';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom('tccinsight@gmail.com', 'Hera');
    $mail->SingleTo = true;

    $mail->addAddress("tccinsight@gmail.com");
    
    $mail->isHTML(true);  
    $mail->Subject = 'HERA';
    $mail->Body = "<html><body><h1> Site HERA</h1>Nome do Usuario(a): $nome<br>Email do Usuario(a): $email</br><br>Mensagem do Cliente:$conteudo</br></body></html>";

    if(!$mail->Send()){
        echo "Erro ao enviar o email:" . $mail->ErrorInfo;
    }else{
        $url='../index.php';
        echo("<META HTTP-EQUIV=REFRESH CONTENT = '0;URL=$url'>");
        exit();
    }


?>