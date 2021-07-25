const Paypal = {
    variables: {
        BACKEND_URL: 'http://localhost:3000',
        TOKEN: localStorage.getItem('token')
    },
    initializeData: {
        initPaypalButton: (product) => {
            paypal.Buttons({
                style: { shape: 'rect', color: 'gold', layout: 'vertical', label: 'paypal' },
                createOrder: async(data, actions) => {
                    return await actions.order.create({
                        purchase_units: [{
                          "amount": {
                              "currency_code" : "USD", "value" : product.unitPrice
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
                      Paypal.events.addToHistory(details);
                    });
                },
                onError: (err) => {
                    console.log(err);
                }
            }).render('#paypal-button-container');
        }
    }, events: {
        addToHistory: async(details) => {
            const comprobante = { details }
            const pedido = await Paypal.utils.postData(`${Paypal.variables.BACKEND_URL}/api/store/pedidos?token=${Paypal.variables.TOKEN}`, comprobante);
            const response = pedido;
            console.log(response);
        }
    }, utils: {
        postData: async(url, data= {}) => {
            const response = await fetch(url, {method: "POST", mode: "cors", cache: "no-cache", credentials: "same-origin", 
            headers: {
              "Content-Type": "application/json"
            },redirect: "follow", referrerPolicy: "no-referrer", body: JSON.stringify(data)
          });
          return response.json();
        }
    }
};
