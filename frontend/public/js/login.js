var url = 'http://localhost:3000/api/store/google';

function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;

    // console.log('ID: ' + profile.getId());
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); 

    const data = {id_token}
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify( data )
    }). then(resp => resp.json()).then (data => console.log(data))
    .catch(console.log);


}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}
