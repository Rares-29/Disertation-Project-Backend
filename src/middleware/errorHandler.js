
const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode;
    if (typeof statusCode !== "undefined") res.status(statusCode);
    res.json({message: error.message});
}

exports.errorHandler = errorHandler;