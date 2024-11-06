const mongoose = require('mongoose');

const usuarioPerfilSchema = new mongoose.Schema({
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    perfil: {type: mongoose.Schema.Types.ObjectId, ref: 'Perfil'},
    caducidad: String
});

module.exports = mongoose.model('UsuarioPerfil', usuarioPerfilSchema);