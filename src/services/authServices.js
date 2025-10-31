import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "All fields (first_name, last_name, email, password) are required" });
    }

    // Check email
    const [userExist] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (userExist.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    //password
    const hashed = await bcrypt.hash(password, 10);

    // Insert new user
    await db.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
      [first_name, last_name, email, hashed]
    );

    res.json({ status: "success", message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Wrong password" });
    const SECRET_KEY = "my-static-secret-key";
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ status: "success", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
