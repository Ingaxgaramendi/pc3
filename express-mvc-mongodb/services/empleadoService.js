const empleadoRepository = require('../repositories/empleadoRepository');

class EmpleadoService {
  async listarEmpleados() {
    const empleados = await empleadoRepository.findAll();

    const totalEmpleados = empleados.length;
    const totalSalario = empleados.reduce((acc, emp) => acc + (emp.salario || 0), 0);
    const promedioSalario = totalEmpleados > 0 ? (totalSalario / totalEmpleados).toFixed(2) : 0;

    return { empleados, estadisticas: { total: totalEmpleados, totalSalario, promedioSalario } };
  }

  async obtenerEmpleado(id) {
    return await empleadoRepository.findById(id);
  }

  async crearEmpleado(data) {
    return await empleadoRepository.create(data);
  }

  async actualizarEmpleado(id, data) {
    return await empleadoRepository.update(id, data);
  }

  async eliminarEmpleado(id) {
    return await empleadoRepository.delete(id);
  }
}

module.exports = new EmpleadoService();