// Cositas para el contador en el modal
let quantity = 1;
function updateQuantity(change) {
    // Actualiza la cantidad, asegurándose de que no sea menor a 1
    quantity = Math.max(1, quantity + change);
    // Actualiza el contador en el HTML
    document.getElementById("quantity").textContent = quantity;
}
function actualizarModal(value) {
    let query = `
    query GetProductoById($getProductoByIdId: ID!) {
        getProductoById(id: $getProductoByIdId) {
            nombre
            descripcion
            foto
            id
        }
    }
    `;
    $.ajax({
        type: "POST",
        url: "http://localhost:8091/graphql",
        contentType: "application/json",
        timeout: 15000,
        data: JSON.stringify({
            query: query,
            variables: {
                getProductoByIdId: value
            }
        }),
        success: function(response){
            document.getElementById('productModalLabel').textContent = response.data.getProductoById.nombre;
            document.getElementById('productModalImage').innerHTML = '<img src="' + response.data.getProductoById.foto + '" alt="Imagen del Producto" class="img-fluid rounded">';
            document.getElementById('productModalDesc').textContent = response.data.getProductoById.descripcion;
            document.getElementById('productModal').setAttribute('value', response.data.getProductoById.id);
        }
    })
}