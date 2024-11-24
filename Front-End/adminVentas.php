<?php
require_once 'session.php';
    if ($_SESSION['perfil'] != 'Admin' && $_SESSION['perfil'] != 'Dueno') {
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
    <link rel="stylesheet" href="./css/styles.css">
    <script src="./js/adminVentas.js"></script>
</head>
<body>
    <!-- Navbar Principal -->
    <nav class="navbar navbar-expand-sm pt-0 pb-0" id="navbar-principal" style="box-shadow: 0px 2px 3px #C0C0C0;">
        <div class="container-fluid p-2" id="navbar-container">
            <div class="container-logo">
                <a id="logotype" href="./index.php">
                    <img src="./img/logo/FUKUSUKE_LOGO.png" class="img-fluid" alt="Logo de la empresa" style="height: 60px">
                </a>
            </div>
            <ul class="navbar-nav d-flex align-items-center d-flex flex-row">

                <li class="nav-item dropdown me-2">
                    <button class="btn dropdown-toggle" type="button" id="infoMenu" data-bs-toggle="dropdown" aria-expanded="false">
                        Administraciones
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end position-absolute" aria-labelledby="userMenu">
                        <li><a class="dropdown-item" href="adminPersonas.php">Administración de Personas</a></li>
                        <li><a class="dropdown-item" href="adminProductos.php">Administración de Productos</a></li>
                    </ul>
                </li>

                <div class="d-none d-sm-flex">
                    <?php if (!isset($_SESSION['usuario_id'])): ?>
                        <!-- Mostrar si no hay sesión activa -->
                        <li class="nav-item">
                            <button type="button" id="login-button" data-bs-toggle="modal" data-bs-target="#loginModal">
                                Iniciar Sesión
                            </button>
                        </li>
                        <li class="nav-item">
                            <button type="button" id="signup-button" data-bs-toggle="modal" data-bs-target="#regModal">
                                Crear Cuenta 
                            </button>
                        </li>
                    <?php else: ?>
                        <!-- Mostrar si hay sesión activa -->
                        <li class="nav-item dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false">
                                Bienvenido, <?php echo htmlspecialchars($_SESSION['nombre_usuario']); ?>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="userMenu">
                                <li><a class="dropdown-item" href="#" onclick="offCanvasReclamos()">Revisar Reclamos</a>
                                <li><a class="dropdown-item" href="logout.php">Cerrar Sesión</a></li>
                            </ul>
                        </li>
                    <?php endif; ?>
                </div>

                <div class="d-sm-none">
                    <?php if (!isset($_SESSION['usuario_id'])): ?>
                        <!-- Mostrar si no hay sesión activa -->
                        <li class="nav-item dropdown me-2 position-relative">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="loginMenu" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="./img/user_icon.png" height="25px">
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end position-absolute" aria-labelledby="loginMenu">
                                <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#loginModal">Iniciar Sesión</a></li>
                                <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#regModal">Crear Cuenta</a></li>
                            </ul>
                        </li>
                    <?php else: ?>
                        <!-- Mostrar si hay sesión activa -->
                        <li class="nav-item dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="./img/user_icon.png" height="25px">
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end position-absolute" aria-labelledby="userMenu">
                                <li><a class="dropdown-item" href="#" onclick="offCanvasReclamos()">Revisar Reclamos</a>
                                <li><a class="dropdown-item" href="logout.php">Cerrar Sesión</a></li>
                            </ul>
                        </li>
                    <?php endif; ?>
                </div>
            </ul>
        </div>
    </nav>

    <div class="container mt-3"> <!-- Se abre el Container -->
        <h2 style="font-weight: bold">Administración de Ventas</h2>
            <hr>
                <button class="btn btn-primary" id="GananciasMes" onclick="GraficoGanancias()">Ganancias por mes</button>
                <?php
                $str= <<<EOF
                    <div style="width 60%">
                    <canvas id="GananciasPorMes"></canvas>
                    </div>
                    <div style="width 60%">
                    <canvas id="BoletasPorMes"></canvas>
                    </div>
                EOF;
                echo $str;
                ?>
            <hr>
        <h2 style="font-weight: bold">Navegación de Boletas</h2>
        <div class="row"> <!-- Se abre fila 1 -->
            <div class="mb-3 mt-3 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
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
            <div class="mb-3 mt-3 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                <label for="FechaBusqueda">Fecha:</label> <br>
                <input type="date" class="form-control" id="FechaBusqueda">
            </div>
            <div class="mb-3 mt-3 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                <label for="IdBusqueda">ID:</label> <br>
                <input type="text" class="form-control" id="IdBusqueda" placeholder="Busqueda por ID Boleta">
            </div>
            <div class="mb-3 mt-3 col-sm-12 col-md-3 col-lg-2 col-xl-2 col-xxl-1">
                <br>
                <button class="btn btn-primary" id="btnBuscar" onclick="BuscarBoletaPorId()">Buscar</button>
            </div>
    </div> <!-- Cierre de la Fila 1 -->
    <div class="row"> <!-- Se abre fila 2 -->
        <div class="d-flex justify-content-center d-none d-md-block" style="height: 700px; overflow-x: scroll; overflow-y: scroll">
            <table id="tblVenta"></table>
        </div>
        <div class="d-flex justify-content-center d-block d-md-none" style="height: 700px; overflow-x: scroll; overflow-y: scroll">
            <table id="tblVentaAux"></table>
        </div>
    </div> <!-- Cierre de la Fila 2 -->
    </div> <!-- Cierre del Container -->
    <!-- offcanvas de Reclamos -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="reclamoOffCanvas" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
            <h2 id="offcanvasRightLabel">Reclamos</h2>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
        </div>
        <div class="offcanvas-body">
            <table id="tblReclamos"></table>
        </div>
    </div> <!-- Cierre del offcanvas de Reclamos -->
    <!-- Modal de Reclamo -->
    <div class="modal fade" id="ReclamoModal" tabindex="-1" aria-labelledby="ReclamoModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ReclamoModalLabel">Reclamo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <p id="IdReclamo"> </p>
                    </div>
                    <div class="mb-3">
                        <p id="ClienteReclamo"></p>
                    </div>
                    <div class="mb-3">
                        <p id="TituloReclamo"></p>
                    </div>
                    <div class="mb-3">
                        <textarea class="form-control" id="DescripcionReclamo" readonly></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Cerrar</button>
                    <button type="button" class="btn btn-primary" onclick="EliminarReclamo()">Resuelto</button>
                </div>
            </div>
        </div>
    </div> <!-- Cierre del Modal de Reclamo -->
    <!-- Modal de Detalles Producto -->
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
