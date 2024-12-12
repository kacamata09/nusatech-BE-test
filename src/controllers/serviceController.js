const serviceRepo = require("../repositories/serviceRepository");
const helper = require("../helpers/responseHelper");

exports.getAllServices = async (req, res) => {
  try {
    const services = await serviceRepo.getAllServices();
    return helper.success(res, services, "Services fetched successfully");
  } catch (error) {
    return helper.error(res, error.message);
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await serviceRepo.getServiceById(req.params.id);
    if (!service.length) return helper.notFound(res, "Service not found");
    return helper.success(res, service[0], "Service fetched successfully");
  } catch (error) {
    return helper.error(res, error.message);
  }
};

exports.createService = async (req, res) => {
  try {
    await serviceRepo.createService(req.body);
    return helper.success(res, null, "Service created successfully", 201);
  } catch (error) {
    return helper.error(res, error.message);
  }
};

exports.updateService = async (req, res) => {
  try {
    await serviceRepo.updateService(req.params.id, req.body);
    return helper.success(res, null, "Service updated successfully");
  } catch (error) {
    return helper.error(res, error.message);
  }
};

exports.deleteService = async (req, res) => {
  try {
    await serviceRepo.deleteService(req.params.id);
    return helper.success(res, null, "Service deleted successfully");
  } catch (error) {
    return helper.error(res, error.message);
  }
};
