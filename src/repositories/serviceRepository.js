const db = require('../config/database');


exports.getAllServices = async () => {
  return await db.query("SELECT * FROM services");
};

exports.getServiceById = async (id) => {
  return await db.query("SELECT * FROM services WHERE id = ?", [id]);
};

exports.getServiceByCode = async (serviceCode) => {
    const [rows] = await db.query('SELECT service_name, service_tariff FROM services WHERE service_code = ?', [serviceCode]);
    return rows.length ? rows[0] : null;
  };

exports.createService = async (serviceData) => {
  const { serviceCode, serviceName, serviceIcon, serviceTariff } = serviceData;
  return await db.query(
    "INSERT INTO services (service_code, service_name, service_icon, service_tariff) VALUES (?, ?, ?, ?)",
    [serviceCode, serviceName, serviceIcon, serviceTariff]
  );
};

exports.updateService = async (id, serviceData) => {
  const { serviceCode, serviceName, serviceIcon, serviceTariff } = serviceData;
  return await db.query(
    "UPDATE services SET service_code = ?, service_name = ?, service_icon = ?, service_tariff = ? WHERE id = ?",
    [serviceCode, serviceName, serviceIcon, serviceTariff, id]
  );
};

exports.deleteService = async (id) => {
  return await db.query("DELETE FROM services WHERE id = ?", [id]);
};
