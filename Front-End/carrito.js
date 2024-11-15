// Deja listo el carrito
async function setCarrito(idCliente){
    const carritosResponse = await obtenerCarritos(idCliente);
    let idCarrito = carritosResponse.data.getCarritosByIdCliente;
    
    if (idCarrito.length === 0) {
        idCarrito = await crearCarrito(idCliente);
    } else {
        idCarrito = idCarrito[0].id
    }
    document.getElementById('carrito').setAttribute('value', idCarrito);
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
                    fecha: "hoy",
                    cliente: cliente
                }
            }
        })
    }).then(response => response.data.addCarrito);
}

// Funciones que actualizan el carrito
async function actualizarCarrito(){
    let idCarrito = document.getElementById('carrito').getAttribute('value');
    let prodsCarrito = await getProductosByIdCarrito(idCarrito);
    let cardsCarrito = [];
    let query =`
    query QQuery($getProductoByIdId: ID!){
        getProductoById(id: $getProductoByIdId) {
            id
            nombre
            foto
        }
    }
    `;
    for(prod of prodsCarrito){
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
        let precio = await ultimoPrecio(prod.producto);
        cardsCarrito.push(creaCardCarrito(response.data.getProductoById, prod.cantidad, prod.id, precio));
    }
    if (cardsCarrito.length == 0){
        document.querySelector('#carrito .offcanvas-body').innerHTML = '<h3 class="text-center">Carrito Vacío 😢</h3><h5 class="text-center">Cuando agregues productos al carrito, aparecerán aquí.</h5>'
    } else {
        document.querySelector('#carrito .offcanvas-body').innerHTML = cardsCarrito.join("");
    }
}
async function getProductosByIdCarrito(idCarrito) {
    let query =`
    query Query($getDetalleCarritosByIdCarritoId: ID!) {
        getDetalleCarritosByIdCarrito(id: $getDetalleCarritosByIdCarritoId) {
            id
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
        return response.data.getDetalleCarritosByIdCarrito;
    } catch (error) {
        console.error("Error al obtener los productos del carrito:", error);
    }
}
function creaCardCarrito(producto, cantidad, detalleCarrito, precio){
    return `
    <div class="card mb-3" data-id="${detalleCarrito}">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${producto.foto}" class="img-fluid rounded-start" alt="${producto.nombre}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p id="precio-${producto.id}" class="card-text text-muted" value="${precio}">$${precio*cantidad}</p>

                    <!-- Contador de cantidad de productos -->
                    <div class="d-flex align-items-center mt-2">
                        <button class="btn btn-outline-secondary btn-sm" onclick="cambiarDetalleCarrito('${detalleCarrito}', '${producto.id}', -1)">-</button>
                        <span id="cantidad-${detalleCarrito}" class="mx-2">${cantidad}</span>
                        <button class="btn btn-outline-secondary btn-sm" onclick="cambiarDetalleCarrito('${detalleCarrito}', '${producto.id}',  1)">+</button>
                    </div>

                    <button class="btn btn-danger btn-sm mt-3" onclick="eliminaDetalleCarrito('${detalleCarrito}')">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
    `
}

// Traslación de los resolvers al Front-End
function addDetalleCarrito(idCarrito, idProducto, cantidad){
    const mutation =`
    mutation mut($input: DetalleCarritoInput){
        addDetalleCarrito(input: $input) {
            id
            carrito
            producto
            cantidad
        }
    }
    `;
    $.ajax({
        type: "POST",
        url: "http://localhost:8091/graphql",
        contentType: "application/json",
        timeout: 15000,
        data: JSON.stringify({
            query: mutation,
            variables: {
                input:{
                    carrito: idCarrito,
                    producto: idProducto,
                    cantidad: cantidad
                }
            }
        })
    })
}
function updDetalleCarrito(idDetalle, inputDetalle){
    const mutation = `
        mutation mut($updDetalleCarritoId: ID!, $input: DetalleCarritoInput){
            updDetalleCarrito(id: $updDetalleCarritoId, input: $input) {
                id
                carrito
                producto
                cantidad
            }
        }
    `;
    $.ajax({
        type: "POST",
        url: "http://localhost:8091/graphql",
        contentType: "application/json",
        timeout: 15000,
        data: JSON.stringify({
            query: mutation,
            variables: {
                updDetalleCarritoId: idDetalle,
                input: inputDetalle
            }
        })
    })
}
function delDetalleCarrito(idDetalle){
    const mutation = `
        mutation DelDetalleCarrito($delDetalleCarritoId: ID!){
            delDetalleCarrito(id: $delDetalleCarritoId) {
                message
            }
        }
    `;
    $.ajax({
        type: "POST",
        url: "http://localhost:8091/graphql",
        contentType: "application/json",
        timeout: 15000,
        data: JSON.stringify({
            query: mutation,
            variables: {
                delDetalleCarritoId: idDetalle
            }
        })
    })
}

// Aplicación de resolvers en el contexto del Front-End
async function agregarDetalleCarrito(){
    let idCarrito = document.getElementById('carrito').getAttribute('value');
    let idProducto = document.getElementById('productModal').getAttribute('value');
    let nuevaCantidad = parseInt(document.getElementById('quantity').textContent);
    let anteriorCantidad;
    let productosCarrito = await getProductosByIdCarrito(idCarrito);
    let idDetalle;
    let esta = false;
    var i = 0;
    while (i < productosCarrito.length && !esta){
        if (productosCarrito[i].producto == idProducto){
            esta = true;
            idDetalle = productosCarrito[i].id;
            anteriorCantidad = productosCarrito[i].cantidad;
        }
        i++;
    }

    if (esta){
        inputDetalle = {
            carrito: idCarrito,
            producto: idProducto,
            cantidad: anteriorCantidad + nuevaCantidad
        }
        updDetalleCarrito(idDetalle, inputDetalle);
    } else{
        addDetalleCarrito(idCarrito, idProducto, nuevaCantidad);
    }
}
async function cambiarDetalleCarrito(detalleCarrito, idProducto, masmenos){
    let idCarrito = document.getElementById('carrito').getAttribute('value');
    let cantidadElemento = document.getElementById('cantidad-' + detalleCarrito);
    let precioElemento = document.getElementById('precio-' + idProducto)
    let antiguaCantidad = parseInt(cantidadElemento.textContent);
    let nuevaCantidad = antiguaCantidad + masmenos
    if (nuevaCantidad > 0){
        cantidadElemento.textContent = nuevaCantidad;
        precioElemento.textContent = '$' + nuevaCantidad * parseInt(precioElemento.getAttribute('value'));
        inputDetalle = {
            carrito: idCarrito,
            producto: idProducto,
            cantidad: nuevaCantidad
        }
        updDetalleCarrito(detalleCarrito, inputDetalle);
    }
    
}
async function eliminaDetalleCarrito(detalleCarrito){
    //TODO: taría weno un "¿Estás seguro de querer eliminar este producto, guapo?"
    let cardCarrito = document.querySelector('#carrito .offcanvas-body').querySelector('div[data-id="' + detalleCarrito + '"]');
    cardCarrito.remove();
    delDetalleCarrito(detalleCarrito);
}