const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio.'],
    minlength: [1, 'El nombre debe tener al menos 1 carácter.'],
    maxlength: [30, 'El nombre no puede tener más de 30 caracteres.'],
  },
});

module.exports = mongoose.model('Region', regionSchema);