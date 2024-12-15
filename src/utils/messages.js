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
        SUCCESS: "Operation successful",
    },
    AUTHENTICATION: {
        LOGIN_SUCCESS: "Login successful",
        LOGIN_FAILED: "Login failed",
        SIGNUP_SUCCESS: "Signup successful",
        SIGNUP_FAILED: "Signup failed",
    },
};

module.exports = MESSAGES;