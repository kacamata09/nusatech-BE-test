const db = require('../config/database');

const UserRepository = {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  async create(data) {
    const { name, email } = data;
    const [result] = await db.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    return { id: result.insertId, ...data };
  },

  async update(id, data) {
    const { name, email } = data;
    await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [
      name,
      email,
      id,
    ]);
    return { id, ...data };
  },

  async delete(id) {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  },
};

module.exports = UserRepository;
