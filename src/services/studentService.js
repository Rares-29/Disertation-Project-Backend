const messages = require("../utils/messages");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const ProgramOptions = require("../models/ProgramOption");
const {InvalidInputError} = require("../utils/errors");
const registrationRequestService = require("./registrationRequestService");

const createStudProfile = async (user, req, res, transaction) => {
    const student = extractStudent(req, res);
    await validateStudent(student, res);
    student.user_id = user.user_id;
    await Student.create(student, {transaction});
}


const extractStudent = (req, res) => {
    const data = {  
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    series: req.body.series,
    class_group: req.body.class_group,
    extra_year: req.body.extra_year,
    program_id: req.body.program_id};

    return data;
}

const validateStudent = async (data) => {
    if (typeof data.first_name === "undefined" || typeof data.last_name === "undefined" || typeof data.program_id === "undefined") 
        {
            throw new InvalidInputError(messages.STUDENT.MISSING_INPUT);
        }
    const program = await ProgramOptions.findOne(
        {
            where: {program_id:data.program_id}
        }
    );
    if (program == null) throw new InvalidInputError(messages.STUDENT.INVALID_INPUT);  
}

const findStudent = async (req) => {
    const student = await Student.findOne({
        where: {
            user_id: req.user.user_id
        }
    });
        
    if (!student) {
        throw new ServerError(messages.SERVER.INTERNAL_ERROR);
    }

    req.student = student;
};


const registerRequest = async (req) => {
    const stud = req.student;
    const teacher_id = req.body.teacher_id;
    const teacher = await Teacher.findOne({
        where: {
            teacher_id: teacher_id
        }
    });
    if (!teacher || !stud) throw new InvalidInputError(messages.REGISTRATION_REQUEST_SERVICE.INVALID_INPUT);
    let request = {};
    request.student_id = stud.student_id;
    request.teacher_id = teacher_id;
    request.message = req.body.message;
    await registrationRequestService.registerRequest(request);
}


module.exports.createStudProfile = createStudProfile;
module.exports.findStudent = findStudent;
module.exports.registerRequest = registerRequest;