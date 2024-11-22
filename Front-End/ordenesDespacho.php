<?php
require_once 'session.php';
    if ($_SESSION['perfil'] != 'Despachador'){
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
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="./js/ordenesDespacho.js"></script>
</head>
<body>
<button class="btn btn-secondary dropdown-toggle" type="button" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false">
    Bienvenido, <?php echo htmlspecialchars($_SESSION['nombre_usuario']); ?>
</button>
<ul class="dropdown-menu" aria-labelledby="userMenu">
    <li><a class="dropdown-item" href="logout.php">Cerrar Sesión</a></li>
</ul>                      
<div class="container mt-3"> <!-- Se abre el Container -->
    <h2>Ordenes de despacho</h2>
    <hr>
    <div class="row"> <!-- Se abre fila 1 -->
        <div class="mb-3 mt-3 col-xxl-3">
            <label for="Estado">Estado:</label> <br>
            <select class="form-select" name="Estado" id="cmbEstado">
                <option value="DefaultEstado">Seleccione un estado</option>
                <option value=1>Completado</option>
                <option value=0>Pendiente</option>
            </select>
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
      <table id="tblDespachos"></table>
  </div> <!-- Cierre de la Fila 2 -->
</div> <!-- Cierre del Container -->
<!-- Modal de Despacho -->
<div class="modal fade" id="DespachoModal" tabindex="-1" aria-labelledby="DespachoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="DespachoModalLabel">Orden de Despacho</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body"> <!-- Se abre el Modal Body -->
                <div class="mb-3">
                    <p id="FechaDespacho" readonly></p>
                </div>
                <div class="mb-3">
                    <p id="Despachador" readonly></p>
                </div>
                <div class="mb-3">
                    <label for="EstadoDespacho">Estado:</label> <br>
                    <select class="form-select" name="EstadoDespacho" id="cmbEstadoDespacho">
                        <option value="DefaultEstado">Seleccione un estado</option>
                        <option value='1'>Despachado</option>
                        <option value='0'>Pendiente</option>
                    </select>
                </div>
                <div>
                    <h4>Boletas</h4>
                    <hr>
                    <table id="tblBoleta"></table>
                </div>
            </div> <!-- Cierre del Modal Body -->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Cerrar</button>
                <button type="button" class="btn btn-primary" onclick="ActualizarEstadoDespacho()">Actualizar</button>
            </div>
        </div>
    </div>
</div> <!-- Cierre del Modal de Despacho -->
<!-- Modal de Detalle Boleta -->
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
            </div>
        </div>
    </div>
</div> <!-- Cierre del Modal de Detalle Boleta -->
</body>
</html>
<script src="./js/ordenesDespachoPos.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.23/jspdf.plugin.autotable.min.js"></script>


