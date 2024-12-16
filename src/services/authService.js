const User = require("../models/User");
const { Op } = require('sequelize');
const messages = require("../utils/messages");


async function register(req, res) {

    const user = extractUser(req);
    const userDb = await User.findOne({
        where: { 
            [Op.or]: [{username: user.username}, {email: user.email}] 
        }
    });
    if (userDb !== null) {
        res.status(409);
        throw Error(messages.REGISTRATION.USER_ALREADY_EXIST);
    }
    await User.create({username: user.username, password: user.password, email: user.email, role: user.role});
}

function extractUser(req) {
    const { username, password, email, role } = req.body;

    if (!username || !password || !email || !role) {
        res.status(400);
        throw Error(messages.REGISTRATION.MISSING_REQUIRED_FIELDS);
    }

    const user = {
        username: username,
        password: password,
        email: email,
        role: role
    };
    return user;
}


exports.register = register;