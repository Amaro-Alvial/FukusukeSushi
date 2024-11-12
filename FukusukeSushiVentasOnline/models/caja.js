const mongoose = require('mongoose');

const cajaSchema = new mongoose.Schema({
    tipo: String
});

module.exports = mongoose.model('Caja', cajaSchema);