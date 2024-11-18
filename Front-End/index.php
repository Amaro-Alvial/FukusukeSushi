<?php
session_start(); 
if (isset($_SESSION['usuario_id']) && $_SESSION['perfil'] == 'Admin') {
    header('Location: adminPersonas.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FukusukeSushi</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="./css/styles.css">
    <script src="./js/pagPrincipal.js"></script>
    <script src="./js/carrito.js"></script>
    <script src="./js/modalProducto.js"></script>
    <?php
    if (isset($_SESSION['usuario_id'])) {
        echo "<script>let idCliente = '" . $_SESSION['usuario_id'] . "';</script>";
    }
    ?>
</head>

<body>
    <!-- Navbar pricipal, inicio de sesión y más opciones (hay que confirmar cuáles se necesitan). -->
    <nav class="navbar navbar-expand-sm" id="navbar-principal">
        <div class="container-fluid" id="navbar-container">
            <div class="container-logo">
                <a id="logotype" href="./index.php">
                    <img src="./img/logo/Logo2.png" class="img-fluid" alt="Logo de la empresa">
                </a>
            </div>
            <ul class="navbar-nav">
                <div class="dropdown mr-4">
                    <button type="button" id="button-dropdown-locales" data-bs-toggle="dropdown">
                        Locales
                        <img src="./img/dropdown_icon.png" class="img-fluid" alt="Ícono de DropDown" style="width: 22px; padding-bottom: 3px">
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" target="_blank" href="https://www.google.com/maps/place/Museo+Interactivo+Mirador+(MIM)/@-33.5194822,-70.611972,15z/data=!4m2!3m1!1s0x0:0x4e84cc2277ad807f?sa=X&ved=1t:2428&ictx=111">Local 1</a></li>
                        <li><a class="dropdown-item" href="#">Local 2</a></li>
                        <li><a class="dropdown-item" href="#">Local 3</a></li>
                    </ul>
                </div>
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
                            <li><a class="dropdown-item" href="perfilUsuario.php">Mi Perfil</a></li>
                            <li><a class="dropdown-item" href="logout.php">Cerrar Sesión</a></li>
                        </ul>
                    </li>
                <?php endif; ?>
            </ul>
        </div>
    </nav>

    <!-- Aviso de iniciar sesión (debería eliminarse/cambiar cuando se inicia sesión) -->
    <div class="container-fluid d-flex justify-content-center" id="aviso-iniciasesion">
        Te invitamos a iniciar sesión para disfrutar de nuestra carta.
    </div>

    <!-- Carrusel -->
    <div>
        <div id="demo" class="carousel slide" data-bs-ride="carousel">

            <div class="carousel-indicators">
                <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
            </div>

            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="./img/banner/Banner2.webp" class="img" id="img-sushi-bienvenida">
                </div>
            <div class="carousel-item">
                <img src="./img/banner/Banner3.webp" class="img" id="img-sushi-bienvenida">
            </div>
            <div class="carousel-item">
                <img src="./img/banner/Banner1.webp" class="img" id="img-sushi-bienvenida">
            </div>

        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
        </button>
        </div>
    </div>
    
    <!--Offcanvas (Carrito)-->
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

    <!-- Modal del producto seleccionado-->
    <div class="modal fade" id="productModal" value="" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="productModalLabel">Nombre del Producto</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <div class="row" style="background-color: red;">
                        <!-- Imagen del producto (lado izquierdo) -->
                        <div id="productModalImage" class="col-md-6 d-flex align-items-center justify-content-center">
                            <img src="https://via.placeholder.com/300" alt="Imagen del Producto" class="img-fluid rounded">
                        </div>
                        
                        <!-- Información del producto (lado derecho) -->
                        <div class="col-md-6">
                            <p id="productModalDesc" style="height: 80%; margin: 0 0">Descripción detallada del producto. Aquí puedes añadir más detalles relevantes.</p>
                            
                            <!-- Control de cantidad -->
                            <div class="quantity-container d-flex justify-content-center align-items-end row" style="background-color: grey; height: 20%">
                                <div class="quantity-display col-4" id="productModalPrecio" value="" style="text-align: center; font-size: 22px; font-weight: bold">222</div>
                                <div class="col-1 d-flex justify-content-center align-items-end p-0">
                                    <button type="button" class="quantity-button" onclick="updateQuantity(-1)">
                                        <img src="./img/signo_resta.png" style="width: 24px">
                                    </button>
                                </div>
                                <div class="col-1 quantity-display d-flex justify-content-center p-0" id="quantity" style="font-size: 1.2rem;">1</div>
                                <div class="col-1 d-flex justify-content-center align-items-end p-0">
                                    <button type="button" class="quantity-button" onclick="updateQuantity(1)">
                                        <img src="./img/signo_mas.png" style="width: 24px;">
                                    </button>
                                </div>
                                <div class="col-5 ps-1 pe-1">
                                    <button type="button" id="agregar-button-modal" data-bs-dismiss="modal" onclick="
                                    <?php echo isset($_SESSION['usuario_id']) ? 'agregarDetalleCarrito();' : ''; ?>" 
                                    <?php echo !isset($_SESSION['usuario_id']) ? 'data-bs-toggle="modal" data-bs-target="#loginModal"' : ''; ?>>
                                        Agregar
                                    </button>
                                </div>
                            </div>
                            <br>
                            <!-- Botón de agregar al carrito -->
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal inicio de sesión -->
    <div class="modal fade" id="loginModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
    
                <div class="modal-body">
                    <form id="login-form">
                        <div class="d-flex flex-column align-items-center">
                            <div class="mb-3">
                                <label for="loginNombreUsuario" class="form-label">Nombre de Usuario</label>
                                <input type="text" class="form-control" id="loginNombreUsuario" placeholder="Ingrese nombre de usuario." name="nombreUsuario" required>
                            </div>
                            <div class="mb-3">
                                <label for="loginPass" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="loginPass" placeholder="Ingrese su contraseña."name="pass" required>
                            </div>
                            <div class="mt-2 mb-3">
                                <button type="Button" class="btn btn-primary" id="login-button-modal" onclick="IniciarSesion()">Iniciar Sesión</button>
                            </div>
                            <div>
                                Si no tienes una cuenta aún,
                                <a href="#" data-bs-toggle="modal" data-bs-target="#regModal">¡Regístrate!</a>
                                .
                            </div>
                        </div>
                    </form>
                </div>
    
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de registro -->
    <div class="modal fade" id="regModal" tabindex="-1" aria-labelledby="regModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="regModalLabel">Registrar Usuario</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body"> <!-- Se abre el Modal Body -->
                    <form id="regForm">
                        <div class ="row"> <!-- Se abre fila 1 del modal -->
                            <div class="mb-3 col-7">
                                <label for="regRun" class="form-label">RUN</label>
                                <input type="text" class="form-control" id="regRun">
                            </div>
                            <div class="mb-3 col-5">
                                <label for="regFechaNacimiento" class="form-label">Fecha de Nacimiento</label>
                                <input type="date" class="form-control" id="regFechaNacimiento">
                            </div>
                        </div> <!-- Cierre de la Fila 1 del modal -->
                        <div class = "row"> <!-- Se abre fila 2 del modal -->
                            <div class="mb-3 col-xxl-9">
                                <label for="regNombre" class="form-label">Nombre Completo</label>
                                <input type="text" class="form-control" id="regNombre">
                            </div>

                            <div class="mb-3 col-xxl-3">
                                <label for="regSexo" class="form-label">Sexo</label>
                                <select class="form-select" id="regSexo">
                                    <option value="M">M</option>
                                    <option value="F">F</option>
                                </select>
                            </div> 
                        </div> <!-- Cierre de la Fila 2 del modal -->
                        <div class="row"> <!-- Se abre fila 3 del modal -->
                            <div class="mb-3 col-xxl-6">
                                <label for="regNombreUsuario" class="form-label">Nombre de Usuario</label>
                                <input type="text" class="form-control" id="regNombreUsuario">
                            </div>
                            <div class="mb-3 col-xxl-6">
                                <label for="regPass" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="regPass">
                            </div>
                        </div> <!-- Cierre de la Fila 3 del modal -->
                        <div class= "row"> <!-- Se abre fila 4 del modal -->
                            <div class="mb-3 col-xxl-5">
                                <label for="regCaducidad" class="form-label">Caducidad</label>
                                <input type="date" class="form-control" id="regCaducidad">
                            </div>
                            <div class="mb-3 col-xxl-7">
                                <label for="regTelefono" class="form-label">Teléfono</label>
                                <input type="text" class="form-control" id="regTelefono">
                            </div>
                        </div> <!-- Cierre de la Fila 4 del modal -->
                        <div class = "row"> <!-- Se abre fila 5 del modal -->
                            <div class="mb-3 col-xxl-8">
                                <label for="regEmail" class="form-label">Email</label>
                                <input type="email" class="form-control" id="regEmail">
                            </div>
                        </div> <!-- Cierre de la Fila 5 del modal -->
                        <div class="row"> <!-- Se abre fila 6 del modal -->
                            <div class="mb-3 col-12">
                                <label for="regRegion" class="form-label">Región</label>
                                <select class="form-select" name="region" id="regRegion"></select>
                            </div>
                        </div> <!-- Cierre de la Fila 6 del modal -->
                        <div class="row">
                            <div class="mb-3 col-12">
                                <label for="regProvincia" class="form-label">Provincia</label>
                                <select class="form-select" name="provincia" id="regProvincia"><option value="defaultProvincia">Seleccione la Provincia</option></select>
                            </div>
                        </div> <!-- Cierre de la Fila 6 del modal -->
                        <div class="row"> <!-- Se abre fila 7 del modal -->
                            <div class="mb-3 col-12">
                                <label for="regComuna" class="form-label">Comuna</label>
                                <select class="form-select" name="comuna" id="regComuna"><option value="defaultComuna">Seleccione la Comuna</option></select>
                            </div>
                        </div> <!-- Cierre de la Fila 7 del modal -->
                        <div class="row"> <!-- Se abre fila 8 del modal -->
                            <div class="mb-3">
                                <label for="regDireccion" class="form-label">Dirección</label>
                                <input type="text" class="form-control" id="regDireccion">
                            </div>
                        </div> <!-- Cierre de la Fila 8 del modal -->
                    </form>
                </div> <!-- Cierre del Modal Body -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button id="confirmarRegBtn"type="button" class="btn btn-primary" onclick="RegUsuario()">Confirmar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Pide Ya -->
    <div class="container-fluid d-flex justify-content-center mt-0 mb-2">
        <button id="pideya-button">
            ¡Pide Ya!<br>
        </button>
        <script>
            document.getElementById("pideya-button").addEventListener("click", function() {
            document.getElementById("productos-section").scrollIntoView({
                behavior: 'smooth',
                block: 'start'
                });
            });
            </script>
    </div>

    <!-- Container con productos y categorías -->
    <div class="container-fluid" id="productos-section">
        <div class="row d-flex"  style="height: 95vh;">
            <div class="col-10" style="height: 100%">
                <div class="ps-2 pe-3" id="scroll-container"></div>
            </div>
            <div class="col-2 d-flex flex-column p-0 pe-2">
                <h5 class="d-flex justify-content-center">Categorías</h5>
                <select multiple id="categoria-select" name="categoria"></select>
                <div class="d-flex justify-content-center align-items-end" style="height: 50%">
                    <button id="carrito-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#carrito" onclick="actualizarCarrito();">
                        <img src="./img/carrito.png" style="width: 45px">
                        <span id="cantidadCarrito">0</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Botón para mostrar el carrito -->

    <footer>
        <div class="container-fluid mt-5" id="footer-container" style="background-color: lightgrey; height: 250px">
            
        </div>
    </footer>

    <!--https://www.svgrepo.com/collection/dazzle-line-icons/, íconos con licencia libre. -->
    
</body>
</html>
<script src="./js/pagPrincipalPos.js"></script>