const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio.'],
    minlength: [5, 'El nombre debe tener al menos 5 caracteres.'],
    maxlength: [45, 'El nombre no puede tener más de 45 caracteres.'],
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria.'],
    minlength: [5, 'La descripción debe tener al menos 5 caracteres.'],
    maxlength: [300, 'La descripción no puede tener más de 300 caracteres.'],
  },
  foto: {
    type: String,
    required: [true, 'La foto es obligatoria.'],
    minlength: [5, 'La foto debe tener al menos 5 caracteres.'],
    maxlength: [50, 'La foto no puede tener más de 50 caracteres.'],
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: [true, 'La categoría es obligatoria.'],
  },
});

// Middleware `pre` para validar la existencia de la categoría
productoSchema.pre('save', async function (next) {
  try {
    const Categoria = mongoose.model('Categoria');

    const categoriaExiste = await Categoria.exists({ _id: this.categoria });
    if (!categoriaExiste) {
      throw new Error('La categoría especificada no existe.');
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Producto', productoSchema);