$(document).ready(()=>{
  $.ajax({
    url: 'https://gateway.marvel.com:443/v1/public/characters?&limit=30&ts=1&apikey=0647f843f1ab4120557f28aa3a5ddcb7&hash=970540f1cb8980e782ca8e5476e0e4b4',
    type: 'GET',
    datatype: 'json'
  })
  .done(function(response){
    console.log(response);
    showCharacters(response)
  })
  .fail(function(error){
    console.log('error')
  })
})

function showCharacters(charac){
  var characterInfo = charac.data.results;
  for (let i = 0; i < characterInfo.length; i++){
    console.log(characterInfo[i].name);
      $('#comics').append(`<div class="card text-white bg-dark" style="width: 12rem;">
  <img class="card-img-top" src="${characterInfo[i].thumbnail.path + '.' + characterInfo[i].thumbnail.extension}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${characterInfo[i].name}</h5>
    <a href="#" class="btn btn-primary">See more!</a>
  </div>
</div>`)
  }
}




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