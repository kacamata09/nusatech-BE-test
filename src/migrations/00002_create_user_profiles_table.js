module.exports = {
    up: async (connection) => {
      const query = `
        CREATE TABLE user_profiles (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          first_name VARCHAR(50) NOT NULL,
          last_name VARCHAR(50) NOT NULL,
          profile_image VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
      `;
      await connection.query(query);
    },
  
    down: async (connection) => {
      const query = `DROP TABLE IF EXISTS user_profiles;`;
      await connection.query(query);
    },
  };
  