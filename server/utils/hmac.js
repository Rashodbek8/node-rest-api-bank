const crypto = require("crypto");

const SECRET = "SuperSecretKey228";

exports.signBody = (body) => {
    const payload  = JSON.stringify(body);
    return crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
};

exports.verifySignature = (body, signature) => {
    const expected = exports.signBody(body);
    return expected === signature;
};