const mongoose = require('mongoose');

const perfilSchema = new mongoose.Schema({
    tipo: String
});

module.exports = mongoose.model('perfil', perfilSchema);