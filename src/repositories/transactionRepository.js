const db = require('../config/database');

  exports.createTransaction = async (userId, invoiceNumber, serviceCode, serviceName, transactionType, totalAmount) => {
    const query = `
      INSERT INTO transactions (user_id, invoice_number, service_code, service_name, transaction_type, total_amount, created_on) 
      VALUES (?, ?, ?, ?, ?, ?, NOW());
    `;
   return await db.query(query, [userId, invoiceNumber, serviceCode, serviceName, transactionType || 'TOPUP', totalAmount]);
  }

  exports.getUserTransactions =   async (userId) => {
    const query = `
      SELECT * FROM transactions 
      WHERE user_id = ? 
      ORDER BY created_on DESC;
    `;
    const [rows] = await db.query(query, [userId]);
    return rows;
  }

exports.getTransactionsByUserId = async (userId) => {
    const [rows] = await db.query(
        'SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
    );
    return rows;
};


