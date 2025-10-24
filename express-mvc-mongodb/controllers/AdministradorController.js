const administradorService = require('../services/administradorService');

exports.mostrarLogin = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  try {
    const { correo, clave } = req.body;

    const admin = await administradorService.buscarPorCorreo(correo);

    if (!admin) {
      return res.render('login', { error: 'Administrador no encontrado' });
    }

    if (!administradorService.verificarClave(admin, clave)) {
      return res.render('login', { error: 'Contraseña incorrecta' });
    }

 
    global.usuarioAutenticado = true;

    return res.redirect('/articulos');
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).send('Error al iniciar sesión');
  }
};

exports.logout = (req, res) => {
  global.usuarioAutenticado = false;
  res.redirect('/login');
};
