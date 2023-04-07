<?php
session_start();
$nombre = $_SESSION['username'];
$funcion = $_POST['funcion'];
/*CONECTAR CON LA BASE DE DATOS*/
$dbname='imagenes';
$user='root';
$password='robotica';
try {
    $dsn = "mysql:host=localhost;dbname=$dbname";
    $dbh = new PDO($dsn, $user, $password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Ingreso correctamente";
} catch (PDOException $e){
    echo $e->getMessage();
    return "Error";
    }
/*Funcion para devolver los usuarios en la base de datos*/
if ($funcion=="administrar"){
    $stmt = $dbh->prepare("SELECT * FROM `USUARIO`");
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($row);
}
/*Funcion para eliminar un usuario*/
if ($funcion=="eliminar"){
    $identificacion=$_POST['identificacion'];
    //echo gettype($identificacion);
    try {
        $stmt = $dbh->prepare("DELETE FROM `USUARIO` WHERE `USUARIO`.`identificacion` = :identificacion");
        $stmt->bindValue(":identificacion", $identificacion);
        $stmt->execute();
        //$row = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo "Operacion de eliminacion exitosa";
    }
    catch( PDOException $Exception){
        echo "Operacion Fallida - ".$Exception->getMessage( ).$Exception->getMessage( );
    }
}
if ($funcion=="actualizar"){
    $identificacion=$_POST['identificacion'];
    $nombre=$_POST['nombre'];
    $apellido=$_POST['apellido'];
    $edad=$_POST['edad'];
    $foto=$_POST['foto'];
    $tipo_documento=$_POST['tipo_documento'];
    $tipo_rol=$_POST['tipo_rol'];
    $password=$_POST['password'];
    //echo gettype($identificacion);
    //UPDATE `USUARIO` SET `identificacion` = :$identificacion, `nombre` = :$nombre, `apellido` = :$apellido, `edad` = :$edad, `foto` = :$foto, `tipo_documento` = :$tipo_documento, `tipo_rol` = :$tipo_rol, `password` = :$password  WHERE `USUARIO`.`identificacion` = :$identificacion;
    try {
        $stmt = $dbh->prepare("UPDATE `USUARIO` SET `nombre` = :nombre, `apellido` = :apellido, `edad` = :edad, `foto` = :foto, `tipo_documento` = :tipo_documento, `tipo_rol` = :tipo_rol, `password` = :password  WHERE `USUARIO`.`identificacion` = :identificacion");
        $stmt->bindValue(":identificacion", $identificacion);
        $stmt->bindValue(":nombre", $nombre);
        $stmt->bindValue(":apellido", $apellido);
        $stmt->bindValue(":edad", $edad);
        $stmt->bindValue(":foto", $foto);
        $stmt->bindValue(":tipo_documento", $tipo_documento);
        $stmt->bindValue(":tipo_rol", $tipo_rol);
        $stmt->bindValue(":password", $password);
        $stmt->execute();
        echo "Operacion de actualizacion exitosa";
    }
    catch( PDOException $Exception){
        echo "Operacion Fallida - ".$Exception->getMessage( ).$Exception->getMessage( );
    }
    //$row = $stmt->fetchAll(PDO::FETCH_OBJ);
    
}
if ($funcion=="crear"){
    $identificacion=$_POST['identificacion'];
    $nombre=$_POST['nombre'];
    $apellido=$_POST['apellido'];
    $edad=$_POST['edad'];
    $foto=$_POST['identificacion'].".JPG";
    $tipo_documento=$_POST['tipo_documento'];
    $tipo_rol=$_POST['tipo_rol'];
    $password=$_POST['password'];
    $rpassword=$_POST['rpassword'];
    if($password==$rpassword && $password!="" && $tipo_rol!=""){
        //echo gettype($identificacion);
        //INSERT INTO `USUARIO` (`identificacion`, `nombre`, `apellido`, `edad`, `foto`, `tipo_documento`, `tipo_rol`, `password`) VALUES (:identificacion, :nombre, :apellido, :edad, :foto, :tipo_documento, :tipo_rol, :password);
        try {
            $stmt = $dbh->prepare("INSERT INTO `USUARIO` (`identificacion`, `nombre`, `apellido`, `edad`, `foto`, `tipo_documento`, `tipo_rol`, `password`) VALUES (:identificacion, :nombre, :apellido, :edad, :foto, :tipo_documento, :tipo_rol, :password)");
            $stmt->bindValue(":identificacion", $identificacion);
            $stmt->bindValue(":nombre", $nombre);
            $stmt->bindValue(":apellido", $apellido);
            $stmt->bindValue(":edad", $edad);
            $stmt->bindValue(":foto", $foto);
            $stmt->bindValue(":tipo_documento", $tipo_documento);
            $stmt->bindValue(":tipo_rol", $tipo_rol);
            $stmt->bindValue(":password", $password);
            $stmt->execute();
            echo "Operacion de Creacion exitosa";
        }
        catch( PDOException $Exception){
            echo "Operacion Fallida - ".$Exception->getMessage( ).$Exception->getMessage( );
        }
    }
}
/*funcion para actualizar likes y views*/
if ($funcion=="actualizar_likes_views"){
    $accion=$_POST['accion'];
    $id_imagen=$_POST['id_imagen'];
    $identificacion=$_SESSION['username'];
    //echo "Datos: ".$accion."-".$id_imagen."-".$identificacion;
    if($accion!="" && $id_imagen!="" && $identificacion!=""){
        try {
            $stmt = $dbh->prepare("CALL INSERTAR_LIKES_VIEWS(:id_imagen, :identificacion, :accion)");
            $stmt->bindValue(":id_imagen", $id_imagen);
            $stmt->bindValue(":identificacion", $identificacion);
            $stmt->bindValue(":accion", $accion);
            $stmt->execute();
            echo "Operacion de Creacion ".$accion." exitosa";
            //echo "Operacion de Creacion de actualizacion exitosa";
        }
        catch( PDOException $Exception){
            echo "Operacion Fallida - ".$Exception->getMessage( ).$Exception->getMessage( );
        }
    }
}
/*funcion para obtener likes y views*/
if ($funcion=="obtener_likes_views"){
    $id_imagen=$_POST['id_imagen'];
    //echo "Datos: ".$accion."-".$id_imagen."-".$identificacion;
    if($id_imagen!=""){
        try {
            $stmt = $dbh->prepare("CALL OBTENER_LIKES_VIEWS(:id_imagen)");
            $stmt->bindValue(":id_imagen", $id_imagen);
            $stmt->execute();
            $row = $stmt->fetchAll(PDO::FETCH_OBJ);
            echo json_encode($row);
        }
        catch( PDOException $Exception){
            echo "Operacion Fallida - ".$Exception->getMessage( ).$Exception->getMessage( );
        }
    }
}
?>