const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webhookController");
const verifySignature = require("../middlewares/verifySignature");

router.post("/transaction", verifySignature, webhookController.handleTransactionWebhook);

module.exports = router;