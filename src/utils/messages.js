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
        INVALID_INPUT: "Missing fields: first_name, last_name and program_id are required"
    },
    AUTHENTICATION: {
        LOGIN_FAILED: "Login failed",
        MISSING_REQUIRED_FIELDS: "Uername / password missing from request",
        NOT_FOUND: "User not found",
        WRONG_PASS: "The combination of username & password is wrong!"
    },
    REGISTRATION: {
        MISSING_REQUIRED_FIELDS: "Required fields are missing from the request",
        USER_ALREADY_EXIST: "This username/email is already associated with an account",
        SIGNUP_FAILED: "Signup failed",
        SUCCESS_MESSAGE: "The account has been created!",
        SERVER_ERROR: "Something went wrong on our side"
    }
};

module.exports = MESSAGES;