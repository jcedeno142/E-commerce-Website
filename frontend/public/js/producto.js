(() => {
    const App = {
        variables: {
            product: null,
            idproduct: null,
            BACKEND_URL: 'http://localhost:3000',
            TOKEN: localStorage.getItem('token')
        },
        htmlElements: {
            formCart: document.getElementById('form-cart')
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
                // console.log(App.variables.product);
            }
        },
        events: {
            addToCart: async(event) => {
                event.preventDefault();
                const product = { item: App.variables.idproduct }
                const cart = await Cart.postToCart(`${App.variables.BACKEND_URL}/api/store/cart?token=${App.variables.TOKEN}`, product);
                const response = cart;
                console.log(response);
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
            }
        }
    }
    App.init();
})();