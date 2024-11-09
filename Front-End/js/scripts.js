let optionCiudad = [];
function optionArray(item, array){
    array.push('<option value="' + item.id + '">' + item.nombre + '</option>')
}
function getCiudades(){
    const query=`
    Query getCiudades{
        getCiudades{
            id
            nombre
        }
    }
    `
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8091/graphql",
        data: JSON.stringify({
            query: query,
            variables: {}
        }),
        success: function(response){
            response.data.getCiudades.forEach(optionArray);
            document.getElementById('ciudad').innerHTML = optionCiudad.join("");
        }
    })
}