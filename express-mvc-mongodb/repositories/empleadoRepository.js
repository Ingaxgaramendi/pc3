const Empleado = require('../models/Empleado');

class EmpleadoRepository {
  async findAll() {
    return await Empleado.find().lean();
  }

  async findById(id) {
    return await Empleado.findById(id).lean();
  }

  async create(data) {
    const empleado = new Empleado(data);
    return await empleado.save();
  }

  async update(id, data) {
    return await Empleado.findByIdAndUpdate(id, data);
  }

  async delete(id) {
    return await Empleado.findByIdAndDelete(id);
  }
}

module.exports = new EmpleadoRepository();