import mysql from "mysql2";

const pool = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "nutech",
});

pool.connect((err) => {
    if (err) {
        console.error("Gagal konek ke database", err.message);
    } else {
        console.log("Berhasil konek ke database");
    }
});

const db = pool.promise();

export default db;
