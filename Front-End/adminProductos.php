<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Productos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./css/stylesProductos.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./js/adminProductos.js"></script>
</head>
<body>
<div class="container mt-3"> <!-- Se abre el Container -->
    <h2>Ingreso de Productos</h2>
    <form> <!-- Se abre el Formulario -->
        <div class="row"> <!-- Se abre la fila 1 -->
            <div class="col-xxl-6">
                <label for="Nombre">Nombre:</label> <br>
                <input type="text" name="Nombre" id="Nombre" class="form-control">
            </div>
            <div class="col-xxl-2">
                <label for="Precio">Precio:</label> <br>
                <input type="number" name="Precio" id="Precio" class="form-control" step="any">
            </div>
            <div class="col-xxl-2">
                <label for="Categorias">Categoria:</label> <br>
                <select class="form-select" name="Categorias" id="cmbCategorias"></select>
            </div>
            <div class="col-xxl-2">
                <label for="Disponibilidad">Disponibilidad:</label> <br>
                <select class="form-select" name="Disponibilidad" id="Disponibilidad">
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
            </div>
        </div> <!-- Se cierra la fila 1 -->
        <div class="row"> <!-- Se abre la fila 2 -->
            <div class="col-xxl-4">
                <label for="Foto">Imagen:</label> <br>
                <input type="text" id="Foto" name="Foto" class="form-control">
            </div>
            <div class="col-xxl-8">
                <label for="Descripcion">Descripción:</label> <br>
                <input type="text" name="Descripcion" id="Descripcion" class="form-control">
            </div>
        </div> <!-- Se cierra la fila 2 --> 
        <button type="button" class="btn btn-primary mt-3" onclick="AddProducto();">Agregar Producto</button>
    </form> <!-- Se cierra el Formulario -->
    <h2 class="mt-5 mb-3">Navegación de Productos</h2>
    <div class="row">
        <div class="mb-3 mt-3 col-xxl-3">
            <label for="Categorias2">Categorias:</label> <br>
            <select class="form-select" name="Categorias2" id="cmbCategorias2"></select>
        </div>
    </div>
    <div class="row"> 
        <div class="container mt-3" id="contProductos">

        </div>
    </div>
</div> <!-- Cierre del Container -->
<!-- Modal de Actualizar Producto -->
<div class="modal fade" id="updModal" tabindex="-1" aria-labelledby="updModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="updModalLabel">Actualizar Disponibilidad/Precio</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="cerrarModalUpd()"></button>
            </div>
            <div class="modal-body"> <!-- Se abre el Modal Body -->
                <form id="updForm">
                    <div class="row justify-content-center"> <!-- Se abre fila 1 del modal -->
                        <div class="card col-xxl-8 card-dark p-2">
                            <div class="card-header">
                                <h5 id="updId">ID Producto:</h5>
                            </div>
                            <img src="" class="card-img-top" id="updFoto" alt="Foto del producto a Actualizar">
                            <div class="card-body">
                                <h5 class="card-title" id="updNombre"></h5>
                                <p class="card-text" id="updDescripcion"></p>
                            </div>
                        </div>
                    </div> <!-- Cierre de la Fila 1 del modal -->
                    <div class ="row"> <!-- Se abre fila 2 del modal -->
                        <div class="mb-3 col-12">
                            <label for="updPrecio" class="form-label">Precio:</label>
                            <input type="number" class="form-control" id="updPrecio" step="any">
                        </div>
                    </div> <!-- Cierre de la Fila 2 del modal -->
                    <div class="row"> <!-- Se abre fila 3 del modal -->
                        <div class="mb-3 col-xxl-12">
                            <label for="updDisponibilidad" class="form-label">Disponibilidad</label>
                            <select class="form-select" name="updDisponibilidad" id="updDisponibilidad">
                                <option value="true">Si</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div> <!-- Cierre de la Fila 3 del modal -->
                </form>
            </div> <!-- Cierre del Modal Body -->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close" onclick="cerrarModalUpd()">Cancelar</button>
                <button type="button" class="btn btn-success" onclick="UpdEstadoProducto()">Confirmar</button>
            </div>
        </div>
    </div>
</div>
<!-- Modal de editar Producto -->
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Editar Producto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="cerrarModalEdit()"></button>
            </div>
            <div class="modal-body"> <!-- Se abre el Modal Body -->
                <form id="editForm">
                    <div class="row justify-content-center"> <!-- Se abre fila 1 del modal -->
                        <div class="card col-xxl-8 card-dark p-2">
                            <div class="card-header">
                                <h5 id="editId">ID Producto:</h5>
                            </div>
                            <img src="" class="card-img-top" id="editFoto" alt="Foto del producto a Editar">
                            <div class="card-body">
                                <h5 class="card-title" id="editNombre"></h5>
                                <p class="card-text" id="editDescripcion"></p>
                            </div>
                        </div>
                    </div> <!-- Cierre de la Fila 1 del modal -->
                    <div class="row"> <!-- Se abre fila 2 del modal -->
                        <div class="mb-3 col-12">
                            <label for="editNombre2" class="form-label">Nombre:</label>
                            <input type="text" class="form-control" id="editNombre2">
                        </div>
                    </div> <!-- Cierre de la Fila 2 del modal -->
                    <div class="row"> <!-- Se abre fila 3 del modal -->
                        <div class="mb-3 col-12">
                            <label for="editDescripcion2" class="form-label">Descripción:</label>
                            <input type="text" class="form-control" id="editDescripcion2">
                        </div>
                    </div> <!-- Cierre de la Fila 3 del modal -->
                    <div class="row"> <!-- Se abre fila 4 del modal -->
                        <div class="mb-3 col-12">
                            <label for="editFoto2" class="form-label">Foto:</label>
                            <input type="text" class="form-control" id="editFoto2">
                        </div>
                    </div> <!-- Cierre de la Fila 4 del modal -->
                    <div class ="row"> <!-- Se abre fila 5 del modal -->
                        <div class="mb-3 col-6">
                            <label for="editPrecio" class="form-label">Precio:</label>
                            <input type="number" class="form-control" id="editPrecio" step="any">
                        </div>
                        <div class="mb-3 col-xxl-6">
                            <label for="editDisponibilidad" class="form-label">Disponibilidad</label>
                            <select class="form-select" name="editDisponibilidad" id="editDisponibilidad">
                                <option value="true">Si</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div> <!-- Cierre de la Fila 5 del modal -->
                    <div class="row">
                        <div class="mb-3 col-12">
                            <label for="editCategorias" class="form-label">Categoria:</label>
                            <select class="form-select" name="editCategorias" id="editCategorias"></select>
                        </div>
                    </div>
                </form>
            </div> <!-- Cierre del Modal Body -->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close" onclick="cerrarModalEdit()">Cancelar</button>
                <button type="button" class="btn btn-success" onclick="editProducto()">Confirmar</button>
            </div>
        </div>
    </div>
</div>
<!-- Modal de Confirmación de Eliminación de Producto -->
<div class="modal fade" id="delModal" tabindex="-1" aria-labelledby="delModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="delModalLabel">Eliminar Producto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="cerrarModalDel()"></button>
            </div>
            <div class="modal-body">
                <p id="delConfirmacion"></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close" onclick="cerrarModalDel()">Cancelar</button>
                <button type="button" class="btn btn-danger" onclick="DelConexionesProducto()">Eliminar</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
<script src="./js/adminProductosPos.js"></script>
<script src="./js/modalsAdminProductos.js"></script>