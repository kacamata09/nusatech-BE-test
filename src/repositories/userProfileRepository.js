const db = require('../config/database');

  exports.createUserProfile = async (userId, firstName, lastName, profileImage = null) => {
    const query = `
      INSERT INTO user_profiles (user_id, first_name, last_name, profile_image) 
      VALUES (?, ?, ?, ?);
    `;
    const [result] = await db.query(query, [userId, firstName, lastName, profileImage]);
    return result.insertId;
  }

  exports.getUserProfileByUserId = async (userId) => {
    const query = `
      SELECT * FROM user_profiles 
      WHERE user_id = ?;
    `;
    const [rows] = await db.query(query, [userId]);
    return rows[0];
  }

  exports.createUserProfile = async (userId, firstName, lastName, profileImage) => {
    const query = 'INSERT INTO user_profiles (user_id, first_name, last_name, profile_image) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(query, [userId, firstName, lastName, profileImage || null]);
  
    return result.affectedRows ? { userId, firstName, lastName, profileImage: profileImage || null } : null;
  };

  

exports.getUserProfile = async (userId) => {
    const [rows] = await db.query('SELECT * FROM user_profiles WHERE user_id = ?', [userId]);
    return rows.length ? rows[0] : null;
  };
  
  exports.updateUserProfile = async (userId, firstName, lastName) => {
    const query = 'UPDATE user_profiles SET first_name = ?, last_name = ? WHERE user_id = ?';
    const [result] = await db.query(query, [firstName, lastName, userId]);
    return result.affectedRows ? { firstName, lastName } : null;
  };
  
  exports.updateUserProfileImage = async (userId, imageFileName) => {
    const query = 'UPDATE user_profiles SET profile_image = ? WHERE user_id = ?';
    const [result] = await db.query(query, [imageFileName, userId]);
    return result.affectedRows ? { imageFileName } : null;
  };
