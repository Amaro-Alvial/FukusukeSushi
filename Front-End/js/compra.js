/*
### BACK END ###
1. Obtener carrito del cliente por su ID
2. Obtener último despacho y último horarioCaja
3. Crear la boleta, con la fecha y el cliente del carrito, y el despacho y horarioCaja de los querys
4. Eliminar el carrito pero guardar la ID
5. Obtener detalleCarritos del carrito por la ID
6. Por cada detalleCarrito:
    6.1. Crear un detalleCompra con la cantidad y el producto del detalleCarrito y la boleta obtenida antes
    6.2 Eliminar el detalleCarrito

### FRONT END ###
1. Obtener la id del carrito del cliente
2. Otro loop para cambiar el modal de detalle de compra y obtener el total
3. Eso
*/
let inputsBoletaDetalle = {};

async function setCompraFront(){
    const carritosResponse = await obtenerCarritos(idCliente);
    let idCarrito = carritosResponse.data.getCarritosByIdCliente[0].id;
    let prodsCarrito = await getProductosByIdCarrito(idCarrito);
    let liDetalle = [];
    let total = 0;
    let prodsHaciaBoleta = [];
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
        liDetalle.push(creaListaDetalles(response.data.getProductoById.nombre, prod.cantidad, precio.precio));
        prodsHaciaBoleta.push({id: prod.id, producto: prod.producto, cantidad: prod.cantidad})
    }
    document.getElementById('monto-pagar').textContent = '$' + total;
    document.getElementById('productosDetalleCompra').innerHTML = liDetalle.join("");
    inputsBoletaDetalle['carrito'] = idCarrito;
    inputsBoletaDetalle['fecha'] = new Date().toISOString();
    inputsBoletaDetalle['productos'] = prodsHaciaBoleta;
}

function creaListaDetalles(nombre, cantidad, precio){
    li =`
        <li class="list-group-item d-flex justify-content-between align-items-center">
            ${nombre} (x${cantidad}) - $${precio} c/u
            <span class="badge badge-primary badge-pill">$${cantidad * precio}</span>
        </li>
    `;
    return li;
}

async function getHorario(){
    query=`
    query Query{
        getUltimoHorarioCaja {
            id
            horario
            encargado
            caja
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
                variables: {}
            })
        });
        return response.data.getUltimoHorarioCaja.id;
    } catch(error){
        console.error("Error al buscar horarioCaja: ", error);
    }
}

async function getDespacho(){
    query=`
    query Query{
        getUltimoDespacho {
            id
            fecha
            despachador
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
                variables: {}
            })
        });
        return response.data.getUltimoDespacho.id;
    } catch(error){
        console.error("Error al buscar despacho: ", error);
    }
}

async function cambiazo(){
    //  Crea la boleta
    //  Crea los detalleCompra
    //Elimina el carrito
    //Elimina los detalleCarrito
    let fechaCambiazo = inputsBoletaDetalle.fecha;
    let horarioCambiazo = await getHorario();
    let despachoCambiazo = await getDespacho();
    let idBoleta = await AddBoleta(fechaCambiazo, idCliente, horarioCambiazo, despachoCambiazo);
    for (let detalle of inputsBoletaDetalle.productos){
        AddDetalleCarrito(idBoleta, detalle.producto, detalle.cantidad);
        delDetalleCarrito(detalle.id);
    }
    DelCarrito(inputsBoletaDetalle.carrito);
}

async function AddBoleta(fechaBoleta, clienteBoleta, horariocajaBoleta, despachoBoleta) {
    const mutation = `
    mutation Mutation($input: BoletaInput!) {
        addBoleta(input: $input) {
            id
            fecha
            cliente
            horarioCaja
            despacho
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
                query: mutation,
                variables: {
                    input: {
                        fecha: fechaBoleta,
                        cliente: clienteBoleta,
                        horarioCaja: horariocajaBoleta,
                        despacho: despachoBoleta
                    }
                }
            })
        });

        if (response.data && response.data.addBoleta) {
            return response.data.addBoleta.id;
        } else {
            console.error("Respuesta inesperada al crear la boleta:", response);
            return null;
        }
    } catch (error) {
        console.error("Error al crear la boleta:", error);
        return null;
    }
}

async function AddDetalleCarrito(boletaDetalle, productoDetalle, cantidadDetalle) {
    const mutation = `
    mutation Mutation($input: DetalleCompraInput!) {
        addDetalleCompra(input: $input) {
            id
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
                query: mutation,
                variables: {
                    input: {
                        boleta: boletaDetalle,
                        producto: productoDetalle,
                        cantidad: cantidadDetalle
                      }
                }
            })
        });

        if (response.data && response.data.addDetalleCompra) {
            return response.data.addDetalleCompra;
        } else {
            console.error("Respuesta inesperada al crear un detalle de compra:", response);
            return null;
        }
    } catch (error) {
        console.error("Error al crear un detalle de compra:", error);
        return null;
    }
}

async function DelCarrito(idCarrito){
    const mutation = `
        mutation DelCarrito($delCarritoId: ID!){
            delCarrito(id: $delCarritoId) {
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
                delCarritoId: idCarrito
            }
        })
    })
}