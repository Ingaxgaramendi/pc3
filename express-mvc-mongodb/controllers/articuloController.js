const articuloService = require('../services/articuloService');

class ArticuloController {
  async listar(req, res) {
    try {
      const articulos = await articuloService.obtenerTodos();
      res.render('articulos/listar', { articulos });
    } catch (error) {
      console.error(' Error al listar los artículos:', error);
      res.status(500).send('Error al listar los artículos');
    }
  }

  async mostrarFormularioCrear(req, res) {
    res.render('articulos/crear');
  }

  async crear(req, res) {
    try {
      await articuloService.crear(req.body);
      res.redirect('/articulos');
    } catch (error) {
      console.error(' Error al crear artículo:', error);
      res.status(500).send('Error al crear artículo');
    }
  }

  async mostrarFormularioEditar(req, res) {
    try {
      const articulo = await articuloService.obtenerPorId(req.params.id);
      if (!articulo) {
        return res.status(404).send('Artículo no encontrado');
      }
      res.render('articulos/editar', { articulo });
    } catch (error) {
      console.error('Error al mostrar formulario de edición:', error);
      res.status(500).send('Error al mostrar formulario de edición');
    }
  }

  async actualizar(req, res) {
    try {
      await articuloService.actualizar(req.params.id, req.body);
      res.redirect('/articulos');
    } catch (error) {
      console.error(' Error al actualizar artículo:', error);
      res.status(500).send('Error al actualizar artículo');
    }
  }

  async eliminar(req, res) {
    try {
      await articuloService.eliminar(req.params.id);
      res.redirect('/articulos');
    } catch (error) {
      console.error(' Error al eliminar artículo:', error);
      res.status(500).send('Error al eliminar artículo');
    }
  }
}

module.exports = new ArticuloController();
