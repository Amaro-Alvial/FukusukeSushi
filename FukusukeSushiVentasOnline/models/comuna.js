const mongoose = require('mongoose');

const comunaSchema = new mongoose.Schema({
    nombre: String,
    provincia: {type: mongoose.Schema.Types.ObjectId, ref: 'Provincia'}
});

module.exports = mongoose.model('Comuna', comunaSchema);