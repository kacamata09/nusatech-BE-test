const userRepository = require('../repositories/userRepository');
const userBalanceRepository = require('../repositories/userBalanceRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helper = require('../helpers/responseHelper');

  exports.register = async (req, res) => {
    try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = await userRepository.createUser(email, hashedPassword);

      return helper.success(res, { userId }, 'User registered successfully');
    } catch (error) {
      return helper.error(res, error.message);
    }
  }

  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userRepository.findUserByEmail(email);
      if (!user) return helper.error(res, 'Invalid email or password', 401);

      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) return helper.error(res, 'Invalid email or password', 401);

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return helper.success(res, { token }, 'Login successful');
    } catch (error) {
      return helper.error(res, error.message);
    }
  }

  exports.getBalance = async (req, res) => {
    try {
      const userId = req.user.id;
      const balance = await userBalanceRepository.getBalance(userId);

      return helper.success(res, { balance }, 'Balance retrieved successfully');
    } catch (error) {
      return helper.error(res, error.message);
    }
  }


