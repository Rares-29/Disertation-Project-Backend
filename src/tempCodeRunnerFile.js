// De instalat dependintele
// De instalat bd, de hotarat intre sqllite, mysql si postgress
// De gandit arhitectura tabelelor pt bd
// De facut tabelele in bd
// De gandit arhitectura claselor si cum sa scriu clasele in nodejs
// De scris rutele pt API
// De facut rute in postman pt testare
// De scris service-urile care acceseaza rutele
const express = require('express');
const app = express()
const routes = require("./routes/index");

const student = require("./routes/student")

const PORT = 8080;

app.use("/student", student);

app.listen(PORT, (req, resp) => {
    console.log("The server is listening on port: " + PORT);
})