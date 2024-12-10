class ApiResponse {
    constructor(res) {
      this.res = res;
    }
  
    success(data = null, message = 'Success', status = 200) {
      return this.res.status(status).json({
        status,
        message,
        data,
      });
    }
  
    error(message = 'Error', status = 500, data = null) {
      return this.res.status(status).json({
        status,
        message,
        data,
      });
    }
  }
  
  module.exports = ApiResponse;
  