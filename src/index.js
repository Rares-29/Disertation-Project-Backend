// De instalat dependintele
// De instalat bd, de hotarat intre sqllite, mysql si postgress
// De gandit arhitectura tabelelor pt bd
// De facut tabelele in bd
// De gandit arhitectura claselor si cum sa scriu clasele in nodejs
// De scris rutele pt API
// De facut rute in postman pt testare
// De scris service-urile care acceseaza rutele
require("dotenv").config();
const express = require('express');
const app = express();
const student = require("./routes/student")
const auth = require("./routes/auth");
const jwt = require("jsonwebtoken");
const messages = require("./utils/messages");
const {errorHandler} = require("./middleware/errorHandler");
const {authorizeToken} = require("./middleware/authorizeToken");
const PORT = process.env.APP_PORT;
const {createTables} = require("./db/sqlConnection.js");
const {exportAllUsers} = require("./services/authService.js");



app.use(express.json());
app.use("/auth", auth);
app.use(authorizeToken);
app.use("/student", student);
app.use(errorHandler);



app.listen(PORT, (req, resp) => {
    console.log("The server is listening on port: " + PORT);
})