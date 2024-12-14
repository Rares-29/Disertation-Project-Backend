const express = require('express')
const router = express.Router() // Create a new router

// A router is an instance of middleware and routes, like a mini-app. You register what to happen on this router and only here. Can be passed
// as a middleware parameter
router.get("/", (req, res) => {
    res.send("Hello world");
})


module.exports = router;