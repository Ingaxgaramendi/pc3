const mongoose = require('mongoose');

const articuloSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  precio_soles: {
    type: Number,
    required: true,
    min: 0
  },
  cantidad_stock: {
    type: Number,
    required: true,
    min: 0
  },
  precio_dolares: {
    type: Number,
    required: true,
    min: 0
  },
  marca: {
    type: String,
    required: true,
    trim: true
  },
  modelo: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Articulo', articuloSchema);
