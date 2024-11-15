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
        <div class="col-xsm-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-3 p-0" value="${item.id}">
            <button class="producto-button" data-bs-toggle="modal" data-bs-target="#productModal" onclick="actualizarModal(this.parentElement.getAttribute('value'));">
                <div style="width: 40%; overflow: hidden">
                        <img src="${item.foto}" style="width: 100%">
                </div>
                <div>
                    ${item.nombre}
                </div>
            </button>
        </div>
    `);
}

function getProductosByIdCategoria(categoria) {
    const query = `
    query getProductosByIdCategoria($id: String){
        getProductosByIdCategoria(id: $id){
            id
            nombre
            foto
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
