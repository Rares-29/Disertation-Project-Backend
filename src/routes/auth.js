const express = require('express');
const router = express.Router(); // Create a new router
const jwt = require("jsonwebtoken");
const messages = require("../utils/messages");
const secret = process.env.SECRET;
const authService = require("../services/authService");

router.post("/login", (req, res) => {
    // get payload
    try {
        const username = req.body.username;
        const password = req.body.password;
        checkUsernamePassword(username, password);
        signedToken = jwt.sign({username: username}, secret, {expiresIn: "3d"});
        res.json({"token": signedToken});
    }catch(error) {
        console.log(error);
        res.status(400);
        res.send({"message":messages.AUTHENTICATION.MISSING_REQUIRED_FIELDS});
    } 
})

router.post("/register", (req, res) => {

    authService.register(req, res);
    res.send("ok");
})


function checkUsernamePassword(username, password) {
    if (typeof username === "undefined")
        throw Error("username is missing");
    if (typeof password === "undefined")
        throw Error("password is missing");
}

module.exports = router;