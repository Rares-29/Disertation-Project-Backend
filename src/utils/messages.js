const MESSAGES = {
    AUTH: {
        MISSING_AUTH_HEADER: "Authorization header is missing",
        WRONG_FORMAT: "Token has wrong format. BEARER is missing from the start",
        INVALID_TOKEN: "The JWT provided is not valid",
        NOT_AUTHORIZED: "You are missing privileges to perform this request"
    },
    SERVER: {
        SERVER_STARTED: (port) => `The server is listening on port: ${port}`,
        INTERNAL_ERROR: "An internal server error occurred. Please try again later.",
    },
    STUDENT: {
        NOT_FOUND: "Student not found",
        MISSING_INPUT: "Missing fields: first_name, last_name and program_id are required",
        INVALID_INPUT: "One of the fields: first_name, last_name, program_id is wrong defined"
    },
    TEACHER: {
        NOT_FOUND: "Teacher not found",
        MISSING_INPUT: "Missing fields: first_name, last_name and committee_id are required",
        INVALID_INPUT: "One of the fields: first_name, last_name, committee_id is wrong defined"
    },
    REGISTRATION_SESSION: {
        MISSING_INPUT: "Missing fields: open_seats, start_date and duration are required",
        OLD_DATE: "The start_date can't be older than today's date",
        NOT_AVAILABLE_OPEN_SEATS: "Not enough open seats to perform the operation",
        INVALID_DURATION: "A registration_session must have between 1 and 30 days",
        INVALID_DATE_FORMAT: "Invalid date format. Should be YYYY-MM-DD"

    },
    AUTHENTICATION: {
        LOGIN_FAILED: "Login failed",
        MISSING_REQUIRED_FIELDS: "Uername / password missing from request",
        NOT_FOUND: "User not found",
        WRONG_PASS: "The combination of username & password is wrong!"
    },
    REGISTRATION: {
        MISSING_REQUIRED_FIELDS: "Required fields are missing from the request",
        INVALID_INPUT: "Your input is invalid",
        USER_ALREADY_EXIST: "This username/email is already associated with an account",
        SIGNUP_FAILED: "Signup failed",
        SUCCESS_MESSAGE: "The account has been created!",
        SERVER_ERROR: "Something went wrong on our side"
    },
    REGISTRATION_REQUEST_SERVICE: {
        INVALID_INPUT: "Missing input: student_id, teacher_id is needed to perform the operation",
        RESPONSE_INVALID_INPUT: "Missing input: request_id, status",
        ALREADY_ACCEPTED: "You can't submit more request, you already have a teacher for disertation",
        ALREADY_PENDING: "Teacher already received a request from you, just be patient",
        NOT_FOUND: "Request was not found in the db",
        RESPONSE_SUCCESS_MESSAGE: "Response sent with success",
        REQUEST_SUCCESS_MESSAGE: "Request sent with success"
    }
};

module.exports = MESSAGES;