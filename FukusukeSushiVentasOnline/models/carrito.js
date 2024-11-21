const mongoose = require('mongoose');

const CarritoSchema = new mongoose.Schema({
  fecha: {
    type: String,
    required: [true, 'La fecha es obligatoria.'],
    validate: {
      validator: function (v) {
        
        return !isNaN(Date.parse(v));
      },
      message: props => `"${props.value}" no es una fecha válida. Debe estar en formato ISO 8601, como "2023-11-21T10:15:30.000Z".`,
    },
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El cliente es obligatorio.'],
  },
});

// Middleware `pre` para validar referencias
CarritoSchema.pre('save', async function (next) {
  try {
    const Usuario = mongoose.model('Usuario');

    const clienteExiste = await Usuario.exists({ _id: this.cliente });
    if (!clienteExiste) {
      throw new Error('El cliente especificado no existe.');
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Carrito', CarritoSchema);