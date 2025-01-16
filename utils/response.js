exports.sendSuccess = (res, data, status = 200, message = 'Success') => {
    res.status(status).json({
      success: true,
      message,
      data,
    });
  };
  
  exports.sendError = (res, message, status = 500, error = null) => {
    res.status(status).json({
      success: false,
      message,
      error: error ? error.message : null,
    });
  };
  