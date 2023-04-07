//FUNCION PARA BUSCAR Y MOSTRAR LAS IMAGENES CON LA API ENTREGADA
function buscar_imagenes(){
    var query = $('input').val();
    var category=$('#dropdownMenuButton').text()=='none' ? "":$('#dropdownMenuButton').text();
    console.log("Entrando a la funcion de busqueda. Palabra: "+query+" - Categoria: "+category);
    var url = 'https://pixabay.com/api/?key=13119377-fc7e10c6305a7de49da6ecb25&lang=es&q=' + encodeURIComponent(query)+'&category='+category+'';
    $.getJSON(url, function(data) {
      var resultados = '';
      $.each(data.hits, function(index, imagen) {
        if((index % 2)==0){resultados +='<div class="row">'};
          objeto=obtener_likes_views(imagen.id);
          resultados+='<div class="card text-bg-primary mb-3 w-85" style="max-width: 22rem;margin-right: 15px;">';
          resultados+='<div class="card-header"><i>TAGS. '+imagen.tags+'</i></div>';
          resultados+='<div class="card-body" style="padding-top: 5px;">';
          resultados+='<button type="button" id='+imagen.id+' class="btn btn-primary" data-bs-toggle="button" style="padding-top: 0px;padding-bottom: 0px; margin-bottom: 3px;--bs-btn-padding-y: .20rem; --bs-btn-padding-x: .4rem; --bs-btn-font-size: .65rem;" onclick="actualizar_likes_views(this.innerHTML,this.id)">Like</button>';
          resultados+='<span id="like_'+imagen.id+'">'+objeto[0].L+'</span>';
          //resultados+='<div style="height:1px">-</div>';
          resultados+='<button type="button" id='+imagen.id+' class="btn btn-primary" data-bs-toggle="button" style="padding-top: 0px;padding-bottom: 0px; margin-bottom: 3px;--bs-btn-padding-y: .20rem; --bs-btn-padding-x: .4rem; --bs-btn-font-size: .65rem;" onclick="actualizar_likes_views(this.innerHTML,this.id)">View</button>';
          resultados+='<span id="view_'+imagen.id+'">'+objeto[0].V+'</span>';
          resultados+='<figure class="figure"><img src="' + imagen.webformatURL + '" class="card-img-top" onclick="modal_mostrarimagen(this.src)" style="cursor: pointer"><figcaption class="figure-caption text-end">Author. '+imagen.user+'</figcaption></figure>';
          //resultados+='<p class="card-text">'+imagen.user+'</p>';
          resultados+='</div>';
          resultados+='</div>';
      if((index % 2)==1){resultados +='</div>'};
      });
      $('#mycontentdiv').html(resultados);
    });
}
//FUNCION PARA EL JS SIDEBAR INICIAL 
$(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
                console.log("Clickeando");
            });
        });
