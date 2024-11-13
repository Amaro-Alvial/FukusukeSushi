let contentTablePersona = [];

async function trtdPersona(item){
    comuna = await GetComunaById(item.comuna)
    contentTablePersona.push(`
        <tr>
            <td>${item.run}</td>
            <td>${item.nombreCompleto}</td>
            <td>${comuna.nombre}</td>
            <td>${item.direccion}</td>
            <td>${item.telefono}</td>
            <td>
                <button class="btn btn-success btn-sm" onclick="abrirModalEditar('${item.run}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="openDeleteModal('${item.id}', '${item.run}')">Eliminar</button>
            </td>
            </td>
        </tr>
    `);
}
function optionPerfil(item) {
    let idDueno = "672bf4baed29060af5294eb8";
    if (item.id !== idDueno) {
        optionsPerfil.push('<option value="' + item.id + '">' + item.tipo + '</option>');
    }
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
function GetUsuarioByIdPersona(idPersona){
    let query = `
    query miQuery($id: String){
        getUsuariosByIdPersona(id: $id){
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
                    id: idPersona
                }
            }),
            success: function(response){
                resolve(response.data.getUsuariosByIdPersona[0]);
            }
        });
    });
}
function GetUsuarioPerfilByIdUsuario(idUsuario){
    let query = `
    query miQuery($id: String){
        getUsuarioPerfilsByIdUsuario(id: $id){
            id
            usuario
            perfil
            caducidad
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
                resolve(response.data.getUsuarioPerfilsByIdUsuario[0]);
            }
        });
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
function GetPersonaByRun(run) {
    let query = `
    query miQuery($run: String!) {
        getPersonaByRun(run: $run) {
            id
            run
            nombreCompleto
            direccion
            comuna
            fechaNacimiento
            sexo
            telefono
        }
    }`;
    
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "http://localhost:8091/graphql",
            contentType: "application/json",
            timeout: 15000,
            data: JSON.stringify({
                query: query,
                variables: {
                    run: run
                }
            }),
            success: function(response) {
                resolve(response.data.getPersonaByRun);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error en la solicitud:", textStatus, errorThrown);
                reject(new Error(`Error en la solicitud: ${textStatus}`));
            }
        });
    });
}
async function GetPersonaById(idPersona) {
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
    try {
        const response = await $.ajax({
            type: "POST",
            url: "http://localhost:8091/graphql",
            contentType: "application/json",
            timeout: 15000,
            data: JSON.stringify({
                query: query,
                variables: {
                    id: idPersona
                }
            })
        });
        await trtdPersona(response.data.getPersonaById);
    } catch (error) {
        console.error("Error al obtener persona por ID:", error);
    }
}
async function GetUsuarioById(idUsuario) {
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
    try {
        const response = await $.ajax({
            type: "POST",
            url: "http://localhost:8091/graphql",
            contentType: "application/json",
            timeout: 15000,
            data: JSON.stringify({
                query: query,
                variables: {
                    id: idUsuario
                }
            })
        });
        await GetPersonaById(response.data.getUsuarioById.persona);
    } catch (error) {
        console.error("Error al obtener usuario por ID:", error);
    }
}
async function GetPersonasByIdPerfil() {
    let perfil = document.getElementById('cmbPerfil2').value;
    let query = `
    query miQuery($input: String){
        getUsuarioPerfilsByIdPerfil(id: $input){
            id
            perfil
            usuario
            caducidad
        }
    }
    `;
    try {
        const response = await $.ajax({
            type: "POST",
            url: "http://localhost:8091/graphql",
            contentType: "application/json",
            timeout: 15000,
            data: JSON.stringify({
                query: query,
                variables: {
                    input: perfil
                }
            })
        });
        contentTablePersona = [];
        contentTablePersona.push('<tr><td>RUN</td><td>NOMBRE</td><td>COMUNA</td><td>DIRECCIÓN</td><td>TELÉFONO</td><td>Editar/Eliminar</td></tr>');
        for (const item of response.data.getUsuarioPerfilsByIdPerfil) {
            await GetUsuarioById(item.usuario);
        }
        document.getElementById('tblPersona').innerHTML = contentTablePersona.join("");
    } catch (error) {
        console.error("Error al obtener personas por perfil:", error);
    }
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
            document.getElementById('cmbComuna').innerHTML = optionsComuna.join("");
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
            document.getElementById('cmbProvincia').innerHTML = optionsProvincia.join("");
            document.getElementById('editProvincia').innerHTML = optionsProvincia.join("");
        }
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
            document.getElementById('cmbComuna').innerHTML = optionsComuna.join("");
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
            document.getElementById('cmbProvincia').innerHTML = optionsProvincia.join("");
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
            document.getElementById('cmbRegion').innerHTML = optionsRegion.join("");
            document.getElementById('editRegion').innerHTML = optionsRegion.join("");
        }
    });
}
function GetPerfiles(){
    let query = `
    query miQuery {
        getPerfils {
            id
            tipo
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
            optionsPerfil = [];
            optionsPerfil.push('<option value="defaultPerfil">Seleccione un perfil</option>');
            response.data.getPerfils.forEach(optionPerfil);
            document.getElementById('cmbPerfil').innerHTML = optionsPerfil.join("");
            document.getElementById('cmbPerfil2').innerHTML = optionsPerfil.join("");
        }
    });
}
async function GetPersonas(){
    let query = `
    query miQuery {
        getPersonas {
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
            query: query,
            variables: {}
        }),
        success: async function(response){
            contentTablePersona = [];
            contentTablePersona.push('<tr><td>RUN</td><td>NOMBRE</td><td>COMUNA</td><td>DIRECCIÓN</td><td>TELEFONO</td><td>Editar/Eliminar</td></tr>');
            for (const item of response.data.getPersonas) {
                await trtdPersona(item);
            }
            document.getElementById('tblPersona').innerHTML = contentTablePersona.join("");
        }
    });
}
function DelUsuarioPerfil(idUsuarioPerfil){
    let mutation = `
    mutation miMutation($id: ID!){
        delUsuarioPerfil(id: $id){
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
                id: idUsuarioPerfil
            }
        }),
        success: function(response){
            alert("Usuario perfil eliminado exitosamente");
        }
    });
}
function DelUsuario(idUsuario){
    let mutation = `
    mutation miMutation($id: ID!){
        delUsuario(id: $id){
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
                id: idUsuario
            }
        }),
        success: function(response){
            alert("Usuario eliminado exitosamente");
        }
    });
}
function DelPersona(idPersona){
    let mutation = `
    mutation miMutation($id: ID!){
        delPersona(id: $id){
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
                id: idPersona
            }
        }),
        success: function(response){
            alert("Persona eliminada exitosamente");
        }
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
            alert("Persona actualizada exitosamente");
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
            alert("Usuario actualizado exitosamente");
        }
    });
}
function UpdUsuarioPerfil(idUsuarioPerfil, idUsuario, idPerfil, caducidad){
    let mutation = `
    mutation miMutation($id: ID! ,$input: UsuarioPerfilInput){
        updUsuarioPerfil(id: $id, input: $input){
            id
            usuario
            perfil
            caducidad
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
                id: idUsuarioPerfil,
                input: {
                    usuario: idUsuario,
                    perfil: idPerfil,
                    caducidad: caducidad
                }
            }
        }),
        success: function(response){
            alert("Usuario perfil actualizado exitosamente");
        }
    })

}
function addPersona(){
    let run = document.getElementById('run').value;
    let nombreCompleto = document.getElementById('nombreCompleto').value;
    let direccion = document.getElementById('direccion').value;
    let comuna = document.getElementById('cmbComuna').value;
    let fechaNacimiento = document.getElementById('fechaNacimiento').value;
    let sexo = document.getElementById('sexo').value;
    let telefono = document.getElementById('telefono').value;
    let mutation = `
    mutation miMutation($input: PersonaInput){
        addPersona(input: $input){
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
            AddUsuario(response.data.addPersona.id);
        }
    });
}
function AddUsuario(idPersona){
    let email = document.getElementById('email').value;
    let pass = document.getElementById('pass').value;
    let nombreUsuario = document.getElementById('nombreUsuario').value;
    let mutation = `
    mutation miMutation($input: UsuarioInput){
        addUsuario(input: $input){
            id
            email
            pass
            nombreUsuario
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
                    email: email,
                    pass: pass,
                    nombreUsuario: nombreUsuario,
                    persona: idPersona
                }
            }
        }),
        success: function(response){
            AddUsuarioPerfil(response.data.addUsuario.id);
        }
    })
}
function AddUsuarioPerfil(idUsuario){
    let perfil = document.getElementById('cmbPerfil').value;
    let caducidad = document.getElementById('caducidad').value;
    if (caducidad === "") {
        caducidad = null;
    }
    let mutation = `
    mutation miMutation($input: UsuarioPerfilInput){
        addUsuarioPerfil(input: $input){
            id
            usuario
            perfil
            caducidad
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
                    usuario: idUsuario,
                    perfil: perfil,
                    caducidad: caducidad
                }
            }
        }),
        success: function(response){
            alert("Usuario creado exitosamente");
        }
    })
}
