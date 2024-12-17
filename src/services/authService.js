const User = require("../models/User");
const { Op } = require('sequelize');
const messages = require("../utils/messages");
const secret = process.env.SECRET;
const jwt = require("jsonwebtoken");
const {createStudProfile} = require("./studentService");
const teacherService = require("./teacherService");
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
        if (savedUser.dataValues.role === "STUD") createStudProfile(savedUser, req, res, transaction);
        else if (savedUser.dataValues.role === "TEACHER") createTeacherProfile(req, res);
    }catch(error) {
        if (error instanceof InvalidInputError) {
            throw error;
        }
        
        await transaction.rollback();
        throw new SERVER_ERROR(messages.REGISTRATION.SERVER_ERROR);
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

    signedToken = jwt.sign({username: data.username}, secret, {expiresIn: "3d"});
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