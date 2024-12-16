const MESSAGES = {
    AUTH: {
        MISSING_AUTH_HEADER: "Authorization header is missing",
        WRONG_FORMAT: "Token has wrong format. BEARER is missing from the start",
        INVALID_TOKEN: "The JWT provided is not valid",
    },
    SERVER: {
        SERVER_STARTED: (port) => `The server is listening on port: ${port}`,
        INTERNAL_ERROR: "An internal server error occurred. Please try again later.",
    },
    STUDENT: {
        NOT_FOUND: "Student not found",
    },
    AUTHENTICATION: {
        LOGIN_FAILED: "Login failed",
        MISSING_REQUIRED_FIELDS: "username / password missing from request",
    },
    REGISTRATION: {
        MISSING_REQUIRED_FIELDS: "Required fields are missing from the request",
        USER_ALREADY_EXIST: "This username/email is already associated with an account",
        SIGNUP_FAILED: "Signup failed",
    }
};

module.exports = MESSAGES;