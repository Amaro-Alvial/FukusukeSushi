const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    fecha: String,
    cliente: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
});

module.exports = mongoose.model('Carrito', carritoSchema);