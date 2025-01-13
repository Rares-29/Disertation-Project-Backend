class InvalidInputError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidInputError";
        this.statusCode = 400;
    }
}


class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = "ServerError";
        this.statusCode = 500;
    }
}



module.exports.InvalidInputError = InvalidInputError;
module.exports.ServerError = ServerError;
