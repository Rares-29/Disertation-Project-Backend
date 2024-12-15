
const messages = require("../utils/messages");


 function authorizeToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        res.status(401);
        throw new Error(messages.AUTH.MISSING_AUTH_HEADER);
    }

    if (authorizationHeader.startsWith("Bearer")) {
        res.status(401);
        throw new Error(messages.AUTH.WRONG_FORMAT);
    }

    token = authorizationHeader.split(" ")[1];
    jwt.verify(authorizationHeader, process.env.SECRET, (err, user) => {
        if (err) {
            res.status(401);
            return res.send({"message": messages.AUTH.INVALID_TOKEN});
        }
        req.user = user;
    });
    next();
}


exports.authorizeToken = authorizeToken