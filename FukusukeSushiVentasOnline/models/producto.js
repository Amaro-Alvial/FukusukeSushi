const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    foto: String,
    categoria: {type: mongoose.Schema.Types.ObjectId, ref: 'Categoria'}
});

module.exports = mongoose.model('Producto', productoSchema);