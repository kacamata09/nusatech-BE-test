const ApiResponse = require('../helpers/apiResponse');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const response = new ApiResponse(res);
  return response.error('Internal server error', 500);
};

module.exports = errorHandler;
