<?php
require_once 'session.php';
if (isset($_SESSION['usuario_id']) && ($_SESSION['perfil'] == 'Admin' or $_SESSION['perfil'] == 'Dueno')) {
    header('Location: adminPersonas.php');
    exit();
}
if (isset($_SESSION['usuario_id']) && $_SESSION['perfil'] == 'Despachador') {
    header('Location: ordenesDespacho.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página de Pago</title>
    <!-- Incluye Bootstrap para estilos -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="./css/stylesCompra.css">
    <?php
    if (isset($_SESSION['usuario_id'])) {
        echo "<script>let idCliente = '" . $_SESSION['usuario_id'] . "';</script>";
    } else {
        // TODO: Que hacer en caso de fallo / timeout
        echo "<script>//timeout probablemente</script>";
    }
    ?>
    <script src="./js/compra.js"></script>
    <script src="./js/carrito.js"></script>
    <script src="./js/pagPrincipal.js"></script>
</head>
<body>
    <div class="container-fluid row" style="height: 20px;">
        <div class="col-9" style="background-color: #6C196B"></div>
        <div class="col-1" style="background-color: #D3016C"></div>
        <div class="col-2" style="background-color: #00C3B2"></div>
    </div>
    <div class="container">
        <div class="container-pago row d-flex">
            <div class="container col-12 col-xl-6">
                <!-- Header de Pago -->
                <div class="header-pago d-flex justify-content-between align-items-start">
                    <div>
                        <h1 class="d-none d-md-block">Estás pagando en:</h1>
                        <h2 class="d-sm-block d-md-none">Estás pagando en:</h2>
                        <div class="d-flex justify-content-center">
                            <img class="d-none d-md-block" src="./img/logo/FUKUSUKE_LOGO.png" alt="Fukusuke Sushi" style="height: 45px">
                            <p class="d-sm-block d-md-none">Fukusuke Sushi</p>
                        </div>
                    </div>
                    <div>
                        <h1 class="d-none d-md-block">Monto a pagar:</h1>
                        <h2 class="d-sm-block d-md-none">Monto a pagar:</h2 >
                        <p class="monto-pagar" id="monto-pagar">$</p>
                        <span class="btn-ver-detalle" data-toggle="modal" data-target="#detalleCompraModal">Ver detalle de compra</span>
                    </div>
                </div>

                <!-- Opciones de Pago -->
                <div class="opciones-pago">
                    <h5>Selecciona tu medio de pago:</h5>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="metodoPago" id="tarjetaCredito">
                        <label class="form-check-label" for="tarjetaCredito">
                            Tarjetas (Crédito, Débito, Prepago)
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="metodoPago" id="onepay">
                        <label class="form-check-label" for="onepay">
                            Onepay y otras billeteras digitales
                        </label>
                    </div>
                </div>
            </div>    

            <div class="container col-12 col-xl-1" id="lado-enmedio"><br></div>

            <div class="container col-12 col-xl-5" id="lado-derecho1">
                <!-- Formulario de Pago -->
                <div class="form-pago" id="form-pago">
                <form>
                        <div class="form-group">
                            <label for="numeroTarjeta">Número de tarjeta</label>
                            <input type="text" class="form-control" id="numeroTarjeta" name="numeroTarjeta" maxlength="16" placeholder="XXXX XXXX XXXX XXXX" required>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="fechaExpiracion">Fecha de Expiración</label>
                                <input type="text" class="form-control" id="fechaExpiracion" name="fechaExpiracion" maxlength="5" placeholder="MM/AA" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="cvv">CVV</label>
                                <input type="text" class="form-control" id="cvv" name="cvv" maxlength="3" required>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-pago btn-block" onclick="cargando();">Continuar</button>
                        <button type="button" class="btn btn-volver btn-block" onclick="window.location.href='index.php'">Volver</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal para Detalle de Compra -->
    <div class="modal fade detalle-compra-modal" id="detalleCompraModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="detalleCompraModalLabel">Detalle de la Compra</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="productosDetalleCompra" style="max-height: 300px; overflow-y: auto;"></div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Contenedor para el spinner -->
    <div id="spinnerOverlay" class="overlay" style="display: none;">
        <div class="spinner"></div>
    </div>

</body>
</html>
<script>setCompraFront();</script>