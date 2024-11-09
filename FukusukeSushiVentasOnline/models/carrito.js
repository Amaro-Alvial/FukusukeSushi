const mongoose = require('mongoose');

const CarritoSchema = new mongoose.Schema({
    fecha: String,
    cliente: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
});

module.exports = mongoose.model('Carrito', CarritoSchema);