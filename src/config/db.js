import mysql from "mysql2";
import "dotenv/config";


const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).promise();

db.getConnection()
    .then(() => console.log("Connected to MySQL (Railway)!"))
    .catch((err) => console.error("Database connection failed", err.message));

export default db;

