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

async function cardProductos(item) {
    let precio = await GetUltimoPrecioHistoricoByIdProducto(item.id);
    let disponibilidad = await GetUltimoDisponibleHistoricoByIdProducto(item.id);
    let stock = disponibilidad.disponibilidad ? "Disponible" : "No disponible";

    let cardProductos = `
        <div class="card col-xs-12 col-xxs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 p-2" style="border: white">
            <a type="button" data-bs-toggle="modal" data-bs-target="#productModal" class="producto-button">
                <div class="card-header p-0">
                    <img src="${item.foto}" alt="Foto de ${item.nombre}" style="width: 100%; border-radius: inherit">
                </div>
                <div class="card-footer">
                    <div class="row">
                        <div class="col-8">
                            <h5 class="card-title">${item.nombre}</h5>
                            <p class="card-text" style="font-weight: bold; font-size: 1.2rem">$${precio.precio}</p>
                        </div>
                        <div class="d-flex justify-content-end align-items-center col-4">
                            <button class="agregar-button-card">
                                <img src="./img/signo_mas.png" style="height: 45px">
                            </button>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    `;
    document.getElementById('productos-container').insertAdjacentHTML('beforeend', cardProductos);
}

async function getProductosByIdCategoria(categoria) {
    const query = `
    query getProductosByIdCategoria($id: String){
        getProductosByIdCategoria(id: $id){
            id
            nombre
            descripcion
            foto
        }
    }
    `;

    document.getElementById('scroll-container').innerHTML = '<div class="row" id="productos-container"></div>';

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
        success: async function(response) {
            document.getElementById('productos-container')
            for (const item of response.data.getProductosByIdCategoria) {
                await cardProductos(item);
            }
        },
    });
}

function GetUltimoPrecioHistoricoByIdProducto(idProducto){
    let query = `
    query miQuery($id: String){
        getUltimoPrecioHistoricoByIdProducto(id: $id){
            id
            precio
            fecha
        }
    }
    `;
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "http://localhost:8091/graphql",
            contentType: "application/json",
            timeout: 15000,
            data: JSON.stringify({
                query: query,
                variables: {
                    id: idProducto
                }
            }),
            success: function(response){
                resolve(response.data.getUltimoPrecioHistoricoByIdProducto);
            }
        });
    });
}

function GetUltimoDisponibleHistoricoByIdProducto(idProducto){
    let query = `
    query miQuery($id: String){
        getUltimoDisponibleHistoricoByIdProducto(id: $id){
            id
            disponibilidad
            fecha
        }
    }
    `;
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "http://localhost:8091/graphql",
            contentType: "application/json",
            timeout: 15000,
            data: JSON.stringify({
                query: query,
                variables: {
                    id: idProducto
                }
            }),
            success: function(response){
                resolve(response.data.getUltimoDisponibleHistoricoByIdProducto);
            }
        });
    });
}
