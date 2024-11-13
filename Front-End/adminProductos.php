<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Productos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./css/stylesProductos.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./js/adminProductos.js"></script>
</head>
<body>
<div class="container mt-3"> <!-- Se abre el Container -->
  <h2>Ingreso de Productos</h2>
  <form>
    <div class="row"> <!-- Se abre la fila 1 -->
        <div class="col-xxl-6">
            <label for="Nombre">Nombre:</label> <br>
            <input type="text" name="Nombre" id="Nombre" class="form-control">
        </div>
        <div class="col-xxl-2">
            <label for="Precio">Precio:</label> <br>
            <input type="text" name="Precio" id="Precio" class="form-control">
        </div>
        <div class="col-xxl-2">
            <label for="Categorias">Categorias:</label> <br>
            <select class="form-select" name="Categorias" id="cmbCategorias"></select>
        </div>
        <div class="col-xxl-2">
            <label for="Disponibilidad">Disponibilidad:</label> <br>
            <select class="form-select" name="Disponibilidad" id="Disponibilidad">
                <option value="true">Si</option>
                <option value="false">No</option>
            </select>
        </div>
    </div> <!-- Se cierra la fila 1 -->
    <div class="row"> <!-- Se abre la fila 2 -->
        <div class="col-xxl-4">
            <label for="Foto">Imagen:</label> <br>
            <input type="text" id="Foto" name="Foto" class="form-control">
        </div>
        <div class="col-xxl-8">
            <label for="Descripcion">Descripción:</label> <br>
            <input type="text" name="Descripcion" id="Descripcion" class="form-control">
        </div>
    </div> <!-- Se cierra la fila 2 --> 
  </form>
  <h2 class="mt-5 mb-3">Navegación de Productos</h2>
  <div class="row">
    <div class="mb-3 mt-3 col-xxl-2">
        <label for="Categorias2">Categorias:</label> <br>
        <select class="form-select" name="Categorias2" id="cmbCategorias2"></select>
    </div>
  </div>
  <div class="row"> 
      <div class="container mt-3" id="contProductos">

      </div>
  </div> 
</div> <!-- Cierre del Container -->

</body>
</html>
<script src="./js/adminProductosPos.js"></script>
<script src="./js/modalsAdminProductos.js"></script>