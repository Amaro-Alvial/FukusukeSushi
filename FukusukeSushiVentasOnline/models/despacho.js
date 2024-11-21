const mongoose = require('mongoose');

const despachoSchema = new mongoose.Schema({
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
  estado: {
    type: Boolean,
    required: [true, 'El estado es obligatorio.'],
  },
  despachador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El despachador es obligatorio.'],
  },
});

// Middleware `pre` para validar la existencia del despachador
despachoSchema.pre('save', async function (next) {
  try {
    const Usuario = mongoose.model('Usuario');

    const despachadorExiste = await Usuario.exists({ _id: this.despachador });
    if (!despachadorExiste) {
      throw new Error('El despachador especificado no existe.');
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Despacho', despachoSchema);