const mongoose = require('mongoose');

const comunaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio.'],
    minlength: [1, 'El nombre debe tener al menos 1 carácter.'],
    maxlength: [30, 'El nombre no puede tener más de 30 caracteres.'],
  },
  provincia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provincia',
    required: [true, 'La provincia es obligatoria.'],
  },
});

// Middleware `pre` para validar la existencia de la provincia
comunaSchema.pre('save', async function (next) {
  try {
    const Provincia = mongoose.model('Provincia');

    const provinciaExiste = await Provincia.exists({ _id: this.provincia });
    if (!provinciaExiste) {
      throw new Error('La provincia especificada no existe.');
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Comuna', comunaSchema);