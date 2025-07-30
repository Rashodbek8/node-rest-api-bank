const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const secret = "SuperSecretKey228";
const transactionId = uuidv4();

const body = JSON.stringify({
  fromBank: "MyBank",
  toAccount: "123456789",
  amount: 1000,
  transactionId
});

const signature = crypto.createHmac("sha256", secret).update(body).digest("hex");

console.log("Generated UUID:", transactionId);
console.log("Signature:", signature);