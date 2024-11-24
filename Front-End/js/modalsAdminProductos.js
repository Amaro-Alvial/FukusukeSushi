async function modalActualizarProducto(idProducto) {
    let producto = await GetProductoById(idProducto);
    let precio = await GetUltimoPrecioHistoricoByIdProducto(idProducto);
    let stock = await GetUltimoDisponibleHistoricoByIdProducto(idProducto);
    document.getElementById('updId').textContent = `ID: ${producto.id}`;
    document.getElementById('updNombre').textContent = producto.nombre;
    document.getElementById('updDescripcion').textContent = producto.descripcion;
    document.getElementById('updFoto').src = producto.foto;
    document.getElementById('updPrecio').value = precio.precio;
    document.getElementById('updDisponibilidad').value = stock.disponibilidad;
    var updModal = new bootstrap.Modal(document.getElementById('updModal'));
    updModal.show();
}
function cerrarModalUpd() {
    const modalElement = document.getElementById('updModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
    $('#updModal').on('hidden.bs.modal', function () {
        $('.modal-backdrop').remove();
    });

    document.body.style.overflow = 'auto';
}
document.getElementById('updModal').addEventListener('hidden.bs.modal', function () {
    document.body.style.overflow = 'auto';
});
async function UpdEstadoProducto() {
    let idProducto = document.getElementById('updId').textContent.split(' ')[1];
    let precio = document.getElementById('updPrecio').value;
    let stock = document.getElementById('updDisponibilidad').value;
    await AddPrecioHistorico(idProducto, precio);
    await AddDisponibleHistorico(idProducto, stock);
    alert('Producto actualizado');
    cerrarModalUpd();
}
async function modalEditarProducto(idProducto) {
    let producto = await GetProductoById(idProducto);
    let precio = await GetUltimoPrecioHistoricoByIdProducto(idProducto);
    let stock = await GetUltimoDisponibleHistoricoByIdProducto(idProducto);
    document.getElementById('editId').textContent = `ID: ${producto.id}`;
    document.getElementById('editNombre').textContent = producto.nombre;
    document.getElementById('editDescripcion').textContent = producto.descripcion;
    document.getElementById('editFoto').src = producto.foto;
    document.getElementById('editNombre2').value = producto.nombre;
    document.getElementById('editDescripcion2').value = producto.descripcion;
    document.getElementById('editFoto2').value = producto.foto;
    document.getElementById('editPrecio').value = precio.precio;
    document.getElementById('editDisponibilidad').value = stock.disponibilidad;
    document.getElementById('editCategorias').value = producto.categoria;
    var editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}
function cerrarModalEdit(){
    const modalElement = document.getElementById('editModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
    $('#editModal').on('hidden.bs.modal', function () {
        $('.modal-backdrop').remove();
    });
    document.body.style.overflow = 'auto';
}
document.getElementById('editModal').addEventListener('hidden.bs.modal', function () {
    document.body.style.overflow = 'auto';
});
async function editProducto() {
    let idProducto = document.getElementById('editId').textContent.split(' ')[1];
    let nombre = document.getElementById('editNombre2').value;
    let descripcion = document.getElementById('editDescripcion2').value;
    let foto = document.getElementById('editFoto2').value;
    let precio = document.getElementById('editPrecio').value;
    let stock = document.getElementById('editDisponibilidad').value;
    let categoria = document.getElementById('editCategorias').value;
    await UpdProducto(idProducto, nombre, descripcion, foto, categoria);
    await AddPrecioHistorico(idProducto, precio);
    await AddDisponibleHistorico(idProducto, stock);
    cerrarModalEdit();
}
async function modalBorrarProducto(idProducto) {
    let producto = await GetProductoById(idProducto);
    document.getElementById('delConfirmacion').textContent = `¿Está seguro que desea eliminar el producto: ${producto.nombre} con ID: ${producto.id}?`;
    document.getElementById('delConfirmacion').value = producto.id;
    var delModal = new bootstrap.Modal(document.getElementById('delModal'));
    delModal.show();
}
function cerrarModalDel(){
    const modalElement = document.getElementById('delModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
    $('#delModal').on('hidden.bs.modal', function () {
        $('.modal-backdrop').remove();
    });
    document.body.style.overflow = 'auto';
}
document.getElementById('delModal').addEventListener('hidden.bs.modal', function () {
    document.body.style.overflow = 'auto';
});
async function DelConexionesProducto() {
    let idProducto = document.getElementById('delConfirmacion').value;
    await DelHistoricosByIdProducto(idProducto);
    DelProducto(idProducto);
    cerrarModalDel();
}