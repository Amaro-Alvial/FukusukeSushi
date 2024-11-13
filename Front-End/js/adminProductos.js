let contentContainerProductos =[]
let optionsCategoria = [];

async function cardProductos(item){
    let categoria = await GetCategoriaById(item.categoria);
    contentContainerProductos.push(`
        <div class ="card col-xxl-3 card-dark p-2">
            <div class="card-header">
                <h4 class="card-title">${item.nombre}</h4>
            </div>
            <div class="card-body">
                <img src = ${item.foto} alt = "Foto de ${item.nombre}" style="width: 100%">
                <h5 class="card-title">Descripción:</h5>
                <p class="card-text">${item.descripcion} </p>
            </div>
            <div class="card-footer">${categoria.nombre}</div>
        </div>
    `);
}

function optionCategoria(item) {
    optionsCategoria.push('<option value="' + item.id + '">' + item.nombre + '</option>');
}

async function GetProductosByIdCategoria(idCategoria) {
    let query = `
    query miQuery($id: String){
        getProductosByIdCategoria(id: $id){
            id
            nombre
            descripcion
            foto
            categoria
        }
    }
    `;
    try {
        const response = await $.ajax({
            type: "POST",
            url: "http://localhost:8091/graphql",
            contentType: "application/json",
            timeout: 15000,
            data: JSON.stringify({
                query: query,
                variables: {
                    id: idCategoria
                }
            })
        });

        // Inicializa el contenedor de productos
        contentContainerProductos = [];
        contentContainerProductos.push('<div class="row">');
        for (const item of response.data.getProductosByIdCategoria) {
            await cardProductos(item);
        }
        document.getElementById('contProductos').innerHTML = contentContainerProductos.join("");
    } catch (error) {
        console.error("Error al obtener productos por categoría:", error);
    }
}
function GetCategoriaById(idCategoria){
    let query = `
    query miQuery($id: ID!){
        getCategoriaById(id: $id){
            id
            nombre
            descripcion
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
                    id: idCategoria
                }
            }),
            success: function(response){
                resolve(response.data.getCategoriaById);
            }
        });
    });
}
function GetCategorias(){
    let query = `
    query miQuery {
        getCategorias {
            id
            nombre
            descripcion
        }
    }`;
    $.ajax({
        type: "POST",
        url: "http://localhost:8091/graphql",
        contentType: "application/json",
        timeout: 15000,
        data: JSON.stringify({
            query: query,
            variables: {}
        }),
        success: function(response){
            optionsCategoria = [];
            optionsCategoria.push('<option value="defaultCategoria">Seleccione una categoria</option>');
            response.data.getCategorias.forEach(optionCategoria);
            document.getElementById('cmbCategorias').innerHTML = optionsCategoria.join("");
            document.getElementById('cmbCategorias2').innerHTML = optionsCategoria.join("");
        }
    });
}
async function GetProductos(){
    let query = `
    query miQuery {
        getProductos {
            id
            nombre
            descripcion
            foto
            categoria
        }
    }`;
    $.ajax({
        type: "POST",
        url: "http://localhost:8091/graphql",
        contentType: "application/json",
        timeout: 15000,
        data: JSON.stringify({
            query: query,
            variables: {}
        }),
        success: async function(response){
            contentContainerProductos = [];
            contentContainerProductos.push('<div class="row">');
            for (const item of response.data.getProductos) {
                await cardProductos(item);
            }
            contentContainerProductos.push('</div>');
            document.getElementById('contProductos').innerHTML = contentContainerProductos.join("");
            
        }
    });
}