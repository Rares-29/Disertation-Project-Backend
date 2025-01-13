const messages = require("../utils/messages");
const Teacher = require("../models/Teacher");
const {InvalidInputError} = require("../utils/errors");
const Committee = require("../models/Committee");

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

module.exports.createTeacherProfile = createTeacherProfile;