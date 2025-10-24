const mongoose = require('mongoose');

const AdministradorSchema = new mongoose.Schema({
  correo: { type: String, required: true, unique: true },
  clave: { type: String, required: true },
});

module.exports = mongoose.model('Administrador', AdministradorSchema);
