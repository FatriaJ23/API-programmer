import mysql from "mysql2/promise";

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 8889,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "nutech",
});

db.getConnection()
    .then(() => console.log("Connected to MySQL Database!"))
    .catch((err) => console.error("Database connection failed:", err.message));

export default db;
