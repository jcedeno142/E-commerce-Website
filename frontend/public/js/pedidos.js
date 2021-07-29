(() => {
    const App = {
        variables: {
            BACKEND_URL: 'http://localhost:3000',
            TOKEN: localStorage.getItem('token')
        },
        htmlElements: {
            mainTr: document.getElementById('the-table')
        },
        init: () => {
            App.initializeData.pedidos();
        },
        initializeData: {
            pedidos: async() => {
                const data = await App.utils.getData(`${App.variables.BACKEND_URL}/api/store/pedidos?token=${App.variables.TOKEN}`);
                const pedidos = data;
                // console.log(pedidos.pedido);
                pedidos.pedido.forEach(product => {
                    App.events.getPedidos(product);
                });
            }
        },
        events: {
            getPedidos: ({ details, email, id, name, picture }) => {
                const price = details.purchase_units[0].amount.value;
                App.htmlElements.mainTr.innerHTML += 
                    `<tr>
                        <td class='td-img'>
                            <img class='img-avatar' src='${picture}' alt='Avatar'>
                            <h5>${email}</h5> 
                        </td>
                        <td class="text-center">${name}</td>
                        <td class="text-center"><i class='text-amount'><b>$</b>${price}<b> USD</b></i></td>
                        <td class="text-center">${details.id}</td>
                        <td class='text-date text-center'>${details.create_time}</td>
                        <td><b class='text-center text-status'>${details.status}</b> <img class="svg" src="./images/svg/check.svg" alt="svg"></td>
                    </tr>`;
                // console.log(details);
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
            }
        }
    }
    App.init();
})();