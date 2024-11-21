getCategorias();
GetRegiones();
GetComunas();
GetProvincias();

let categoriaId = "67229547c178eb95c1c36163";
getProductosByIdCategoria(categoriaId);

document.getElementById('categoria-select').addEventListener('change', function(){
    let categoriaId = document.getElementById('categoria-select').value;
    getProductosByIdCategoria(categoriaId);
});

document.getElementById('login-form').addEventListener('submit', function(){
    let email = document.getElementById('email').value;
    let pass = document.getElementById('pwd').value;

    getUsuarioByIdPerfil
});
//Dejar listo el carrito del 
setCarrito(idCliente);

async function RegUsuario() {
    if (!validarFormulario()) return;
    const personaInput = {
        run: $('#regRun').val(),
        nombreCompleto: $('#regNombre').val(),
        direccion: $('#regDireccion').val(),
        comuna: $('#regComuna').val(),
        fechaNacimiento: $('#regFechaNacimiento').val(),
        sexo: $('#regSexo').val(),
        telefono: $('#regTelefono').val(),
    };
    const usuarioInput = {
        email: $('#regEmail').val(),
        pass: $('#regPass').val(),
        nombreUsuario: $('#regNombreUsuario').val(),
        persona: "", // Este campo se llena en el backend
    };
    const usuarioPerfilInput = {
        caducidad: $('#regCaducidad').val(),
        usuario: "", // Este campo se llena en el backend
        perfil: "", // Este campo se llena en el backend
    };
    const mutation = `
        mutation RegistrarUsuario($personaInput: PersonaInput!, $usuarioInput: UsuarioInput!, $usuarioPerfilInput: UsuarioPerfilInput!) {
            registrarUsuario(personaInput: $personaInput, usuarioInput: $usuarioInput, usuarioPerfilInput: $usuarioPerfilInput) {
                id
                usuario # Usuario que es un String (ID)
                perfil # Perfil que es un ID
            }
        }
    `;
    $.ajax({
        url: 'http://localhost:8091/graphql',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            query: mutation,
            variables: {
                personaInput,
                usuarioInput,
                usuarioPerfilInput,
            },
        }),
        success: async function (response) {
            if (response.errors) {
                const error = response.errors[0];
                alert(`Error: ${error.message}`);
            } else {
                const data = response.data.registrarUsuario;
                let perfil = await GetPerfilById(data.perfil);
                let usuario = await GetUsuarioById(data.usuario);
                alert(`Bienvenido ${usuario.nombreUsuario}`);
                let regModal = new bootstrap.Modal(document.getElementById('regModal'));
                regModal.hide();
                location.reload();
                if (perfil.tipo === 'Admin') {
                    window.location.href = 'http://localhost/Front-End/adminPersonas.php';
                } else {
                    window.location.href = 'http://localhost/Front-End/index.php';
                }
            }
        },
        error: function (xhr, status, error) {
            console.error('Error AJAX:', error);
            alert('Error al registrar el usuario. Inténtalo de nuevo.');
        },
    });
}
async function IniciarSesion() {
    const nombreUsuario = $('#loginNombreUsuario').val();
    const pass = $('#loginPass').val();

    if (!nombreUsuario || !pass) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const query = `
        query IniciarSesion($nombreUsuario: String!, $pass: String!) {
            iniciarSesion(nombreUsuario: $nombreUsuario, pass: $pass) {
                id
                nombreUsuario
                email
                perfil
            }
        }
    `;
    try {
        const response = await $.ajax({
            url: 'http://localhost:8091/graphql',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                query,
                variables: { nombreUsuario, pass },
            }),
        });

        if (response.errors) {
            const error = response.errors[0];
            alert(`Error: ${error.message}`);
        } else {
            const data = response.data.iniciarSesion;
            const perfil = await GetPerfilById(data.perfil);
            // Enviar datos a PHP para manejar la sesión
            try {
                const phpResponse = await $.ajax({
                    url: 'http://localhost/Front-End/login_handler.php',
                    type: 'POST',
                    data: {
                        usuario_id: data.id,
                        nombre_usuario: data.nombreUsuario,
                        perfil: perfil.tipo,
                    },
                });

                const result = JSON.parse(phpResponse);
                if (result.success) {
                    alert(result.message);
                    
                    // Redirigir según el perfil
                    if ( perfil.tipo == 'Admin') {
                        alert(`Bienvenido/a, ${data.nombreUsuario}. Redirigiendo a la página de administración.`);
                        window.location.href = 'http://localhost/Front-End/adminPersonas.php';
                    } else {
                        alert(`Bienvenido/a, ${data.nombreUsuario}.`);
                        window.location.href = 'http://localhost/Front-End/index.php';
                    }
                } else {
                    alert(result.message);
                }
            } catch (phpError) {
                console.error('Error en PHP:', phpError);
                alert('Error al iniciar sesión en PHP.');
            }
        }
    } catch (error) {
        console.error('Error AJAX:', error);
        alert('Error al iniciar sesión. Inténtalo de nuevo.');
    }
}

function validarFormulario() {
    const nombre = document.getElementById('regNombre').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPass').value;
    const run = document.getElementById('regRun').value;
    const fechaNacimiento = document.getElementById('regFechaNacimiento').value;
    const sexo = document.getElementById('regSexo').value;
    const username = document.getElementById('regNombreUsuario').value;
    const telefono = document.getElementById('regTelefono').value;
    const region = document.getElementById('regRegion').value;
    const provincia = document.getElementById('regProvincia').value;
    const comuna = document.getElementById('regComuna').value;
    const direccion = document.getElementById('regDireccion').value

    if (!nombre || !email || !password || !run || !fechaNacimiento || !sexo || !username || !telefono || !region || !provincia || !comuna || !direccion) {
        alert('Por favor, completa todos los campos obligatorios.');
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return false;
    }
    return true;
}

document.getElementById('regRegion').addEventListener('change', function() {
    const regionId = document.getElementById('regRegion').value;
    if (regionId) {
        GetProvinciasByIdRegion(regionId);
    }
});
document.getElementById('regProvincia').addEventListener('change', function() {
    const provinciaId = document.getElementById('regProvincia').value;
    if (provinciaId) {
        GetComunasByIdProvincia(provinciaId);
    }
});