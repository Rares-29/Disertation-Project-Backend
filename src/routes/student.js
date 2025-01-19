const express = require('express');
const router = express.Router();
const studentService = require("../services/studentService");
const teacherService = require("../services/teacherService");
const messages = require("../utils/messages");
const { NotAuthorizedError } = require('../utils/errors');

// A router is an instance of middleware and routes, like a mini-app. You register what to happen on this router and only here. Can be passed
// as a middleware parameter

router.use(async (req, res, next) => {
    if (req.user.role !== "STUD") {
        next(new NotAuthorizedError(messages.AUTH.NOT_AUTHORIZED));
    }
    try {
        await studentService.findStudent(req);
        next();
    }catch(error) {
        next(error); 
        }
});



router.get("/getTeachers", async (req, res, next) => {
    try {
        const teachers =  await teacherService.getAllTeachers(req.student.program_id);
        res.json({"teachers": teachers});
    }catch(error) {
        next(error);
    }
});


router.post("/registerRequest", async(req, res, next) => {
    try {
        await studentService.registerRequest(req);
        res.json({"message": messages.REGISTRATION_REQUEST_SERVICE.REQUEST_SUCCESS_MESSAGE});
    }catch(error) {
        next(error);
    }
})

module.exports = router;

