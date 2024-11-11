GetPersonas();
GetPerfiles();
document.getElementById('cmbPerfil2').addEventListener('change', function() {
    const perfilId = document.getElementById('cmbPerfil2').value;
    if (perfilId) {
        GetPersonasByIdPerfil();
        console.log(perfilId)
    }
});