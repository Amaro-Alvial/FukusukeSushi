async function openEditModal(item) {
    // Llena los campos del modal de edición con los datos de la persona seleccionada
    let item2 = await GetUsuarioByIdPersona(item.id); 
    document.getElementById('editRun').value = item.run;
    document.getElementById('editNombre').value = item.nombreCompleto;
    document.getElementById('editComuna').value = item.comuna;
    document.getElementById('editDireccion').value = item.direccion;
    document.getElementById('editFechaNacimiento').value = item.fechaNacimiento;
    document.getElementById('editSexo').value = item.sexo;
    document.getElementById('editTelefono').value = item.telefono;
    document.getElementById('editEmail').value = item2.email;
    document.getElementById('editNombreUsuario').value = item2.nombreUsuario;
    
    // Muestra el modal de edición
    var editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}

function openDeleteModal(run) {
    // Guarda el RUN de la persona a eliminar en una variable global o en el modal si es necesario
    window.runToDelete = run;
    
    // Muestra el modal de eliminación
    var deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
}

function saveChanges() {
    // Aquí puedes obtener los valores del modal de edición y enviarlos a tu backend
    const run = document.getElementById('editRun').value;
    const nombre = document.getElementById('editNombre').value;
    const comuna = document.getElementById('editComuna').value;
    const direccion = document.getElementById('editDireccion').value;
    const telefono = document.getElementById('editTelefono').value;
    
    // Lógica para guardar los cambios en el backend (por ejemplo, una petición AJAX)
    console.log("Guardando cambios para:", { run, nombre, comuna, direccion, telefono });
    
    // Cerrar el modal
    var editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    editModal.hide();
}

function confirmDelete() {
    // Aquí puedes hacer una llamada para eliminar el usuario en el backend usando el RUN almacenado
    console.log("Eliminando persona con RUN:", window.runToDelete);

    // Cerrar el modal
    var deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
    deleteModal.hide();
}