const mongoose = require('mongoose');

const CarritoSchema = new mongoose.Schema({
    boleta: {type: mongoose.Schema.Types.ObjectId, ref: 'Boleta'},
    producto: {type: mongoose.Schema.Types.ObjectId, ref: 'Producto'},
    total: Number,
    cantidad: Number
});

module.exports = mongoose.model('Carrito', CarritoSchema);