//FUNCION PARA EXTRAER LA INFORMACION DE LA BASE DE DATOS DE LOS USUARIOS
var objeto=new Object();
function cargar_Administrar(){
  console.log("Ingresando al menu Administrar");
  $.ajax({
    type: "POST",
    url: "../php/inicial/inicial_administrar.php",
    datatype: "json",
    data: {funcion: 'administrar'},
    success: function(data) {
      console.log(data);
      //let cols = Object.keys(JSON.stringfy(data));
      objeto=JSON.parse(data);
      let placeholder = document.getElementById("mycontentdiv");
      let out = "";
      out=`
      <button type="button" id="Crear_Usuario" class="btn btn-info" onclick="modal_crearusuario()">
        <i class="fas fa-align-left"></i><span>Crear Usuario</span>
      </button>
      <table id="example" class="table table-success table-striped caption-top table-sm" style="width:100%">
        <thead>
            <tr>
                <th>Identificacion</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Edad</th>
                <th>Foto</th>
                <th>Eliminar</th>
                <th>Modificar</th>
            </tr>
        </thead>
        <tbody>
      <!-- Prodcuts from javascript file in here. -->
      `;
      for(var i in objeto){
        console.log(i);
          out += `
            <tr>
                <td>${objeto[i].identificacion}</td>
                <td>${objeto[i].nombre}</td>
                <td>${objeto[i].apellido}</td>
                <td>${objeto[i].edad}</td>
                <td>${objeto[i].foto}</td>
                <td onclick=modal_eliminarusuario(`+i+`)>Eliminar</td>
                <td onclick=modal_actualizarusuario(`+i+`)>Actualizar</td>
            </tr>
          `;
       }
       out+=`
        </tbody>
      </table
       `;
       placeholder.innerHTML = out;
      }
  });
}
//////////////////////////////////////////////////////////////////////////////////////
//////////////////LLAMAR MODALES Y FUNCIONES DEL ADMINISTRADOR////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//FUNCION PARA MOSTRAR MODAL DE ELIMINACION DE USUARIO
function modal_eliminarusuario(i){
  console.log("Entrando a modal eliminar usuario");
  var myModal = new bootstrap.Modal(document.getElementById('modal_multiproposito'), {keyboard: false});
  let placeholder = document.getElementById("id-modal-content");
  var contenidomodal=`
  <div class="modal-header">
        <h5 class="modal-title" id="modal_eliminarusuario">Eliminar Usuario</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!--Contenido del modal para eliminar-->
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Identificacion</span>
          <input id="identificacion" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled>
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Nombre</span>
          <input id="nombre" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled>
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Apellido</span>
          <input id="apellido" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled>
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Edad</span>
          <input id="edad" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="eliminar_usuario()">Eliminar</button>
      </div>
      `;
  placeholder.innerHTML = contenidomodal;
  document.getElementById("identificacion").value=objeto[i].identificacion;
  document.getElementById("nombre").value=objeto[i].nombre;
  document.getElementById("apellido").value=objeto[i].apellido;
  document.getElementById("edad").value=objeto[i].edad;
  myModal.show();
}
//FUNCION PARA MOSTRAR MODAL DE ACTUALIZACION DE USUARIO
function modal_actualizarusuario(i){
  console.log("Entrando a modal eliminar usuario");
  var myModal = new bootstrap.Modal(document.getElementById('modal_multiproposito'), {keyboard: false});
  let placeholder = document.getElementById("id-modal-content");
  var contenidomodal=`
  <div class="modal-header">
        <h5 class="modal-title" id="modal_eliminarusuario">Actualizar Usuario</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!--Contenido del modal para eliminar-->
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Identificacion</span>
          <input id="identificacion" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled>
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Nombre</span>
          <input id="nombre" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" >
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Apellido</span>
          <input id="apellido" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" >
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Edad</span>
          <input id="edad" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" >
        </div>
        <div class="input-group input-group-sm mb-3">
          <input class="form-control" type="file" id="formFileimagen">
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">tipo_documento</span>
          <input id="tipo_documento" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" >
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">tipo_rol</span>
          <input id="tipo_rol" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" >
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Password</span>
          <input type="password" class="form-control" id="inputPassword">
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">R. Password</span>
          <input type="password" class="form-control" id="RinputPassword">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="actualizar_usuario()">Actualizar</button>
      </div>
      `;
  placeholder.innerHTML = contenidomodal;
  document.getElementById("identificacion").value=objeto[i].identificacion;
  document.getElementById("nombre").value=objeto[i].nombre;
  document.getElementById("apellido").value=objeto[i].apellido;
  document.getElementById("edad").value=objeto[i].edad;
  document.getElementById("tipo_documento").value=objeto[i].tipo_documento;
  document.getElementById("tipo_rol").value=objeto[i].tipo_rol;
  myModal.show();
}
//FUNCION PARA MOSTRAR MODAL DE CREACION DE USUARIO
function modal_crearusuario(){
  console.log("Entrando a modal crear usuario");
  var myModal = new bootstrap.Modal(document.getElementById('modal_multiproposito'), {keyboard: false});
  let placeholder = document.getElementById("id-modal-content");
  var contenidomodal=`
  <div class="modal-header">
        <h5 class="modal-title" id="modal_eliminarusuario">Crear Usuario</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!--Contenido del modal para eliminar-->
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Identificacion</span>
          <input id="identificacion" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" >
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Nombre</span>
          <input id="nombre" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" >
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Apellido</span>
          <input id="apellido" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" >
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Edad</span>
          <input id="edad" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" >
        </div>
        <div class="input-group input-group-sm mb-3">
          <input class="form-control" type="file" id="formFileimagen">
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">tipo_documento</span>
          <input id="tipo_documento" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" >
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">tipo_rol</span>
          <input id="tipo_rol" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" >
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Password</span>
          <input type="password" class="form-control" id="inputPassword">
        </div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">R. Password</span>
          <input type="password" class="form-control" id="RinputPassword">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="crear_usuario()">Crear</button>
      </div>
      `;
  placeholder.innerHTML = contenidomodal;
  myModal.show();
}
//FUNCION PARA MOSTRAR EL MODAL QUE MUESTRA LA IMAGEN
function modal_mostrarimagen(src){
  //console.log("Entrando a modal mostrar imagen: "+src);
  var myModal = new bootstrap.Modal(document.getElementById('modal_multiproposito'), {keyboard: false});
  let placeholder = document.getElementById("id-modal-content");
  var contenidomodal='<img src="' + src + '" >';
  placeholder.innerHTML = contenidomodal;
  myModal.show();
}
////////////////////////////////////////////////////////
//////////////////LLAMAR FUNCIONES//////////////////////
////////////////////////////////////////////////////////
//FUNCION PARA ELIMINAR USUARIO
function eliminar_usuario(){
  var identificacion=document.getElementById("identificacion").value;
  console.log("Entrando a eliminar usuario "+identificacion);
  var postdata={funcion: 'eliminar', identificacion: identificacion};
  var postdatajson=JSON.stringify(postdata);
    $.ajax({
    type: "POST",
    url: "../php/inicial/inicial_administrar.php",
    datatype: "json",
    data: postdata,
    success: function(data) {
      var myAlert =document.getElementById('myToast');//select id of toast
      var bsAlert = new bootstrap.Toast(myAlert);//inizialize it
      bsAlert.show();//show it
      var currentTime = new Date();
      document.getElementById('horatoast').innerHTML = currentTime.toLocaleTimeString();
      document.getElementById('Mensajetoast').innerHTML=data;
      }
    });
}
//FUNCION PARA ACTUALIZAR USUARIO
function actualizar_usuario(){
  var postdata=[];
  var jsonphpactualizar=document.getElementsByClassName("form-control");
  var postdata = {funcion:'actualizar',
    identificacion:jsonphpactualizar["identificacion"].value,
    nombre:jsonphpactualizar["nombre"].value,
    apellido:jsonphpactualizar["apellido"].value,
    edad:jsonphpactualizar["edad"].value,
    foto:jsonphpactualizar["formFileimagen"].value,
    tipo_documento:jsonphpactualizar["tipo_documento"].value,
    tipo_rol:jsonphpactualizar["tipo_rol"].value,
    password:jsonphpactualizar["inputPassword"].value
    };
  //console.log(postdata);
  var postdatajson=JSON.stringify(postdata);
    $.ajax({
    type: "POST",
    url: "../php/inicial/inicial_administrar.php",
    datatype: "json",
    data: postdata,
    success: function(data) {
      var myAlert =document.getElementById('myToast');//select id of toast
      var bsAlert = new bootstrap.Toast(myAlert);//inizialize it
      bsAlert.show();//show it
      var currentTime = new Date();
      document.getElementById('horatoast').innerHTML = currentTime.toLocaleTimeString();
      document.getElementById('Mensajetoast').innerHTML=data;
      }
    });
}
//FUNCION PARA CREAR USUARIO
function crear_usuario(){
  var postdata=[];
  var jsonphpactualizar=document.getElementsByClassName("form-control");
  var postdata = {funcion:'crear',
    identificacion:jsonphpactualizar["identificacion"].value,
    nombre:jsonphpactualizar["nombre"].value,
    apellido:jsonphpactualizar["apellido"].value,
    edad:jsonphpactualizar["edad"].value,
    foto:jsonphpactualizar["formFileimagen"].value,
    tipo_documento:jsonphpactualizar["tipo_documento"].value,
    tipo_rol:jsonphpactualizar["tipo_rol"].value,
    password:jsonphpactualizar["inputPassword"].value,
    rpassword:jsonphpactualizar["RinputPassword"].value
    };
  //console.log(postdata);
  var postdatajson=JSON.stringify(postdata);
    $.ajax({
    type: "POST",
    url: "../php/inicial/inicial_administrar.php",
    datatype: "json",
    data: postdata,
    success: function(data) {
      var myAlert =document.getElementById('myToast');//select id of toast
      var bsAlert = new bootstrap.Toast(myAlert);//inizialize it
      bsAlert.show();//show it
      var currentTime = new Date();
      document.getElementById('horatoast').innerHTML = currentTime.toLocaleTimeString();
      document.getElementById('Mensajetoast').innerHTML=data;
      }
    });
}
//FUNCION PARA CERRAR SESION
function cargar_Cerrarsesion(){
  console.log("Cerrando sesion");
  window.location.href = '../index.php';
}
//FUNCION PARA COLOCAR EL DROPDOWN Y EL MENU DE BUSCAR IMAGENES
function cargar_Buscarimagenes(){
  console.log("Entrando a buscar imagenes");
  let placeholder = document.getElementById("section_search");
  var content_search=`
        <div class="dropdown">
                      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">Categoria
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><a class="dropdown-item" onclick="actualizar_texto_dropdown(this.text)">none</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" onclick="actualizar_texto_dropdown(this.text)">science</a></li>
                        <li><a class="dropdown-item" onclick="actualizar_texto_dropdown(this.text)">education</a></li>
                        <li><a class="dropdown-item" onclick="actualizar_texto_dropdown(this.text)">people</a></li>
                        <li><a class="dropdown-item" onclick="actualizar_texto_dropdown(this.text)">feelings</a></li>
                        <li><a class="dropdown-item" onclick="actualizar_texto_dropdown(this.text)">computer</a></li>
                        <li><a class="dropdown-item" onclick="actualizar_texto_dropdown(this.text)">buildings</a></li>
                      </ul>
                    </div>
                        <input id="Search_image_input" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                        <button type="button" id="search" class="btn btn-info" onclick="buscar_imagenes()">
                        <i class="fas fa-align-right"></i>
                        <span>Search</span>
                    </button>
        `;
  placeholder.innerHTML = content_search;
}
//Actualizar texto del dropdown
function actualizar_texto_dropdown(texto){
    console.log("clickeando el dropdown");
    var selectedOption = texto;
    $('#dropdownMenuButton').text(selectedOption);
}
//Funcion para actualizar los likes y los Views
function actualizar_likes_views(accion,id_imagen){
  console.log("Entrando a actualizar likes views: "+accion+" - "+id_imagen);
  var objeto=new Object();
  var postdata={funcion: 'actualizar_likes_views', accion: accion, id_imagen: id_imagen};
  var postdatajson=JSON.stringify(postdata);
    $.ajax({
    type: "POST",
    url: "../php/inicial/inicial_administrar.php",
    datatype: "json",
    data: postdata,
    success: function(data) {
      //Abrir el toast para mostrar el mensaje
      var myAlert =document.getElementById('myToast');//select id of toast
      var bsAlert = new bootstrap.Toast(myAlert);//inizialize it
      bsAlert.show();//show it
      var currentTime = new Date();
      document.getElementById('horatoast').innerHTML = currentTime.toLocaleTimeString();
      document.getElementById('Mensajetoast').innerHTML=data;

      }
    });
    objeto=obtener_likes_views(id_imagen);
    document.getElementById('like_'+id_imagen).innerHTML=objeto[0].L;
    document.getElementById('view_'+id_imagen).innerHTML=objeto[0].V;
}
//Funcion para obtener likes y views por imagen
function obtener_likes_views(id_imagen){
  var objeto=new Object();
  var postdata={funcion: 'obtener_likes_views', id_imagen: id_imagen};
  var postdatajson=JSON.stringify(postdata);
    $.ajax({
    type: "POST",
    url: "../php/inicial/inicial_administrar.php",
    datatype: "json",
    data: postdata,
    async: false,
    success: function(data) {
      objeto=JSON.parse(data);
      }
    });
    return objeto;
}
//funcion para cargar un reporte generico - sin terminar
function cargar_Reportes(){
  console.log("entrando a cargar_Reportes");
}

