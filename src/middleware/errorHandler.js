
const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode;
    if (typeof statusCode !== "undefined") res.status(statusCode);
    res.json({message: error.message});
}

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};


exports.errorHandler = errorHandler;
exports.asyncHandler = asyncHandler;