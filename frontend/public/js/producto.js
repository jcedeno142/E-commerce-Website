(() => {
    const App = {
        variables: {
            product: null
        },
        init: () => {
            App.utils.getParams(window.location.search);
        },
        utils: {
            getParams: (page) => {
                const urlParams = new URLSearchParams(page);
                App.variables.product = urlParams.get('product')
                console.log(App.variables.product);
            }
        }
    }
    App.init();
})();