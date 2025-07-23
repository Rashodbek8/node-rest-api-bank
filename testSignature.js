const crypto = require("crypto");

const body = {
  transactionId: 123,
  status: "confirmed",
  timestamp: "2025-07-21T10:30:00Z"
};

const payload = JSON.stringify(body);
const signature = crypto
  .createHmac("sha256", "SuperSecretKey228")
  .update(payload)
  .digest("hex");

console.log("X-Sender-Signature:", signature);