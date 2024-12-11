module.exports = {
    up: async (connection) => {
      const query = `
        CREATE TABLE services (
          id INT AUTO_INCREMENT PRIMARY KEY,
          service_code VARCHAR(50) NOT NULL UNIQUE,
          service_name VARCHAR(100) NOT NULL,
          service_icon VARCHAR(255),
          service_tariff DECIMAL(10, 2) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `;
      await connection.query(query);
    },
  
    down: async (connection) => {
      const query = `DROP TABLE IF EXISTS services;`;
      await connection.query(query);
    },
  };
  