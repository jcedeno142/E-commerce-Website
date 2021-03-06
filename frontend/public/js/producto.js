(() => {
    const App = {
        variables: {
            product: null,
            productdiv: null,
            idproduct: null,
            BACKEND_URL: 'http://localhost:3000',
            TOKEN: localStorage.getItem('token')
        },
        htmlElements: {
            info: document.getElementById('info'), // TEXTO TEMPORTAL QUE CONTIENE TODA LA INFO DEL PRODUCTO
            imagelink: document.getElementById('pic'),
            formCart: document.getElementById('form-cart'),
            picture__container: document.querySelector('.picture__container'),
            dombody: document.getElementById('body'),
            popup: document.getElementById('popup1'),
            popup2: document.getElementById('popup2')
        },
        init: () => {
            App.initializeData.params();
            App.bindEvents();
        },
        bindEvents: () => {
            App.htmlElements.formCart.addEventListener('submit', App.events.addToCart)
            window.addEventListener("click", App.events.onWindowsClick);
        },
        initializeData: {
            params: () => {
                const urlParams = new URLSearchParams(window.location.search);
                App.variables.idproduct = urlParams.get('product');
                App.initializeData.product();
            },
            product: async() => {
                const data = await App.utils.getData(`${App.variables.BACKEND_URL}/api/store/product/` ,App.variables.idproduct);
                App.variables.product = data.producto;
                App.events.displayProduct();
                Paypal.initializeData.initPaypalButton(App.variables.product);
            }
        },
        events: {
            displayProduct: () => {
                let url = (App.variables.product.img);
                let name = (App.variables.product.productName);
                let price = (App.variables.product.unitPrice);
                let description = (App.variables.product.description);
                
                App.htmlElements.picture__container.innerHTML += 
                            `<div class="product-container">
                                <img src="${url}"> 
                                <ul>
                                <h2><b class="text-purple">${name}</b></h1>
                                <p>Price: <b>$${price}USD</b></p>
                                <h4 class="text-purple">Phone Description:</h4>
                                <p>${description}</p>
                                </ul>
                            </div>`;
            },
            addToCart: async(event) => {
                App.htmlElements.popup.style.display = "";
                App.htmlElements.popup.style.transition = "opacity 500ms";
                event.preventDefault();
                const product = { item: App.variables.idproduct }
                if (App.variables.TOKEN === null) App.variables.TOKEN = localStorage.getItem('token');
                const cart = await App.utils.postData(`${App.variables.BACKEND_URL}/api/store/cart?token=${App.variables.TOKEN}`, product);
                const response = cart;
                // console.log(App.htmlElements.dombody); // MENSAJE DE A??ADIDO AL CARRITO
                popup(App.htmlElements.dombody,response.message);
                
                
            },
            onWindowsClick: (event)=>{
                if (event.target == App.htmlElements.popup ) {
                    App.htmlElements.popup.style.display = "none";
                  }

                  if (event.target == App.htmlElements.popup2 ) {
                    App.htmlElements.popup2.style.display = "none";
                  }
            },
        },
        utils: {
            getData: async (url, id) => {
                try {
                    const response = await fetch(url + id);
                    return response.json();
                } catch (error) {
                    throw new Error(`Error: ${error}`);
                }
            },
            postData: async(url, data = {}) => {
                const response = await fetch(url, {
                    method: "POST", mode: "cors", cache: "no-cache", credentials: "same-origin", 
                    headers: {
                      "Content-Type": "application/json"
                    }, redirect: "follow", referrerPolicy: "no-referrer", body: JSON.stringify(data)
                });
                return response.json();
            }
        }
    }
    App.init();
})();