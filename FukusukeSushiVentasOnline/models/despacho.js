const mongoose = require('mongoose');

const despachoSchema = new mongoose.Schema({
    fecha: String,
    despachador: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
});

module.exports = mongoose.model('Despacho', despachoSchema);