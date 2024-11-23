contentTableVentas=[];
async function trtdBoleta(boleta) {
    try {
        const [detalleCompras, cliente, horarioCaja] = await Promise.all([
            GetDetalleComprasByIdBoleta(boleta.id),
            GetUsuarioById(boleta.cliente),
            GetHorarioCajaById(boleta.horarioCaja),
        ]);
        const cajeroVirtual = await GetUsuarioById(horarioCaja.encargado);
        const precios = await Promise.all(
            detalleCompras.map(async (item) => {
                const precio = await GetUltimoPrecioHistoricoByIdProductoByFecha(item.producto, boleta.fecha);
                return precio.precio * item.cantidad;
            })
        );
        const total = precios.reduce((acc, curr) => acc + curr, 0);
        const newRow = `
            <tr height="40px">
                <td style="width: 130px; padding-right: 10px">${boleta.id}</td>
                <td style="width: 130px; padding-right: 10px">${boleta.fecha}</td>
                <td style="width: 130px; padding-right: 10px">${cliente.nombreUsuario}</td>
                <td style="width: 130px; padding-right: 10px">${cajeroVirtual.nombreUsuario}</td>
                <td style="width: 130px; padding-right: 10px">${total.toFixed(2)}</td>
                <td style="width: 130px; padding-right: 10px">
                    <button 
                        class="btn btn-success btn-sm" 
                        onclick="AbrirModalBoleta('${boleta.id}')">
                        DETALLES
                    </button>
                </td>
            </tr>
        `;
        document.getElementById('tblVenta').insertAdjacentHTML('beforeend', newRow);
    } catch (error) {
        console.error("Error en trtdBoleta:", error);
    }
}
function GetBoletasByFecha(fecha) {
    let query = `
    query miQuery($fecha: String!){
        getBoletasByFecha(fecha: $fecha){
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
            variables: {
                fecha: fecha
            }
        }),
        success: async function(response) {
            contentTableVentas = [];
            const encabezados = '<tr><td>ID</td><td>FECHA</td><td>CLIENTE</td><td>CAJERO</td><td>TOTAL</td><td>Detalles</td></tr>';
            document.getElementById('tblVenta').innerHTML = encabezados;
            for (const item of response.data.getBoletasByFecha) {
                trtdBoleta(item);
            }
        }
    });
}
function GetBoletasByMes(mes) {
    mes = parseInt(mes);
    let query = `
    query miQuery($mes: Int!){
        getBoletasByMes(mes: $mes){
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
            variables: {
                mes: mes
            }
        }),
        success: async function(response) {
            contentTableVentas = [];
            const encabezados = '<tr><td>ID</td><td>FECHA</td><td>CLIENTE</td><td>CAJERO</td><td>TOTAL</td><td>Detalles</td></tr>';
            document.getElementById('tblVenta').innerHTML = encabezados;
            for (const item of response.data.getBoletasByMes) {
                trtdBoleta(item);
            }
        }
    });
}
function GetBoletasByMes2(mes){
    mes=parseInt(mes);
    let query = `
    query miQuery($mes: Int!){
        getBoletasByMes(mes: $mes){
            id
            fecha
            cliente
            horarioCaja
            despacho
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
                    mes: mes
                }
            }),
            success: function(response){
                resolve(response.data.getBoletasByMes);
            }
        });
    });
}
function GetBoletaById(idBoleta){
    let query = `
    query miQuery($id: ID!){
        getBoletaById(id: $id){
            id
            fecha
            cliente
            horarioCaja
            despacho
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
                    id: idBoleta
                }
            }),
            success: function(response){
                resolve(response.data.getBoletaById);
            }
        });
    });
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
function GetDetalleComprasByIdBoleta(idBoleta){
    let query = `
    query miQuery ($id: String){
        getDetalleComprasByIdBoleta(id: $id){
            id
            boleta
            producto
            cantidad
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
                    id: idBoleta
                }
            }),
            success: function(response){
                resolve(response.data.getDetalleComprasByIdBoleta);
            }
        });
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
function GetReclamoById(idReclamo){
    let query = `
    query miQuery($id: ID!){
        getReclamoById(id: $id){
            id
            titulo
            descripcion
            cliente
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
                    id: idReclamo
                }
            }),
            success: function(response){
                resolve(response.data.getReclamoById);
            }
        });
    });
}
function GetReclamos(){
    let query = `
    query miQuery{
        getReclamos{
            id
            titulo
            descripcion
            cliente
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
                variables: {}
            }),
            success: function(response){
                resolve(response.data.getReclamos);
            }
        });
    });
}
async function GetBoletas() {
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
        success: async function(response) {
            contentTableVentas = [];
            const encabezados = '<tr><td>ID</td><td>FECHA</td><td>CLIENTE</td><td>CAJERO</td><td>TOTAL</td><td>Detalles</td></tr>';
            document.getElementById('tblVenta').innerHTML = encabezados;
            for (const item of response.data.getBoletas) {
                trtdBoleta(item);
            }
        }
    });
}
function DelReclamo(idReclamo){
    let query = `
    mutation miMutation($id: ID!){
        delReclamo(id: $id){
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
            query: query,
            variables: {
                id: idReclamo
            }
        }),
        success: function(response){
            alert(`${response.data.delReclamo.message}`);
        }
    });
}
function DelBoleta(idBoleta){
    let query = `
    mutation miMutation($id: ID!){
        delBoleta(id: $id){
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
            query: query,
            variables: {
                id: idBoleta
            }
        }),
        success: function(response){
            alert(`${response.data.delBoleta.message}`);
        }
    });
}
function DelDetalleCompra(idDetalleCompra){
    let query = `
    mutation miMutation($id: ID!){
        delDetalleCompra(id: $id){
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
            query: query,
            variables: {
                id: idDetalleCompra
            }
        }),
        success: function(response){
        }
    });
}