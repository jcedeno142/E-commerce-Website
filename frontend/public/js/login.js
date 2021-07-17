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
      googleSignOut: async () => {
        try {
          const auth2 = await gapi.auth2.getAuthInstance();
          await auth2.signOut();
          localStorage.removeItem('token');
          console.log('User signed out.');
        } catch (error) {
          throw new Error(`Google logout error: ${error}`);
        }
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
    const user = await resp.json();
    console.log(user);
    localStorage.setItem('token', user.token);
  } catch (error) {
    throw new Error(`Google Authentication error: ${error}`);
  }
}