import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Token is required" });
  }

  // Expecting format: Bearer <token>
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const SECRET_KEY = process.env.JWT_SECRET || "dev-secret-" + Math.random().toString(36).slice(2, 10);
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // save user data to request
    next(); // continue to the protected route
  } catch (err) {
    return res.status(403).json({ message: "Token invalid or expired" });
  }
};

