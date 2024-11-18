contentTableVentas=[];
async function trtdBoleta(boleta){
    let detalleCompras = await GetDetalleComprasByidBoleta(boleta.id);
    let cliente = await GetUsuarioById(boleta.cliente);
    let horarioCaja = await GetHorarioCajaById(boleta.horarioCaja);
    let cajeroVirtual = await GetUsuarioById(horarioCaja.encargado);
    let total = 0;
    for (const item of detalleCompras) {
        let precio = await GetUltimoPrecioHistoricoByIdProductoByFecha(item.producto, boleta.fecha);
        total += precio.precio * item.cantidad;
    }
    contentTablePersona.push(`
        <tr>
            <td>${boleta.id}</td>
            <td>${boleta.fecha}</td>
            <td>${cliente.nombreUsuario}</td>
            <td>${cajeroVirtual.nombreUsuario}</td>
            <td>${total}</td>
            <td>
                <button class="btn btn-success btn-sm" onclick="AbrirModalBoleta(${boleta}, ${detalleCompras}, ${cliente}, ${horarioCaja}, ${cajeroVirtual})">DETALLES</button>
            </td>
            </td>
        </tr>
    `);
}
function GetCajaById(idCaja){
    let query = `
    query miQuery($id: ID!){
        getCajaById(id: $id){
            id
            tipo
        }
    }
    `;
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "http://localhost:8091/graphql",
            contentType: "application/json",
            timeout: 15000,
            data: JSON.stringify({
                query: query,
                variables: {
                    id: idCaja
                }
            }),
            success: function(response){
                resolve(response.data.getCajaById);
            }
        });
    });
}
function GetHorarioCajaById(idHorarioCaja){
    let query = `
    query miQuery($id: ID!){
        getHorarioCajaById(id: $id){
            id
            horario
            encargado
            caja
        }
    }
    `;
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "http://localhost:8091/graphql",
            contentType: "application/json",
            timeout: 15000,
            data: JSON.stringify({
                query: query,
                variables: {
                    id: idHorarioCaja
                }
            }),
            success: function(response){
                resolve(response.data.getHorarioCajaById);
            }
        });
    });
}
function GetUsuarioById(idUsuario){
    let query = `
    query miQuery($id: ID!){
        getUsuarioById(id: $id){
            id
            email
            pass
            nombreUsuario
            persona
        }
    }
    `;
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "http://localhost:8091/graphql",
            contentType: "application/json",
            timeout: 15000,
            data: JSON.stringify({
                query: query,
                variables: {
                    id: idUsuario
                }
            }),
            success: function(response){
                resolve(response.data.getUsuarioById);
            }
        });
    });
}
function GetUltimoPrecioHistoricoByIdProductoByFecha(idProducto, fecha){
    let query = `
    query miQuery($id: String, $fecha: String){
        getUltimoPrecioHistoricoByIdProductoByFecha(id: $id, fecha: $fecha){
            id
            precio
            fecha
        }
    }
    `;
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "http://localhost:8091/graphql",
            contentType: "application/json",
            timeout: 15000,
            data: JSON.stringify({
                query: query,
                variables: {
                    id: idProducto,
                    fecha: fecha
                }
            }),
            success: function(response){
                resolve(response.data.getUltimoPrecioHistoricoByIdProductoByFecha);
            }
        });
    });
}
function GetDetalleComprasByidBoleta(idBoleta){
    let query = `
    query miQuery (id: String){
        getDetalleComprasByIdBoleta(id: $id){
            id
            boleta
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
            query: query,
            variables: {
                id: idBoleta
            }
        }),
        success: function(response){
            return response.data.getDetalleComprasByIdBoleta;
        }
    });
}
function GetProductoById(idProducto){
    let query = `
    query miQuery($id: ID!){
        getProductoById(id: $id){
            id
            nombre
            descripcion
            foto
            categoria
        }
    }
    `;
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "http://localhost:8091/graphql",
            contentType: "application/json",
            timeout: 15000,
            data: JSON.stringify({
                query: query,
                variables: {
                    id: idProducto
                }
            }),
            success: function(response){
                resolve(response.data.getProductoById);
            }
        });
    });
}
async function GetBoletas(){
    let query = `
    query miQuery {
        getBoletas {
            id
            fecha
            cliente
            horarioCaja
            despacho
        }
    }
    `;
    $.ajax({
        type: "POST",
        url: "http://localhost:8091/graphql",
        contentType: "application/json",
        timeout: 15000,
        data: JSON.stringify({
            query: query,
            variables: {}
        }),
        success: async function(response){
            contentTableVentas = [];
            contentTableVentas.push('<tr><td>ID</td><td>FECHA</td><td>CLIENTE</td><td>CAJERO</td><td>TOTAL</td><td>Detalles</td></tr>');
            for (const item of response.data.getBoletas) {
                await trtdBoleta(item);
            }
            document.getElementById('tblVenta').innerHTML = contentTableVentas.join("");
        }
    });
}