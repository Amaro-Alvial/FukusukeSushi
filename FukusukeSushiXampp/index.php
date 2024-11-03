<!--Meter esta carpeta en xampp, no sirve que esté en FukusukeSushi-->
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Integración Ejemplo</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    <!--Todas las funciones-->
    <script src="scripts.js"></script>
</head>
<body>
<div class="container mt-3">
<h2>Escoge Producto</h2>
    <form>
        <label for="categoria" class="form-label">Categoría</label>
        <select class="form-select" id="categoria" name="categoria" onchange="cambiarProductos();">
        </select>
        <br>

        <table class="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Foto (de momento)</th>
                </tr>
            </thead>
            <tbody id="tabla-body">
                <tr>
                    <td id="coso">Elige una categoría</td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </form>
</div>
</body>
</html>
<script>inicial();</script>
