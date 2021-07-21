(() => {
    const App = {
        variables: {
            BACKEND_URL: 'http://localhost:3000',
            TOKEN: localStorage.getItem('token')
        },
        htmlElements: {},
        init: () => {
            App.initializeData.products();
        },
        bindEvents: () => {},
        initializeData: {
            products: async() => {
                const data = await App.utils.getData(`${App.variables.BACKEND_URL}/api/store/products`);
                const products = data.productos;
                products.forEach(product => {
                    App.utils.addProducts(product);
                });

            }
        },
        utils: {
            getData: async(url) => {
                const response = await fetch(url);
                return response.json();
            },
            addProducts: ({ description, id, img, productName, status, unitPrice}) => {
                console.log(description);
            }
        }
    }
    App.init();
})();