function registrar() {
  var email = $('#emailReg').val();
  var password = $('#passIReg').val();
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}

function inicio() {
  var email = $('#emailIngreso').val();
  var password = $('#passwordIngreso').val();
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}

function observador() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('usuario activo');
      aparece(user);
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      console.log('usuario inactivo');
      // User is signed out.
      // ...
    }
  });
}
observador();

function aparece(user) {
  var user = user;
  if (user.emailVerified) {
    $('.content').hide();
    $('.perfil').hide();
    $('.inicio').show();
  }
}

function cerrar() {
  firebase.auth().signOut()
    .then(function () {
      $('.inicio').hide();
      $('.content').show();
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

function pagPrincipal() {
  $('.principal').show();
  $('.perfil').hide();
}

function miPerfil() {
  $('.principal').hide();
  $('.perfil').show();
}