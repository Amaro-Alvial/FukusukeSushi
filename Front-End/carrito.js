// Deja listo el carrito
async function setCarrito(){
    //TODO: aquí se ejecutaría el inicio de sesión o algo nose :P
    let idCliente = "67317b739360287f7f13ec6b";
    const carritosResponse = await obtenerCarritos(idCliente);
    let carritosCliente = carritosResponse.data.getCarritosByIdCliente;
    
    if (carritosCliente.length === 0) {
        carritosCliente = await crearCarrito(idCliente);
    } else {
        carritosCliente = carritosCliente[0]
    }
    document.getElementById('carrito').setAttribute('value', carritosCliente.id);
}
// Chequea si el cliente tiene asignado algún carrito
function obtenerCarritos(idCliente) {
    const query = `
        query getCarritosByIdUsuario($getCarritosByIdClienteId: ID!) {
            getCarritosByIdCliente(id: $getCarritosByIdClienteId) {
                id
                fecha
            }
        }
    `;
    return $.ajax({
        type: "POST",
        url: "http://localhost:8091/graphql",
        contentType: "application/json",
        timeout: 15000,
        data: JSON.stringify({
            query,
            variables: {
                getCarritosByIdClienteId: idCliente
            }
        })
    });
}
// Crea el carrito si es que el cliente no tiene asignado niuno
function crearCarrito(cliente) {
    const mutation = `
        mutation AddCarrito($input: CarritoInput) {
            addCarrito(input: $input) {
                id
                fecha
            }
        }
    `;
    return $.ajax({
        type: "POST",
        url: "http://localhost:8091/graphql",
        contentType: "application/json",
        timeout: 15000,
        data: JSON.stringify({
            query: mutation,
            variables: {
                input: {
                    //
                    fecha: "hoy",
                    cliente: cliente
                }
            }
        })
    }).then(response => response.data.addCarrito);
}

// Funciones que actualizan el carrito
async function getProductosByIdCarrito() {
    let idCarrito = document.getElementById('carrito').getAttribute('value');
    let query =`
    query Query($getDetalleCarritosByIdCarritoId: ID!) {
        getDetalleCarritosByIdCarrito(id: $getDetalleCarritosByIdCarritoId) {
            cantidad
            producto
        }
    }
    `;
    try {
        let response = await $.ajax({
            type: "POST",
            url: "http://localhost:8091/graphql",
            contentType: "application/json",
            timeout: 15000,
            data: JSON.stringify({
                query: query,
                variables: {
                    getDetalleCarritosByIdCarritoId: idCarrito
                }
            })
        });
        
        await console.log(response);
        let productosCarrito = response.data.getDetalleCarritosByIdCarrito;
        await actualizarCarrito(productosCarrito);
    } catch (error) {
        console.error("Error al obtener los productos del carrito:", error);
    }
}
async function actualizarCarrito(prods){
    let prodsCarrito = [];
    let query =`
    query QQuery($getProductoByIdId: ID!){
        getProductoById(id: $getProductoByIdId) {
            id
            nombre
            foto
        }
    }
    `;
    for(let prod of prods){
        let response = await $.ajax({
            type: "POST",
            url: "http://localhost:8091/graphql",
            contentType: "application/json",
            timeout: 15000,
            data: JSON.stringify({
                query: query,
                variables: {
                    getProductoByIdId: prod.producto
                }
            })
        });
        prodsCarrito.push(cardsCarrito(response.data.getProductoById));
    }
    document.querySelector('#carrito .offcanvas-body').innerHTML = prodsCarrito.join("");
}
function cardsCarrito(producto){
    return `
    <div class="card mb-3" data-id="${producto.id}">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${producto.foto}" class="img-fluid rounded-start" alt="${producto.nombre}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text"><small class="text-muted">$1.50</small></p>
                    
                    <!-- Contador de cantidad de productos -->
                    <div class="d-flex align-items-center mt-2">
                        <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad('${producto.id}', -1)">-</button>
                        <span id="cantidad-${producto.id}" class="mx-2">1</span>
                        <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad('${producto.id}', 1)">+</button>
                    </div>

                    <button class="btn btn-danger btn-sm mt-3" onclick="eliminarProducto('${producto.id}')">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
    `
}