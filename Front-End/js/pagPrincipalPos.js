getCategorias();

let categoriaId = "67229547c178eb95c1c36163";
getProductosByIdCategoria(categoriaId);

document.getElementById('categoria-select').addEventListener('change', function(){
    let categoriaId = document.getElementById('categoria-select').value;
    getProductosByIdCategoria(categoriaId);
    console.log(categoriaId);
});
