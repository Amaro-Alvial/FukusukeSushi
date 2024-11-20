let contentTableDespachos=[];
let contentTableBoletas=[];
async function trtdDespacho(despacho) {
    const despachador = await GetUsuarioById(despacho.despachador);
    let fecha = despacho.fecha.split('T')[0];
    let estado = despacho.estado ? 'Despachado' : 'Pendiente';
    const newRow = `
        <tr>
            <td>${fecha}</td>
            <td>${estado}</td>
            <td>${despachador.nombreUsuario}</td>
            <td>
                <button 
                    class="btn btn-success btn-sm" 
                    onclick="AbrirModalDespacho('${despacho.id}')">
                    DETALLES
                </button>
            </td>
        </tr>
    `;
    document.getElementById('tblDespachos').insertAdjacentHTML('beforeend', newRow);
}
async function trtdBoleta(boleta) {
    try {
        const cliente = await GetUsuarioById(boleta.cliente);
        const persona = await GetPersonaById(cliente.persona);
        const comuna = await GetComunaById(persona.comuna);
        const newRow = `
            <tr>
                <td>${boleta.id}</td>
                <td>${comuna.nombre}</td>
                <td>
                    <button 
                        class="btn btn-primary btn-sm" 
                        onclick="AbrirModalBoleta('${boleta.id}')">
                        DETALLES
                    </button>
                </td>
                <td>
                    <button
                        class="btn btn-success btn-sm"
                        onclick="DescargarBoletaPDF('${boleta.id}')">
                        Descargar
                    </button>
                </td>
            </tr>
        `;
        document.getElementById('tblBoleta').insertAdjacentHTML('beforeend', newRow);
    } catch (error) {
        console.error("Error en trtdBoleta:", error);
    }
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
function GetRegionById(idRegion){
    let query = `
    query miQuery($id: ID!){
        getRegionById(id: $id){
            id
            nombre
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
                    id: idRegion
                }
            }),
            success: function(response){
                resolve(response.data.getRegionById);
            }
        });
    });
}
function GetProvinciaById(idProvincia){
    let query = `
    query miQuery($id: ID!){
        getProvinciaById(id: $id){
            id
            nombre
            region
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
                    id: idProvincia
                }
            }),
            success: function(response){
                resolve(response.data.getProvinciaById);
            }
        });
    });
}
function GetComunaById(idComuna){
    let query = `
    query miQuery($id: ID!){
        getComunaById(id: $id){
            id
            nombre
            provincia
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
                    id: idComuna
                }
            }),
            success: function(response){
                resolve(response.data.getComunaById);
            }
        });
    });
}
function GetPersonaById(idPersona){
    let query = `
    query miQuery($id: ID!){
        getPersonaById(id: $id){
            id
            direccion
            comuna
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
                    id: idPersona
                }
            }),
            success: function(response){
                resolve(response.data.getPersonaById);
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
function GetBoletasByIdDespacho(idDespacho){
    let query = `
    query miQuery($id: String){
        getBoletasByIdDespacho(id: $id){
            id
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
                    id: idDespacho
                }
            }),
            success: function(response){
                resolve(response.data.getBoletasByIdDespacho);
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
function GetDespachoById(idDespacho){
    let query = `
    query miQuery($id: ID!){
        getDespachoById(id: $id){
            id
            fecha
            estado
            despachador
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
                    id: idDespacho
                }
            }),
            success: function(response){
                resolve(response.data.getDespachoById);
            }
        });
    });
}
async function GetDespachos(){
    let query = `
    query miQuery{
        getDespachos{
            id
            fecha
            estado
            despachador
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
                contentTableDespachos = [];
                const encabezados = '<tr><td>FECHA</td><td>ESTADO</td><td>DESPACHADOR</td><td>Detalles</td></tr>';
                document.getElementById('tblDespachos').innerHTML = encabezados;
                for (const item of response.data.getDespachos) {
                    trtdDespacho(item);
                }
            }
        });
    });
}