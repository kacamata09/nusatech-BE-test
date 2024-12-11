module.exports = {
    up: async (connection) => {
      const query = `
        CREATE TABLE user_balances (
          user_id INT PRIMARY KEY,
          balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
      `;
      await connection.query(query);
    },
  
    down: async (connection) => {
      const query = `DROP TABLE IF EXISTS user_balances;`;
      await connection.query(query);
    },
  };
  