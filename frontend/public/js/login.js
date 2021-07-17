(() => {
  const App = {
    htmlElements: {
      google_logout: document.getElementById('a-logout')
    },
    init: () => {
      App.bindEvents();
    },
    bindEvents: () => {
      App.htmlElements.google_logout.addEventListener("click", App.events.googleSignOut)
    },
    events: {
      googleSignOut: () => {
        let auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
          console.log('User signed out.');
        });
      }
    }
  };
  App.init();
})();

async function onSignIn(googleUser) {
  try {
    const id_token = await googleUser.getAuthResponse().id_token;
    const data = {id_token}
    const resp = await fetch('http://localhost:3000/api/store/google', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify( data )
    })
    const userData = await resp.json();
    console.log(userData)
  } catch (error) {
    throw new Error(`Google Authentication error: ${error}`);
  }
}