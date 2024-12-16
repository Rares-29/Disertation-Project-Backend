require("dotenv").config();
const fs = require('fs');
const mysql = require('mysql2');


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,    
  database: process.env.DB_NAME,
  multipleStatements: true 
});

const dbConnectionPool = pool.promise();

const createTables = async () => {
    try {
        const schemaFile = './src/db/schema.sql';
        const sqlStatements = fs.readFileSync(schemaFile, 'utf8');
        const connection = await dbConnectionPool.getConnection();
        console.log('DB is connected.');
        const queryPromise = connection.query(sqlStatements);
        queryPromise.then(() => {
            console.log('Database tables successfully created');
        }).catch((error) => {
            console.error('Error executing SQL script:', error.message);
            throw Error("Failed to execute db scripts");
        });
    } catch(error) {
        throw error;
        console.log("Error connecting to mySql");
        throw Error("Error connecting to mySql");
    }
};

module.exports.dbConnectionPool = dbConnectionPool;

if (process.env.RESTART_ALLOWED === "TRUE") createTables();