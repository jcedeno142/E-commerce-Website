(() => {
    const App = {
        htmlElements: {
            PAYPAL_CLIENT_ID: 'AQdaLHiSd29XDLf4kEtrH9-zcQCmOGemOql-OZT-wX1c3eyym7B73YGEuXUWvS3P9cQWy85I8-vX0PI4',
            PAYPAL_SECRET: 'EGmw76UYvcylWLlRBKrfb5BqSHG2JLfaO0buk7uX4VYXVwDl-2t34XyHywUfNejzQMIokIcvCL3nWHJK',
            PAYPAL_API: 'https://api-m.sandbox.paypal.com'
        },
        init: () => {},
        events: {
            sendPayment: async() => {
                const body = {
                    intent: 'CAPTURE',
                    purchase_units: [{
                        amount: {
                          currency_code: 'USD',
                          value: '100.00'
                        }
                    }],
                    application_context: {
                        brand_name: 'DSIX Store',
                        landing_page: 'NO_PREFERENCE',
                        ser_action: 'PAY_NOW',
                        return_url: `http://localhost:8080/execute-payment`, // Url despues de realizar el pago
                        cancel_url: `http://localhost:8080/cancel-payment` // Url despues de realizar el pago
                    }
                };
            }
        }
    }
    App.init();
})();