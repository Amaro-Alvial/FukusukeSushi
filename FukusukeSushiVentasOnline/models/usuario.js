const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'El email es obligatorio.'],
    minlength: [5, 'El email debe tener al menos 5 caracteres.'],
    maxlength: [320, 'El email no puede tener más de 320 caracteres.'],
    match: [/^\S+@\S+\.\S+$/, 'El email debe ser válido.'],
  },
  pass: {
    type: String,
    required: [true, 'La contraseña es obligatoria.'],
    minlength: [5, 'La contraseña debe tener al menos 5 caracteres.'],
    maxlength: [100, 'La contraseña no puede tener más de 100 caracteres.'],
  },
  nombreUsuario: {
    type: String,
    unique: true,
    required: [true, 'El nombre de usuario es obligatorio.'],
    minlength: [5, 'El nombre de usuario debe tener al menos 5 caracteres.'],
    maxlength: [30, 'El nombre de usuario no puede tener más de 30 caracteres.'],
  },
  persona: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Persona',
    required: [true, 'La persona es obligatoria.'],
  },
});

// Middleware `pre` para validar la existencia de la persona
usuarioSchema.pre('save', async function (next) {
  try {
    const Persona = mongoose.model('Persona');

    const personaExiste = await Persona.exists({ _id: this.persona });
    if (!personaExiste) {
      throw new Error('La persona especificada no existe.');
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Usuario', usuarioSchema);