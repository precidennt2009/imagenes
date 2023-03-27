<?php
$nombre = $_POST['username'];
echo $nombre;
/*CONECTAR CON LA BASE DE DATOS*/
$mysqli = new mysqli("127.0.0.1", "root", "robotica", "imagenes", 3306);
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
/*VALIDAR INGRESO DEL USUARIO*/

$result = $db->query("Call validar_usuario($_POST['username'], $_POST['password'])");
while ($row = $result->fetch_assoc())
{
    var_dump($row);
}

header ("Location: ../index.html");

?>