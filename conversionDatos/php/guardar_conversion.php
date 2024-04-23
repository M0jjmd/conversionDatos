<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$database = "registro_conversiones"; 

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}

$registro = $_POST['registro'];

$sql = "INSERT INTO guardar_conversion (conversion) VALUES ('$registro')";

if ($conn->query($sql) === TRUE) {
  echo "guardado correctamente";
} else {
  echo "Error al guardar: " . $conn->error;
}

$conn->close();
?>
