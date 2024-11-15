async function abrirModalEditar(run) {
    // Llena los campos del modal de edición con los datos de la persona seleccionada
    let item = await GetPersonaByRun(run);
    let item2 = await GetUsuarioByIdPersona(item.id); 
    let item3 = await GetUsuarioPerfilByIdUsuario(item2.id);
    let item4 = await GetPerfilById(item3.perfil);
    let comuna = await GetComunaById(item.comuna);
    let provincia = await GetProvinciaById(comuna.provincia);
    let region = await GetRegionById(provincia.region);
    let fecha = new Date(item.fechaNacimiento).toISOString().split('T')[0];
    if (item3.caducidad != null) {
        let fecha2 = new Date(item3.caducidad).toISOString().split('T')[0];
        document.getElementById('editCaducidad').value = fecha2;
    }
    else {
        document.getElementById('editCaducidad').value = "";
    }
    document.getElementById('editRun').value = item.run;
    document.getElementById('editNombre').value = item.nombreCompleto;
    document.getElementById('editDireccion').value = item.direccion;
    document.getElementById('editFechaNacimiento').value = fecha;
    document.getElementById('editSexo').value = item.sexo;
    document.getElementById('editTelefono').value = item.telefono;
    document.getElementById('editEmail').value = item2.email;
    document.getElementById('editPass').value = item2.pass;
    document.getElementById('editNombreUsuario').value = item2.nombreUsuario;
    document.getElementById('editTipo').value = item4.tipo;
    document.getElementById('editRegion').value = region.id;
    document.getElementById('editProvincia').value = provincia.id;
    document.getElementById('editComuna').value = comuna.id;
    var editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}
async function UpdConexiones(){
    run = document.getElementById('editRun').value;
    caducidad = document.getElementById('editCaducidad').value;
    email = document.getElementById('editEmail').value;
    pass = document.getElementById('editPass').value;
    nombreUsuario = document.getElementById('editNombreUsuario').value;
    nombreCompleto = document.getElementById('editNombre').value;
    direccion = document.getElementById('editDireccion').value;
    fechaNacimiento = document.getElementById('editFechaNacimiento').value;
    sexo = document.getElementById('editSexo').value;
    telefono = document.getElementById('editTelefono').value;
    comuna = document.getElementById('editComuna').value
    let item = await GetPersonaByRun(run);
    let item2 = await GetUsuarioByIdPersona(item.id); 
    let item3 = await GetUsuarioPerfilByIdUsuario(item2.id);
    const validacion = await UpdUsuario(item2.id, email, pass, nombreUsuario, item2.persona);
    if (!validacion){
        alert("Error al actualizar usuario");
        return;
    }
    UpdUsuarioPerfil(item3.id, item3.usuario, item3.perfil, caducidad);
    UpdPersona(item.id, run, nombreCompleto, direccion, fechaNacimiento, sexo, telefono, comuna);
    var editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    editModal.hide();
    alert("Usuario actualizado");
    GetPersonas();
    GetRegiones();
    GetComunas();
    GetProvincias();
}

async function openDeleteModal(idPersona, rutPersona) {
    document.getElementById('delConfirmacion').textContent = `¿Estás seguro de que deseas eliminar al usuario de rut: ${rutPersona}?`;
    document.getElementById('delConfirmacion').value = idPersona;
    var deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
}

async function DelConexiones(){
    var deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
    let idPersona = document.getElementById('delConfirmacion').value;
    let usuario = await GetUsuarioByIdPersona(idPersona);
    let usuarioPerfil = await GetUsuarioPerfilByIdUsuario(usuario.id);
    DelUsuarioPerfil(usuarioPerfil.id);
    DelUsuario(usuario.id);
    DelPersona(idPersona);
    deleteModal.hide();
    GetPersonas();
}
