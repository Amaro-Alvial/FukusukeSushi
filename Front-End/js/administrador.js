let contentTablePersona = [];
let optionsPerfil = [];

function trtdPersona(item){
    contentTablePersona.push(`
        <tr>
            <td>${item.run}</td>
            <td>${item.nombreCompleto}</td>
            <td>${item.comuna}</td>
            <td>${item.direccion}</td>
            <td>${item.telefono}</td>
            <td>
                <button class="btn btn-success btn-sm" onclick="GetConexionesByRun('${item.run}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="openDeleteModal('${item.run}')">Eliminar</button>
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
function GetConexionesByRun(runPersona){
    let query = `
    query miQuery($run: String!){
        getPersonaByRun(run: $run){
            id
            run
            nombreCompleto
            direccion
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
            variables: {
                run: runPersona
            }
        }),
        success: function(response){
            openEditModal(response.data.getPersonaByRun);
        }
    });
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
                resolve(response.data.getUsuariosByIdPersona[0]); // Resuelve la promesa con los datos
            },
            error: function(error) {
                reject("Error en la solicitud: " + error); // Rechaza la promesa si ocurre un error
            }
        });
    });
}

function GetPersonaByRun(runPersona){
    let query = `
    query miQuery($run: String!){
        getPersonaByRun(run: $run){
            id
            run
            nombreCompleto
            direccion
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
            variables: {
                run: runPersona
            }
        }),
        success: function(response){
            openEditModal(response.data.getPersonaByRun);
        }
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
                id: idPersona
            }
        }),
        success: function(response){
            trtdPersona(response.data.getPersonaById);
            document.getElementById('tblPersona').innerHTML = contentTablePersona.join("");
        }
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
            GetPersonaById(response.data.getUsuarioById.persona);
        }
    });
}
function GetPersonasByIdPerfil(){
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
    $.ajax({
        type: "POST",
        url: "http://localhost:8091/graphql",
        contentType: "application/json",
        timeout: 15000,
        data: JSON.stringify({
            query: query,
            variables: {
                input: perfil
            }
        }),
        success: function(response){
            contentTablePersona = [];
            contentTablePersona.push('<tr><td>RUN</td><td>NOMBRE</td><td>COMUNA</td><td>DIRECCIÓN</td><td>TELEFONO</td><td>Editar/Eliminar</td></tr>');
            response.data.getUsuarioPerfilsByIdPerfil.forEach(item => {
                GetUsuarioById(item.usuario);
            });
        }
    });
}
// Función que llama a la función GetPersonasByIdPerfil cuando se selecciona un perfil en el ComboBox
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
            optionsPerfil.push('<option value="">Seleccione un perfil</option>');
            response.data.getPerfils.forEach(optionPerfil);
            document.getElementById('cmbPerfil').innerHTML = optionsPerfil.join("");
            document.getElementById('cmbPerfil2').innerHTML = optionsPerfil.join("");
        }
    });
}
function GetPersonas(){
    let query = `
    query miQuery {
        getPersonas {
            id
            run
            nombreCompleto
            direccion
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
        success: function(response){
            contentTablePersona.push('<tr><td>RUN</td><td>NOMBRE</td><td>COMUNA</td><td>DIRECCIÓN</td><td>TELEFONO</td><td>Editar/Eliminar</td></tr>');
            response.data.getPersonas.forEach(trtdPersona);
            document.getElementById('tblPersona').innerHTML = contentTablePersona.join("");
        }
    });
}
function addPersona(){
    let run = document.getElementById('run').value;
    let nombreCompleto = document.getElementById('nombreCompleto').value;
    let direccion = document.getElementById('direccion').value;
    let comuna = document.getElementById('comuna').value;
    let provincia = document.getElementById('provincia').value;
    let region = document.getElementById('region').value;
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
            provincia
            region
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
                    provincia: provincia,
                    region: region,
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
