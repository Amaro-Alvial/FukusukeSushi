const mongoose = require('mongoose');

const usuarioPerfilSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El usuario es obligatorio.'],
  },
  perfil: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Perfil',
    required: [true, 'El perfil es obligatorio.'],
  },
  caducidad: {
    type: String,
    validate: {
      validator: function (v) {
        // Validar solo si el campo tiene un valor (es opcional)
        return !v || !isNaN(Date.parse(v)); // Date.parse devuelve NaN si no es una fecha válida
      },
      message: props => `"${props.value}" no es una fecha válida. Debe estar en formato ISO 8601.`,
    },
  },
});

// Middleware `pre` para validar la existencia de usuario y perfil
usuarioPerfilSchema.pre('save', async function (next) {
  try {
    const Usuario = mongoose.model('Usuario');
    const Perfil = mongoose.model('Perfil');

    // Validar que el usuario exista
    const usuarioExiste = await Usuario.exists({ _id: this.usuario });
    if (!usuarioExiste) {
      throw new Error('El usuario especificado no existe.');
    }

    // Validar que el perfil exista
    const perfilExiste = await Perfil.exists({ _id: this.perfil });
    if (!perfilExiste) {
      throw new Error('El perfil especificado no existe.');
    }

    next(); // Todo está bien, procede con el guardado
  } catch (error) {
    next(error); // Lanza el error para manejarlo en otro lado
  }
});

module.exports = mongoose.model('UsuarioPerfil', usuarioPerfilSchema);