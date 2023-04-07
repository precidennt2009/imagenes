<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Búsqueda de imágenes en Pixabay</title>
  <!--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">-->
  <link rel="stylesheet" href="../css/inicial.css">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="../js/inicial.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</head>
<body style="background-image: url('../imagenes/fondo1difuminado.png');background-position: center center; background-size: cover;">
<?php
    session_start();
    if (isset($_SESSION['username'])) {
       // carga la página web
    } else {
       // redirige a una página de error o muestra un mensaje informativo
       header('Location: ../index.php');
       exit();
    }
?>
<!--Modales-->
<div class="modal fade" id="modal_multiproposito" tabindex="-1" aria-labelledby="modal_multiproposito" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content" id="id-modal-content">
      <!--Contenido del modal-->
    </div>
  </div>
</div>
<!--Fin Modales-->
<!--Toast-->
<div aria-live="polite" aria-atomic="true" class="bg-dark position-relative bd-example-toasts" ata-bs-delay="1000" style="z-index: 1000; bottom: -100px;" >
  <div class="toast-container position-absolute top-0 end-0 p-3" id="toastPlacement">
    <div class="toast" id="myToast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <!--<img src="../imagenes/icono2.png" class="rounded me-2" alt="...">-->
        <strong class="me-auto">Mensaje Market Pixabay</strong>
        <small id="horatoast">.</small>
      </div>
      <div class="toast-body" id="Mensajetoast">
      </div>
    </div>
  </div>
</div>
<!--Fin Toast-->
    <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar" style="opacity:1">
            <div class="sidebar-header">
                <h3>Market Pixabay</h3>
            </div>
            <figure class="figure">
            <img src="https://cdn-icons-png.flaticon.com/512/6073/6073873.png" class="card-img-top" onclick="modal_mostrarimagen(this.src)" style="cursor: pointer">
            <figcaption class="figure-caption text-end"><b>
            <?php 
            session_start();
            echo $_SESSION['nombre']; 
            ?></b>
            </figcaption>
            </figure>

            <ul class="list-group">
                <?php
                
                $dbname='imagenes';
                $user='root';
                $password='robotica';
                try {
                    $dsn = "mysql:host=localhost;dbname=$dbname";
                    $dbh = new PDO($dsn, $user, $password);
                    //echo "Ingreso correctamente";
                } catch (PDOException $e){
                    echo $e->getMessage();
                }
                $identificacion = $_SESSION['username'];
                //echo $identificacion;
                $stmt = $dbh->prepare("SELECT r.descripcion as rol, mr.menu as menu, mr.funcion_menu as funcion_menu  FROM USUARIO u, ROL r, MENU_ROL mr WHERE u.identificacion=:identificacion and r.id_rol=u.tipo_rol and mr.tipo_rol=r.id_rol ORDER BY mr.orden ASC");
                $stmt->bindValue(":identificacion", $identificacion);
                //$identificacion = $_POST['username'];
                //Excecute
                $stmt->execute();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                  //echo "rol: " . $row['rol'] . "<br>";
                  //echo "<a href='#about'>".$row['menu']."</a>";
                  echo "<li><a class='list-group-item list-group-item-action active' role='tab' href='#' id=".$row['menu']." onclick=cargar_".$row['funcion_menu']."()>".$row['menu']." </a></li>";
                }
                ?>
            </ul>
        </nav> 
        <!-- Page Content  -->
        <div id="content">
            <nav class="navbar navbar-expand-lg navbar-light bg-light" style="opacity:0.8">
                <div class="container-fluid" style="opacity:1">
                    <button type="button" id="sidebarCollapse" class="btn btn-info">
                        <i class="fas fa-align-left"></i>
                        <span>Menu</span>
                    </button>
                </div>
                <div class="container-fluid" id="section_search">
                <!--Seccion para cargar el buscador de imagenes-->
                </div>
            </nav>    
            <div id="mycontentdiv" style="height:400px; width: 100%; ">
            <!--Contenedor para cargue de informacion-->
            </div>
        </div>
    </div>
<!-- Nav tabs -->
</body>
</html>
