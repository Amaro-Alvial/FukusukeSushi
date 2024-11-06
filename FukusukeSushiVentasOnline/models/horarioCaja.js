const mongoose = require('mongoose');

const horarioCajaSchema = new mongoose.Schema({
    horario: String,
    encargado: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    caja: {type: mongoose.Schema.Types.ObjectId, ref: 'Caja'}
});

module.exports = mongoose.model('HorarioCaja', horarioCajaSchema);