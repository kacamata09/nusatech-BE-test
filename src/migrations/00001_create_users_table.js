module.exports = {
    up: async (connection) => {
      const query = `
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(100) NOT NULL UNIQUE,
          password_hash VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `;
      await connection.query(query);
    },
  
    down: async (connection) => {
      const query = `DROP TABLE IF EXISTS users;`;
      await connection.query(query);
    },
  };
  