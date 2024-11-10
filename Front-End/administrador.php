<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>fullstack_1</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./js/administrador.js"></script>
</head>
<body>
<div class="container mt-3">
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
            <select name="sexo" id="sexo">
                <option value="M">M</option>
                <option value="F">F</option>
            </select>
        </div>
    </div> <!-- Cierre de la Fila 1 -->
    <div class="row"> <!-- Se abre fila 2 -->
        <div class="mb-3 mt-3 col-xxl-4">
            <label for="region">Región:</label>
            <input type="region" class="form-control" id="region" placeholder="Ingrese la región" name="region">
        </div>
        <div class="mb-3 mt-3 col-xxl-3">
            <label for="comuna">Comuna:</label>
            <input type="comuna" class="form-control" id="comuna" placeholder="Ingrese la comuna" name="comuna">
        </div>
        <div class="mb-3 mt-3 col-xxl-3">
            <label for="provincia">Provincia:</label>
            <input type="provincia" class="form-control" id="provincia" placeholder="Ingrese la provincia" name="provincia">
        </div>
        <div class="mb-3 mt-3 col-xxl-2">
            <label for="telefono">Teléfono:</label>
            <input type="telefono" class="form-control" id="telefono" placeholder="Ingrese el teléfono" name="telefono">
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
            <select name="tipos" id="cmbPerfil"></select>
        </div>
        <div class="mb-3 mt-3 col-xxl-2">
            <label for="caducidad">Caducidad (opcional):</label> <br>
            <input type="date" id="caducidad" name="caducidad">
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
        <select name="tipos2" id="cmbPerfil2"></select>
    </div>
    <table id="tblPersona"></table>
  </div> <!-- Cierre de la Fila 5 -->
</div>
</body>
</html>
<script src="./js/administradorPos.js"></script>