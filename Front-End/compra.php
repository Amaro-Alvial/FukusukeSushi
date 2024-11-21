<?php
session_start();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página de Pago - Webpay Simulado</title>
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
    <div class="container-pago">
        <div class="header-pago d-flex justify-content-between">
            <div>
                <h1>Estás pagando en:</h1>
                <img src="./img/unired.png" alt="unired" style="height: 45px">
            </div>
            <div>
                <h1>Monto a pagar:</h1>
                <p class="monto-pagar" id="monto-pagar">$</p>
                <span class="btn-ver-detalle" data-toggle="modal" data-target="#detalleCompraModal">Ver detalle de compra</span>
            </div>
        </div>

        <!-- Opciones de Pago -->
        <div class="opciones-pago">
            <h5>Selecciona tu medio de pago:</h5>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="metodoPago" id="tarjetaCredito" checked>
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

        <!-- Formulario de Pago -->
        <div class="form-pago">
            <form action="procesarPago.php" method="POST">
                <div class="form-group">
                    <label for="numeroTarjeta">Número de tarjeta</label>
                    <input type="text" class="form-control" id="numeroTarjeta" name="numeroTarjeta" maxlength="16" placeholder="XXXX XXXX XXXX XXXX" required>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="fechaExpiracion">Fecha de Expiración (MM/AA)</label>
                        <input type="text" class="form-control" id="fechaExpiracion" name="fechaExpiracion" maxlength="5" placeholder="MM/AA" required>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="cvv">CVV</label>
                        <input type="text" class="form-control" id="cvv" name="cvv" maxlength="3" required>
                    </div>
                </div>
                <button type="submit" class="btn btn-pago btn-block">Continuar</button>
                <button type="button" class="btn btn-volver btn-block" onclick="window.location.href='index.php'">Volver</button>
            </form>
        </div>
    </div>

    <!-- Modal para Detalle de Compra -->
    <div class="modal fade detalle-compra-modal" id="detalleCompraModal" tabindex="-1" aria-labelledby="detalleCompraModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="detalleCompraModalLabel">Detalle de la Compra</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div style="max-height: 300px; overflow-y: auto;"></div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
<script>setCompraFront();</script>