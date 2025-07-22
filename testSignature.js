const crypto = require("crypto");

const payload = JSON.stringify({
  transactionId: 123,
  status: "confirmed",
  timestamp: "2025-07-21T10:30:00Z"
});

const secret = "superSecretKey228";

const signature = crypto
  .createHmac("sha256", secret)
  .update(payload)
  .digest("hex");

console.log("Подпись:", signature);