const mongoose = require('mongoose');
const reclamoSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    cliente: {type: mongoose.Schema.Types.ObjectId, ref: 'Cliente'}
})

module.exports = mongoose.model('Reclamo', reclamoSchema);