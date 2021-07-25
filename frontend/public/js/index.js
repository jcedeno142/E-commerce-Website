(() => {
    const App = {
        variables: {
            BACKEND_URL: 'http://localhost:3000',
            TOKEN: localStorage.getItem('token')
        },
        htmlElements: {
            productsContainer: document.getElementById('container-products')
        },
        init: () => {
            App.bindEvents();
            App.initializeData.products();
        },
        bindEvents: () => {
            App.htmlElements.productsContainer.addEventListener('click', App.utils.addToCart)
        },
        initializeData: {
            products: async() => {
                const data = await App.utils.getData(`${App.variables.BACKEND_URL}/api/store/products`);
                const products = data.productos;
                products.forEach(product => {
                    App.events.getProducts(product);
                });
            }
        },
        events: {
            getProducts: ({ description, id, img, productName, status, unitPrice}) => {
                App.htmlElements.productsContainer.innerHTML += 
                    `<div class="card" style="width: 18rem;">
                        <img src="${img}" class="card-img-top" alt="CELL">
                        <div class="card-body" id="${id}">
                            <h5 class="card-title">${productName}</h5>
                            <p class="card-text">${description}</p>
                            <a href="/producto?product=${id}" id="details-${id}" class="card-link">Ver detalles</a>
                        </div>
                    </div>`
                    // <a href="#" id="cart-${id}" class="card-link">Agregar al carrito</a>
            },
            addToCart: async (event) => {
                event.preventDefault();
                // ESTO NO VA A FUNCIONAR SIN UN FORMULARIO?
                const productId = event.target.parentElement.id;
                if (event.target.id === `cart-${productId}`) {
                    // cart.addToCart(productId);
                    const body = {item: productId}
                    await App.utils.postData(`${App.variables.BACKEND_URL}/api/store/cart?token=${App.variables.TOKEN}`, body)
                }
            }
        },
        utils: {
            getData: async(url) => {
                try {
                    const response = await fetch(url);
                    return response.json();
                } catch (error) {
                    throw new Error(`Error: ${error}`);
                }
            },
            postData: async(url, data={}) => {
                try {
                    const response = await fetch(url, { method: "POST", mode: "cors", 
                    cache: "no-cache", credentials: "same-origin", 
                    headers: {
                    "Content-Type": "application/json"
                    }, redirect: "follow", referrerPolicy: "no-referrer", body: JSON.stringify(data)});
                    console.log(response.json())
                    return response.json(); 
                } catch (error) {
                    throw new Error(`Error: ${error}`);
                }
            }   
        }
    }
    App.init();
})();