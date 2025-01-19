const messages = require("../utils/messages");
const {InvalidInputError, ServerError} = require("../utils/errors");
const ProgramOptionCommittee = require("../models/ProgramOptionCommittee");



const getAllCommittee = async(program_id) => {
    const committee = await ProgramOptionCommittee.findAll({
        where: {
            program_id: program_id
        }
    });
    return committee.map((committee) => committee.committee_id);

}


module.exports.getAllCommittee = getAllCommittee;