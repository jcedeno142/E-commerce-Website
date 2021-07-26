const Paypal = {
    variables: {
        BACKEND_URL: 'http://localhost:3000',
        TOKEN: localStorage.getItem('token')
    },
    htmlElements: {
        paypalContainer: document.getElementById('paypal-button-container')
    },
    initializeData: {
        initPaypalButton: (products) => {
            Paypal.htmlElements.paypalContainer.innerHTML = ''
            paypal.Buttons({
                style: { shape: 'rect', color: 'gold', layout: 'vertical', label: 'paypal' },
                createOrder: async(data, actions) => {
                    return await actions.order.create({
                        purchase_units: [{
                          "amount": {
                              "currency_code" : "USD", "value" : Paypal.roundPrice(products)
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
            }).render(Paypal.htmlElements.paypalContainer);
        }
    },
    roundPrice: (products) => {
        let totalPrice = 0;
        let prices = 0;
        if (products.length > 0) {
            for (const product of products) {
                prices += product.unitPrice;
            }
            return totalPrice = Math.round(prices * 100) / 100;
        } else {
            return totalPrice = Math.round(products.unitPrice * 100) / 100;
        }
    },
    events: {
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
