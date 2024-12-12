const db = require('../config/database');

class UserRepository {
  async createUser(email, passwordHash) {
    const query = `
      INSERT INTO users (email, password_hash) 
      VALUES (?, ?);
    `;
    const [result] = await db.query(query, [email, passwordHash]);
    return result.insertId;
  }

  async findUserByEmail(email) {
    const query = `
      SELECT * FROM users 
      WHERE email = ?;
    `;
    const [rows] = await db.query(query, [email]);
    return rows[0];
  }

  async findUserById(id) {
    const query = `
      SELECT * FROM users 
      WHERE id = ?;
    `;
    const [rows] = await db.query(query, [id]);
    return rows[0];
  }
}

module.exports = new UserRepository();
