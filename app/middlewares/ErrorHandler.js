function globalErrorHandler(err, req, res, next){
    
    const errorMessage = err.message || 'Something went wrong.';
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        error: errorMessage,
    });
};

module.exports = globalErrorHandler