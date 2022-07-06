const { createPool } = require("mysql2");

const pool = createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    
    access_key: process.env.ACCESS_KEY,
    access_seccret: process.env.ACCESS_SECRET,
    region: process.env.REGION,
    bucket: process.env.BUCKET

});

module.exports = pool;