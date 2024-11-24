// Deja listo el carrito
async function setCarrito(idCliente){
    const carritosResponse = await obtenerCarritos(idCliente);
    let idCarrito = carritosResponse.data.getCarritosByIdCliente;
    if (idCarrito.length === 0) {
        idCarrito = await crearCarrito(idCliente);
    } else {
        idCarrito = idCarrito[0].id;
    }
    document.getElementById('carrito').setAttribute('value', idCarrito);
    let prodsCarrito = await getProductosByIdCarrito(idCarrito);
    for (prod of prodsCarrito){
        cambiarIconoCarrito(prod.cantidad);
    }
}
// Chequea si el cliente tiene asignado algún carrito
async function obtenerCarritos(idCliente) {
    const query = `
        query getCarritosByIdUsuario($getCarritosByIdClienteId: String) {
            getCarritosByIdCliente(id: $getCarritosByIdClienteId) {
                id
                fecha
            }
        }
    `;
    try {
        let responseCarrito = await $.ajax({
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
        return responseCarrito;
    } catch(error){
        console.log("Error al buscar los carritos del usuario;", error);
    }
    return 
}
// Crea el carrito si es que el cliente no tiene asignado ninguno
async function crearCarrito(idCliente) {
    const mutation = `
        mutation AddCarrito($input: CarritoInput) {
            addCarrito(input: $input) {
                id
                fecha
            }
        }
    `;
    
    try {
        const responseCarrito = await $.ajax({
            type: "POST",
            url: "http://localhost:8091/graphql",
            contentType: "application/json",
            timeout: 15000,
            data: JSON.stringify({
                query: mutation,
                variables: {
                    input: {
                        fecha: new Date().toISOString(),
                        cliente: idCliente
                    }
                }
            })
        });
        if (responseCarrito.errors) {
            console.error("Error en la mutación:", responseCarrito.errors);
        } else {
            return responseCarrito.data.addCarrito.id;
        }
    } catch (error) {
        console.error("Error en la solicitud al crear el carrito:", error);
    }
}

// Funciones que actualizan el carrito
async function actualizarCarrito(){
    let idCarrito = document.getElementById('carrito').getAttribute('value');
    let prodsCarrito = await getProductosByIdCarrito(idCarrito);
    let cardsCarrito = [];
    let total = 0;
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
        let precio = await GetUltimoPrecioHistoricoByIdProducto(prod.producto);
        total += precio.precio * prod.cantidad;
        cardsCarrito.push(creaCardCarrito(response.data.getProductoById, prod.cantidad, prod.id, precio.precio));
    }
    if (cardsCarrito.length == 0){
        document.querySelector('#carrito .offcanvas-body').innerHTML = `
        <h3 class="text-center">Carrito Vacío 😢</h3>
        <h5 class="text-center">Cuando agregues productos al carrito, aparecerán aquí.</h5>`
    } else {
        document.querySelector('#carrito .offcanvas-body').innerHTML = cardsCarrito.join("");
        let boton =`
        <br>
        <div class="text-center" id="botonDentroCarrito">
            <button class="btn btn-success" onclick="window.location.href='compra.php'">
                <div class="d-flex align-items-center justify-content-center">
                    <h4 id="textoBotonCarrito" class="mb-0 me-2">$${total}</h4>
                    <img src="./img/carrito.png" style="width: 25px; height: 25px;">
                </div>
            </button>
        </div>
        `;
        document.querySelector('#carrito .offcanvas-body').insertAdjacentHTML('beforeend', boton);
    }
}
async function getProductosByIdCarrito(idCarrito) {
    let query =`
    query Query($getDetalleCarritosByIdCarritoId: String){
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
    <div class="card mb-3 cards-carrito" data-id="${detalleCarrito}" style="height: ">
        <div class="row g-0" style="height: 100%">
            <div class="col-4">
                <img src="${producto.foto}" class="img-fluid rounded-start" alt="${producto.nombre}" style="height: 100%; width: auto">
            </div>
            <div class="col-8">
                <div class="card-body">
        
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p id="precio-${producto.id}" class="card-text text-muted" value="${precio}">$${precio*cantidad}</p>

                    <!-- Contador de cantidad de productos -->
                    <div class="row">
                        <div class="col-5 d-flex align-items-center">
                            <button class="btn btn-outline-secondary btn-sm" onclick="cambiarDetalleCarrito('${detalleCarrito}', '${producto.id}', -1)">-</button>
                            <span id="cantidad-${detalleCarrito}" class="mx-2">${cantidad}</span>
                            <button class="btn btn-outline-secondary btn-sm" onclick="cambiarDetalleCarrito('${detalleCarrito}', '${producto.id}',  1)">+</button>
                        </div>

                        <div class="col-6">
                            <button class="btn btn-danger btn-sm" onclick="eliminaDetalleCarrito('${detalleCarrito}', '${producto.id}')" style="font-weight: bold; font-size: 0.9rem">Eliminar</button>
                        </div>
                    </div>
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
    cambiarIconoCarrito(nuevaCantidad);
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
        cambiarIconoCarrito(masmenos);
        cambiarCantidadCarrito(masmenos * parseInt(precioElemento.getAttribute('value')))
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
async function eliminaDetalleCarrito(detalleCarrito, producto){
    let cantidad = parseInt(document.getElementById('cantidad-' + detalleCarrito).innerHTML);
    let precioCantidad = parseInt(document.getElementById('precio-' + producto).innerHTML.replace('$', ''));
    cambiarIconoCarrito(-cantidad);
    cambiarCantidadCarrito(-precioCantidad);
    let cardCarrito = document.querySelector('#carrito .offcanvas-body').querySelector('div[data-id="' + detalleCarrito + '"]');
    cardCarrito.remove();
    delDetalleCarrito(detalleCarrito);
    if (document.getElementsByClassName('cards-carrito').length == 0){
        document.getElementById('botonDentroCarrito').remove();
        document.querySelector('#carrito .offcanvas-body').innerHTML = `
        <h3 class="text-center">Carrito Vacío 😢</h3>
        <h5 class="text-center">Cuando agregues productos al carrito, aparecerán aquí.</h5>`
    }
}

// Cambia el ícono junto al svg del carrito para que muestre la cantidad de productos en éste
function cambiarIconoCarrito(cantidad){
    let cantidadActual = parseInt(document.getElementById('cantidadCarrito').innerHTML);
    document.getElementById('cantidadCarrito').innerHTML = cantidadActual + cantidad;

    let cantidadActual2 = parseInt(document.getElementById('cantidadCarrito2').innerHTML);
    document.getElementById('cantidadCarrito2').innerHTML = cantidadActual2 + cantidad;
}

// Cambia el botón dentro del carrito para que muestre el total a pagar por la compra
function cambiarCantidadCarrito(cantidad){
    let cantidadActual = parseInt(document.getElementById('textoBotonCarrito').innerHTML.replace('$', ''));
    document.getElementById('textoBotonCarrito').innerHTML = "$" + parseInt(cantidadActual + cantidad);
}