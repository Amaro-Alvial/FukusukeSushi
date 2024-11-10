/* Select de las categorías. */

let optionCategorias = [];

function optionCategoria(item){
    optionCategorias.push('<option id="categoria-option" "value="' + item.id + '">' + item.nombre + '</option>');
}

function getCategorias(){
    const query=`
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
            <div class="card">
                ${item.nombre}
            </div>
        </div>
    `);
}

function getProductos() {
    const query = `
    query getProductos {
        getProductos {
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
        success: function(response) {
            cardProductos = [];
            console.log(response);
            response.data.getProductos.forEach(cardProducto);
            document.getElementById('productos-container').innerHTML = cardProductos.join("");
        },
    });
}