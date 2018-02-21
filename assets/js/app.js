$(document).ready(function() {
  /* función para mostrar splash */
  setTimeout(function () {
    $(".video-intro").fadeOut(1500);
  }, 12000);
  /*
  *función para mostrar contenido de la página
  */
  setTimeout(function () {
    $(".content").fadeIn(1500);
  }, 3500);
})


$('#myModal').modal('toggle');

function registrar() {
  var email = $('#emailReg').val();
  var password = $('#passIReg').val();
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function () {
      /* si usuario se crea correctamente, se ejecuta funcion verificar */
      verificar();
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  $('#myModal').modal('hide')
}

function inicioSesion() {
  var emailIngreso = $('#emailInicio').val();
  var passwordIngreso = $('#passInicio').val();
  firebase.auth().signInWithEmailAndPassword(emailIngreso, passwordIngreso)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  $('#myModal').modal('hide');
}

function observador() {
  /** si existe */
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('existe usuario activo');
      aparece(user);
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      console.log(user.emailVerified);
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      console.log('no existe usuario activo');
    }
  });
}
observador();

function aparece(user) {
  var user = user;
  if (user.emailVerified) {
    $('.content').empty();
    $('.content').append(`
      <div>
        <img id="img-logo" src="assets/img/Marvel-logo.png" alt="">
        <button id="perfil" type="button" class="btn btn-primary mb-2 mr-2">Mi Perfil</button>
        <button type="button" class="btn btn-primary mb-2 mr-2" onclick="cerrar()">Cerrar Sesión</button>
      </div>
    `);
  }
}

function cerrar() {
  firebase.auth().signOut()
  .then(function () {
    $('.content').empty();
    $('.content').append(`
      <div class="row">
        <div class="col align-self-center">
          <img src="assets/img/Marvel-logo.png" class="rounded logo" alt="">
        </div>
      </div>
      <div class="row">
        <div class="col align-self-center formulario">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email</label>
              <input type="email" class="form-control" id="emailInicio" aria-describedby="emailHelp" placeholder="name@example.com">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Contraseña</label>
              <input type="password" class="form-control" id="passInicio" placeholder="mínimo 6 caracteres">
            </div>
            <button type="submit" class="btn" data-dismiss="modal" onclick="inicioSesion()">Iniciar Sesión</button>
          </form>
          <hr>
          <button type="button" class="btn mb-2 mr-2" data-toggle="modal" data-target="#formRegistro">Registrarse</button>
        </div>
      </div>
    `);
    console.log('Saliendo...');
  })
  .catch(function () {
    console.log(error);
  })
}


/* funcion que envía correo de verificacion a usuario que se esta registrando */
function verificar() {
  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function () {
    // Email sent.
    console.log('Enviando correo...');
  }).catch(function (error) {
    // An error happened.
    console.log(error);
  });
}