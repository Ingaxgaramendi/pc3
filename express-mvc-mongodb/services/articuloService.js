const articuloRepository = require('../repositories/articuloRepository');

class ArticuloService {
  async obtenerTodos() {
    return await articuloRepository.findAll();
  }

  async obtenerPorId(id) {
    const articulo = await articuloRepository.findById(id);
    if (!articulo) {
      throw new Error('Artículo no encontrado');
    }
    return articulo;
  }

  async crear(articuloData) {
    if (articuloData.precio_soles < 0) {
      throw new Error('El precio en soles no puede ser negativo');
    }
    if (articuloData.precio_dolares < 0) {
      throw new Error('El precio en dólares no puede ser negativo');
    }
    if (articuloData.cantidad_stock < 0) {
      throw new Error('La cantidad no puede ser negativa');
    }
    return await articuloRepository.create(articuloData);
  }

  async actualizar(id, articuloData) {
    const articulo = await articuloRepository.findById(id);
    if (!articulo) {
      throw new Error('Artículo no encontrado');
    }
    return await articuloRepository.update(id, articuloData);
  }

  async eliminar(id) {
    const articulo = await articuloRepository.findById(id);
    if (!articulo) {
      throw new Error('Artículo no encontrado');
    }
    return await articuloRepository.delete(id);
  }
}

module.exports = new ArticuloService();
