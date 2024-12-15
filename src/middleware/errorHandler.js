
const errorHandler = (error, req, res, next) => {
    const status = res.statusCode ? res.statusCode : 500;
    res.json({message: error.message});
}

exports.errorHandler = errorHandler;