// De instalat dependintele
// De instalat bd, de hotarat intre sqllite, mysql si postgress
// De gandit arhitectura tabelelor pt bd
// De facut tabelele in bd
// De gandit arhitectura claselor si cum sa scriu clasele in nodejs
// De scris rutele pt API
// De facut rute in postman pt testare
// De scris service-urile care acceseaza rutele
const express = require('express');
const app = express();
const routes = require("./routes/index");
require("dotenv").config();
const student = require("./routes/student")
const auth = require("./routes/auth");
const jwt = require("jsonwebtoken");
const messages = require("./utils/messages");
const {errorHandler} = require("./middleware/errorHandler");
const {authorizeToken} = require("./middleware/authorizeToken");
const PORT = process.env.APP_PORT;
const runDbScripts = process.env.RUN_DB_SCRIPTS;
const {createTables} = require("sqlConnection.js");

if (runDbScripts === "TRUE") {
    createTables();
}

app.use(express.json());
app.use("/auth", auth);
app.use(authorizeToken);
app.use(errorHandler);
app.use("/student", student);



app.listen(PORT, (req, resp) => {
    console.log("The server is listening on port: " + PORT);
})