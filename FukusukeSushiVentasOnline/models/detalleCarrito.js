const mongoose = require('mongoose');

const detalleCarritoSchema = new mongoose.Schema({
    carrito: {type: mongoose.Schema.Types.ObjectId, ref: 'carrito'},
    producto: {type: mongoose.Schema.Types.ObjectId, ref: 'Producto'},
    cantidad: Number
});

module.exports = mongoose.model('DetalleCarrito', detalleCarritoSchema);