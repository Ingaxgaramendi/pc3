const empleadoService = require('../services/empleadoService');

class EmpleadoController {
  async index(req, res) {
    try {
      const { empleados, estadisticas } = await empleadoService.listarEmpleados();
      res.render('empleados/index', { 
        empleados, 
        estadisticas,
        title: 'Lista de Empleados' 
      });
    } catch (error) {
      res.status(500).render('error', { 
        message: 'Error al obtener empleados',
        error 
      });
    }
  }

  crearForm(req, res) {
    res.render('empleados/crear', { title: 'Crear Empleado' });
  }

  async crear(req, res) {
    try {
      await empleadoService.crearEmpleado(req.body);
      res.redirect('/empleados');
    } catch (error) {
      res.status(400).render('empleados/crear', { 
        title: 'Crear Empleado',
        error: error.message,
        empleado: req.body
      });
    }
  }

  async editarForm(req, res) {
    try {
      const empleado = await empleadoService.obtenerEmpleado(req.params.id);
      res.render('empleados/editar', { 
        empleado,
        title: 'Editar Empleado' 
      });
    } catch (error) {
      res.status(404).render('error', { 
        message: 'Empleado no encontrado',
        error 
      });
    }
  }

  async actualizar(req, res) {
    try {
      await empleadoService.actualizarEmpleado(req.params.id, req.body);
      res.redirect('/empleados');
    } catch (error) {
      res.status(400).render('empleados/editar', { 
        title: 'Editar Empleado',
        error: error.message,
        empleado: { _id: req.params.id, ...req.body }
      });
    }
  }

  async eliminar(req, res) {
    try {
      await empleadoService.eliminarEmpleado(req.params.id);
      res.redirect('/empleados');
    } catch (error) {
      res.status(400).redirect('/empleados');
    }
  }
}

module.exports = new EmpleadoController();