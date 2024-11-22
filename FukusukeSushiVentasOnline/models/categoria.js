const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio.'],
    minlength: [5, 'El nombre debe tener al menos 5 caracteres.'],
    maxlength: [20, 'El nombre no puede tener más de 20 caracteres.'],
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria.'],
    minlength: [5, 'La descripción debe tener al menos 5 caracteres.'],
    maxlength: [50, 'La descripción no puede tener más de 50 caracteres.'],
  },
});

module.exports = mongoose.model('Categoria', categoriaSchema);