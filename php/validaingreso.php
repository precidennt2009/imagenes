<?php
$nombre = $_POST['username'];
echo $nombre;
/*CONECTAR CON LA BASE DE DATOS*/
$mysqli = new mysqli("127.0.0.1", "root", "robotica", "imagenes", 3306);
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    header ("Location: ../index.html");
}
else{
    /*VALIDAR INGRESO DEL USUARIO*/
    $consulta="CALL VALIDAR_INGRESO('".$_POST['username']."','".$_POST['password']."')";
    echo $consulta;
    $result=$mysqli->query($consulta);
    $r = $result->fetch_array();
    if($r["NUSUARIOS"]==1){
        session_start();
        $_SESSION['username']=$_POST['username'];
        $_SESSION['nombre']=$r["NOMBRE"];
        header ("Location: ../php/inicial.php");
    }
    else{
        $_SESSION['error_ingreso']="Usuario o Password Incorrectos";
        header ("Location: ../index.php");
    }
}
?>