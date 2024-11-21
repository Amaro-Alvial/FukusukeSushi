const mongoose = require('mongoose');

const precioHistoricoSchema = new mongoose.Schema({
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
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: [true, 'El producto es obligatorio.'],
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio.'],
    min: [0, 'El precio no puede ser negativo.'],
  },
});

// Middleware `pre` para validar la existencia del producto
precioHistoricoSchema.pre('save', async function (next) {
  try {
    const Producto = mongoose.model('Producto');

    const productoExiste = await Producto.exists({ _id: this.producto });
    if (!productoExiste) {
      throw new Error('El producto especificado no existe.');
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('PrecioHistorico', precioHistoricoSchema);