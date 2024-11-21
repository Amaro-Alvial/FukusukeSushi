const mongoose = require('mongoose');

const detalleCompraSchema = new mongoose.Schema({
  boleta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Boleta',
    required: [true, 'La boleta es obligatoria.'],
  },
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: [true, 'El producto es obligatorio.'],
  },
  cantidad: {
    type: Number,
    required: [true, 'La cantidad es obligatoria.'],
    min: [1, 'La cantidad mínima debe ser 1.'],
  },
});

// Middleware `pre` para validar las referencias
detalleCompraSchema.pre('save', async function (next) {
  try {
    const Boleta = mongoose.model('Boleta');
    const Producto = mongoose.model('Producto');

    const boletaExiste = await Boleta.exists({ _id: this.boleta });
    if (!boletaExiste) {
      throw new Error('La boleta especificada no existe.');
    }

    const productoExiste = await Producto.exists({ _id: this.producto });
    if (!productoExiste) {
      throw new Error('El producto especificado no existe.');
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('DetalleCompra', detalleCompraSchema);