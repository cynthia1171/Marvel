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
  var contenido = document.getElementById('contenido');
  if (user.emailVerified) {
    contenido.innerHTML = `
    <p>Bienvenido</p>
    <button id="cerrar" onclick="cerrar()">Cerrar sesión</button>
  `;
  }
}

function cerrar() {
  firebase.auth().signOut()
  .then(function () {
    $('#contenido').empty();
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