(() => {
  const App = {
    htmlElements: {
      googleLogout: document.getElementById('a-logout'),
      googleBtn: document.getElementById('google-btn')
    },
    init: () => {
      App.bindEvents();
     
    },
    bindEvents: () => {
      App.htmlElements.googleLogout.addEventListener("click", App.events.googleSignOut)
      App.events.hideElements();
    },
    events: {
      googleSignOut: async () => {
        try {
          const auth2 = await gapi.auth2.getAuthInstance();
          await auth2.signOut();
          localStorage.removeItem('token');
          // console.log('User signed out.');
          // App.events.hideElements()
          hideElements(App.htmlElements.googleBtn, App.htmlElements.googleLogout)
        } catch (error) {
          throw new Error(`Google logout error: ${error}`);
        }
      },
      hideElements: () => {
        if (localStorage.getItem('token') === null) {
          App.htmlElements.googleLogout.style.display = 'none';
          App.htmlElements.googleBtn.style.display = 'block';
        } else {
          App.htmlElements.googleLogout.style.display = 'flex';
          App.htmlElements.googleBtn.style.display = 'none';
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
    // console.log(user);
    localStorage.setItem('token', user.token);
    hideElements(document.getElementById('google-btn'), document.getElementById('a-logout'))
  } catch (error) {
    throw new Error(`Google Authentication error: ${error}`);
  }
}

function hideElements(btnLogin, btnLogout) {
  if (localStorage.getItem('token') === null) {
    btnLogout.style.display = 'none';
    btnLogin.style.display = 'block';
  } else {
    btnLogout.style.display = 'flex';
    btnLogin.style.display = 'none';
  }
}