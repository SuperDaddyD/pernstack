const Pool = require("pg").Pool;
//below is the configuration
//this will be exported to the index.js api server
const pool = new Pool({
    user:"postgres",
    host:"localhost",
    password:"Humptydance1!",
    database:"pernstack",
    port:5432
});

module.exports = pool;