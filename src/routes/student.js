const express = require('express')
const router = express.Router()

// A router is an instance of middleware and routes, like a mini-app. You register what to happen on this router and only here. Can be passed
// as a middleware parameter

router.get("/", (req, res) => {
    res.send("Hello world");
})

router.post("/", (req, res) => {

    res.json({"name":"hello you2"})
})

module.exports = router;

