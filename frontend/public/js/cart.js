(() => {
    const App = {
        variables: {
            cart: [],
            total: 0,
            BACKEND_URL: 'http://localhost:3000',
            TOKEN: localStorage.getItem('token')
        },
        htmlElements: {
            productContainer: document.getElementById('product-container'),
            btnCheckout: document.getElementById('btn-checkout'),
            totalContainer: document.getElementById('total')
        },
        init: () => {
            App.initializeData.cart();
            App.bindEvents();
        },
        bindEvents: () => {
            if (App.htmlElements.productContainer != null) {
                App.htmlElements.productContainer.addEventListener('click', App.events.OnRemoveCart)
                App.htmlElements.btnCheckout.addEventListener('click', App.events.initPaypal)
            } 
        },
        initializeData: {
            cart: async() => {
                const data = await App.utils.getData(`${App.variables.BACKEND_URL}/api/store/cart?token=${App.variables.TOKEN}`);
                App.variables.cart = data.cart;
                App.htmlElements.productContainer.innerHTML = '';
                if (App.htmlElements.productContainer != null) {
                    App.variables.total = 0;
                    App.variables.cart.forEach(product => {
                        console.log(product)
                        App.events.getCart(product);
                        App.variables.total += product.item.unitPrice;
                    });  
                }
                App.htmlElements.totalContainer.innerHTML = App.variables.total;
            }
        },
        events: {
            redirect: () => {
                if (App.variables.TOKEN === null) window.location.href = 'http://localhost:8080';
            },
            initPaypal: () => {
                console.log(App.htmlElements.totalContainer.textContent)
                const initPaypal = {unitPrice: Number(App.htmlElements.totalContainer.textContent)}
                // Crear un componente checkout
                // Paypal.initializeData.initPaypalButton(initPaypal);
            },
            getCart: ( {email, id, item, name, picture} ) => {
                App.htmlElements.productContainer.innerHTML += 
                                `<div class='card'>
                                    <div class='card-body'>
                                        <div><a href='/producto?product=${item._id}'>${item.productName}</a></div>
                                        <div class='card-botones' id='${id}'>
                                            <button id='btn-remove-${id}' type="button">Remover</button>
                                        </div>
                                    </div>
                                </div>`
            },
            OnRemoveCart: async(event) => {
                const idCart = event.target.parentElement.id;
                if (event.target.id === `btn-remove-${idCart}`) {
                    const remove = await App.utils.deleteData(`${App.variables.BACKEND_URL}/api/store/cart?token=${App.variables.TOKEN}`, idCart);
                    console.log(remove);
                    App.initializeData.cart();
                }
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
            },
            deleteData: async(url, id) => {
                const body = { id }
                try {
                    const response = await fetch(url , {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        }, body: JSON.stringify(body),
                    });
                    return response.json();
                } catch (error) {
                    throw new Error(`Error: ${error}`);
                }
            }
        }
    }
    App.init();
})();
