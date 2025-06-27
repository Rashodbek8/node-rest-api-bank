const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

exports.sign = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

exports.verify = (token) => jwt.verify(token, JWT_SECRET);