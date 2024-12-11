module.exports = {
    up: async (connection) => {
      const query = `
        CREATE TABLE transactions (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          invoice_number VARCHAR(50) NOT NULL UNIQUE,
          service_code VARCHAR(50) NOT NULL,
          service_name VARCHAR(100) NOT NULL,
          transaction_type ENUM('PAYMENT', 'TOPUP') NOT NULL,
          total_amount DECIMAL(10, 2) NOT NULL,
          created_on DATETIME NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (service_code) REFERENCES services(service_code) ON DELETE CASCADE
        );
      `;
      await connection.query(query);
    },
  
    down: async (connection) => {
      const query = `DROP TABLE IF EXISTS transactions;`;
      await connection.query(query);
    },
  };
  