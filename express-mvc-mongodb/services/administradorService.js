const Administrador = require('../models/Administrador');

exports.buscarPorCorreo = async (correo) => {
  try {
    return await Administrador.findOne({ correo });
  } catch (error) {
    console.error('Error al buscar administrador:', error);
    throw error;
  }
};

exports.verificarClave = (admin, clave) => {
  return admin.clave === clave;
};
