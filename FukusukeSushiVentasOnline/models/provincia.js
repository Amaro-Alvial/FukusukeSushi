const mongoose = require('mongoose');

const provinciaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio.'],
    minlength: [3, 'El nombre debe tener al menos 3 caracteres.'],
    maxlength: [30, 'El nombre no puede tener más de 30 caracteres.'],
  },
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region',
    required: [true, 'La región es obligatoria.'],
  },
});

// Middleware `pre` para validar la existencia de la región
provinciaSchema.pre('save', async function (next) {
  try {
    const Region = mongoose.model('Region');

    const regionExiste = await Region.exists({ _id: this.region });
    if (!regionExiste) {
      throw new Error('La región especificada no existe.');
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Provincia', provinciaSchema);