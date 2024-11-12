// Carga el comboBox de las categorías
function setCategorias(){
    // Mete las categorías en el ComboBox
    let categorias = [];
    let query1 = `
    query GetCategorias {
        getCategorias {
            id
            nombre
        }
    }
    `;
    $.ajax({
        type: "POST",
        url: "http://localhost:8091/graphql",
        contentType: "application/json",
        timeout: 15000,
        data: JSON.stringify({
            query: query1,
            variables: {}
        }),
        success: function(response){
            meterOption(response.data.getCategorias, categorias);
            document.getElementById("categoria").innerHTML = categorias.join("");
        }
    });
}
//Actualiza los cards de productos según la categoría seleccionada
function cambiarProductos(){
    productos = []
    let comboCategoria = document.getElementById("categoria");
    let indice = comboCategoria.selectedIndex;
    let idCategoria = comboCategoria[indice].value;
    let query = `
    query GetProductosByIdCategoria($getProductosByIdCategoriaId: ID!){
        getProductosByIdCategoria(id: $getProductosByIdCategoriaId) {
            id
            nombre
            descripcion
            foto
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
                getProductosByIdCategoriaId: idCategoria
            }
        }),
        success: function(response){
            meterCards(response.data.getProductosByIdCategoria, productos);
            document.getElementById("cards-body").innerHTML = productos.join("");
        }
    })
}
//Mete los elementos de un response en un array que se puede
//transformar a string con .join("") y meter en un innerHTML
function meterOption(respuesta, array) {
    for (let i = 0; i < respuesta.length; i++) {
        array.push('<option value="' + respuesta[i].id + '">' + respuesta[i].nombre + '</option>');
    }
}
//Mete los elementos de un que devuelve el query getProductos
//ByCategoria en la tabla
function meterCards(respuesta, array) {
    for (let i = 0; i < respuesta.length; i++) {
        array.push(`
            <div class="col-xl-4 col-lg-6 col-sm-12 mb-4" value="${respuesta[i].id}">
                <div class="card h-100 overflow-hidden">
                    <a type="button" data-bs-toggle="modal" data-bs-target="#productModal" onclick="actualizarModal(this.parentElement.parentElement.getAttribute('value'));">
                        <div class="row no-gutters">
                            <div class="col-8">
                                <div class="card-body">
                                    <h5 class="card-title">${respuesta[i].nombre}</h5>
                                    <p class="card-text font-weight-bold">$1.50</p>
                                </div>
                            </div>
                            <div class="col-4 d-flex">
                                <img class="img-right rounded-end" height="100" alt="Producto épico" src="${respuesta[i].foto}">
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        `);
    }
}