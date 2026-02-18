export const errorHandler = (err, req, res, next) => {
    console.error({
        date: new Date().toISOString(),
        message: err.message,
        error: err,
        isOperational: err.isOperational || false,
        path: req.path,
        method: req.method
    });

    const statusCode = err.isOperational ? (err.statusCode || 500) : 500;
    const status = err.isOperational ? (err.status || 'error') : 'error';
    const message = err.isOperational ? (err.message || 'Something went wrong') : 'Something went wrong';

    res.status(statusCode).json({
        success: false,
        status,
        message
    });

}