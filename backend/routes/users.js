const db = require('../models/database');

const createUser = async (username, email, passwordHash) => {
  const result = await db.query(
    'INSERT INTO users (username,email,password) VALUES ($1, $2, $3) RETURNING *',
    [username,email, passwordHash]
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

module.exports = {
  createUser,
  getUserByEmail,
};
