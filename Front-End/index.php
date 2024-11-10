<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FukusukeSushi</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <link rel="stylesheet" href="./css/styles.css">
</head>

<body>
    <!-- Navbar pricipal, inicio de sesión y más opciones (hay que confirmar cuáles se necesitan). -->
    <nav class="navbar navbar-expand-sm" id="navbar-principal">
        <div class="container-fluid" id="navbar-container">
            <div class="container-logo">
                <a id="logotype" href="./index.php">
                    <img src="./img/logo.jpg" class="img-fluid" alt="Logo de la empresa">
                </a>
            </div>
            <ul class="navbar-nav">
                <div class="dropdown mr-4" >
                    <button type="button" id="button-dropdown-locales" data-bs-toggle="dropdown">
                        Locales
                        <img src="./img/dropdown_icon.png" class="img_fluid" alt="Ícono de DropDown" style="width: 22px; padding-bottom: 3px">
                    </button>
                    <ul class="dropdown-menu" id="menu-dropdown-locales">
                        <li><a class="dropdown-item" target="_blank" href="https://www.google.com/maps/place/Museo+Interactivo+Mirador+(MIM)/@-33.5194822,-70.611972,15z/data=!4m2!3m1!1s0x0:0x4e84cc2277ad807f?sa=X&ved=1t:2428&ictx=111">Local 1</a></li>
                        <li><a class="dropdown-item" href="#">Local 2</a></li>
                        <li><a class="dropdown-item" href="#">Local 3</a></li>
                    </ul>
                </div>
                <li class="nav-item">
                    <button type="button" id="login-button" data-bs-toggle="modal" data-bs-target="#loginModal">
                        Iniciar Sesión
                    </button>
                </li>
                <li class="nav-item">
                    <button type="button" id="signup-button" data-bs-toggle="modal" data-bs-target="#signupModal">
                        Crear Cuenta
                    </button>
                </li>
            </ul>
        </div>
    </nav>

    <div class="container-fluid d-flex justify-content-center" id="aviso-iniciasesion">
        Te invitamos a iniciar sesión para disfrutar de nuestra carta.
    </div>

    <div>
        <!-- Carousel -->
        <div id="demo" class="carousel slide" data-bs-ride="carousel">

            <div class="carousel-indicators">
                <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
            </div>

            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="./img/imagen_sushis_bienvenida.png" class="img" id="img-sushi-bienvenida">
                </div>
            <div class="carousel-item">
                <img src="./img/imagen_sushis_bienvenida.png" class="img" id="img-sushi-bienvenida">
            </div>
            <div class="carousel-item">
                <img src="./img/imagen_sushis_bienvenida.png" class="img" id="img-sushi-bienvenida">
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
    
    <!-- Modal inicio de sesión -->
    <div class="modal fade" id="loginModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
    
                <div class="modal-body">
                    <form action="/inicioSesion.php">
                        <div class="d-flex flex-column align-items-center">
                            <div class="mb-3">
                                <label for="email" class="form-label">E-Mail</label>
                                <input type="email" class="form-control" id="email" placeholder="ejemplo@email.com" name="email">
                            </div>
                            <div class="mb-3">
                                <label for="pwd" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="pwd" name="pswd">
                            </div>
                            <div class="mt-2 mb-3">
                                <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                            </div>
                            <div>
                                Si no tienes una cuenta aún,
                                <a href="#" data-bs-toggle="modal" data-bs-target="#signupModal">¡Regístrate!</a>
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

    <!-- Modal registro, llamar a addUsuario? -->
    <div class="modal fade" id="signupModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
    
                <div class="modal-body">
                    <form action="/inicioSesion.php">
                        <div class="d-flex flex-column align-items-center">
                            <div class="mb-3">
                                <label for="nombre" class="form-label">Nombre</label>
                                <input type="text" class="form-control" id="nombre" name="nombreUsuario">
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">E-Mail</label>
                                <input type="email" class="form-control" id="mail" placeholder="ejemplo@email.com" name="email">
                            </div>
                            <div class="mb-3">
                                <label for="pwd" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="pwd" name="pswd">
                            </div>
                            <div class="mt-2 mb-3">
                                <button type="submit" class="btn btn-primary">Crear Cuenta</button>
                            </div>
                            <div>
                                ¿Ya tienes una cuenta?,
                                <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Inicia Sesión</a>
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
    <div class="container-fluid d-flex justify-content-center mt-3" style="background-color: white">
        <button id="pideya-button">
            Pide Yaa<br>
            <img src="./img/flecha_abajo.png" style="width: 30px; margin-top: -30px">
        </button>
    </div>

    <div class="col-12" style="background-color: grey; height: 200px">
        <div class="col-3" style="height: 200px">
            <label for="categoria" class="form-label">Ciudad</label> 
            <select multiple class="form-select" id="categoria" name="categoria">
                
            </select>


    </div>

    <!-- https://www.svgrepo.com/--, íconos con lisencia libre. -->
    
</body>