const mongoose = require('mongoose');

const horarioCajaSchema = new mongoose.Schema({
  horario: {
    type: String,
    required: [true, 'El horario es obligatorio.'],
    minlength: [5, 'El horario debe tener al menos 5 caracteres.'],
    maxlength: [50, 'El horario no puede tener más de 50 caracteres.'],
  },
  encargado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El encargado es obligatorio.'],
  },
  caja: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caja',
    required: [true, 'La caja es obligatoria.'],
  },
});

// Middleware `pre` para validar referencias
horarioCajaSchema.pre('save', async function (next) {
  try {
    const Usuario = mongoose.model('Usuario');
    const Caja = mongoose.model('Caja');

    const encargadoExiste = await Usuario.exists({ _id: this.encargado });
    if (!encargadoExiste) {
      throw new Error('El encargado especificado no existe.');
    }

    const cajaExiste = await Caja.exists({ _id: this.caja });
    if (!cajaExiste) {
      throw new Error('La caja especificada no existe.');
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('HorarioCaja', horarioCajaSchema);