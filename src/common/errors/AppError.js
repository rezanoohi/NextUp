export class AppError extends Error {
    constructor(_message, _statusCode) {
        super(_message);
        this.success = false;
        this.statusCode = _statusCode;
        this.status = _statusCode >= 400 && _statusCode < 500 ? 'fail' : 'error';
        this.isOperational = true;
    }
}