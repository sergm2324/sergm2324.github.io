<?php

if(isset($_POST['message'])){

	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];
    
	
	$to      = 'sergm2324@mail.ru';
	$subject = 'Site Contact Form';

	$headers = 'From: '. $email . "\r\n" .
    'Reply-To: '. $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

	$status = mail($to, $subject, $message, $headers);

	if($status == TRUE){	
		$res['sendstatus'] = 'done';
	
		//Edit your message here
		$res['message'] = 'Сообщение успешно отправлено';
    }
	else{
		$res['message'] = 'Невозможно отправить сообщение. Пожалуйста напишите мне на почту sergm2324@mail.ru';
	}
	
	
	echo json_encode($res);
}

?>