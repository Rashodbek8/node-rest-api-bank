const axios = require("axios");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const BASE_URL = "http://localhost:4000/api";
const SHARED_SECRET = "SuperSecretKey228";
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

exports.sendTransfer = async ({ fromBank, toAccount, amount }) => {
  const transactionId = uuidv4();
  const body = { fromBank, toAccount, amount, transactionId };

  const signature = crypto
    .createHmac("sha256", SHARED_SECRET)
    .update(JSON.stringify(body))
    .digest("hex");

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`🔁 Attempt ${attempt} to send the request...`);
      const response = await axios.post(`${BASE_URL}/receive-transfer`, body, {
        headers: {
          "X-Signature": signature
        },
        timeout: 3000
      });

      console.log("✅ Transfer sent successfully!");
      return response.data;

    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed: ${error.message}`);

      if (attempt === MAX_RETRIES) {
        console.error("🛑 All attempts failed.");
        throw {
          status: 502,
          message: "Failed to connect to the external bank after multiple attempts"
        };
      }

      console.log(`⏳ Retrying in ${RETRY_DELAY}ms...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
};