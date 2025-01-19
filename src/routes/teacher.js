const express = require('express');
const router = express.Router();
const teacherService = require("../services/teacherService");
const { NotAuthorizedError } = require('../utils/errors');
const messages = require('../utils/messages');

// A router is an instance of middleware and routes, like a mini-app. You register what to happen on this router and only here. Can be passed
// as a middleware parameter

router.use(async (req, res, next) => {
    if (req.user.role !== "TEACHER") {
        next(new NotAuthorizedError(messages.AUTH.NOT_AUTHORIZED));
    }
    try {
        await teacherService.findTeacher(req);
        next();
    }catch(error) {
        next(error); 
        }
});



router.post("/registerSession", async (req, res, next) => {
    try {
        return await teacherService.registerSession(req, res);
    }catch(error) {
        next(error);
    }
})


router.get("/availableOpenSeats", async (req, res, next) => {
    try {
        const openSeats = await teacherService.getAvailableSeats(req.teacher);
        return res.json({"availableOpenSeats": openSeats});
    }catch(error) {
        next(error);
    }
})

router.post("/respondToRequest", async(req,res,next) => {
    try {
        await teacherService.respondToRequest(req);
        return res.json({message: messages.REGISTRATION_REQUEST_SERVICE.RESPONSE_SUCCESS_MESSAGE});
    }catch(error) {
        next(error);
    }
})

module.exports = router;

