import mysql from "mysql2";
import "dotenv/config";


const db = mysql.createPool({
    host: "caboose.proxy.rlwy.net",
    port: 35182,
    user: "root",
    password: "KQDZPzHkwdHmuKQwoaOXrAFupLzEuSuP",
    database: "railway",
}).promise();

db.getConnection()
    .then(() => console.log("Connected to MySQL (Railway)!"))
    .catch((err) => console.error("Database connection failed", err.message));

export default db;

