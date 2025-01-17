const messages = require("../utils/messages");
const Teacher = require("../models/Teacher");
const {InvalidInputError, ServerError} = require("../utils/errors");
const Committee = require("../models/Committee");
const RegistrationSession = require("../models/RegistrationSession");


const findTeacher = async (req) => {
    const teacher = await Teacher.findOne({
        where: {
            user_id: req.user.user_id
        }
    });
        
    if (!teacher) {
        throw new ServerError(messages.SERVER.INTERNAL_ERROR);
    }

    req.teacher = teacher;
};

const createTeacherProfile = async (user, req, res, transaction) => {
    const teacher = extractTeacher(req);
    await validateTeacher(teacher, res);
    teacher.user_id = user.user_id;
    await Teacher.create(teacher, {transaction});
}

const extractTeacher = (req) => {
    const data = {  
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    students_limit: req.body.students_limit,
    committee_head: req.body.committee_head,
    committee_id: req.body.committee_id};

    return data;
}


const validateTeacher = async (data) => {
    if (typeof data.first_name === "undefined" || typeof data.last_name === "undefined" || typeof data.committee_id === "undefined") 
        {
            throw new InvalidInputError(messages.TEACHER.MISSING_INPUT);
        }
    const committeeDb = await Committee.findOne(
        {
            where: {committee_id:data.committee_id}
        }
    );
    if (committeeDb.dataValues == null) throw new InvalidInputError(messages.TEACHER.INVALID_INPUT);  
}

const registerSession = async (req, res) => {

    const data = extractSession(req);
    await validateSession(req.teacher, data);
    RegistrationSession.create(data);
}

const extractSession = (req) => {
    
    if (!req.body.open_seats || !req.body.start_date || !req.body.duration) 
        throw new InvalidInputError(messages.REGISTRATION_SESSION.MISSING_INPUT);
    
    const start_date = new Date(req.body.start_date);

    if (isNaN(start_date)) {
        throw new InvalidInputError(messages.REGISTRATION_SESSION.INVALID_DATE_FORMAT);
    }

    if (req.body.duration <= 0) {
        throw new InvalidInputError(messages.REGISTRATION_SESSION.INVALID_DURATION);
    }

    if (req.body.duration >= 30) {
        throw new InvalidInputError(messages.REGISTRATION_SESSION.INVALID_DURATION);
    }
    
    const data = {
        open_seats: req.body.open_seats,
        start_date: start_date,
        duration: req.body.duration
    };
    return data;
};

const validateSession = async (teacher, data) => {    


    data.teacher_id = teacher.teacher_id;
    let availableOpenSeats = await getAvailableSeats(teacher);


    if (data.open_seats > availableOpenSeats) 
        throw new InvalidInputError(messages.REGISTRATION_SESSION.NOT_AVAILABLE_OPEN_SEATS);

    data.remaining_seats = data.open_seats;
    data.end_date = new Date(data.start_date);
    data.end_date.setDate(data.end_date.getDate() + data.duration);


    //const dateValues = data.open_seats.split("-");
    // validate Date
}


const getAvailableSeats = async (teacher) => {
    
    let availableOpenSeats = teacher.students_limit;

    const registrationSessions = await RegistrationSession.findAll({
        where: {
            teacher_id: teacher.teacher_id
        }
    })

    if (registrationSessions.length) {
        registrationSessions.forEach((registration) => {
            availableOpenSeats -= registration.open_seats;
        })
    }

    return availableOpenSeats;

}


module.exports.createTeacherProfile = createTeacherProfile;
module.exports.registerSession = registerSession;
module.exports.findTeacher = findTeacher;
module.exports.getAvailableSeats = getAvailableSeats;