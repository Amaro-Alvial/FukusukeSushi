let optionCategorias = [];

function optionCategoria(item){
    optionCategorias.push(`
        <div class="col-12 ps-1" style="height: 13%">
            <button class="categoria-button" value="${item.id}">${item.nombre}</button>
        </div>
    `);
}

function optionProvincia(item) {
    optionsProvincia.push('<option value="' + item.id + '">' + item.nombre + '</option>');
}
function optionRegion(item) {
    optionsRegion.push('<option value="' + item.id + '">' + item.nombre + '</option>');
}
function optionComuna(item) {
    optionsComuna.push('<option value="' + item.id + '">' + item.nombre + '</option>');
}

function getCategorias(){
    let query=`
    query getCategorias{
        getCategorias{
            id
            nombre
        }
    }
    `;
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8091/graphql",
        data: JSON.stringify({
            query: query,
            variables: {}
        }),
        success: function(response){
            response.data.getCategorias.forEach(optionCategoria);
            document.getElementById('categoria-scroll').innerHTML = optionCategorias.join("");
        }
    })
}
async function cardProductos(item) {
    let precio = await GetUltimoPrecioHistoricoByIdProducto(item.id);
    let disponibilidad = await GetUltimoDisponibleHistoricoByIdProducto(item.id);
    let stock = disponibilidad.disponibilidad ? "Disponible" : "No disponible";

    let cardProductos = `
        <div class="card col-xs-12 col-xxs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 p-2" style="border: white" value="${item.id}">
            <a type="button" data-bs-toggle="modal" data-bs-target="#productModal" class="producto-button" onclick="actualizarModal(this.parentElement.getAttribute('value'));">
                <div class="card-header p-0">
                    <img src="${item.foto}" alt="Foto de ${item.nombre}" style="width: 100%; border-radius: inherit">
                </div>
                <div class="card-footer" style="background-color: #F2F1F1">
                    <div class="row">
                        <div class="col-8">
                            <h5 class="card-title">${item.nombre}</h5>
                            <p class="card-text" style="font-weight: bold; font-size: 1.2rem">$${precio.precio}</p>
                        </div>
                        <div class="col-4 d-flex justify-content-center align-items-center">
                            <button class="agregar-button-card">
                                <img src="./img/signo_mas.png" style="height: 45px">
                            </button>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    `;
    document.getElementById('productos-container').insertAdjacentHTML('beforeend', cardProductos);
}
async function getProductosByIdCategoria(categoria) {
    const query = `
    query getProductosByIdCategoria($id: String){
        getProductosByIdCategoria(id: $id){
            id
            nombre
            descripcion
            foto
        }
    }
    `;

    document.getElementById('scroll-container').innerHTML = '<div class="row" id="productos-container"></div>';

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8091/graphql",
        data: JSON.stringify({
            query: query,
            variables: {
                id: categoria
            }
        }),
        success: async function(response) {
            document.getElementById('productos-container')
            for (const item of response.data.getProductosByIdCategoria) {
                await cardProductos(item);
            }
        },
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
function GetComunasByIdProvincia(idProvincia){
    let query = `
    query miQuery($input: String){
        getComunasByIdProvincia(id: $input){
            id
            nombre
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
                input: idProvincia
            }
        }),
        success: function(response){
            optionsComuna = [];
            optionsComuna.push('<option value="defaultComuna">Seleccione la Comuna</option>');
            response.data.getComunasByIdProvincia.forEach(optionComuna);
            document.getElementById('regComuna').innerHTML = optionsComuna.join("");
            document.getElementById('editComuna').innerHTML = optionsComuna.join("");
        }
    });
}
function GetProvinciasByIdRegion(idRegion){
    let query = `
    query miQuery($input: String){
        getProvinciasByIdRegion(id: $input){
            id
            nombre
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
                input: idRegion
            }
        }),
        success: function(response){
            optionsProvincia = [];
            optionsProvincia.push('<option value="defaultProvincia">Seleccione la Provincia</option>');
            response.data.getProvinciasByIdRegion.forEach(optionProvincia);
            document.getElementById('regProvincia').innerHTML = optionsProvincia.join("");
            document.getElementById('editProvincia').innerHTML = optionsProvincia.join("");

        }
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
function GetComunas(){
    let query = `
    query miQuery {
        getComunas {
            id
            nombre
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
        success: function(response){
            optionsComuna = [];
            optionsComuna.push('<option value="defaultComuna">Seleccione la Comuna</option>');
            response.data.getComunas.forEach(optionComuna);
            document.getElementById('regComuna').innerHTML = optionsComuna.join("");
            document.getElementById('editComuna').innerHTML = optionsComuna.join("");
        }
    });
}
function GetProvincias(){
    let query = `
    query miQuery {
        getProvincias {
            id
            nombre
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
        success: function(response){
            optionsProvincia = [];
            optionsProvincia.push('<option value="defaultProvincia">Seleccione la Provincia</option>');
            response.data.getProvincias.forEach(optionProvincia);
            document.getElementById('regProvincia').innerHTML = optionsProvincia.join("");
            document.getElementById('editProvincia').innerHTML = optionsProvincia.join("");

        }
    });
}
function GetRegiones(){
    let query = `
    query miQuery {
        getRegions {
            id
            nombre
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
        success: function(response){
            optionsRegion = [];
            optionsRegion.push('<option value="defaultRegion">Seleccione la region</option>');
            response.data.getRegions.forEach(optionRegion);
            document.getElementById('regRegion').innerHTML = optionsRegion.join("");
            document.getElementById('editRegion').innerHTML = optionsRegion.join("");
        }
    });
}
function GetPerfilById(idPerfil){
    let query = `
    query miQuery($id: ID!){
        getPerfilById(id: $id){
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
                    id: idPerfil
                }
            }),
            success: function(response){
                resolve(response.data.getPerfilById);
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
function GetPersonaById(idPersona){
    let query = `
    query miQuery($id: ID!){
        getPersonaById(id: $id){
            id
            run
            nombreCompleto
            direccion
            fechaNacimiento
            sexo
            telefono
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
function UpdPersona(idPersona, run, nombreCompleto, direccion, fechaNacimiento, sexo, telefono, comuna){
    let mutation = `
    mutation miMutation($id: ID!, $input: PersonaInput){
        updPersona(id: $id ,input: $input){
            id
            run
            nombreCompleto
            direccion
            comuna
            fechaNacimiento
            sexo
            telefono
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
                id: idPersona,
                input: {
                    run: run,
                    nombreCompleto: nombreCompleto,
                    direccion: direccion,
                    comuna: comuna,
                    fechaNacimiento: fechaNacimiento,
                    sexo: sexo,
                    telefono: telefono
                }
            }
        }),
        success: function(response){
        }
    });
}
function UpdUsuario(idUsuario, email, pass, nombreUsuario, idPersona){
    let mutation = `
    mutation miMutation($id: ID! ,$input: UsuarioInput){
        updUsuario(id: $id, input: $input){
            id
            email
            pass
            nombreUsuario
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
                query: mutation,
                variables: {
                    id: idUsuario,
                    input: {
                        email: email,
                        pass: pass,
                        nombreUsuario: nombreUsuario,
                        persona: idPersona
                    }
                }
            }),
            success: function(response){
                if (response.data.updUsuario == null){
                    resolve(false);
                } else {
                    resolve(true);
                }

            }
        });
    });
}
function AddReclamo(titulo, descripcion, cliente){
    let mutation = `
    mutation miMutation($input: ReclamoInput){
        addReclamo(input: $input){
            id
            titulo
            descripcion
            cliente
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
                input: {
                    titulo: titulo,
                    descripcion: descripcion,
                    cliente: cliente
                }
            }
        }),
        success: function(response){
            alert("Reclamo enviado con exito");
        }
    });
}