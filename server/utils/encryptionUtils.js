const bcrypt = require("bcrypt");
const crypto = require("crypto");
require("dotenv").config();

const SALT_ROUNDS = 10;
const ALGORITHM = "aes-256-cbc";

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, "utf8");
const IV = Buffer.from(process.env.ENCRYPTION_IV, "hex");

async function hashPin(pin) {
    return await bcrypt.hash(pin, SALT_ROUNDS);
}

async function comparePin(pin, hash) {
    return await bcrypt.compare(pin, hash);
}

function encryptIBAN(iban) {
    const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, IV);
    let encrypted = cipher.update(iban, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

function decryptIBAN(encryptedIBAN) {
    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, IV);
    let decrypted = decipher.update(encryptedIBAN, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

module.exports = {
    hashPin,
    comparePin,
    encryptIBAN,
    decryptIBAN,
};