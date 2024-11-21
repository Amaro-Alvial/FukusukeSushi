const mongoose = require('mongoose');

const detalleCarritoSchema = new mongoose.Schema({
  carrito: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carrito',
    required: [true, 'El carrito es obligatorio.'],
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
detalleCarritoSchema.pre('save', async function (next) {
  try {
    const Carrito = mongoose.model('Carrito');
    const Producto = mongoose.model('Producto');

    const carritoExiste = await Carrito.exists({ _id: this.carrito });
    if (!carritoExiste) {
      throw new Error('El carrito especificado no existe.');
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

module.exports = mongoose.model('DetalleCarrito', detalleCarritoSchema);