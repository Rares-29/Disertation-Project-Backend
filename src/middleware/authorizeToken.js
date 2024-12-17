const messages = require("../utils/messages");
const jwt = require("jsonwebtoken");


 function authorizeToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    res.status(401);
    if (!authorizationHeader) {
        return next(new Error(messages.AUTH.MISSING_AUTH_HEADER))
    }
    if (!authorizationHeader.startsWith("Bearer")) {
        return next(new Error(messages.AUTH.WRONG_FORMAT));
    }

    token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return next(new Error(messages.AUTH.INVALID_TOKEN));
        }
        req.user = user;
    });
    res.status(200);
    next();
}


exports.authorizeToken = authorizeToken