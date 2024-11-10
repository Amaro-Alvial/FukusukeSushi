const mongoose = require('mongoose');

const provinciaSchema = new mongoose.Schema({
    nombre: String,
    region: {type: mongoose.Schema.Types.ObjectId, ref: 'Region'}
});

module.exports = mongoose.model('Provincia', provinciaSchema);