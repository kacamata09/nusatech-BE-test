const ApiResponse = require('../helpers/responseHelper');

exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const response = new ApiResponse(res);
  return response.error('Internal server error', 500);
};

