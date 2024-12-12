module.exports = {
  success: (res, data = null, message = 'Success', status = 200) => {
    return res.status(status).json({ status, message, data });
  },
  
  error: (res, message = 'Error', status = 500) => {
    return res.status(status).json({ status, message });
  },
};
