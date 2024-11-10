let optionCategorias = [];

function optionCategoria(item){
    optionCategorias.push('<option value="' + item.id + '">' + item.nombre + '</option>');
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
            document.getElementById('categoria').innerHTML = optionCategorias.join("");
        }
    })
}