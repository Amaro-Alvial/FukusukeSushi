const mongoose = require('mongoose');

const cajaSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: [true, 'El tipo es obligatorio.'],
    enum: {
      values: ['V', 'P'],
      message: 'El tipo debe ser "V" o "P".',
    },
    maxlength: [1, 'El tipo debe ser un único carácter.'],
    minlength: [1, 'El tipo debe ser un único carácter.'],
  },
});

module.exports = mongoose.model('Caja', cajaSchema);
