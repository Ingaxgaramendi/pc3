require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');

// Controladores
const articuloController = require('./controllers/articuloController');
const usuarioController = require('./controllers/usuarioController');
const empleadoController = require('./controllers/empleadoController');
const administradorController = require('./controllers/administradorController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  helpers: {
    multiply: (a, b) => (parseFloat(a || 0) * parseFloat(b || 0)).toFixed(2),
    eq: (a, b) => a === b
  },
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Variable global para sesión temporal
global.usuarioAutenticado = false;

// Middleware de sesión
function verificarSesion(req, res, next) {
  if (global.usuarioAutenticado) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Rutas principales
app.get('/', (req, res) => res.redirect('/login'));

// Login administrador
app.get('/login', administradorController.mostrarLogin);
app.post('/login', administradorController.login);
app.get('/logout', administradorController.logout);

// Rutas de Artículos
app.get('/articulos', verificarSesion, articuloController.listar);
app.get('/articulos/nuevo', verificarSesion, articuloController.mostrarFormularioCrear);
app.post('/articulos', verificarSesion, articuloController.crear);
app.get('/articulos/:id/editar', verificarSesion, articuloController.mostrarFormularioEditar);
app.put('/articulos/:id', verificarSesion, articuloController.actualizar);
app.delete('/articulos/:id', verificarSesion, articuloController.eliminar);

// Rutas de Usuarios
app.get('/usuarios', verificarSesion, usuarioController.listar);
app.get('/usuarios/nuevo', verificarSesion, usuarioController.mostrarFormularioCrear);
app.post('/usuarios', verificarSesion, usuarioController.crear);
app.get('/usuarios/:id/editar', verificarSesion, usuarioController.mostrarFormularioEditar);
app.put('/usuarios/:id', verificarSesion, usuarioController.actualizar);
app.delete('/usuarios/:id', verificarSesion, usuarioController.eliminar);

// Rutas de Empleados
app.get('/empleados', verificarSesion, empleadoController.index);
app.get('/empleados/crear', verificarSesion, empleadoController.crearForm);
app.post('/empleados', verificarSesion, empleadoController.crear);
app.get('/empleados/:id/editar', verificarSesion, empleadoController.editarForm);
app.put('/empleados/:id', verificarSesion, empleadoController.actualizar);
app.delete('/empleados/:id', verificarSesion, empleadoController.eliminar);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
