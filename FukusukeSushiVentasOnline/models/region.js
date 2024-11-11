const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
    nombre: String
});

module.exports = mongoose.model('Region', regionSchema);