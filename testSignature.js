const crypto = require("crypto");

const body = {
  transactionId: 72,
  status: "pending",
  timestamp: new Date().toISOString(),
};

const payload = JSON.stringify(body);
const secret = "SuperSecretKey228";

const signature = crypto
  .createHmac("sha256", secret)
  .update(payload)
  .digest("hex");

console.log("Body:", payload);
console.log("X-Sender-Signature:", signature);