<?php
//Conectar ao banco de dados
$conn = mysqli_connect('localhost', 'root', 'admin', 'bd_refit');

//Verificar se a conexão foi bem-sucedida
if (!$conn) {
    die('Conexão falhou: ' . mysqli_connect_error());
}

//Salvar os dados no banco de dados
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$sql = "INSERT INTO cliente (name, email,phone) VALUES ('$name', '$email','$phone')";
if (mysqli_query($conn, $sql)) {
    echo "Dados salvos com sucesso!";
    
} else {
    echo "Erro ao salvar os dados: " . mysqli_error($conn);
}
//Fechar a conexão com o banco de dados
mysqli_close($conn);
if(isset($_POST['enviar-formulario-1'])) {
    header('Location: chekout');
} elseif (isset($_POST['enviar-formulario-2'])) {
    header('Location: chekout');
} elseif(isset($_POST['enviar-formulario-3'])) {
    header('Location: chekout');
}
else{
    echo" erro";
}
?>
