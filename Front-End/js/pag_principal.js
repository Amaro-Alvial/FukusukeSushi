/* Select de las categorías. */

let optionCategorias = [];

function optionCategoria(item){
    optionCategorias.push('<option class="categoria-option" value="' + item.id + '">' + item.nombre + '</option>');
}

function getCategorias(){
    let query=`
    query getCategorias{
        getCategorias{
            id
            nombre
        }
    }
    `;
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8091/graphql",
        data: JSON.stringify({
            query: query,
            variables: {}
        }),
        success: function(response){
            response.data.getCategorias.forEach(optionCategoria);
            document.getElementById('categoria-select').innerHTML = optionCategorias.join("");
        }
    })
}


let cardProductos = [];

function cardProducto(item) {
    cardProductos.push(`
        <div class="col-4">
            <div class="card" value="${item.id}">
                ${item.nombre}
            </div>
        </div>
    `);
}

function getProductosByIdCategoria(categoria) {
    const query = `
    query getProductosByIdCategoria($id: String){
        getProductosByIdCategoria(id: $id){
            id
            nombre
        }
    }
    `;
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8091/graphql",
        data: JSON.stringify({
            query: query,
            variables: {
                id: categoria
            }
        }),
        success: function(response) {
            cardProductos = [];
            response.data.getProductosByIdCategoria.forEach(cardProducto);
            document.getElementById('productos-container').innerHTML = cardProductos.join("");
        },
    });
}