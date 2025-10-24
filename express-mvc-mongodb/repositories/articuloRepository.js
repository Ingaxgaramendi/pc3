const Articulo = require('../models/Articulo');

class ArticuloRepository {

  async findAll() {
    return await Articulo.find().sort({ createdAt: -1 });
  }


  async findById(id) {
    return await Articulo.findById(id);
  }


  async create(articuloData) {
    const articulo = new Articulo(articuloData);
    return await articulo.save();
  }

  async update(id, articuloData) {
    return await Articulo.findByIdAndUpdate(
      id,
      articuloData,
      { new: true, runValidators: true }
    );
  }

  async delete(id) {
    return await Articulo.findByIdAndDelete(id);
  }


  async count() {
    return await Articulo.countDocuments();
  }
}

module.exports = new ArticuloRepository();
