const mongoose = require('mongoose');

const boletaSchema = new mongoose.Schema({
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
  horarioCaja: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HorarioCaja',
    required: [true, 'El horario de caja es obligatorio.'],
  },
  despacho: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Despacho',
    required: [true, 'El despacho es obligatorio.'],
  },
});

// Middleware `pre` para validar referencias
boletaSchema.pre('save', async function (next) {
  try {
    const Usuario = mongoose.model('Usuario');
    const HorarioCaja = mongoose.model('HorarioCaja');
    const Despacho = mongoose.model('Despacho');

    const clienteExiste = await Usuario.exists({ _id: this.cliente });
    if (!clienteExiste) {
      throw new Error('El cliente especificado no existe.');
    }

    const horarioCajaExiste = await HorarioCaja.exists({ _id: this.horarioCaja });
    if (!horarioCajaExiste) {
      throw new Error('El horario de caja especificado no existe.');
    }

    const despachoExiste = await Despacho.exists({ _id: this.despacho });
    if (!despachoExiste) {
      throw new Error('El despacho especificado no existe.');
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Boleta', boletaSchema);
