const axios = require("axios");
const crypto = require("crypto");

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "SuperSecretKey228";
const TARGET_URL = "http://localhost:4000/webhook/transaction";

module.exports = async (job) => {
  const { transactionId, status } = job.data;
  const timestamp = new Date().toISOString();

  const payload = {
    transactionId,
    status,
    timestamp,
  };

  const message = timestamp + JSON.stringify(payload);
  const signature = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(message)
    .digest("hex");

  try {
    const res = await axios.post(TARGET_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        "X-Sender-Signature": signature,
        "X-Timestamp": timestamp,
      },
      timeout: 3000,
    });

    console.log("✅ Webhook sent successfully:", res.status);
    return res.data;
  } catch (err) {
    console.error("❌ Webhook sending failed:", err.message);
    throw err;
  }
};