<?php
require_once 'session.php';
    if ($_SESSION['perfil'] != 'Admin') {
        header('Location: index.php');
        exit();
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Personas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./js/adminPersonas.js"></script>
</head>
<body>
<button class="btn btn-secondary dropdown-toggle" type="button" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false">
    Bienvenido, <?php echo htmlspecialchars($_SESSION['nombre_usuario']); ?>
</button>
<ul class="dropdown-menu" aria-labelledby="userMenu">
    <li><a class="dropdown-item" href="perfilUsuario.php">Mi Perfil</a></li>
    <li><a class="dropdown-item" href="logout.php">Cerrar Sesión</a></li>
</ul>                      
<div class="container mt-3"> <!-- Se abre el Container -->
  <h2>Administración de Personas</h2>
  <form>
    <div class="row"> <!-- Se abre fila 1 -->
        <div class="mb-3 mt-3 col-xxl-6">
            <label for="nombreCompleto">Nombre Completo:</label>
            <input type="nombreCompleto" class="form-control" id="nombreCompleto" placeholder="Ingrese el nombre completo" name="nombreCompleto">
        </div>
        <div class="mb-3 mt-3 col-xxl-2">
            <label for="run">Run:</label>
            <input type="run" class="form-control" id="run" placeholder="Ingrese run" name="run">
        </div>
        <div class="mb-3 mt-3 col-xxl-3">
            <label for="fechaNacimiento">Fecha de Nacimiento:</label>
            <input type="date" class="form-control" id="fechaNacimiento" name="fechaNacimiento">
        </div>
        <div class="mb-3 mt-3 col-xxl-1">
            <label for="sexo">Sexo: </label> <br>
            <select class="form-select" name="sexo" id="sexo">
                <option value="M">M</option>
                <option value="F">F</option>
            </select>
        </div>
    </div> <!-- Cierre de la Fila 1 -->
    <div class="row"> <!-- Se abre fila 2 -->
        <div class="mb-3 mt-3 col-xxl-4">
            <label for="region">Región:</label> <br>
            <select class="form-select" name="region" id="cmbRegion"></select>
        </div>
        <div class="mb-3 mt-3 col-xxl-3">
            <label for="provincia">Provincia:</label> <br>
            <select class="form-select" name="provincia" id="cmbProvincia"><option value="defaultProvincia">Seleccione la Provincia</option></select>
        </div>
        <div class="mb-3 mt-3 col-xxl-3">
            <label for="comuna">Comuna:</label> <br>
            <select class="form-select" name="comuna" id="cmbComuna"><option value="defaultComuna">Seleccione la Comuna</option></select>
        </div>
        <div class="mb-3 mt-3 col-xxl-2">
            <label for="telefono">Teléfono:</label>
            <input type="tel" class="form-control" id="telefono" placeholder="Ejemplo: +56912345678" name="telefono" pattern="^\+569\d{8}$" title="Debe ingresar un número válido en formato +56912345678" required>
        </div>
    </div> <!-- Cierre de la Fila 2 -->
    <div class="row"> <!-- Se abre fila 3 -->
        <div class="mb-3 mt-3 col-xxl-6">
            <label for="direccion">Dirección:</label>
            <input type="direccion" class="form-control" id="direccion" placeholder="Ingrese la dirección" name="direccion">
        </div>
        <div class="mb-3 mt-3 col-xxl-6">
            <label for="nombreUsuario">Nombre de Usuario:</label>
            <input type="nombreUsuario" class="form-control" id="nombreUsuario" placeholder="Ingrese el nombre de usuario" name="nombreUsuario">
        </div>
    </div> <!-- Cierre de la Fila 3 -->
    <div class="row"> <!-- Se abre fila 4 -->
        <div class="mb-3 mt-3 col-xxl-2">
            <label for="tipo">Tipo:</label> <br>
            <select class="form-select" name="tipos" id="cmbPerfil"></select>
        </div>
        <div class="mb-3 mt-3 col-xxl-2">
            <label for="caducidad">Caducidad (opcional):</label> <br>
            <input type="date" class="form-control" id="caducidad" name="caducidad">
        </div>
        <div class="mb-3 mt-3 col-xxl-5">
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" placeholder="Ingrese email" name="email">
        </div>
        <div class="mb-3 mt-3 col-xxl-3">
            <label for="pass">Contraseña:</label>
            <input type="password" class="form-control" id="pass" placeholder="Ingrese contraseña" name="pass">
        </div>
    </div> <!-- Cierre de la Fila 4 -->
    
    <button type="button" class="btn btn-primary" onclick="addPersona();">Agregar Persona</button>
  </form>
  <h2 class="mt-5 mb-3">Navegación de Usuarios</h2>
  <div class="row"> <!-- Se abre fila 5 -->
    <div class="mb-3 mt-3 col-xxl-2">
        <label for="tipos2">Rol:</label> <br>
        <select class="form-select" name="tipos2" id="cmbPerfil2"></select>
    </div>
  </div> <!-- Cierre de la Fila 5 -->
  <div class="row"> <!-- Se abre fila 6 -->
      <table id="tblPersona"></table>
  </div> <!-- Cierre de la Fila 6 -->
</div> <!-- Cierre del Container -->

<!-- Modal de Editar -->
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Editar Usuario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body"> <!-- Se abre el Modal Body -->
                <form id="editForm">
                    <div class ="row"> <!-- Se abre fila 1 del modal -->
                        <div class="mb-3 col-xxl-7">
                            <label for="editRun" class="form-label">RUN</label>
                            <input type="text" class="form-control" id="editRun" disabled>
                        </div>
                        <div class="mb-3 col-xxl-5">
                            <label for="editFechaNacimiento" class="form-label">Fecha de Nacimiento</label>
                            <input type="date" class="form-control" id="editFechaNacimiento">
                        </div>
                    </div> <!-- Cierre de la Fila 1 del modal -->
                    <div class = "row"> <!-- Se abre fila 2 del modal -->
                        <div class="mb-3 col-xxl-9">
                            <label for="editNombre" class="form-label">Nombre Completo</label>
                            <input type="text" class="form-control" id="editNombre">
                        </div>

                        <div class="mb-3 col-xxl-3">
                            <label for="editSexo" class="form-label">Sexo</label>
                            <select class="form-select" id="editSexo">
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </select>
                        </div> 
                    </div> <!-- Cierre de la Fila 2 del modal -->
                    <div class="row"> <!-- Se abre fila 3 del modal -->
                        <div class="mb-3 col-xxl-6">
                            <label for="editNombreUsuario" class="form-label">Nombre de Usuario</label>
                            <input type="text" class="form-control" id="editNombreUsuario">
                        </div>
                        <div class="mb-3 col-xxl-6">
                            <label for="editPass" class="form-label">Contraseña</label>
                            <input type="password" class="form-control" id="editPass">
                        </div>
                    </div> <!-- Cierre de la Fila 3 del modal -->
                    <div class= "row"> <!-- Se abre fila 4 del modal -->
                        <div class="mb-3 col-xxl-5">
                            <label for="editCaducidad" class="form-label">Caducidad</label>
                            <input type="date" class="form-control" id="editCaducidad">
                        </div>
                        <div class="mb-3 col-xxl-7">
                            <label for="editTelefono" class="form-label">Teléfono</label>
                            <input type="text" class="form-control" id="editTelefono">
                        </div>
                    </div> <!-- Cierre de la Fila 4 del modal -->
                    <div class = "row"> <!-- Se abre fila 5 del modal -->
                        <div class="mb-3 col-xxl-8">
                            <label for="editEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="editEmail">
                        </div>
                        <div class="mb-3 col-xxl-4">
                            <label for="editTipo" class="form-label">Tipo</label>
                            <input type="text" class="form-control" id="editTipo" disabled>
                        </div>
                    </div> <!-- Cierre de la Fila 5 del modal -->
                    <div class="row"> <!-- Se abre fila 6 del modal -->
                        <div class="mb-3 col-12">
                            <label for="editRegion" class="form-label">Región</label>
                            <select class="form-select" name="region" id="editRegion"></select>
                        </div>
                    </div> <!-- Cierre de la Fila 6 del modal -->
                    <div class="row">
                        <div class="mb-3 col-12">
                            <label for="editProvincia" class="form-label">Provincia</label>
                            <select class="form-select" name="provincia" id="editProvincia"><option value="defaultProvincia">Seleccione la Provincia</option></select>
                        </div>
                    </div> <!-- Cierre de la Fila 6 del modal -->
                    <div class="row"> <!-- Se abre fila 7 del modal -->
                        <div class="mb-3 col-12">
                            <label for="editComuna" class="form-label">Comuna</label>
                            <select class="form-select" name="comuna" id="editComuna"><option value="defaultComuna">Seleccione la Comuna</option></select>
                        </div>
                    </div> <!-- Cierre de la Fila 7 del modal -->
                    <div class="row"> <!-- Se abre fila 8 del modal -->
                        <div class="mb-3">
                            <label for="editDireccion" class="form-label">Dirección</label>
                            <input type="text" class="form-control" id="editDireccion">
                        </div>
                    </div> <!-- Cierre de la Fila 8 del modal -->
                </form>
            </div> <!-- Cierre del Modal Body -->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" onclick="UpdConexiones()">Confirmar</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal de Confirmación de Eliminación -->
<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteModalLabel">Eliminar Usuario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p id="delConfirmacion"></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-danger" onclick="DelConexiones()">Eliminar</button>
            </div>
        </div>
    </div>
</div>
<!-- Fin administración de Personas -->
 
</body>
</html>
<script src="./js/adminPersonasPos.js"></script>
<script src="./js/modalsAdminPersonas.js"></script>