const mongoose = require('mongoose');

const empleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String, required: true, unique: true },
  cargo: { type: String, required: true },
  salario: { type: Number, required: true },
  fechaIngreso: { type: Date, default: Date.now },
  estado: { type: String, default: 'Activo' }
});

module.exports = mongoose.model('Empleado', empleadoSchema);