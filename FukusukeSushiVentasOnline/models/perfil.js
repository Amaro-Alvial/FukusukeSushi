const mongoose = require('mongoose');

const perfilSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: [true, 'El tipo es obligatorio.'],
    minlength: [5, 'El tipo debe tener al menos 5 caracteres.'],
    maxlength: [30, 'El tipo no puede tener más de 30 caracteres.'],
  },
});

module.exports = mongoose.model('Perfil', perfilSchema);