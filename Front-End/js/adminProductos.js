let contentContainerProductos =[]
let optionsCategoria = [];

async function cardProductos(item) {
    let precio = await GetUltimoPrecioHistoricoByIdProducto(item.id);
    let disponibilidad = await GetUltimoDisponibleHistoricoByIdProducto(item.id);
    let stock = disponibilidad.disponibilidad ? "Disponible" : "No disponible";

    let cardProducto = `
        <div class="card col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 card-dark p-2">
            <div class="card-header">
                <h4 class="card-title">${item.nombre}</h4>
            </div>
            <div class="card-body">
                <img src="${item.foto}" alt="Foto de ${item.nombre}" style="width: 100%">
                <h5 class="card-title">Descripción:</h5>
                <p class="card-text">${item.descripcion}</p>
            </div>
            <div class="card-footer">
                <div class="row"> 
                    <p class="card-text col-6 d-flex justify-content-center" style="font-size: 1.1rem">$${precio.precio}</p>
                    <h5 class="card-text col-6">${stock}</h5>
                </div>
                <div class="row justify-content-center">
                    <button class="btn btn-success col-4" data-bs-toggle="modal" data-bs-target="#updModal" onclick="modalActualizarProducto('${item.id}')">Actualizar</button>
                    <button class="btn btn-warning col-4" data-bs-toggle="modal" data-bs-target="#editModal" onclick="modalEditarProducto('${item.id}')">Editar</button>
                    <button class="btn btn-danger col-4" data-bs-toggle="modal" data-bs-target="#delModal" onclick="modalBorrarProducto('${item.id}')">Eliminar</button>
                </div>
            </div>
        </div>
    `;
    document.getElementById('filaProductos').insertAdjacentHTML('beforeend', cardProducto);
}
function optionCategoria(item) {
    optionsCategoria.push('<option value="' + item.id + '">' + item.nombre + '</option>');
}
function GetDisponiblesHistoricosByIdProducto(IdProducto){
    let query = `
    query miQuery($id: String){
        getDisponibleHistoricosByIdProducto(id: $id){
            id
            disponibilidad
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
                    id: IdProducto
                }
            }),
            success: function(response){
                resolve(response.data.getDisponibleHistoricosByIdProducto);
            }
        });
    });
}
function GetPreciosHistoricosByIdProducto(IdProducto){
    let query = `
    query miQuery($id: String){
        getPrecioHistoricosByIdProducto(id: $id){
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
                    id: IdProducto
                }
            }),
            success: function(response){
                resolve(response.data.getPrecioHistoricosByIdProducto);
            }
        });
    });
}
function GetUltimoDisponibleHistoricoByIdProducto(idProducto){
    let query = `
    query miQuery($id: String){
        getUltimoDisponibleHistoricoByIdProducto(id: $id){
            id
            disponibilidad
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
                    id: idProducto
                }
            }),
            success: function(response){
                resolve(response.data.getUltimoDisponibleHistoricoByIdProducto);
            }
        });
    });
}
function GetUltimoPrecioHistoricoByIdProducto(idProducto){
    let query = `
    query miQuery($id: String){
        getUltimoPrecioHistoricoByIdProducto(id: $id){
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
                    id: idProducto
                }
            }),
            success: function(response){
                resolve(response.data.getUltimoPrecioHistoricoByIdProducto);
            }
        });
    });

}
async function GetProductosByIdCategoria(idCategoria) {
    let query = `
    query miQuery($id: String) {
        getProductosByIdCategoria(id: $id) {
            id
            nombre
            descripcion
            foto
            categoria
        }
    }
    `;

    // Limpiamos el contenedor y comenzamos la fila de tarjetas
    document.getElementById('contProductos').innerHTML = '<div class="row" id="filaProductos"></div>';

    $.ajax({
        type: "POST",
        url: "http://localhost:8091/graphql",
        contentType: "application/json",
        timeout: 15000,
        data: JSON.stringify({
            query: query,
            variables: {
                id: idCategoria
            }
        }),
        success: async function(response) {
            // Procesar y mostrar los productos obtenidos de la categoría seleccionada
            for (const item of response.data.getProductosByIdCategoria) {
                await cardProductos(item);
            }
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
function GetCategoriaById(idCategoria){
    let query = `
    query miQuery($id: ID!){
        getCategoriaById(id: $id){
            id
            nombre
            descripcion
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
                    id: idCategoria
                }
            }),
            success: function(response){
                resolve(response.data.getCategoriaById);
            }
        });
    });
}
function GetCategorias(){
    let query = `
    query miQuery {
        getCategorias {
            id
            nombre
            descripcion
        }
    }`;
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
            optionsCategoria = [];
            optionsCategoria.push('<option value="defaultCategoria">Seleccione una categoria</option>');
            response.data.getCategorias.forEach(optionCategoria);
            document.getElementById('cmbCategorias').innerHTML = optionsCategoria.join("");
            document.getElementById('cmbCategorias2').innerHTML = optionsCategoria.join("");
            document.getElementById('editCategorias').innerHTML = optionsCategoria.join("");
        }
    });
}
async function GetProductos() {
    let query = `
    query miQuery {
        getProductos {
            id
            nombre
            descripcion
            foto
            categoria
        }
    }`;
    
    // Limpiamos el contenedor y comenzamos la fila de tarjetas
    document.getElementById('contProductos').innerHTML = '<div class="row" id="filaProductos"></div>';

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
            for (const item of response.data.getProductos) {
                await cardProductos(item);
            }
        }
    });
}
function UpdProducto(idProducto, nombre, descripcion, foto, categoria){
    let query = `
    mutation miMutation($id: ID!, $input: ProductoInput!){
        updProducto(id: $id, input: $input){
            id
            nombre
            descripcion
            foto
            categoria
        }
    }`;
    $.ajax({
        type: "POST",
        url: "http://localhost:8091/graphql",
        contentType: "application/json",
        timeout: 15000,
        data: JSON.stringify({
            query: query,
            variables: {
                id: idProducto,
                input: {
                    nombre: nombre,
                    descripcion: descripcion,
                    foto: foto,
                    categoria: categoria
                }
            }
        }),
        success: function(response){
            alert("Producto actualizado exitosamente");
        }
    });
}
async function DelHistoricosByIdProducto(idProducto){
    let disponibles = await GetDisponiblesHistoricosByIdProducto(idProducto);
    let precios = await GetPreciosHistoricosByIdProducto(idProducto);
    for (const item of disponibles) {
        delDisponibleHistorico(item.id);
    }
    for (const item of precios) {
        DelPrecioHistorico(item.id);
    }
}
function delDisponibleHistorico(idDisponible){
    let query = `
    mutation miMutation($id: ID!){
        delDisponibleHistorico(id: $id){
            message
        }
    }`;
    $.ajax({
        type: "POST",
        url: "http://localhost:8091/graphql",
        contentType: "application/json",
        timeout: 15000,
        data: JSON.stringify({
            query: query,
            variables: {
                id: idDisponible
            }
        }),
        success: function(response){
        }
    });
}
function DelPrecioHistorico(idPrecio){
    let query = `
    mutation miMutation($id: ID!){
        delPrecioHistorico(id: $id){
            message
        }
    }`;
    $.ajax({
        type: "POST",
        url: "http://localhost:8091/graphql",
        contentType: "application/json",
        timeout: 15000,
        data: JSON.stringify({
            query: query,
            variables: {
                id: idPrecio
            }
        }),
        success: function(response){
        }
    });
}
function DelProducto(idProducto){
    let query = `
    mutation miMutation($id: ID!){
        delProducto(id: $id){
            message
        }
    }`;
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
            alert(response.data.delProducto.message);
        }
    });
}
function AddDisponibleHistorico(idProducto, disponibilidad){
    let bool = (disponibilidad === "true");
    let fecha = new Date().toISOString();
    let query = `
    mutation miMutation($input: DisponibleHistoricoInput!){
        addDisponibleHistorico(input: $input){
            id
            disponibilidad
            fecha
        }
    }`;
    $.ajax({
        type: "POST",
        url: "http://localhost:8091/graphql",
        contentType: "application/json",
        timeout: 15000,
        data: JSON.stringify({
            query: query,
            variables: {
                input: {
                    disponibilidad: bool,
                    fecha: fecha,
                    producto: idProducto
                }
            }
        }),
        success: function(response){
            alert("Disponibilidad agregada exitosamente");
        }
    });
}
function AddPrecioHistorico(idProducto, precio){
    let fecha = new Date().toISOString();
    valor = parseFloat(precio);
    let query = `
    mutation miMutation($input: PrecioHistoricoInput!){
        addPrecioHistorico(input: $input){
            id
            precio
            fecha
        }
    }`;
    $.ajax({
        type: "POST",
        url: "http://localhost:8091/graphql",
        contentType: "application/json",
        timeout: 15000,
        data: JSON.stringify({
            query: query,
            variables: {
                input: {
                    precio: valor,
                    fecha: fecha,
                    producto: idProducto
                }
            }
        }),
        success: function(response){
            alert("Precio agregado exitosamente");
        }
    });
}
function AddProducto(){
    let nombre = document.getElementById('Nombre').value;
    let descripcion = document.getElementById('Descripcion').value;
    let foto = document.getElementById('Foto').value;
    let categoria = document.getElementById('cmbCategorias').value;
    let precio = document.getElementById('Precio').value;
    let disponibilidad = document.getElementById('Disponibilidad').value;
    let query = `
    mutation miMutation($input: ProductoInput!){
        addProducto(input: $input){
            id
            nombre
            descripcion
            foto
            categoria
        }
    }`;
    $.ajax({
        type: "POST",
        url: "http://localhost:8091/graphql",
        contentType: "application/json",
        timeout: 15000,
        data: JSON.stringify({
            query: query,
            variables: {
                input: {
                    nombre: nombre,
                    descripcion: descripcion,
                    foto: foto,
                    categoria: categoria
                }
            }
        }),
        success: function(response){
            AddPrecioHistorico(response.data.addProducto.id, precio);
            AddDisponibleHistorico(response.data.addProducto.id, disponibilidad);
            alert("Producto agregado exitosamente");
        }
    });
}