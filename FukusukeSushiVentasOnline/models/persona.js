const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
  run: {
    type: String,
    unique: true, 
    required: [true, 'El RUN es obligatorio.'],
    minlength: [9, 'El RUN debe tener al menos 9 caracteres.'],
    maxlength: [11, 'El RUN no puede tener más de 11 caracteres.'],
  },
  nombreCompleto: {
    type: String,
    required: [true, 'El nombre completo es obligatorio.'],
    minlength: [5, 'El nombre completo debe tener al menos 5 caracteres.'],
    maxlength: [50, 'El nombre completo no puede tener más de 50 caracteres.'],
  },
  direccion: {
    type: String,
    required: [true, 'La dirección es obligatoria.'],
    minlength: [5, 'La dirección debe tener al menos 5 caracteres.'],
    maxlength: [50, 'La dirección no puede tener más de 50 caracteres.'],
  },
  comuna: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comuna',
    required: [true, 'La comuna es obligatoria.'],
  },
  fechaNacimiento: {
    type: String,
    required: [true, 'La fecha de nacimiento es obligatoria.'],
    validate: {
      validator: function (v) {
        return !isNaN(Date.parse(v));
      },
      message: props => `"${props.value}" no es una fecha válida. Debe estar en formato ISO 8601, como "2023-11-21T10:15:30.000Z".`,
    },
  },
  sexo: {
    type: String,
    required: [true, 'El sexo es obligatorio.'],
    enum: {
      values: ['F', 'M'],
      message: 'El sexo debe ser "F" o "M".',
    },
    minlength: [1, 'El sexo debe tener exactamente 1 carácter.'],
    maxlength: [1, 'El sexo debe tener exactamente 1 carácter.'],
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono es obligatorio.'],
    minlength: [10, 'El teléfono debe tener al menos 10 caracteres.'],
    maxlength: [15, 'El teléfono no puede tener más de 15 caracteres.'],
  },
});

// Middleware `pre` para validar la existencia de la comuna
personaSchema.pre('save', async function (next) {
  try {
    const Comuna = mongoose.model('Comuna');

    const comunaExiste = await Comuna.exists({ _id: this.comuna });
    if (!comunaExiste) {
      throw new Error('La comuna especificada no existe.');
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Persona', personaSchema);