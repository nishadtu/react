<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// If necessary, modify the path in the require statement below to refer to the
// location of your Composer autoload.php file.
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

echo "test 1";

// if($_SERVER['HTTP_REFERER'] === "http://localhost:3000/2022/react/score"){
    echo "test 2";
    $first_name = $_GET['first_name'];
    $last_name = $_GET['last_name'];
    $email = $_GET['email'];
    $steps = $_GET['steps'];
    $score = $_GET['score'];
    // $first_name = isset($_GET['first_name']) ? $_GET['first_name'] : null;
    // $last_name = isset($_GET['last_name']) ? $_GET['last_name'] : null;
    // $email = isset($_GET['email']) ? $_GET['email'] : null;
    // $steps = isset($_GET['steps']) ? $_GET['steps'] : null;
    // $score = isset($_GET['score']) ? $_GET['score'] : null;
    $name = $first_name . " " . $last_name;

    echo "test";
    
    if($first_name && $last_name && $email && $steps && $score){

        require 'vendor/autoload.php';

        $subject = "Provision Design | Score card";
        $bodyText = "Thanks for your registration";

        $variables = array();
        $variables['name'] = $name;
        $variables['email'] = $email;
        $variables['steps'] = $steps;
        $variables['score'] = $score;

        $message = file_get_contents("email.html");

                    foreach ($variables as $key => $value) {
                        $message = str_replace('{{ ' . $key . ' }}', $value, $message);
                    }

                    $recipient = $email;
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
                        echo "You will get the score to your email";
                    } catch (phpmailerException $e) {
                        echo "An error occurred. {$e->errorMessage()}", PHP_EOL; //Catch errors from PHPMailer.
                    } catch (Exception $e) {
                        echo "Email not sent. {$mail->ErrorInfo}", PHP_EOL; //Catch errors from Amazon SES.
                    }
    }
// }








?>