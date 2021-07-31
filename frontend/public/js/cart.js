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
            cartCounter: document.getElementById('cart-counter'),
            totalContainer: document.getElementById('total'),
            table: document.getElementById('the-table')
        },
        init: () => {
            App.initializeData.cart();
            App.bindEvents();
        },
        bindEvents: () => {
            if (App.htmlElements.productContainer != null) {
                App.htmlElements.productContainer.addEventListener('click', App.events.OnRemoveCart)
            } 
        },
        initializeData: {
            cart: async() => {
                const data = await App.utils.getData(`${App.variables.BACKEND_URL}/api/store/cart?token=${App.variables.TOKEN}`);
                App.variables.cart = data.cart;
                if (App.htmlElements.productContainer != null) {
                   Paypal.initializeData.initPaypalButton(App.initializeData.existCar());
                }
            }
            ,existCar: () => {
                let cartItems = 0;
                App.htmlElements.table.innerHTML = '';
                App.htmlElements.cartCounter.innerHTML = '';
                App.variables.total = 0;
                App.variables.cart.forEach(product => {
                    App.events.getCart(product);
                    App.variables.total += product.item.unitPrice ;
                    cartItems += 1;
                }); 
                let texto = `<div id='itemCount' class="itemCount">Cart (${cartItems} items) </div>`
                App.htmlElements.cartCounter.insertAdjacentHTML( 'afterBegin', texto );
                const items = []
                const rounded = Math.round(App.variables.total * 100) / 100
                App.htmlElements.totalContainer.innerHTML = rounded;
                App.variables.cart.forEach(element => {
                    items.push(element.item)
                });
                return items;
                
            }
        },
        events: {
            getCart: ( {email, id, item, name, picture}) => {
                App.htmlElements.table.innerHTML += 
                        `<tr>
                            <td class='td-img'>
                                <img class='img-product' src='${item.img}' alt='Product'>
                            </td>
                            <td class="text-center">${item.productBrand}</td>
                            <td class="text-center"><a href='/producto?product=${item._id}'>${item.productName}</td>
                            <td class="text-center"><b>$${item.unitPrice}USD</b></td>
                            <td id='${id}' class='text-date text-center'>
                                <button id='btn-remove-${id}'>Remove</button>
                            </td>
                        </tr>`;

            //     App.htmlElements.productContainer.innerHTML += 
            //     `<div class="card">
            //         <div class="card-body"></div>
            //             <div class="cart-img-item"><img class="cart-img" src="${item.img}"></div>
            //             <div class="cart-text-item">
            //                 <div class="cart-item-name"><a href='/producto?product=${item._id}'>${item.productName}</a></div>
            //                 <div class="cart-item-brand"><a>${item.productBrand}</a></div>
            //             </div>
            //         <div class="cart-price-item">
            //             <div class="cart-price"><a>$${item.unitPrice}</a></div>
            //             <div class="cart-btn-delete">
            //                 <div class='card-botones' id='${id}'>
            //                     <button class="rmv-btn" id='btn-remove-${id}' type="button"> 
            //                         &#10060;
            //                     </button>
            //                 </div>
            //         </div>
            //     </div>
            // </div>`
                                // <button id='btn-remove-${id}' type="button">Remover</button>
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

