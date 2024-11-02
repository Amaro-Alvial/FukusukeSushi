<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FukusukeSushi</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="/Proyecto/css/styles.css">
</head>
<body>
    <!-- Navbar pricipal, inicio de sesión y más opciones (hay que confirmar cuáles se necesitan). -->
    <nav class="navbar navbar-expand-sm" id="navbar-principal">
        <div class="container-fluid" id="navbar-container">
            <div class="logo-container">
                <a id="logotype" href="/index.html">
                    <img src="/Proyecto/img/logo.jpg" class="img-fluid" alt="Logo de la empresa">
                </a>
            </div>
            <ul class="navbar-nav">
                <div class="dropdown mr-4" >
                    <button type="button" class="btn dropdown-toggle"  id="boton-dropdown-locales" data-bs-toggle="dropdown">
                        Locales
                    </button>
                    <ul class="dropdown-menu" id="menu-dropdown-locales">
                        <li><a class="dropdown-item" href="#">Local 1</a></li>
                        <li><a class="dropdown-item" href="#">Local 2</a></li>
                        <li><a class="dropdown-item" href="#">Local 3</a></li>
                    </ul>
                </div>
                <li class="nav-item">
                    <button type="button" class="btn" id="boton-is" data-bs-toggle="modal" data-bs-target="#iniciosesionModal">
                        Iniciar Sesión
                    </button>
                </li>
                <li class="nav-item">
                    <button type="button" class="btn" id="boton-reg" data-bs-toggle="modal" data-bs-target="#registroModal">
                        Crear Cuenta
                    </button>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Modal inicio de sesión, falta hacer el de registro. -->
    <div class="modal fade" id="iniciosesionModal" tabindex="-1" aria-labelledby="iniciosesionModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title" id="iniciosesionModalLabel">Iniciar Sesión</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
    
                <div class="modal-body">
                    <form action="/inicioSesion.php">
                        <div class="d-flex flex-column align-items-center">
                            <div class="mb-3">
                                <label for="email" class="form-label">E-Mail</label>
                                <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
                            </div>
                            <div class="mb-3">
                                <label for="pwd" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd">
                            </div>
                            <div class="mt-3">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
    
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>

    <!-- Despacho Gratis -->
    <div class="container-fluid d-flex align-items-center justify-content-center" style="background-color: #42474A; color: white; height: 44px; margin-top: 1px">
        <img src="/Proyecto/img/camion.png" alt="" class="img-fluid" style="width: 1010px; height: 35px"/>
    </div> <!-- Despacho Gratis -->

    <!-- Carousel -->
    <div id="demo" class="carousel slide w-100" data-ride="carousel" data-interval="3000">
        <!-- Indicators/dots -->
        <ul class="carousel-indicators">
            <li data-target="#demo" data-slide-to="0" class="active"></li>
            <li data-target="#demo" data-slide-to="1"></li>
            <li data-target="#demo" data-slide-to="2"></li>
            <li data-target="#demo" data-slide-to="3"></li>
            <li data-target="#demo" data-slide-to="4"></li>
            <li data-target="#demo" data-slide-to="5"></li>
            <li data-target="#demo" data-slide-to="6"></li>
            <li data-target="#demo" data-slide-to="7"></li>
            <li data-target="#demo" data-slide-to="8"></li>
            <li data-target="#demo" data-slide-to="9"></li>
            <li data-target="#demo" data-slide-to="10"></li>
            <li data-target="#demo" data-slide-to="11"></li>
        </ul>
    
        <!-- The slideshow/carousel -->
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="/Proyecto/img/carrousel1.jpg" alt=" " class="d-block w-100">
            </div>
            <div class="carousel-item">
                <img src="/Proyecto/img/carrousel2.jpg" alt=" " class="d-block w-100">
            </div>
            <div class="carousel-item">
                <img src="/Proyecto/img/carrousel3.jpg" alt=" " class="d-block w-100">
            </div>
            <div class="carousel-item">
                <img src="/Proyecto/img/carrousel4.jpg" alt=" " class="d-block w-100">
            </div>
            <div class="carousel-item">
                <img src="/Proyecto/img/carrousel5.jpg" alt=" " class="d-block w-100">
            </div>
            <div class="carousel-item">
                <img src="/Proyecto/img/carrousel6.jpg" alt=" " class="d-block w-100">
            </div>
            <div class="carousel-item">
                <img src="/Proyecto/img/carrousel7.jpg" alt=" " class="d-block w-100">
            </div>
            <div class="carousel-item">
                <img src="/Proyecto/img/carrousel8.jpg" alt=" " class="d-block w-100">
            </div>
            <div class="carousel-item">
                <img src="/Proyecto/img/carrousel9.jpg" alt=" " class="d-block w-100">
            </div>
            <div class="carousel-item">
                <img src="/Proyecto/img/carrousel10.jpg" alt=" " class="d-block w-100">
            </div>
            <div class="carousel-item">
                <img src="/Proyecto/img/carrousel11.jpg" alt=" " class="d-block w-100">
            </div>
        </div>
    
        <!-- Left and right controls/icons -->
        <button class="carousel-control-prev d-none d-lg-block" type="button" data-target="#demo" data-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next d-none d-lg-block" type="button" data-target="#demo" data-slide="next">
            <span class="carousel-control-next-icon"></span>
        </button>
    </div> <!-- Carousel -->

    <div class="container d-flex align-items-center justify-content-center" style="background:#43D87E; color:white; height: 66px; margin-top: -48px;">
        <h3>Te recomendamos</h3>
    </div>

    <div class="container d-flex aling-items-center" style="margin-top: 10px">
        <div class="row">
            <div class="card col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <img class="card-img-top" src="/Proyecto/img/img_avatar1.jpg" alt="Card image">
                <div class="card-body">
                <h4 class="card-title">Celular</h4>
                <p class="card-text">Características, precio, etc.</p>
                <a href="#" class="btn btn-primary">Agregar al carro</a>
                </div>
            </div>
            <div class="card col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <img class="card-img-top" src="/Proyecto/img/img_avatar1.jpg" alt="Card image">
                <div class="card-body">
                <h4 class="card-title">Celular</h4>
                <p class="card-text">Características, precio, etc.</p>
                <a href="#" class="btn btn-primary">Agregar al carro</a>
                </div>
            </div>
            <div class="card col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <img class="card-img-top" src="/Proyecto/img/img_avatar1.jpg" alt="Card image">
                <div class="card-body">
                <h4 class="card-title">Celular</h4>
                <p class="card-text">Características, precio, etc.</p>
                <a href="#" class="btn btn-primary">Agregar al carro</a>
                </div>
            </div>
            <div class="card col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <img class="card-img-top" src="/Proyecto/img/img_avatar1.jpg" alt="Card image">
                <div class="card-body">
                <h4 class="card-title">Celular</h4>
                <p class="card-text">Características, precio, etc.</p>
                <a href="#" class="btn btn-primary">Agregar al carro</a>
                </div>
            </div>
            <div class="card col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <img class="card-img-top" src="/Proyecto/img/img_avatar1.jpg" alt="Card image">
                <div class="card-body">
                <h4 class="card-title">Celular</h4>
                <p class="card-text">Características, precio, etc.</p>
                <a href="#" class="btn btn-primary">Agregar al carro</a>
                </div>
            </div>
            <div class="card col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <img class="card-img-top" src="/Proyecto/img/img_avatar1.jpg" alt="Card image">
                <div class="card-body">
                <h4 class="card-title">Celular</h4>
                <p class="card-text">Características, precio, etc.</p>
                <a href="#" class="btn btn-primary">Agregar al carro</a>
                </div>
            </div>
        </div>
    </div>