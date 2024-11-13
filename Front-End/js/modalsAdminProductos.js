async function modalActualizarProducto(idProducto) {
    let producto = await GetProductoById(idProducto);
    document.getElementById('updId').textContent = `ID: ${producto.id}`;
    document.getElementById('updNombre').textContent = producto.nombre;
    document.getElementById('updDescripcion').textContent = producto.descripcion;
    document.getElementById('updFoto').src = producto.foto;
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