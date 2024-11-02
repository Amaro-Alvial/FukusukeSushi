//Inicializa el <select> del HTML con las categorías guardadas
//en el schema de categorías
function inicial(){
    categorias = [];
    let query = `
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
            query: query,
            variables: {}
        }),
        success: function(response){
            meter(response.data.getCategorias, categorias);
            document.getElementById("categoria").innerHTML = categorias.join("");
        }
    })
}

//Mete los elementos de un response en un array que se puede
//transformar a string con .join("") y meter en un innerHTML
function meter(respuesta, array) {
    for (let i = 0; i < respuesta.length; i++) {
        array.push('<option value="' + respuesta[i].id + '">' + respuesta[i].nombre + '</option>');
    }
}

//Actualiza la descripción de la tabla según la categoría que
//se haya seleccionado en el select
function cambiarDescripcion(){
    let comboCategoria = document.getElementById("categoria");
    let indice = comboCategoria.selectedIndex;
    let idCategoria = comboCategoria[indice].value;
    let query = `
    query GetCategoriaById($getCategoriaByIdId: ID!) {
        getCategoriaById(id: $getCategoriaByIdId) {
            descripcion
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
                getCategoriaByIdId: idCategoria
            }
        }),
        success: function(response){
            descripcion = response.data.getCategoriaById.descripcion;
            document.getElementById("coso").innerHTML = descripcion;
        }
    })
}