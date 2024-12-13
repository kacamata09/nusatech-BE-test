const userRepository = require('../repositories/userRepository');
const userBalanceRepository = require('../repositories/userBalanceRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helper = require('../helpers/responseHelper');
const validator = require('validator');

  exports.register = async (req, res) => {
    try {
      const { email, password, first_name, last_name } = req.body;
      
      if( validator.isEmail(email) == false || password.length < 8)  {
        return helper.error(res, 'Parameter email tidak sesuai format');
      } 
      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = await userRepository.createUser(email, hashedPassword);
      
      const newProfile = await userProfileRepository.createUserProfile(userId, first_name, last_name);

      if (!newProfile) {
          return helper.error(res, 'Gagal membuat user profile', 400);
        }
        
    
      return helper.success(res, null, 'Registrasi berhasil silahkan login');
    } catch (error) {
      return helper.error(res, 'Internal server error');
    }
  }

  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userRepository.findUserByEmail(email);
      if( validator.isEmail(email) == false || password.length < 8)  {
        return helper.error(res, 'Parameter email tidak sesuai format');
      } 
      if (!user) return helper.error(res, 'IUsername atau password salah', 401);

      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) return helper.error(res, 'Username atau password salah', 401);

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '12h' });
      return helper.success(res, { token }, 'Login Sukses');
    } catch (error) {
      return helper.error(res, 'Internal server error');
    }
  }

  exports.getBalance = async (req, res) => {
    try {
      const userId = req.user.id;
      const balance = await userBalanceRepository.getBalance(userId);

      return helper.success(res, { balance }, 'Balance retrieved successfully');
    } catch (error) {
      return helper.error(res, 'Internal server error');
    }
  }


