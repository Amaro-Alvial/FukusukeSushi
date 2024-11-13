GetProductos();
GetCategorias();
document.getElementById('cmbCategorias2').addEventListener('change', async function() {
    let CategoriaId = document.getElementById('cmbCategorias2').value;
    if (CategoriaId === "defaultCategorias") {
        await GetProductos();
    } else if (CategoriaId) {
        await GetProductosByIdCategoria(CategoriaId);
    }
});