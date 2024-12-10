const UserRepository = require('../repositories/userRepository');
const ApiResponse = require('../helpers/apiResponse');

const UserController = {
  async getAllUsers(req, res, next) {
    const response = new ApiResponse(res);
    try {
      const users = await UserRepository.findAll();
      return response.success(users, 'Users retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  async getUserById(req, res, next) {
    const response = new ApiResponse(res);
    try {
      const { id } = req.params;
      const user = await UserRepository.findById(id);
      if (!user) {
        return response.error('User not found', 404);
      }
      return response.success(user, 'User retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  async createUser(req, res, next) {
    const response = new ApiResponse(res);
    try {
      const user = await UserRepository.create(req.body);
      return response.success(user, 'User created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req, res, next) {
    const response = new ApiResponse(res);
    try {
      const { id } = req.params;
      const user = await UserRepository.update(id, req.body);
      return response.success(user, 'User updated successfully');
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req, res, next) {
    const response = new ApiResponse(res);
    try {
      const { id } = req.params;
      await UserRepository.delete(id);
      return response.success(null, 'User deleted successfully', 204);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = UserController;
