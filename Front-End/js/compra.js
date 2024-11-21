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
inputsBoletaDetalle = {};

async function setCompraFront(){
    const carritosResponse = await obtenerCarritos(idCliente);
    let idCarrito = carritosResponse.data.getCarritosByIdCliente[0].id;
    let prodsCarrito = await getProductosByIdCarrito(idCarrito);
    let liDetalle = [];
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
        liDetalle.push(creaListaDetalles(response.data.getProductoById.nombre, prod.cantidad, precio.precio));
    }
    document.getElementById('monto-pagar').textContent = '$' + total;
    document.getElementById('productosDetalleCompra').innerHTML = liDetalle.join("");
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