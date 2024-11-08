const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: String,
    pass: String,
    nombreUsuario: String,
    persona: {type: mongoose.Schema.Types.ObjectId, ref: 'Persona'}
});

module.exports = mongoose.model('Usuario', usuarioSchema);