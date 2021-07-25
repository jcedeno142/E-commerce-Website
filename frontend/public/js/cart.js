(() => {
    const App = {
        variables: {
            cart: [],
            BACKEND_URL: 'http://localhost:3000',
            TOKEN: localStorage.getItem('token')
        },
        htmlElements: {
            cartContainer: document.getElementById('cart-container')
        },
        init: () => {
            App.initializeData.cart();
        },
        initializeData: {
            cart: async() => {
                const data = await App.utils.getData(`${App.variables.BACKEND_URL}/api/store/cart?token=${App.variables.TOKEN}`);
                App.variables.cart = data.cart;
                App.variables.cart.forEach(product => {
                    App.events.getCart(product);
                });
            }
        },
        events: {
            getCart: ( {email, id, item, name, picture} ) => {
                console.log(item);
                App.htmlElements.cartContainer.innerHTML += `SEGUIR AQUÍ`
            }
        },
        utils: {
            getData: async (url) => {
                try {
                    const response = await fetch(url);
                    return response.json();
                } catch (error) {
                    throw new Error(`Error: ${error}`);
                }
            }
        }
    }
    App.init();
})();


const Cart = {
    postToCart: async(url, data = {}) => {
        const response = await fetch(url, {
            method: "POST", mode: "cors", cache: "no-cache", credentials: "same-origin", 
            headers: {
              "Content-Type": "application/json"
            }, redirect: "follow", referrerPolicy: "no-referrer", body: JSON.stringify(data)
        });
        return response.json();
    }
}