<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FukusukeSushi</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="/FukusukeSushi/Proyecto/css/styles.css">
</head>

<body>
    <!-- Navbar pricipal, inicio de sesión y más opciones (hay que confirmar cuáles se necesitan). -->
    <nav class="navbar navbar-expand-sm" id="navbar-principal">
        <div class="container-fluid" id="navbar-container">
            <div class="logo-container">
                <a id="logotype" href="/FukusukeSushi/Proyecto/index.php">
                    <img src="/FukusukeSushi/Proyecto/img/logo.jpg" class="img-fluid" alt="Logo de la empresa">
                </a>
            </div>
            <ul class="navbar-nav">
                <div class="dropdown mr-4" >
                    <button type="button" class="btn dropdown-toggle"  id="boton-dropdown-locales" data-bs-toggle="dropdown">
                        Locales
                    </button>
                    <ul class="dropdown-menu" id="menu-dropdown-locales">
                        <li><a class="dropdown-item" target="_blank" href="https://www.google.com/maps/place/Museo+Interactivo+Mirador+(MIM)/@-33.5194822,-70.611972,15z/data=!4m2!3m1!1s0x0:0x4e84cc2277ad807f?sa=X&ved=1t:2428&ictx=111">Local 1</a></li>
                        <li><a class="dropdown-item" href="#">Local 2</a></li>
                        <li><a class="dropdown-item" href="#">Local 3</a></li>
                    </ul>
                </div>
                <li class="nav-item">
                    <button type="button" class="btn" id="login-button" data-bs-toggle="modal" data-bs-target="#loginModal">
                        Iniciar Sesión
                    </button>
                </li>
                <li class="nav-item">
                    <button type="button" class="btn" id="signup-button" data-bs-toggle="modal" data-bs-target="#signupModal">
                        Crear Cuenta
                    </button>
                </li>
            </ul>
        </div>
    </nav>
    <div>
        <img src="/FukusukeSushi/Proyecto/img/imagen_sushis_bienvenida.png" class="img-fluid" id="img-sushi-bienvenida">
    </div>

</body>