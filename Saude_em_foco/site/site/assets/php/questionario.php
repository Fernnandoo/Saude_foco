
<?php

$servername = "localhost";

$username = "root";

$password = "admin";

$dbname = "bd_refit";


$nome = $_POST['nome'];
$tel = $_POST['tel'];
$email = $_POST['email'];


// Create connection

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection

if ($conn->connect_error) {

  die("Falha na conexão: " . $conn->connect_error);

}

$sql = "INSERT INTO cliente (nome,telefone, email)

VALUES ('$nome','$tel','$email')";


if ($conn->query($sql) === TRUE) {
   echo "Cliente adicionado com sucesso";

} else {

  echo "Error: " . $sql . "<br>" . $conn->error;

}

$conn->close();

?>

