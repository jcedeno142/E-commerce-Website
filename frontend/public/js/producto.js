(() => {
    const App = {
        variables: {
            product: null,
            idproduct: null,
            BACKEND_URL: 'http://localhost:3000',
            TOKEN: localStorage.getItem('token')
        },
        htmlElements: {
            info: document.getElementById('info'), // TEXTO TEMPORTAL QUE CONTIENE TODA LA INFO DEL PRODUCTO
            imagelink: document.getElementById('pic'),
            formCart: document.getElementById('form-cart'),
            picture__container: document.querySelector('.picture__container')
        },
        init: () => {
            App.initializeData.params();
            App.bindEvents();
        },
        bindEvents: () => {
            App.htmlElements.formCart.addEventListener('submit', App.events.addToCart)
        },
        initializeData: {
            params: () => {
                const urlParams = new URLSearchParams(window.location.search);
                App.variables.idproduct = urlParams.get('product');
                App.initializeData.product();
            },
            product: async() => {
                const data = await App.utils.getData(`${App.variables.BACKEND_URL}/api/store/product/` ,App.variables.idproduct);
                App.variables.product = data.producto;
                Paypal.initializeData.initPaypalButton(App.variables.product);
                App.htmlElements.info.innerHTML += JSON.stringify(App.variables.product); // COLOCAR LOS ELEMENTOS DEL PRODUCTO EN EL HTML AQUÍ
                let url = (App.variables.product.img);
                App.htmlElements.picture__container.innerHTML += `<img src="${url}" id="pic">`
            }
        },
        events: {
            addToCart: async(event) => {
                event.preventDefault();
                const product = { item: App.variables.idproduct }
                if (App.variables.TOKEN === null) App.variables.TOKEN = localStorage.getItem('token');
                const cart = await App.utils.postData(`${App.variables.BACKEND_URL}/api/store/cart?token=${App.variables.TOKEN}`, product);
                const response = cart;
                console.log(response); // MENSAJE DE AÑADIDO AL CARRITO
            }
        },
        utils: {
            getData: async (url, id) => {
                try {
                    const response = await fetch(url + id);
                    return response.json();
                } catch (error) {
                    throw new Error(`Error: ${error}`);
                }
            },
            postData: async(url, data = {}) => {
                const response = await fetch(url, {
                    method: "POST", mode: "cors", cache: "no-cache", credentials: "same-origin", 
                    headers: {
                      "Content-Type": "application/json"
                    }, redirect: "follow", referrerPolicy: "no-referrer", body: JSON.stringify(data)
                });
                return response.json();
            }
        }
    }
    App.init();
})();