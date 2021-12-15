const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: 5432
})

module.exports = {
    pool
};