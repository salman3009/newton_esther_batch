/*
The AppError function is a utility function that sends a JSON response with the given status code and an error message to the client.
*/
const AppError = (res, statusCode, errorMessage) => {
    res.status(statusCode).json({ error: errorMessage });
};

module.exports = AppError;