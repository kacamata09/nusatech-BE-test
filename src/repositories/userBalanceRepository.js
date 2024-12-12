const db = require('../config/database');

  exports.getBalance = async (userId) => {
    const query = `
      SELECT balance FROM user_balances 
      WHERE user_id = ?;
    `;
    const [rows] = await db.query(query, [userId]);
    return rows[0]?.balance || 0;
  }
  

  exports.updateBalance = async (userId, amount) => {
    const query = `
      UPDATE user_balances 
      SET balance = balance + ? 
      WHERE user_id = ?;
    `;
    await db.query(query, [amount, userId]);
  }


exports.getBalanceByUserId = async (userId) => {
    const [rows] = await db.query('SELECT balance FROM user_balances WHERE user_id = ?', [userId]);
    return rows.length ? rows[0].balance : 0.00;
};

exports.updateOrCreateBalance = async (userId, amount) => {
    const balance = await this.getBalanceByUserId(userId);

    if (balance === 0.00) {
        await db.query('INSERT INTO user_balances (user_id, balance) VALUES (?, ?)', [userId, amount]);
    } else {
        await db.query('UPDATE user_balances SET balance = balance + ? WHERE user_id = ?', [amount, userId]);
    }
};
