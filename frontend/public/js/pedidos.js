(() => {
    const App = {
        variables: {
            BACKEND_URL: 'http://localhost:3000',
            TOKEN: localStorage.getItem('token')
        },init: () => {
            App.initializeData.pedidos();
        },
        initializeData: {
            pedidos: async() => {
                const data = await App.utils.getData(`${App.variables.BACKEND_URL}/api/store/pedidos?token=${App.variables.TOKEN}`);
                const pedidos = data;
                console.log(pedidos);
                // pedidos.forEach(product => {
                //     App.events.getPedidos(product);
                // });
            }
        },
        events: {
            getPedidos: () => {}
        },
        utils: {
            getData: async(url) => {
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