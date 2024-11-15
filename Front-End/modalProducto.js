// Cositas para el contador en el modal
let quantity = 1;
function updateQuantity(change) {
    // Actualiza la cantidad, asegurándose de que no sea menor a 1
    quantity = Math.max(1, quantity + change);
    // Actualiza el contador en el HTML
    document.getElementById("quantity").textContent = quantity;
    let precio = parseInt(document.getElementById('productModalPrecio').getAttribute('value'));
    document.getElementById('productModalPrecio').textContent = '$' + quantity * precio;
}
async function actualizarModal(value) {
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
    try{
        let responseProducto = await $.ajax({
            type: "POST",
            url: "http://localhost:8091/graphql",
            contentType: "application/json",
            timeout: 15000,
            data: JSON.stringify({
                query: query,
                variables: {
                    getProductoByIdId: value
                }
            })
        })
        let responsePrecio = await ultimoPrecio(responseProducto.data.getProductoById.id);
        document.getElementById('productModalLabel').textContent = responseProducto.data.getProductoById.nombre;
        document.getElementById('productModalImage').innerHTML = '<img src="' + responseProducto.data.getProductoById.foto + '" alt="Imagen del Producto" class="img-fluid rounded">';
        document.getElementById('productModalDesc').textContent = responseProducto.data.getProductoById.descripcion;
        document.getElementById('productModal').setAttribute('value', responseProducto.data.getProductoById.id);
        document.getElementById('productModalPrecio').textContent = '$' + responsePrecio;
        console.log(responsePrecio);
        document.getElementById('productModalPrecio').setAttribute('value', responsePrecio);
    } catch(error) {
        console.error("Error al modificar el modal del producto:", error);
    }
}