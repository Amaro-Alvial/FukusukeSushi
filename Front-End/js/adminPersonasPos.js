GetPersonas();
GetPerfiles();
GetRegiones();
GetComunas();
GetProvincias();
document.getElementById('cmbPerfil2').addEventListener('change', async function() {
    let perfilId = document.getElementById('cmbPerfil2').value;
    if (perfilId === "defaultPerfil") {
        await GetPersonas();
    } else if (perfilId) {
        await GetPersonasByIdPerfil();
    }
});
document.getElementById('cmbRegion').addEventListener('change', function() {
    const regionId = document.getElementById('cmbRegion').value;
    if (regionId) {
        GetProvinciasByIdRegion(regionId);
    }
});
document.getElementById('editRegion').addEventListener('change', function() {
    const regionId = document.getElementById('editRegion').value;
    if (regionId) {
        GetProvinciasByIdRegion(regionId);
    }
});
document.getElementById('editProvincia').addEventListener('change', function() {
    const provinciaId = document.getElementById('editProvincia').value;
    if (provinciaId) {
        GetComunasByIdProvincia(provinciaId);
    }
});
document.getElementById('cmbProvincia').addEventListener('change', function() {
    const provinciaId = document.getElementById('cmbProvincia').value;
    if (provinciaId) {
        GetComunasByIdProvincia(provinciaId);
    }
});