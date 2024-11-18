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
    <title>Admin Ventas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./js/adminVentas.js"></script>
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
  <h2>Administración de Ventas</h2>
  <div class="row"> <!-- Se abre fila 1 -->
    <div class="mb-3 mt-3 col-xxl-3">
        <label for="Fechas">Mes:</label> <br>
        <select class="form-select" name="Fechas" id="cmbFecha">
            <option value="DefaultFecha">Seleccione una Fecha</option>
            <option value="0">Enero</option>
            <option value="1">Febrero</option>
            <option value="2">Marzo</option>
            <option value="3">Abril</option>
            <option value="4">Mayo</option>
            <option value="5">Junio</option>
            <option value="6">Julio</option>
            <option value="7">Agosto</option>
            <option value="8">Septiembre</option>
            <option value="9">Octubre</option>
            <option value="10">Noviembre</option>
            <option value="11">Diciembre</option>
        </select>
    </div>
    <div class="mb-3 mt-3 col-xxl-3">
        <label for="FechaBusqueda">Fecha:</label> <br>
        <input type="date" class="form-control" id="FechaBusqueda">
    </div>
    <div class="mb-3 mt-3 col-xxl-3">
        <label for="IdBusqueda">ID:</label> <br>
        <input type="text" class="form-control" id="IdBusqueda" placeholder="Busqueda por ID Boleta">
    </div>
    <div class="mb-3 mt-3 col-xxl-1">
        <br>
        <button class="btn btn-primary" id="btnBuscar" onclick="BuscarBoletaPorId()">Buscar</button>
    </div>

  </div> <!-- Cierre de la Fila 1 -->
  <div class="row"> <!-- Se abre fila 2 -->
      <table id="tblVenta"></table>
  </div> <!-- Cierre de la Fila 2 -->
</div> <!-- Cierre del Container -->
<!-- Modal de Detallear Producto -->
<div class="modal fade" id="DetalleModal" tabindex="-1" aria-labelledby="DetalleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="DetalleModalLabel">Detalle de Boleta</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body"> <!-- Se abre el Modal Body -->
                <form id="DetalleForm">
                    <div class="mb-3">
                        <p id="IdBoleta" readonly></p>
                    </div>
                    <div class="mb-3">
                        <p id="FechaBoleta" readonly></p>
                    </div>
                    <div class="mb-3">
                        <p id="HoraBoleta" readonly></p>
                    </div>
                    <div class="mb-3">
                        <p id="Cliente" readonly></p>
                    </div>
                    <div class="mb-3">
                        <p id="Cajero" readonly></p>
                    </div>
                    <div class="mb-3">
                        <p id="Caja" readonly></p>
                    </div>
                    <div class="mb-3">
                        <table id="tblProductos">
                        </table>
                    </div>
                    <div class="d-flex justify-content-end">
                        <p id="Total" readonly></p>
                    </div>

                </form>
                    
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Cerrar</button>
                <button type="button" class="btn btn-danger" onclick="AnularCompra()">Anular Compra</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
<script src="./js/adminVentasPos.js"></script>
