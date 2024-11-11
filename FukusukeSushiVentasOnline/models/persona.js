const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
    run: String,
    nombreCompleto: String,
    direccion: String,
    comuna: {type: mongoose.Schema.Types.ObjectId, ref: 'Comuna'},
    fechaNacimiento: String,
    sexo: String,
    telefono: String
});

module.exports = mongoose.model('Persona', personaSchema);