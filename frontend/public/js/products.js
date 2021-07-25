// const { events } = require("../../../backend/models/Producto");

(() => {
    const App ={
        variables: {
            BACKEND_URL: 'http://localhost:3000',
            TOKEN: localStorage.getItem('token')
        },
        htmlElements: {
            ListaProductos: document.getElementById('div_producto'),
            modalBody: document.getElementById('modal_body'),
            modal: document.getElementById("myModal"),
            span: document.getElementsByClassName("close")[0],
        },

        init: () => {
            App.bindEvents();
            App.initData.users();
        },

        bindEvents: () => {
            App.htmlElements.span.addEventListener('click',App.events.onCloseClick);
            window.addEventListener("click", App.events.onWindowsClick);
        },

   
        initData: {
            users: async () => {
            const Data = await App.utils.getData(`${App.variables.BACKEND_URL}/api/store/products`);
            
            let id = 0;
                Data.productos.forEach(product => {
                App.utils.addProduct(product, product.id,  id);
                id ++;
                console.log(product.id);
                });
                App.utils.setListener();
            },

            
        },

        events: {
            onCardClick: (event) => {
            App.htmlElements.modal.style.display="block";
            let id = event.target.parentNode.getAttribute('id');
            App.utils.getProduct(id);

            },

            onCloseClick: (event) => {
                App.htmlElements.modal.style.display = "none";
            },

            onWindowsClick: (event)=>{
                if (event.target == App.htmlElements.modal) {
                    App.htmlElements.modal.style.display = "none";
                  }
            }
        },
   
        utils: {
            postData: async (url = '', data = {}) => {
            const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            body: JSON.stringify(data)
            });
            return response.json(); 
        },
        getData: async (url = '', data = {}) => {
            const response = await fetch(url);
            return response.json();
        },
        deletaData: async (url = '', data = {}) => {
            const response = await fetch(url, {
            method: 'DELETE', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(data)
            });
            return response.json();
        },
        updateData: async (url = '', data = {}) => {
            const response = await fetch(url, {
                method: 'PATCH',
                mode: 'cors', 
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer', 
                body: JSON.stringify(data)
                });
            return response.json();
        },

        getProduct: async (_id) => {
            const Data = await App.utils.getData('http://localhost:3000/api/store/product/'+_id);
            console.log(Data.producto);
            App.utils.viewProduct(Data.producto);
  
        },

        viewProduct: async ({status, productName,productBrand, unitPrice,description,img}) => {
            
            let texto = `<div class="modal-productImage">
                            <img src="${img}" class="img-modal" >
                        </div>
                         <div class="modal-productBrand">
                            <label>${productBrand}</label>
                        </div>
                        <div class="modal-productName">
                            <label>${productName}</label>
                        </div>
                        <div class="modal-productDescription">
                            <label>${description} </label>
                        </div>
                        <div class="modal-productPrice">
                            <label>${unitPrice}</label>
                        </div>
                        <div class="modal-addToCartButton">
                            <button  class="btn-modal"> Agregar al carrito </button>
                        </div>`

                        App.htmlElements.modalBody.innerHTML = "";
                        App.htmlElements.modalBody.innerHTML += texto; 
                        
        },
   
        addProduct: ({status, productName,productBrand, unitPrice,description,img},id, _id) =>{
            
            if (img===""){
                img = "images/products/noimage.jpg";
            }
   
            let texto = `<div class="card_img" >
                            <img src="${img}" style="width:100%" >
                            <div class="card_text" id="${id}">
                                <p name="nombre" >${productName}</p>
                                <p name="precio" >${unitPrice}</p>
                                <button class="add_btn" id="myBtn"> Ver detalles </button>
                                <button class="add_btn" id="btn-paypal-${id}"> Comprar </button>
                            </div>
                        </div>`
            
            App.htmlElements.ListaProductos.innerHTML += texto;   
            
        },
        setListener:()=>{
            const btn1 = document.querySelectorAll(".add_btn");
            btn1.forEach(boton =>{
                boton.addEventListener("click", App.events.onCardClick);
            })
        },
   
   
   
   
        // fin utils 
        }
   
   
        // fin app 
    };
    App.init();
})();