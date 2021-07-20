(() => {
    const App = {
        variables: {
            BACKEND_URL: 'http://localhost:3000'
        },
        htmlElements: {
        },
        init: () => {
            App.events.initPaypalButton();
        },
        bindEvents: () => {
        },
        events: {
            initPaypalButton: () => {
                paypal.Buttons({
                    style: { shape: 'rect', color: 'gold', layout: 'vertical', label: 'paypal' },
                    createOrder: async(data, actions) => {
                        const producto = await App.utils.getProduct(`${App.variables.BACKEND_URL}/api/store/product/60e909b831a3a738287049f9`)
                        console.log(producto.producto.unitPrice);
                        return await actions.order.create({
                            purchase_units: [{
                              "amount": {
                                  "currency_code" : "USD", "value" : producto.producto.unitPrice
                                }
                            }],
                            application_context: {
                                brand_name: 'DSIX Store',
                                landing_page: 'NO_PREFERENCE',
                                ser_action: 'PAY_NOW',
                            }
                        });
                    },
                    onApprove: (data, actions) => {
                        return actions.order.capture().then(function(details) {
                          console.log(details);
                          // alert('Transaction completed by ' + details.payer.name.given_name + '!');
                        });
                    },
                    onError: (err) => {
                        console.log(err);
                    }
                }).render('#paypal-button-container');
            }
        }, utils: {
            getProduct: async(url) => {
                const response = await fetch(url);
                return response.json();
            }
        }
    }
    App.init();
})();
