<?php


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// If necessary, modify the path in the require statement below to refer to the
// location of your Composer autoload.php file.
require 'vendor/autoload.php';

// Replace sender@example.com with your "From" address.
// This address must be verified with Amazon SES.
$sender = 'info@provisionevents.co.uk';
$senderName = 'Provision Events';


// Replace smtp_username with your Amazon SES SMTP user name.
$usernameSmtp = 'AKIA5YBRSK7ZTRLQLN5D';

// Replace smtp_password with your Amazon SES SMTP password.
$passwordSmtp = 'BDXSDYn7u56Xsb5uyO0if9F6Xhc1QFB0zqge/nMsQbDu';
$host = 'email-smtp.us-east-1.amazonaws.com';
$port = 2587;



// Escape user inputs for security
$clientName = $_GET['clientName'];
$clientEmail = $_GET['clientEmail'];

date_default_timezone_set("Europe/London");

$date = date("Y-m-d H:i:s");


$subject = "Provision Events | Terms and conditions ";
$bodyText = "Thanks for your registration, Please read the terms and conditions.";

$variables['clientName'] = $clientName;
$variables['clientEmail'] = $clientEmail;


$message = file_get_contents("terms-email.html");

foreach ($variables as $key => $value) {
    $message = str_replace('{{ ' . $key . ' }}', $value, $message);
}

$recipient = $clientEmail;
$mail = new PHPMailer(true);
try {
    // Specify the SMTP settings.
    $mail->isSMTP();
    $mail->setFrom($sender, $senderName);
//                    $mail->SMTPDebug = 4;
    $mail->Username = $usernameSmtp;
    $mail->Password = $passwordSmtp;
    $mail->Host = $host;
    $mail->Port = $port;
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'TLS';

    // Specify the message recipients.
    $mail->addAddress($recipient);
    // You can also add CC, BCC, and additional To recipients here.
    // Specify the content of the message.
    $mail->isHTML(true);
//                    $message = file_get_contents("email.html");

    $mail->Subject = $subject;
    $mail->Body = $message;
    $mail->AltBody = $bodyText;
    $mail->Send();
    $mailSent = "Sent";
    echo 'Email sent';
} catch (phpmailerException $e) {
    echo "An error occurred. {$e->errorMessage()}", PHP_EOL; //Catch errors from PHPMailer.
} catch (Exception $e) {
    echo "Email not sent. {$mail->ErrorInfo}", PHP_EOL; //Catch errors from Amazon SES.
}




?>