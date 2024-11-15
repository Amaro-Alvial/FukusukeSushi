getCategorias();

let categoriaId = "67229547c178eb95c1c36163";
getProductosByIdCategoria(categoriaId);

document.getElementById('categoria-select').addEventListener('change', function(){
    let categoriaId = document.getElementById('categoria-select').value;
    getProductosByIdCategoria(categoriaId);
});

document.getElementById('login-form').addEventListener('submit', function(){
    let email = document.getElementById('email').value;
    let pass = document.getElementById('pwd').value;

    getUsuarioByIdPerfil
});