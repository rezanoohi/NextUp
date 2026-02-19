import {AppError} from "../errors/AppError.js";

export const inputValidator = (schema, source = 'body') => {
    return (req, res, next) => {
        const {data, error} = schema.safeParse(req[source]);
        if (error) {
            const errorMessages = error.issues.map(err => err.message);
            const errorMessage = errorMessages.join(', ');
            throw new AppError(errorMessage, 400);
        }
        req[source] = data;
        next();
    }
}