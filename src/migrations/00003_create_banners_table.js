module.exports = {
    up: async (connection) => {
      const query = `
        CREATE TABLE banners (
          id INT AUTO_INCREMENT PRIMARY KEY,
          banner_name VARCHAR(100) NOT NULL,
          banner_image VARCHAR(255) NOT NULL,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `;
      await connection.query(query);
    },
  
    down: async (connection) => {
      const query = `DROP TABLE IF EXISTS banners;`;
      await connection.query(query);
    },
  };
  