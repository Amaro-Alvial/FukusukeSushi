<!--Meter esta carpeta en xampp, no sirve que esté en FukusukeSushi-->
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Integ</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    <!-- Todas las funciones -->
    <script src="carrito.js"></script>
    <script src="mostrarProductos.js"></script>
    <script src="modalProducto.js"></script>
    <script>
        //TODO: aquí se ejecutaría el inicio de sesión o algo nose :P
        let idCliente = "67317b739360287f7f13ec6b";
    </script>
</head>
<body>
<!--Headerrrr-->
<header class="bg-light">
    <nav class="navbar navbar-expand-lg navbar-light container">
        <div class="collapse navbar-collapse" id="navbarNav">            
            <!-- Carrito alineado a la derecha -->
            <a class="nav-link position-relative" type="button" data-bs-toggle="offcanvas" data-bs-target="#carrito" onclick="actualizarCarrito();">
                <!-- Ícono de carrito -->
                <i class="fas fa-shopping-cart"></i>
                <!-- Contador de artículos -->
                <span class="badge badge-danger position-absolute top-0 start-100 translate-middle">3</span>
            </a>
        </div>
    </nav>
</header>

<!--Productossss-->
<div class="container mt-3">
    <h2>Escoge Producto</h2>
    <form>
        <label for="categoria" class="form-label">Categoría</label>
        <select class="form-select" id="categoria" name="categoria" onchange="cambiarProductos();">
        </select>
        <br>
    </form>
</div>
<div class="container mt-5">
    <div class="row" id="cards-body">
    </div>
</div>

<!--Offcanvassss-->
<div class="offcanvas offcanvas-end" id="carrito" value="">
    <div class="offcanvas-header">
        <h1 class="offcanvas-title">Carrito</h1>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
        <h3 class="text-center">Carrito Vacío 😢</h3>
        <h5  class="text-center">Cuando agregues productos al carrito, aparecerán aquí.</h5>
    </div>
</div>

<!--Modallll-->
<div class="modal fade" id="productModal" value="" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="productModalLabel">Nombre del Producto</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <!-- Imagen del producto (lado izquierdo) -->
          <div id="productModalImage" class="col-md-6 d-flex align-items-center justify-content-center">
            <img src="https://via.placeholder.com/300" alt="Imagen del Producto" class="img-fluid rounded">
          </div>
          
          <!-- Información del producto (lado derecho) -->
          <div class="col-md-6">
            <p id="productModalDesc">Descripción detallada del producto. Aquí puedes añadir más detalles relevantes.</p>
            
            <!-- Control de cantidad -->
            <div class="quantity-container col-3 row">
                <div class="buttonShadow textColor col-4" onclick="updateQuantity(-1)">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M19 13H5v-2h14v2z"></path>
                    </svg>
                </div>
                <div class="quantity-display col-4" id="quantity">1</div>
                <div class="buttonShadow textColor col-4" onclick="updateQuantity(1)">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                    </svg>
                </div>
            </div>

            <!-- Botón de agregar al carrito -->
            <button type="button" class="btn btn-success" data-bs-dismiss="modal" onclick="agregarDetalleCarrito();">Agregar al Carrito</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</body>
</html>
<script>
    setCategorias();
    setCarrito();
</script>
