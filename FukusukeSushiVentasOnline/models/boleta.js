const mongoose = require('mongoose');

const boletaSchema = new mongoose.Schema({
    fecha: String,
    cliente: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    horarioCaja : {type: mongoose.Schema.Types.ObjectId, ref: 'HorarioCaja'},
    despacho: {type: mongoose.Schema.Types.ObjectId, ref: 'Despacho'}
});

module.exports = mongoose.model('Boleta', boletaSchema);