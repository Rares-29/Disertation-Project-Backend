const express = require('express');
const router = express.Router(); // Create a new router
const messages = require("../utils/messages");
const secret = process.env.SECRET;
const authService = require("../services/authService");


router.post("/login", async (req, res, next) => {
    try {
        return await authService.login(req, res);
    }catch(error) {
        next(error);
    }
})

router.post("/register", async (req, res, next) => {

    try {
        await authService.register(req, res);
        res.status(201);
        return res.json({"message": messages.REGISTRATION.SUCCESS_MESSAGE});
    }catch(error) {
        next(error);
    }
})



module.exports = router;