getCategorias();
document.getElementById('categoria-select').addEventListener('change', function(){
    let categoriaId = document.getElementById('categoria-select').value;
    if (categoriaId){
        getProductosByIdCategoria(categoriaId);
        console.log(categoriaId);
    }
    else{
        const categoriaInicial = "67229547c178eb95c1c36163";
        getProductosByIdCategoria(categoriaInicial);
    };
});
