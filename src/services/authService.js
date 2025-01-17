const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const { Op } = require('sequelize');
const messages = require("../utils/messages");
const secret = process.env.SECRET;
const jwt = require("jsonwebtoken");
const {createStudProfile} = require("./studentService");
const {createTeacherProfile} = require("./teacherService");
const {sequelize} = require("../db/sqlConnection");
const {ServerError, InvalidInputError} = require("../utils/errors");



async function register(req, res) {

    const user = extractUser(req, res);
    // validate input..
    const userDb = await User.findOne({
        where: { 
            [Op.or]: [{username: user.username}, {email: user.email}] 
        }
    });
    if (userDb !== null) {
        res.status(409);
        throw Error(messages.REGISTRATION.USER_ALREADY_EXIST);
    }

    const transaction = await sequelize.transaction();
    try {
        const savedUser = await User.create({username: user.username, password: user.password, email: user.email, role: user.role}, {transaction});
        req.user = savedUser.dataValues;
        if (savedUser.dataValues.role === "STUD") await createStudProfile(savedUser, req, res, transaction);
        else if (savedUser.dataValues.role === "TEACHER") await createTeacherProfile(savedUser,req, res, transaction);
        else throw new InvalidInputError(messages.REGISTRATION.INVALID_INPUT);
        await transaction.commit();
    }catch(error) {
        await transaction.rollback();
        if (error instanceof InvalidInputError) {
            throw error;
        }
        throw new ServerError(messages.REGISTRATION.SERVER_ERROR);
        console.log("Transaction rollback due to: " + error);
    }


}


async function login(req, res) {
    const data = extractLoginData(req, res);

    const userDb = await User.findOne({
        where: {
            [Op.or]: [{username: data.username}, {email: data.username}] 
        }
    });

    if (userDb === null) {
        res.status(404);
        throw Error(messages.AUTHENTICATION.NOT_FOUND);
    }

    if (userDb.password !== data.password) {
        res.status(401);
        throw Error(messages.AUTHENTICATION.WRONG_PASS);
    }

    let signedToken  = jwt.sign({user_id: userDb.user_id, username: userDb.username, email: userDb.email, role: userDb.role}, secret, {expiresIn: "3d"});

    return res.json({"token": signedToken});
}


function extractUser(req, res) {
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


function extractLoginData(req, res) {
    const {username, password} = req.body;
    if (typeof username === "undefined" || typeof password === "undefined") {
        res.status(400);
        throw Error(messages.AUTHENTICATION.MISSING_REQUIRED_FIELDS);
    };
    const data = {
        username: username, 
        password:password
    };
    return data;
}


exports.register = register;
exports.login = login;