const messages = require("../utils/messages");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const {sequelize} = require("../db/sqlConnection");
const {InvalidInputError, ServerError} = require("../utils/errors");
const RegistrationRequest = require("../models/RegistrationRequest");


const registerRequest = async (request) => {
    if (!request)  throw new InvalidInputError(messages.REGISTRATION_REQUEST_SERVICE.INVALID_INPUT);
    if (!request.teacher_id || !request.student_id) throw new InvalidInputError(messages.REGISTRATION_REQUEST_SERVICE.INVALID_INPUT);
    
    const acceptedRequest = await RegistrationRequest.findOne({
        where: {
            student_id: request.student_id,
            status:'A'
        }
    });

    if (acceptedRequest)  throw new InvalidInputError(messages.REGISTRATION_REQUEST_SERVICE.ALREADY_ACCEPTED);
    const pendingRequest = await RegistrationRequest.findOne({
        where: {
            student_id: request.student_id,
            teacher_id: request.teacher_id,
            status: 'P'
        }
    });
    
    if (pendingRequest) throw new InvalidInputError(messages.REGISTRATION_REQUEST_SERVICE.ALREADY_PENDING);
    request.status = 'P';
    await RegistrationRequest.create(request);
}

const getAllPendingRequest = async (student_id=null, teacher_id=null) => {
    if (!teacher_id && !student_id) throw new InvalidInputError(messages.REGISTRATION_REQUEST_SERVICE.INVALID_INPUT);
    const whereConditions = {
        status: "P"
    };
    if (student_id) {
        whereConditions.student_id = student_id;
    }
    if (teacher_id) {
        whereConditions.teacher_id = teacher_id;
    }
    const pendingRequests = await RegistrationRequest.findAll({
        where: whereConditions
    });
    return pendingRequests;
}


const respondToRequest = async (response) => {
    if (!response || !response.request_id || !response.status) {
        throw new InvalidInputError(messages.REGISTRATION_REQUEST_SERVICE.RESPONSE_INVALID_INPUT);
    }
    const transaction = await sequelize.transaction();
    try {    
    const request = await RegistrationRequest.findOne({
        where: {
            request_id: response.request_id
        }
    });
    if (!request) throw new InvalidInputError(messages.REGISTRATION_REQUEST_SERVICE.NOT_FOUND);
    let updates = {};
    updates.status = response.status;
    if (response.reject_message)
        updates.reject_message = response.reject_message;

    // If the request is accepted, cancel all other requests for the student
    if (updates.status == 'A') {
        const student_id = request.student_id;
        await RegistrationRequest.update({status: "C"}, {
            where: {
                student_id: student_id     
            },
            transaction
        });
    }
    await request.update(updates, {transaction});
    await transaction.commit();
    }catch(error) {
        await transaction.rollback();
        if (error instanceof InvalidInputError) 
            throw error;
        throw new ServerError(messages.SERVER.INTERNAL_ERROR);
    }
}


module.exports.registerRequest = registerRequest;
module.exports.respondToRequest = respondToRequest;
module.exports.getAllPendingRequest = getAllPendingRequest;