const mongoose = require('mongoose');

const reclamoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio.'],
    minlength: [5, 'El título debe tener al menos 5 caracteres.'],
    maxlength: [50, 'El título no puede tener más de 50 caracteres.'],
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria.'],
    minlength: [5, 'La descripción debe tener al menos 5 caracteres.'],
    maxlength: [500, 'La descripción no puede tener más de 500 caracteres.'],
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: [true, 'El cliente es obligatorio.'],
  },
});

// Middleware `pre` para validar la existencia del cliente
reclamoSchema.pre('save', async function (next) {
  try {
    const Cliente = mongoose.model('Usuario');

    const clienteExiste = await Cliente.exists({ _id: this.cliente });
    if (!clienteExiste) {
      throw new Error('El cliente especificado no existe.');
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Reclamo', reclamoSchema);